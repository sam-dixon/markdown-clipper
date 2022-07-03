import { Readability } from '@mozilla/readability';

function savePage() {
  const clone = document.cloneNode(true);
  const reader = new Readability(clone as Document);
  const article = reader.parse();
  console.log(article);
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.type);
  if (message.type === 'save-page') {
    savePage();
    sendResponse('ok');
  }
});
