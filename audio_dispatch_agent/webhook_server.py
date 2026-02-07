"""
Lightweight webhook server for the Audio Dispatch Agent.

Accepts audio file uploads via POST and runs the dispatch pipeline.
Designed to sit behind a Make.com webhook or be called directly.

Usage:
  python webhook_server.py              # starts on port 8080
  python webhook_server.py --port 9000  # custom port

Endpoints:
  POST /dispatch  — multipart form with 'audio' file field
  POST /dispatch-text — JSON body with 'transcript' field (skip Whisper)
  GET  /health    — returns {"status": "ok"}
"""

import argparse
import json
import os
import tempfile
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs

from dispatch_agent import (
    transcribe_audio,
    parse_job_from_transcript,
    enrich_with_knowledge_base,
    generate_dispatch_message,
    post_to_make,
)


class DispatchHandler(BaseHTTPRequestHandler):
    """HTTP handler for dispatch webhook requests."""

    def do_GET(self):
        if self.path == "/health":
            self._json_response(200, {"status": "ok"})
        else:
            self._json_response(404, {"error": "not found"})

    def do_POST(self):
        try:
            if self.path == "/dispatch":
                self._handle_audio_dispatch()
            elif self.path == "/dispatch-text":
                self._handle_text_dispatch()
            else:
                self._json_response(404, {"error": "not found"})
        except Exception as e:
            print(f"[error] {e}")
            self._json_response(500, {"error": str(e)})

    def _handle_audio_dispatch(self):
        """Handle multipart audio upload → full pipeline."""
        content_type = self.headers.get("Content-Type", "")
        if "multipart/form-data" not in content_type:
            self._json_response(400, {
                "error": "Expected multipart/form-data with 'audio' file"
            })
            return

        # Parse the multipart boundary
        boundary = content_type.split("boundary=")[-1].encode()
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        # Extract the audio file from multipart data
        audio_data = self._extract_file_from_multipart(body, boundary)
        if not audio_data:
            self._json_response(400, {"error": "No audio file found in request"})
            return

        # Write to temp file and process
        suffix = ".wav"
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
            tmp.write(audio_data)
            tmp_path = tmp.name

        try:
            transcript = transcribe_audio(tmp_path)
            result = self._process_transcript(transcript)
            self._json_response(200, result)
        finally:
            os.unlink(tmp_path)

    def _handle_text_dispatch(self):
        """Handle pre-transcribed text → pipeline (skips Whisper)."""
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        data = json.loads(body)
        transcript = data.get("transcript", "")

        if not transcript:
            self._json_response(400, {"error": "Missing 'transcript' field"})
            return

        result = self._process_transcript(transcript)
        self._json_response(200, result)

    def _process_transcript(self, transcript: str) -> dict:
        """Shared logic: transcript → job → enrich → dispatch message."""
        job = parse_job_from_transcript(transcript)
        job = enrich_with_knowledge_base(job)
        dispatch_message = generate_dispatch_message(job)

        payload = {
            "transcript": transcript,
            "job": job,
            "dispatch_message": dispatch_message,
        }

        # Fire-and-forget to Make.com if configured
        post_to_make(payload)

        return payload

    def _extract_file_from_multipart(self, body: bytes, boundary: bytes) -> bytes | None:
        """Minimal multipart parser to extract the first file."""
        parts = body.split(b"--" + boundary)
        for part in parts:
            if b"filename=" in part:
                # Split headers from body at double newline
                header_end = part.find(b"\r\n\r\n")
                if header_end == -1:
                    continue
                file_data = part[header_end + 4:]
                # Strip trailing boundary markers
                if file_data.endswith(b"\r\n"):
                    file_data = file_data[:-2]
                return file_data
        return None

    def _json_response(self, status: int, data: dict):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode())

    def log_message(self, format, *args):
        """Override to add timestamp prefix."""
        print(f"[webhook] {args[0]}")


def main():
    parser = argparse.ArgumentParser(description="Audio Dispatch Webhook Server")
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()

    server = HTTPServer(("0.0.0.0", args.port), DispatchHandler)
    print(f"[webhook] Dispatch server listening on port {args.port}")
    print(f"[webhook] POST /dispatch       — upload audio file")
    print(f"[webhook] POST /dispatch-text   — send pre-transcribed text")
    print(f"[webhook] GET  /health          — health check")
    server.serve_forever()


if __name__ == "__main__":
    main()
