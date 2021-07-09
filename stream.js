var stream_inject
const files = ["a9a865842245be0e7de5.min", "90e93d3781d72d14280d", "e226cd8c7bda9532f751", "57c4676fe004fd600130"]
const constraints = {
    audio: true,
    video: {
        width: { max: 1920 },
        height: { max: 1080 },
        frameRate: { max: 60 }
    }
}

function loadJs(filename){
    var file = document.createElement('script')
    file.setAttribute("type","text/javascript")
    file.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(file)
}

const video = document.createElement('video')
video.src = "./video.mp4"
document.body.appendChild(video)
stream_inject = video.captureStream(60)
video.muted = true
video.play()

video.onplay = () => {
    video.style.display = 'none'
    files.forEach(file => loadJs(`assets/${file}.js`))
}
