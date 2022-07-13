import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

const turndownService = new TurndownService();
// mdConverter.remove(['img', 'figure', 'picture']);

function savePage() {
  const article = new Readability(document.cloneNode(true) as Document).parse();
  const markdown = turndownService.turndown(article?.content!);
  console.log('[Clipper HTML]', article?.content);
  console.log('[Clipper MD]', markdown);
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.type);
  if (message.type === 'save-page') {
    savePage();
    sendResponse('ok');
  }
});
