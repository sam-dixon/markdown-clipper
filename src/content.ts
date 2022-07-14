import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

const turndownService = new TurndownService();
turndownService.remove(['img', 'figure', 'picture']);

function convertPage() {
  const article = new Readability(document.cloneNode(true) as Document).parse();
  return [article?.title, turndownService.turndown(article?.content!)];
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'convert-page') {
    const [title, markdown] = convertPage();
    sendResponse({ title: title, data: markdown });
  }
});
