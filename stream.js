var stream_inject
const files = ["a9a865842245be0e7de5.min", "90e93d3781d72d14280d", "e226cd8c7bda9532f751", "57c4676fe004fd600130"]

function loadJs(filename) {
    var file = document.createElement('script')
    file.setAttribute("type", "text/javascript")
    file.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(file)
}

const video = document.createElement('video')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

video.src = "./video.mp4"
video.play()

video.onloadedmetadata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
}