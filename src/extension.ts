export {};

function cleanTitle(text: string) {
  return text.normalize('NFD').trim().replaceAll('/', ' ');
}

const defaultSettings = { downloadLocation: '', saveAs: false };

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'request-settings') {
    chrome.storage.sync.get(defaultSettings, (settings) => {
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
          sendResponse({ pageTitle: cleanTitle(tab.title ? tab.title : 'Title'), url: tab.url });
        } else {
          sendResponse({ pageTitle: 'Title', url: '' });
        }
      }
    );
  } else if (message.type === 'request-save-page') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const [tab] = tabs;
      chrome.tabs.sendMessage(tab.id!, { type: 'convert-page' }, (convertResponse) => {
        chrome.storage.sync.get(defaultSettings, (settings) => {
          const response = {
            data: convertResponse.data,
            path:
              settings.downloadLocation +
              '/' +
              cleanTitle(message.pageTitle ? message.pageTitle : convertResponse.title) +
              '.md',
            saveAs: settings.saveAs,
          };
          sendResponse(response);
        });
      });
    });
  }
  return true;
});
