/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/

function addButton(id, innerText, message, data) {
    if (data === void 0) { data = {}; }
    var button = document.createElement("button");
    button.setAttribute("id", id);
    button.innerText = innerText;
    button.onclick = function () {
        return chrome.runtime.sendMessage({ type: message, data: data });
    };
    document.body.appendChild(button);
}
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === "reload") {
        window.location.reload();
    }
});

/******/ })()
;
//# sourceMappingURL=popup.js.map