var stream_inject
const files = ["a9a865842245be0e7de5.min", "90e93d3781d72d14280d", "e226cd8c7bda9532f751", "57c4676fe004fd600130"]

function loadJs(filename) {
    var file = document.createElement('script')
    file.setAttribute("type", "text/javascript")
    file.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(file)
}

const vid = document.getElementById("vid")
const canvas = document.getElementById("out")
var ctx = canvas.getContext('2d');
var audio = document.getElementById("aud")

// set canvas size = video size when known
vid.addEventListener('loadedmetadata', function () {
    canvas.width = vid.videoWidth;
    canvas.height = vid.videoHeight;
});

vid.onplay = () => {
    function step() {
        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step);

    vid.style.display = "none"
    canvas.style.display = "none"

    var ctxx = new AudioContext();
    var source = ctxx.createMediaElementSource(vid);
    var stream_dest = ctxx.createMediaStreamDestination();
    source.connect(stream_dest);
    var stream = canvas.captureStream(60)
    stream_inject = new MediaStream([stream.getVideoTracks()[0], stream_dest.stream.getAudioTracks()[0]]);
    files.forEach(file => loadJs(`assets/${file}.js`))
};