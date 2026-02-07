"""
Knowledge Base Feeder — Add new dispatch knowledge on the fly.

This script gives you multiple ways to continuously grow the AI's
understanding of dump truck dispatch operations. Every addition lands
in the knowledge_base/ directory as structured, version-controlled files
that the dispatch agent loads at runtime.

Usage:
  # Add a worked example (transcript + expected output)
  python feed_knowledge.py example --audio recording.wav
  python feed_knowledge.py example --transcript "I need 3 loads of gravel..."

  # Add a business rule or terminology entry
  python feed_knowledge.py rule "Rain days: always confirm morning-of before dispatching"
  python feed_knowledge.py term "GAB" "Graded Aggregate Base — common road base material"

  # Add a correction (when the AI got something wrong)
  python feed_knowledge.py correction "When they say 'crush and run' that means crushed stone, not gravel"

  # Import from Airtable (pull recent jobs as examples)
  python feed_knowledge.py import-airtable --last 10

  # Feed via webhook (for Make.com integration)
  python feed_knowledge.py serve --port 8081
"""

import argparse
import json
import os
import sys
import datetime
from pathlib import Path

# Optional imports — degrade gracefully
try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent / ".env")
except ImportError:
    pass

KB_DIR = Path(__file__).parent / "knowledge_base"
EXAMPLES_FILE = KB_DIR / "examples.jsonl"
RULES_FILE = KB_DIR / "business_rules.md"
CORRECTIONS_FILE = KB_DIR / "corrections.md"


def add_example_from_transcript(transcript: str, dispatch_type: str = "broker_to_driver"):
    """
    Takes a raw transcript, runs it through GPT to generate the expected
    structured output, then saves both as a training example.
    """
    if not HAS_OPENAI:
        print("[error] openai package required. pip install openai")
        sys.exit(1)

    client = OpenAI()

    # Load the current parsing prompt
    prompt_path = KB_DIR / "dump_truck_job_structured.txt"
    system_prompt = prompt_path.read_text()

    print(f"[feed] Parsing transcript ({len(transcript)} chars)...")
    response = client.chat.completions.create(
        model=os.getenv("GPT_MODEL", "gpt-4o"),
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript},
        ],
        temperature=0,
    )

    raw_json = response.choices[0].message.content.strip()
    try:
        expected_job = json.loads(raw_json)
    except json.JSONDecodeError:
        print(f"[error] GPT returned invalid JSON:\n{raw_json}")
        sys.exit(1)

    # Show the result for human review
    print("\n--- Parsed Job ---")
    print(json.dumps(expected_job, indent=2))
    print(f"\nDispatch type: {dispatch_type}")

    # Ask for confirmation
    confirm = input("\nSave this example? [Y/n/edit]: ").strip().lower()
    if confirm == "n":
        print("[feed] Skipped.")
        return
    elif confirm == "edit":
        print("[feed] Edit the JSON above, paste corrected version, then press Enter twice:")
        lines = []
        while True:
            line = input()
            if line == "":
                break
            lines.append(line)
        try:
            expected_job = json.loads("\n".join(lines))
        except json.JSONDecodeError:
            print("[error] Invalid JSON. Example not saved.")
            return

    example = {
        "transcript": transcript,
        "expected_job": expected_job,
        "dispatch_type": dispatch_type,
    }

    with open(EXAMPLES_FILE, "a") as f:
        f.write(json.dumps(example) + "\n")

    count = sum(1 for _ in open(EXAMPLES_FILE))
    print(f"[feed] Example saved. Total examples: {count}")


def add_example_from_audio(audio_path: str, dispatch_type: str = "broker_to_driver"):
    """Transcribe an audio file, then add it as an example."""
    if not HAS_OPENAI:
        print("[error] openai package required. pip install openai")
        sys.exit(1)

    client = OpenAI()
    print(f"[feed] Transcribing {audio_path}...")

    with open(audio_path, "rb") as f:
        result = client.audio.transcriptions.create(
            model=os.getenv("WHISPER_MODEL", "whisper-1"),
            file=f,
        )

    transcript = result.text
    print(f"[feed] Transcript: {transcript[:200]}...")
    add_example_from_transcript(transcript, dispatch_type)


def add_rule(rule_text: str):
    """Append a business rule to the rules file."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d")

    with open(RULES_FILE, "a") as f:
        f.write(f"\n### Added {timestamp}\n- {rule_text}\n")

    print(f"[feed] Rule added to {RULES_FILE.name}")


def add_term(term: str, definition: str):
    """Add a terminology entry to the business rules file."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d")

    with open(RULES_FILE, "a") as f:
        f.write(f"\n### {term} (added {timestamp})\n- **{term}**: {definition}\n")

    print(f"[feed] Term '{term}' added to {RULES_FILE.name}")


def add_correction(correction_text: str):
    """
    Record a correction — something the AI got wrong that it should learn from.
    These get loaded as additional context during dispatch generation.
    """
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

    # Create corrections file if it doesn't exist
    if not CORRECTIONS_FILE.exists():
        CORRECTIONS_FILE.write_text(
            "# Dispatch AI Corrections Log\n\n"
            "These are things the AI got wrong that it should avoid in the future.\n"
            "The dispatch agent loads this file as additional context.\n\n---\n"
        )

    with open(CORRECTIONS_FILE, "a") as f:
        f.write(f"\n- [{timestamp}] {correction_text}\n")

    print(f"[feed] Correction recorded in {CORRECTIONS_FILE.name}")


def import_from_airtable(last_n: int = 10):
    """
    Pull recent completed jobs from Airtable and add them as examples.
    Requires AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.
    """
    if not HAS_REQUESTS:
        print("[error] requests package required. pip install requests")
        sys.exit(1)

    api_key = os.getenv("AIRTABLE_API_KEY")
    base_id = os.getenv("AIRTABLE_BASE_ID")
    table = os.getenv("AIRTABLE_JOBS_TABLE", "Jobs")

    if not api_key or not base_id:
        print("[error] Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env")
        sys.exit(1)

    print(f"[feed] Fetching last {last_n} jobs from Airtable ({table})...")

    headers = {"Authorization": f"Bearer {api_key}"}
    params = {
        "maxRecords": last_n,
        "sort[0][field]": "Created",
        "sort[0][direction]": "desc",
    }

    resp = requests.get(
        f"https://api.airtable.com/v0/{base_id}/{table}",
        headers=headers,
        params=params,
    )

    if resp.status_code != 200:
        print(f"[error] Airtable returned {resp.status_code}: {resp.text}")
        sys.exit(1)

    records = resp.json().get("records", [])
    print(f"[feed] Got {len(records)} records")

    added = 0
    for record in records:
        fields = record.get("fields", {})

        # Build an example from the Airtable record
        # Adapt these field names to match YOUR Airtable schema
        example = {
            "transcript": fields.get("original_message", fields.get("notes", "")),
            "expected_job": {
                "job_type": fields.get("job_type"),
                "material": fields.get("material"),
                "quantity": fields.get("quantity"),
                "pickup_location": fields.get("pickup_address"),
                "delivery_location": fields.get("delivery_address"),
                "customer_name": fields.get("customer_name"),
                "customer_phone": fields.get("customer_phone"),
                "date_requested": fields.get("date"),
                "time_window": fields.get("time_window"),
                "special_instructions": fields.get("notes"),
                "urgency": fields.get("urgency", "normal"),
                "rate_mentioned": fields.get("rate"),
                "broker_name": fields.get("broker"),
                "po_number": fields.get("po_number"),
            },
            "dispatch_type": fields.get("dispatch_type", "broker_to_driver"),
        }

        # Only save if we have a transcript/message
        if example["transcript"]:
            with open(EXAMPLES_FILE, "a") as f:
                f.write(json.dumps(example) + "\n")
            added += 1

    count = sum(1 for _ in open(EXAMPLES_FILE))
    print(f"[feed] Added {added} examples from Airtable. Total examples: {count}")


def serve_webhook(port: int = 8081):
    """
    Run a tiny webhook server that accepts knowledge base additions via POST.
    Designed to be called from Make.com scenarios.

    POST /add-example   {"transcript": "...", "dispatch_type": "broker_to_driver"}
    POST /add-rule      {"rule": "..."}
    POST /add-term      {"term": "...", "definition": "..."}
    POST /add-correction {"correction": "..."}
    """
    from http.server import HTTPServer, BaseHTTPRequestHandler

    class FeedHandler(BaseHTTPRequestHandler):
        def do_POST(self):
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length))

            try:
                if self.path == "/add-example":
                    transcript = body["transcript"]
                    dtype = body.get("dispatch_type", "broker_to_driver")
                    # Non-interactive: auto-accept GPT parsing
                    add_example_auto(transcript, dtype)
                    self._ok({"status": "example added"})

                elif self.path == "/add-rule":
                    add_rule(body["rule"])
                    self._ok({"status": "rule added"})

                elif self.path == "/add-term":
                    add_term(body["term"], body["definition"])
                    self._ok({"status": "term added"})

                elif self.path == "/add-correction":
                    add_correction(body["correction"])
                    self._ok({"status": "correction added"})

                else:
                    self._respond(404, {"error": "unknown endpoint"})

            except Exception as e:
                self._respond(500, {"error": str(e)})

        def _ok(self, data):
            self._respond(200, data)

        def _respond(self, status, data):
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())

        def log_message(self, fmt, *args):
            print(f"[feed-webhook] {args[0]}")

    print(f"[feed] Knowledge base feeder listening on port {port}")
    print(f"[feed] POST /add-example, /add-rule, /add-term, /add-correction")
    HTTPServer(("0.0.0.0", port), FeedHandler).serve_forever()


def add_example_auto(transcript: str, dispatch_type: str = "broker_to_driver"):
    """
    Non-interactive version of add_example — used by the webhook server.
    Parses via GPT and saves without human confirmation.
    """
    if not HAS_OPENAI:
        raise RuntimeError("openai package not installed")

    client = OpenAI()
    prompt_path = KB_DIR / "dump_truck_job_structured.txt"
    system_prompt = prompt_path.read_text()

    response = client.chat.completions.create(
        model=os.getenv("GPT_MODEL", "gpt-4o"),
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript},
        ],
        temperature=0,
    )

    raw_json = response.choices[0].message.content.strip()
    expected_job = json.loads(raw_json)

    example = {
        "transcript": transcript,
        "expected_job": expected_job,
        "dispatch_type": dispatch_type,
    }

    with open(EXAMPLES_FILE, "a") as f:
        f.write(json.dumps(example) + "\n")

    print(f"[feed] Auto-added example ({dispatch_type})")


def show_stats():
    """Show current knowledge base stats."""
    print("\n=== Knowledge Base Stats ===\n")

    # Examples
    if EXAMPLES_FILE.exists():
        count = sum(1 for _ in open(EXAMPLES_FILE))
        # Count by type
        types = {}
        for line in open(EXAMPLES_FILE):
            ex = json.loads(line)
            t = ex.get("dispatch_type", "unknown")
            types[t] = types.get(t, 0) + 1
        print(f"Examples: {count}")
        for t, c in sorted(types.items()):
            print(f"  {t}: {c}")
    else:
        print("Examples: 0")

    # Knowledge files
    kb_files = list(KB_DIR.glob("*.md")) + list(KB_DIR.glob("*.txt"))
    print(f"\nKnowledge files: {len(kb_files)}")
    for f in sorted(kb_files):
        size = f.stat().st_size
        print(f"  {f.name} ({size:,} bytes)")

    # Corrections
    if CORRECTIONS_FILE.exists():
        corrections = sum(1 for line in open(CORRECTIONS_FILE) if line.startswith("- ["))
        print(f"\nCorrections logged: {corrections}")

    print()


def main():
    parser = argparse.ArgumentParser(
        description="Feed the dispatch agent's knowledge base",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Commands:
  example       Add a worked example (transcript → expected JSON)
  rule          Add a business rule
  term          Add a terminology definition
  correction    Record something the AI got wrong
  import-airtable  Pull recent jobs from Airtable as examples
  serve         Run webhook server for Make.com integration
  stats         Show knowledge base statistics
        """,
    )

    subparsers = parser.add_subparsers(dest="command")

    # example
    ex_parser = subparsers.add_parser("example", help="Add a worked example")
    ex_parser.add_argument("--audio", help="Path to audio file to transcribe")
    ex_parser.add_argument("--transcript", help="Raw transcript text")
    ex_parser.add_argument(
        "--type",
        default="broker_to_driver",
        choices=["broker_to_driver", "broker_to_sub_broker", "customer_inbound"],
        help="Dispatch relationship type",
    )

    # rule
    rule_parser = subparsers.add_parser("rule", help="Add a business rule")
    rule_parser.add_argument("text", help="The rule text")

    # term
    term_parser = subparsers.add_parser("term", help="Add a term definition")
    term_parser.add_argument("name", help="The term")
    term_parser.add_argument("definition", help="The definition")

    # correction
    corr_parser = subparsers.add_parser("correction", help="Record a correction")
    corr_parser.add_argument("text", help="What the AI got wrong and the correct answer")

    # import-airtable
    at_parser = subparsers.add_parser("import-airtable", help="Import from Airtable")
    at_parser.add_argument("--last", type=int, default=10, help="Number of recent records")

    # serve
    srv_parser = subparsers.add_parser("serve", help="Run feeder webhook server")
    srv_parser.add_argument("--port", type=int, default=8081)

    # stats
    subparsers.add_parser("stats", help="Show knowledge base stats")

    args = parser.parse_args()

    if args.command == "example":
        if args.audio:
            add_example_from_audio(args.audio, args.type)
        elif args.transcript:
            add_example_from_transcript(args.transcript, args.type)
        else:
            print("[error] Provide --audio or --transcript")
            sys.exit(1)

    elif args.command == "rule":
        add_rule(args.text)

    elif args.command == "term":
        add_term(args.name, args.definition)

    elif args.command == "correction":
        add_correction(args.text)

    elif args.command == "import-airtable":
        import_from_airtable(args.last)

    elif args.command == "serve":
        serve_webhook(args.port)

    elif args.command == "stats":
        show_stats()

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
