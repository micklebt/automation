// 1) Register right-click context-save
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-selection-to-drive",
    title: "Save selected text to Drive",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-selection-to-drive") {
    const selected = info.selectionText;
    const fileName = prompt("Filename to save (leave blank for timestamp):") || "";
    const ts = new Date().toISOString().replace(/[:T]/g, "-").slice(0,16);
    const safeName = fileName.trim() !== "" ? fileName.trim() : `chatgpt_${ts}`;
    sendToWebhook(safeName, selected);
  }
});

// Helper for POST to webhook
function sendToWebhook(name, content) {
  fetch("https://hook.us1.make.com/hysi54hlaqltg8vad37yi2pulm7hnwhh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: name, fileContent: content })
  }).then(() => alert("Sent to Drive."));
}

// 2) Insert button on each assistant message
function createButton(block) {
  const btn = document.createElement("button");
  btn.innerText = "Save full answer to Drive";
  btn.setAttribute("save-to-drive","true");
  btn.style.backgroundColor="#2D8CFF";
  btn.style.color="white";
  btn.style.border="none";
  btn.style.borderRadius="6px";
  btn.style.padding="6px 12px";
  btn.style.marginTop="8px";
  btn.style.cursor="pointer";

  btn.onclick = () => {
    const text = block.innerText;
    const fileName = prompt("Filename to save (leave blank for timestamp):") || "";
    const ts = new Date().toISOString().replace(/[:T]/g, "-").slice(0,16);
    const safeName = fileName.trim() !== "" ? fileName.trim() : `chatgpt_${ts}`;
    sendToWebhook(safeName, text);
  };

  block.appendChild(btn);
}

// 3) Observe ChatGPT DOM for new assistant answers
const obs = new MutationObserver(() => {
  document.querySelectorAll("div[data-message-author-role='assistant'], p[data-start]").forEach(div=>{
    if(!div.querySelector("button[save-to-drive]")){
      createButton(div);
    }
  });
});
obs.observe(document.body,{childList:true,subtree:true});
