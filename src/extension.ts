function reloadPopup() {
  chrome.runtime.sendMessage({ type: "reload" });
}

async function currentTabs() {
  return await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
}
