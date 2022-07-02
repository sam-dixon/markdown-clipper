export {};

async function currentTabs() {
  return await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
}
