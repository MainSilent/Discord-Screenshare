var stream_inject
const js_files = ["a9a865842245be0e7de5.min", "90e93d3781d72d14280d", "e226cd8c7bda9532f751", "57c4676fe004fd600130"]

function loadJs(filename) {
    var file = document.createElement('script')
    file.setAttribute("type", "text/javascript")
    file.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(file)
}

let video_error = ""
const video = document.createElement('video')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

video.onloadedmetadata = () => {
    // Dimension
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Audio
    const audio = new AudioContext()
    const source = audio.createMediaElementSource(video)
    const stream_dest = audio.createMediaStreamDestination()
    source.connect(stream_dest);
    
    // Stream
    const video_stream = canvas.captureStream(60)
    const audio_stream = stream_dest.stream
    stream_inject = new MediaStream([
        video_stream.getVideoTracks()[0],
        audio_stream.getAudioTracks()[0]
    ])

    // Load js files
    js_files.forEach(file => loadJs(`assets/${file}.js`))
}

video.onplay = () => {
    // Draw video on canvas
    function step() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step);
}

video.onerror = event => {
    video_error = event.target.error.message
}