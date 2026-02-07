# Audio Dispatch Agent

Transcribes recorded audio and generates dump truck broker dispatch messages
using your existing Micro Office Automation knowledge base.

## Architecture

```
                        Audio Dispatch Agent Pipeline
                        ============================

  +-----------+     +----------+     +-----------+     +----------+
  |  Audio    | --> | Whisper  | --> | GPT Parse | --> | Airtable |
  |  Input    |     | (OpenAI) |     | to JSON   |     | Enrich   |
  | wav/mp3/  |     |          |     |           |     | drivers, |
  | m4a/webm  |     | Speech   |     | "Dump     |     | customer |
  |           |     | to Text  |     |  Truck    |     | history  |
  +-----------+     +----------+     |  Job      |     +----+-----+
                                     | Structured"|          |
                                     +-----------+          v
                                                     +------------+
    +----------+     +---------+                     | GPT Format |
    | Deliver  | <-- | Output  | <------------------ | Dispatch   |
    |          |     |         |                     | Message    |
    | Twilio   |     | SMS txt |                     +------------+
    | Make.com |     | JSON    |
    | Console  |     | Webhook |
    +----------+     +---------+
```

## Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env with your OpenAI API key (required) and optional Airtable/Twilio keys

# 3. Run with an audio file
python dispatch_agent.py --audio recording.wav

# 4. Or run the webhook server (for Make.com integration)
python webhook_server.py --port 8080
```

## Usage

### CLI — Process a single audio file

```bash
python dispatch_agent.py --audio call_recording.wav
python dispatch_agent.py --audio call_recording.wav --driver-phone "+15551234567"
python dispatch_agent.py --audio call_recording.wav --output result.json
```

### Webhook — Receive audio via HTTP

```bash
# Start the server
python webhook_server.py

# POST audio file
curl -X POST http://localhost:8080/dispatch \
  -F "audio=@recording.wav"

# POST pre-transcribed text (skips Whisper)
curl -X POST http://localhost:8080/dispatch-text \
  -H "Content-Type: application/json" \
  -d '{"transcript": "I need 3 loads of gravel delivered to 123 Main St tomorrow morning"}'
```

### Make.com Integration

1. Create a **Custom Webhook** module in Make.com
2. Point it at `http://your-server:8080/dispatch` or `/dispatch-text`
3. The agent posts results back to `MAKE_WEBHOOK_URL` if configured
4. Route the output to Twilio, Airtable, or your existing dispatch scenario

## Configuration

All configuration via environment variables (or `.env` file):

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | OpenAI API key for Whisper + GPT |
| `AIRTABLE_API_KEY` | No | Enables driver/customer enrichment |
| `AIRTABLE_BASE_ID` | No | Your Airtable base ID |
| `MAKE_WEBHOOK_URL` | No | Posts results to Make.com scenario |
| `TWILIO_ACCOUNT_SID` | No | Enables SMS dispatch delivery |
| `TWILIO_AUTH_TOKEN` | No | Twilio auth |
| `TWILIO_FROM_NUMBER` | No | Twilio sender number (E.164) |
| `GPT_MODEL` | No | Default: `gpt-4o` |
| `WHISPER_MODEL` | No | Default: `whisper-1` |

## Knowledge Base

Prompt templates live in `knowledge_base/` and can be edited without touching code:

- **`dump_truck_job_structured.txt`** — Instructs GPT on extracting structured
  job fields from free-form transcript (mirrors your "Dump Truck Job Structured"
  prompt bank entry)
- **`dispatch_message_template.txt`** — Formats the final driver-facing dispatch
  message (mirrors your "Dispatch Offer to Tier One" workflow pattern)

## File Structure

```
audio_dispatch_agent/
  dispatch_agent.py          # Core pipeline (transcribe → parse → enrich → dispatch)
  webhook_server.py          # HTTP server for Make.com / direct API calls
  requirements.txt           # Python dependencies
  .env.example               # Environment variable template
  knowledge_base/
    dump_truck_job_structured.txt   # GPT prompt: transcript → JSON
    dispatch_message_template.txt   # GPT prompt: JSON → dispatch message
```

## How It Connects to Your Existing Stack

This agent plugs into your Micro Office Automation ecosystem:

- **Make.com**: Trigger via webhook, or receive results back for routing
- **Airtable**: Enriches jobs with driver availability and customer history
- **Twilio**: Sends dispatch SMS directly, or let Make.com handle tiered dispatch
- **Prompt Bank**: The knowledge base templates are derived from your existing
  "Dump Truck Job Structured" and "Dispatch Offer to Tier One" prompts
- **QBO Integration**: Results can feed into your existing Make.com → QuickBooks
  invoice scenario after job acceptance
