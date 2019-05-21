const MENU_ID = 'extension.pip'

function run () {
  if (!document.pictureInPictureEnabled) return

  chrome.browserAction.onClicked.addListener(executeScript)

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: 'Picture in Picture'
    })
  })

  chrome.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === MENU_ID) {
      executeScript()
    }
  })
}

function executeScript () {
  chrome.tabs.executeScript({ file: 'script.js', allFrames: true })
}

run()
