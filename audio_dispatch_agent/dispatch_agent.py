"""
Audio Dispatch Agent — Micro Office Automation

Pipeline:
  1. Accept audio file (WAV/MP3/M4A) or a Make.com webhook payload
  2. Transcribe via OpenAI Whisper
  3. Parse transcription into structured job JSON using GPT
  4. Enrich with knowledge-base lookups (Airtable: drivers, customers, rates)
  5. Generate a formatted Dump Truck Broker Dispatch Message
  6. (Optional) Send via Twilio SMS or post back to Make.com webhook

Usage (CLI):
  python dispatch_agent.py --audio path/to/recording.wav

Usage (webhook / programmatic):
  from dispatch_agent import process_audio
  result = process_audio("path/to/recording.wav")
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

import openai
import requests

# ---------------------------------------------------------------------------
# Configuration — override via environment variables or .env
# ---------------------------------------------------------------------------
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY", "")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID", "")
AIRTABLE_DRIVERS_TABLE = os.getenv("AIRTABLE_DRIVERS_TABLE", "Drivers")
AIRTABLE_CUSTOMERS_TABLE = os.getenv("AIRTABLE_CUSTOMERS_TABLE", "Customers")
AIRTABLE_JOBS_TABLE = os.getenv("AIRTABLE_JOBS_TABLE", "Jobs")
MAKE_WEBHOOK_URL = os.getenv("MAKE_WEBHOOK_URL", "")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
WHISPER_MODEL = os.getenv("WHISPER_MODEL", "whisper-1")
GPT_MODEL = os.getenv("GPT_MODEL", "gpt-4o")

# ---------------------------------------------------------------------------
# Prompt templates — loaded from knowledge_base/ at runtime
# ---------------------------------------------------------------------------
KB_DIR = Path(__file__).parent / "knowledge_base"


def _load_prompt(name: str) -> str:
    """Load a prompt template from the knowledge_base directory."""
    path = KB_DIR / f"{name}.txt"
    if path.exists():
        return path.read_text()
    raise FileNotFoundError(f"Prompt template not found: {path}")


def _load_knowledge_context() -> str:
    """Load all knowledge base markdown files into a combined context string.

    This pulls in business_rules.md, dispatch_relationships.md, corrections.md,
    and worked examples so GPT has full domain awareness when parsing and
    generating dispatch messages.
    """
    sections = []

    # Load markdown knowledge files
    for md_file in sorted(KB_DIR.glob("*.md")):
        content = md_file.read_text().strip()
        if content:
            sections.append(f"--- {md_file.stem} ---\n{content}")

    # Load worked examples (last 20 to stay within context limits)
    examples_file = KB_DIR / "examples.jsonl"
    if examples_file.exists():
        lines = examples_file.read_text().strip().split("\n")
        recent = lines[-20:]  # keep it bounded
        if recent:
            examples_text = "--- worked_examples ---\n"
            examples_text += "Use these past examples as reference for parsing accuracy:\n\n"
            for line in recent:
                try:
                    ex = json.loads(line)
                    examples_text += f"Transcript: {ex.get('transcript', '')[:200]}\n"
                    examples_text += f"Expected: {json.dumps(ex.get('expected_job', {}))}\n"
                    examples_text += f"Type: {ex.get('dispatch_type', 'unknown')}\n\n"
                except json.JSONDecodeError:
                    continue
            sections.append(examples_text)

    combined = "\n\n".join(sections)
    if combined:
        print(f"[knowledge] Loaded {len(sections)} knowledge sections "
              f"({len(combined):,} chars)")
    return combined


# ===================================================================
# STEP 1 — Transcribe audio via OpenAI Whisper
# ===================================================================

def transcribe_audio(audio_path: str) -> str:
    """Send an audio file to the Whisper API and return the transcript."""
    client = openai.OpenAI(api_key=OPENAI_API_KEY)
    with open(audio_path, "rb") as f:
        response = client.audio.transcriptions.create(
            model=WHISPER_MODEL,
            file=f,
            response_format="text",
        )
    transcript = response if isinstance(response, str) else response.text
    print(f"[transcribe] {len(transcript)} chars transcribed")
    return transcript


# ===================================================================
# STEP 2 — Parse transcript into structured job JSON
# ===================================================================

def parse_job_from_transcript(transcript: str) -> dict:
    """Use GPT to convert free-form transcript into structured job data.

    Uses the 'dump_truck_job_structured' prompt template which mirrors
    the existing "Dump Truck Job Structured" entry in the prompt bank.
    Enriches the system prompt with all knowledge base context (business
    rules, terminology, dispatch relationships, worked examples, and
    any logged corrections).
    """
    system_prompt = _load_prompt("dump_truck_job_structured")
    knowledge = _load_knowledge_context()
    if knowledge:
        system_prompt += (
            "\n\n# KNOWLEDGE BASE REFERENCE\n"
            "Use the following domain knowledge to improve parsing accuracy.\n"
            "Pay special attention to terminology, corrections, and worked examples.\n\n"
            + knowledge
        )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
        model=GPT_MODEL,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript},
        ],
        temperature=0.2,
    )
    job_json = json.loads(response.choices[0].message.content)
    print(f"[parse] Extracted job: {job_json.get('job_type', '?')} "
          f"for {job_json.get('customer_name', 'unknown')}")
    return job_json


# ===================================================================
# STEP 3 — Enrich from Airtable knowledge base
# ===================================================================

def _airtable_get(table: str, filter_formula: str = "") -> list[dict]:
    """Generic Airtable list-records helper."""
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{table}"
    headers = {"Authorization": f"Bearer {AIRTABLE_API_KEY}"}
    params = {}
    if filter_formula:
        params["filterByFormula"] = filter_formula
    resp = requests.get(url, headers=headers, params=params, timeout=15)
    resp.raise_for_status()
    return [r["fields"] for r in resp.json().get("records", [])]


def enrich_with_knowledge_base(job: dict) -> dict:
    """Look up customer history and available drivers from Airtable.

    Adds 'customer_history' and 'available_drivers' keys to the job dict.
    If Airtable is not configured, returns the job unchanged so the agent
    still works in offline / demo mode.
    """
    if not (AIRTABLE_API_KEY and AIRTABLE_BASE_ID):
        print("[enrich] Airtable not configured — skipping enrichment")
        job.setdefault("customer_history", [])
        job.setdefault("available_drivers", [])
        return job

    # Customer lookup
    cust_name = job.get("customer_name", "")
    if cust_name:
        formula = f"FIND(LOWER(\"{cust_name}\"), LOWER({{Name}}))"
        job["customer_history"] = _airtable_get(AIRTABLE_CUSTOMERS_TABLE, formula)
    else:
        job["customer_history"] = []

    # Driver availability lookup
    job["available_drivers"] = _airtable_get(
        AIRTABLE_DRIVERS_TABLE,
        "{Status} = 'Available'"
    )

    print(f"[enrich] {len(job['customer_history'])} customer records, "
          f"{len(job['available_drivers'])} available drivers")
    return job


# ===================================================================
# STEP 4 — Generate the Dispatch Message
# ===================================================================

def generate_dispatch_message(job: dict) -> str:
    """Use GPT to compose a professional broker dispatch message.

    Uses the 'dispatch_message_template' prompt which instructs GPT to
    produce a formatted message suitable for SMS or email to a driver.
    Includes dispatch relationship rules and business rules from the
    knowledge base so the message is appropriate for the recipient type.
    """
    system_prompt = _load_prompt("dispatch_message_template")

    # Add relationship-specific and business rule context
    knowledge = _load_knowledge_context()
    if knowledge:
        system_prompt += (
            "\n\n# KNOWLEDGE BASE REFERENCE\n"
            "Use dispatch relationship rules and business rules below to "
            "ensure the message is appropriate for the recipient type, "
            "includes proper terminology, and follows rate confidentiality rules.\n\n"
            + knowledge
        )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
        model=GPT_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(job, indent=2)},
        ],
        temperature=0.3,
    )
    message = response.choices[0].message.content
    print(f"[dispatch] Generated {len(message)} char dispatch message")
    return message


# ===================================================================
# STEP 5 — Delivery (Twilio SMS or Make.com webhook)
# ===================================================================

def send_sms(to_number: str, body: str) -> dict:
    """Send the dispatch message via Twilio SMS."""
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_FROM_NUMBER):
        print("[send_sms] Twilio not configured — printing message only")
        return {"status": "skipped", "message": body}

    url = (f"https://api.twilio.com/2010-04-01/"
           f"Accounts/{TWILIO_ACCOUNT_SID}/Messages.json")
    resp = requests.post(url, auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN), data={
        "From": TWILIO_FROM_NUMBER,
        "To": to_number,
        "Body": body,
    }, timeout=15)
    resp.raise_for_status()
    return resp.json()


def post_to_make(payload: dict) -> dict:
    """Post the full result back to a Make.com webhook for further routing."""
    if not MAKE_WEBHOOK_URL:
        print("[make] Webhook URL not configured — skipping")
        return {"status": "skipped"}
    resp = requests.post(MAKE_WEBHOOK_URL, json=payload, timeout=15)
    resp.raise_for_status()
    return {"status": "sent", "code": resp.status_code}


# ===================================================================
# Main pipeline
# ===================================================================

def process_audio(audio_path: str, driver_phone: str = "") -> dict:
    """Run the full audio-to-dispatch pipeline.

    Args:
        audio_path:   Path to audio recording (wav, mp3, m4a, webm, etc.)
        driver_phone: Optional phone number to SMS the dispatch to.

    Returns:
        dict with keys: transcript, job, dispatch_message, delivery
    """
    print(f"\n{'='*60}")
    print(f"  Audio Dispatch Agent — {datetime.now().isoformat()}")
    print(f"{'='*60}\n")

    # 1. Transcribe
    transcript = transcribe_audio(audio_path)

    # 2. Parse into structured job
    job = parse_job_from_transcript(transcript)

    # 3. Enrich from knowledge base
    job = enrich_with_knowledge_base(job)

    # 4. Generate dispatch message
    dispatch_message = generate_dispatch_message(job)

    # 5. Deliver
    delivery = {"sms": {"status": "not_requested"}, "make": {"status": "not_requested"}}

    if driver_phone:
        delivery["sms"] = send_sms(driver_phone, dispatch_message)

    # Always attempt Make.com post if configured
    delivery["make"] = post_to_make({
        "transcript": transcript,
        "job": job,
        "dispatch_message": dispatch_message,
        "timestamp": datetime.now().isoformat(),
    })

    result = {
        "transcript": transcript,
        "job": job,
        "dispatch_message": dispatch_message,
        "delivery": delivery,
    }

    print(f"\n{'='*60}")
    print("  DISPATCH MESSAGE")
    print(f"{'='*60}")
    print(dispatch_message)
    print(f"{'='*60}\n")

    return result


# ===================================================================
# CLI entry point
# ===================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Audio Dispatch Agent — transcribe audio and generate "
                    "a dump truck broker dispatch message."
    )
    parser.add_argument("--audio", required=True, help="Path to audio file")
    parser.add_argument("--driver-phone", default="",
                        help="Phone number to SMS dispatch (E.164 format)")
    parser.add_argument("--output", default="",
                        help="Write JSON result to this file path")
    args = parser.parse_args()

    if not OPENAI_API_KEY:
        print("ERROR: Set OPENAI_API_KEY environment variable", file=sys.stderr)
        sys.exit(1)

    result = process_audio(args.audio, args.driver_phone)

    if args.output:
        Path(args.output).write_text(json.dumps(result, indent=2))
        print(f"[output] Wrote result to {args.output}")


if __name__ == "__main__":
    main()
