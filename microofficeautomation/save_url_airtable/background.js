chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveIdeaToAirtable",
    title: "Save Page to Airtable Ideas",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "saveIdeaToAirtable") {
    const url = tab.url;
    const title = tab.title;
    const date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const trySelectors = [
          'meta[name="description"]',
          'meta[property="og:description"]',
          'meta[name="twitter:description"]'
        ];
        for (const selector of trySelectors) {
          const tag = document.querySelector(selector);
          if (tag && tag.content) return tag.content;
        }
        const fallback = document.querySelector("p");
        return fallback ? fallback.textContent.slice(0, 280) + "…" : "No summary available.";
      }
    }, async ([result]) => {
      const summary = result?.result || "No summary found.";

      const record = {
        fields: {
          "Name": title,
          "Date": date,
          "Notes": summary,
          "Status": "Evaluate",
          "URL": url
        }
      };

      const res = await fetch("https://api.airtable.com/v0/apppKXR5rOOioswoy/Ideas", {
        method: "POST",
        headers: {
          "Authorization": "Bearer patwX4lzK4q8xg189.e03137443c09f8ade89676394872cc9f418dd743057b8e8884e8e9acbb551860",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });

      if (res.ok) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon48.png",
          title: "Saved to Airtable",
          message: "Page successfully added to Ideas table.",
          priority: 0
        }, (notificationId) => {
          setTimeout(() => chrome.notifications.clear(notificationId), 2000);
        });
      } else {
        console.error("Airtable error", await res.text());
      }
    });
  }
});
