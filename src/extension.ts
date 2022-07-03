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
          const [tab] = tabs;
          sendResponse({ pageTitle: tab.title, url: tab.url });
        } else {
          sendResponse({ pageTitle: 'Title', url: '' });
        }
      }
    );
  } else if (message.type === 'request-save-page') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const [tab] = tabs;
      chrome.tabs.sendMessage(tab.id!, { type: 'save-page' });
    });
  }
  return true;
});
