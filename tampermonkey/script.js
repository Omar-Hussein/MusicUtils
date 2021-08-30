// ==UserScript==
// @name         Download from Spotify
// @namespace    https://open.spotify.com/album/*
// @version      0.1
// @description  Download any album from spotify
// @author       Omar Hussein
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?domain=open.spotify.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const BUTTON_CLASS = "download-button";
  const HIDE_CLASS = "hide";
  const validLinkRegExp = /https:\/\/open.spotify.com\/(album|playlist|artist)\/*/;

  let lastUrl = location.href;

  function renderStyle() {
    const buttonStyle = `
      .${BUTTON_CLASS} {
        position: fixed;
        top: 75px;
        right: 30px;
        z-index: 100000;
        width: 55px;
        height: 55px;
        background: #1db954;
        border-radius: 100%;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 33ms cubic-bezier(.3,0,0,1);
      }
      .${BUTTON_CLASS}:hover {
        transform: scale(1.06);
      }
      .${BUTTON_CLASS}.${HIDE_CLASS} {
        opacity: 0
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = buttonStyle;
    document.head.appendChild(styleElement);
  }

  function renderButton() {
    const main = document.querySelector("main");
    const button = document.createElement("button");
    const downloadIcon = `
      <svg viewBox="0 0 14 19" style=" position: absolute; inset: 0; margin: auto; width: 18px;">
        <path fill="white" d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z"/>
      </svg>
    `;
    button.innerHTML = downloadIcon;
    button.setAttribute("class", BUTTON_CLASS);
    button.onclick = download;
    renderStyle();

    main.appendChild(button);
    handleButtonVisibility();
  }

  async function download() {
    try {
      notify("Started downloading", "info");
      const link = location.href;
      const response = await fetch(
        `http://localhost:5001/download?link=${link}`
      );
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(await response.text());
        }
        throw new Error("Something went wrong, try again later.");
      }
      notify(await response.text(), "success");
    } catch (e) {
      notify(e.message, "error");
    }
  }

  function notify(message, type = "info") {
    console.log(message);
  }

  function listenToLocationChange() {
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        onLocationChange();
      }
    }).observe(document, { subtree: true, childList: true });
  }

  function onLocationChange() {
    handleButtonVisibility();
  }

  function handleButtonVisibility() {
    const link = location.href;
    if (link.match(validLinkRegExp)) {
      showButton();
    } else {
      hideButton();
    }
  }

  function getButton() {
    return document.querySelector(`.${BUTTON_CLASS}`);
  }

  function showButton() {
    const button = getButton();
    button.classList.remove(HIDE_CLASS);
  }

  function hideButton() {
    const button = getButton();
    button.classList.add(HIDE_CLASS);
  }

  listenToLocationChange();
  setTimeout(renderButton, 2000);
})();
