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
  // Serve info
  const PORT = 5001;
  // Styles info
  const BUTTON_CLASS = "download-button";
  const NOTIFICATION_CLASS = "download-notification";
  const INFO_MODIFIER = "info";
  const SUCCESS_MODIFIER = "success";
  const ERROR_MODIFIER = "error";
  const SHOW_MODIFIER = "show";

  const RENDERING_TIMEOUT = 1000;
  const NOTIFICATION_TIMEOUT = 3000;
  const NOTIFICATION_TRANSITION_TIME = 1000;

  const SPOTIFY_COLOR = "#1db954";

  // Notification timeout
  let notificationTimeout;
  let notificationRemoveTextTimeout;

  // Other
  const validLinkRegExp = /https:\/\/open.spotify.com\/(album|playlist|artist)\/*/;

  /* ============ Elements and styles ============ */
  // Style //
  function renderStyle() {
    const style = `
      .${BUTTON_CLASS} {
        position: sticky;
        top: 75px;
        left: 85%;
        z-index: 100000;
        width: 55px;
        height: 55px;
        background: ${SPOTIFY_COLOR};
        border-radius: 100%;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 33ms cubic-bezier(.3,0,0,1);
        opacity: 0;
      }
      .${BUTTON_CLASS} svg {
        position: absolute;
        inset: 0;
        margin: auto;
        width: 17px;
      }
      .${BUTTON_CLASS}:hover {
        transform: scale(1.06);
      }
      .${BUTTON_CLASS}--${SHOW_MODIFIER} {
        opacity: 1;
      }
      .${NOTIFICATION_CLASS} {
        z-index: 100000;
        position: fixed;
        right: 30px;
        bottom: -75px;
        background: #121212;
        color: white;
        padding: 10px 20px;
        border-radius: 0.5rem;
        opacity: 0;
        transition: all ${NOTIFICATION_TRANSITION_TIME}ms cubic-bezier(.3,0,0,1);
      }
      .${NOTIFICATION_CLASS}--${SHOW_MODIFIER} {
        bottom: 100px;
        opacity: 1;
      }
      .${NOTIFICATION_CLASS}--${INFO_MODIFIER} {
        background: #22a0dd;
      }
      .${NOTIFICATION_CLASS}--${ERROR_MODIFIER} {
        background: #f23f3f;
      }
      .${NOTIFICATION_CLASS}--${SUCCESS_MODIFIER} {
        background: #19c153;
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
  }

  function renderButton() {
    const main = document.querySelector("main");
    const button = document.createElement("button");
    const downloadIcon = `
      <svg viewBox="0 0 14 19">
        <path fill="white" d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z"/>
      </svg>
    `;
    button.innerHTML = downloadIcon;
    button.classList.add(BUTTON_CLASS);
    button.onclick = download;
    renderStyle();
    main.appendChild(button);
    handleButtonVisibility();
  }

  // Button visibility //
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
    button.classList.add(`${BUTTON_CLASS}--${SHOW_MODIFIER}`);
  }

  function hideButton() {
    const button = getButton();
    button.classList.remove(`${BUTTON_CLASS}--${SHOW_MODIFIER}`);
  }

  // Notification //
  function renderNotification() {
    const main = document.querySelector("main");
    const notificationElement = document.createElement("div");
    notificationElement.classList.add(NOTIFICATION_CLASS);
    main.appendChild(notificationElement);
  }

  function notify(message, type = "info") {
    removeNotification(false);
    removeNotificationTimeouts();
    const notification = getNotification();
    notification.innerText = message;
    notification.classList.add(
      `${NOTIFICATION_CLASS}--${SHOW_MODIFIER}`,
      `${NOTIFICATION_CLASS}--${getModifier(type)}`
    );

    notificationTimeout = setTimeout(removeNotification, NOTIFICATION_TIMEOUT);
  }

  function removeNotification(shouldDelay = true) {
    const notification = getNotification();
    notification.classList.remove(
      `${NOTIFICATION_CLASS}--${SHOW_MODIFIER}`,
      `${NOTIFICATION_CLASS}--${getModifier("success")}`,
      `${NOTIFICATION_CLASS}--${getModifier("info")}`,
      `${NOTIFICATION_CLASS}--${getModifier("error")}`
    );
    if (shouldDelay) {
      notificationRemoveTextTimeout = setTimeout(
        () => (notification.innerText = ""),
        NOTIFICATION_TRANSITION_TIME + 50
      );
    } else notification.innerText = "";
  }

  function removeNotificationTimeouts() {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
      notificationTimeout = 0;
    }
    if (notificationRemoveTextTimeout) {
      clearTimeout(notificationRemoveTextTimeout);
      notificationRemoveTextTimeout = 0;
    }
  }

  function getNotification() {
    return document.querySelector(`.${NOTIFICATION_CLASS}`);
  }

  function getModifier(type) {
    if (type === "info") return INFO_MODIFIER;
    if (type === "success") return SUCCESS_MODIFIER;
    if (type === "error") return ERROR_MODIFIER;
  }

  // Handle changing location
  function listenToLocationChange() {
    let lastUrl = location.href;

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

  /* ============ Downloading ============ */
  async function download() {
    try {
      await checkIfServerRunning();
      notify("Started downloading", "info");
      const link = location.href;
      const response = await fetch(
        `http://localhost:${PORT}/download?link=${link}`
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

  async function checkIfServerRunning() {
    try {
      await fetch(`http://localhost:${PORT}/is-online`);
      return true;
    } catch (_e) {
      throw new Error("You have to run the server first!");
    }
  }

  // Rendering
  function shouldRender() {
    return !!document.querySelector("main");
  }

  function render() {
    if (!shouldRender()) {
      setTimeout(render, RENDERING_TIMEOUT);
      return;
    }

    renderButton();
    renderNotification();
  }

  // Starting the app
  listenToLocationChange();
  setTimeout(render, RENDERING_TIMEOUT);
})();
