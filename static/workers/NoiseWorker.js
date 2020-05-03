const DATA_AMOUNT = 4;
const ALPHA = 15;
const INTENSITY_MIN = 80;

let offscreenCanvas, context;
let width, height = 0;


onmessage = function(e) {
    if (e.data.name === 'start') {
        offscreenCanvas = e.data.canvas;
        width = e.data.width;
        height = e.data.height;

        context = offscreenCanvas.getContext('2d');

        start();
    } else {
        width = e.data.width;
        height = e.data.height;

        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
    }
};

function start() {
    update();
}

function createImageData() {
    const imageData = context.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = INTENSITY_MIN + Math.floor(Math.random() * (255 - INTENSITY_MIN));
        imageData.data[i + 0] = r;  // R value
        imageData.data[i + 1] = r;  // G value
        imageData.data[i + 2] = r;  // B value
        imageData.data[i + 3] = ALPHA;  // A value
    }

    return imageData;
}

function update() {
    context.clearRect(0, 0, width, height);

    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    context.putImageData(createImageData(), 0, 0);

    requestAnimationFrame(update);
}