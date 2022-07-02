export {};
async function currentTabs() {
  return await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'request-settings') {
    chrome.storage.sync.get({ downloadLocation: '~/Downloads' }, (settings) => {
      sendResponse({ settings: settings });
    });
  }
  return true;
});
