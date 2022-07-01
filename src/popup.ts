function addButton(
  id: string,
  innerText: string,
  message: string,
  data: any = {}
) {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.innerText = innerText;
  button.onclick = () =>
    chrome.runtime.sendMessage({ type: message, data: data });
  document.body.appendChild(button);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "reload") {
    window.location.reload();
  }
});
