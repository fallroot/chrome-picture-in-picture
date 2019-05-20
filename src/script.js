(async () => {
  const video = document.querySelector('video')

  if (!video) return

  if (video.dataset.pipRequested === 'true') {
    await document.exitPictureInPicture()
  } else {
    video.addEventListener('enterpictureinpicture', event => {
      video.dataset.pipRequested = 'true'
    }, { once: true })

    video.addEventListener('leavepictureinpicture', event => {
      video.dataset.pipRequested = 'false'
    }, { once: true })

    await video.requestPictureInPicture()
  }
})()
