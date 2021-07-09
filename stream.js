var stream_inject
const files = ["90e93d3781d72d14280d", "e226cd8c7bda9532f751", "57c4676fe004fd600130", "a9a865842245be0e7de5"]
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

navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
    stream_inject = stream
    files.forEach(file => loadJs(`assets/${file}.js`))
})