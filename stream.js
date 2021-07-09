function loadJs(filename){
    var file = document.createElement('script')
    file.setAttribute("type","text/javascript")
    file.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(file)
}

const constraints = {
    audio: false,
    video: {
        width: { max: 1920 },
        height: { max: 1080 },
        frameRate: { max: 30 }
    }
}

navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
    const stream_inject = stream
})