function first (items) {
  if (!isEmpty(items)) {
    return items[0]
  }
}

function ifEmpty (a, b) {
  return isEmpty(a) ? b : a
}

function isEmpty (items) {
  return !items || !items.length
}

function isPipRequested (element) {
  return element.dataset.pipRequested === 'true'
}

function isPlaying (el) {
  return el.currentTime > 0 && !el.ended && !el.paused && el.readyState > 2
}

function setPipRequested (element, value) {
  element.dataset.pipRequested = value
}

function sortByDimensions (elements) {
  return elements.sort((a, b) => {
    const rectA = first(a.getClientRects())
    const rectB = first(b.getClientRects())

    return (rectB.width * rectB.height) - (rectA.width * rectA.height)
  })
}

async function run () {
  const videos = sortByDimensions(Array.from(document.querySelectorAll('video')))
  const video = first(ifEmpty(videos.filter(isPlaying), videos))

  if (!video) return

  if (isPipRequested(video)) {
    await document.exitPictureInPicture()
  } else {
    video.addEventListener('enterpictureinpicture', () => setPipRequested(video, true), { once: true })
    video.addEventListener('leavepictureinpicture', () => setPipRequested(video, false), { once: true })
    await video.requestPictureInPicture()
  }
}

run()
