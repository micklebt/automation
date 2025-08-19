import sys, requests, datetime, json

WEBHOOK_URL = "https://hook.us1.make.com/hysi54hlaqltg8vad37yi2pulm7hnwhh"

def deposit(text):
    ts = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    payload = {
        "fileName": f"note-{ts}.md",
        "fileContent": text,
        "mimeType": "text/markdown"
    }
    r = requests.post(WEBHOOK_URL, json=payload)
    print("Status:", r.status_code, r.text)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
    else:
        text = sys.stdin.read()
    deposit(text)
