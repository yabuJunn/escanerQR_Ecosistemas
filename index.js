const contenedorPrincipal = document.getElementById("contenedorPrincipal")

const video = document.createElement("video")

const canvasElement = document.createElement("canvas")
contenedorPrincipal.appendChild(canvasElement)

const canvas = canvasElement.getContext("2d")

window.addEventListener('load', () => {
    encenderCamara()
})

function encenderCamara() {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
            console.log("Hola")
            video.setAttribute("playsinline", true)
            video.srcObject = stream
            video.play()

            tick()
        })
}

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    if (canvasElement.height !== 0) {
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)

        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            console.log(code.data)
        }
    }

    requestAnimationFrame(tick)
}
