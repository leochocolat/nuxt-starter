const DATA_AMOUNT = 4;
const ALPHA = 15;
// const INTENSITY_MIN = 80;
const INTENSITY_MIN = 0;

let offscreenCanvas, context;
let width, height = 0;
let deltaAlpha = 0;
let pixelSize = 1;

onmessage = function(e) {
    if (e.data.name === 'start') {
        offscreenCanvas = e.data.canvas;
        width = e.data.width;
        height = e.data.height;

        context = offscreenCanvas.getContext('2d');

        start();
    } else if (e.data.name === 'resize') {
        width = e.data.width;
        height = e.data.height;

        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
    } else if (e.data.name === 'noise') {
        deltaAlpha = e.data.deltaAlpha;
    }
};

function start() {
    update();
}

function createImageData() {
    const imageData = context.createImageData(width/pixelSize, height/pixelSize);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = INTENSITY_MIN + Math.floor(Math.random() * (255 - INTENSITY_MIN));
        imageData.data[i + 0] = r;
        imageData.data[i + 1] = r;
        imageData.data[i + 2] = r;
        imageData.data[i + 3] = ALPHA + deltaAlpha;
        // imageData.data[i + 3] = 255;

        // const x = Math.floor((i/4) % imageData.width) * pixelSize;
        // const y = Math.floor((i/4) / imageData.width) * pixelSize;
    }


    return imageData;
}

function update() {
    context.clearRect(0, 0, width, height);

    context.msImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    context.putImageData(createImageData(), 0, 0);

    requestAnimationFrame(update);
}