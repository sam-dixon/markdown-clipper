export {};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'request-settings') {
    chrome.storage.sync.get({ downloadLocation: '~/Downloads' }, (settings) => {
      sendResponse({ settings: settings });
    });
  } else if (message.type === 'request-tab-info') {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          sendResponse({ pageTitle: tabs[0].title });
        } else {
          sendResponse({ pageTitle: 'Title' });
        }
      }
    );
  }
  return true;
});
