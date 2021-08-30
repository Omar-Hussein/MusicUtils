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
  function renderStyle() {
    const buttonStyle = `
      .download-button {
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
        transition: transform 33ms cubic-bezier(.3,0,0,1);
      }
      .download-button:hover {
        transform: scale(1.06);
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
      <svg viewBox="0 0 14 19" style=" position: absolute; inset: 0; margin: auto; width: 25px;">
        <path fill="white" d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z"/>
      </svg>
    `;
    button.innerHTML = downloadIcon;
    button.setAttribute("class", "download-button");
    button.onclick = download;
    renderStyle();
    main.appendChild(button);
  }

  function download() {
    const link = window.location.href;
    fetch(`http://localhost:5001/download?link=${link}`);
  }

  setTimeout(renderButton, 2000);
})();
