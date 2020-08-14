import ThreeNoise from '../modules/ThreeNoise';

let canvas, width, height;
let threeScene;

const handlers = {
    'start': setup,
    'resize': resizeHandler,
    'close': close,
};

if (typeof self === 'object') {
    onmessage = function(e) {
        const name = e.data.name;
        const fn = handlers[name];
        
        if (!fn) {
            throw new Error('no handler for type: ' + e.data.type);
        } else {
            fn(e.data);
        }
    };
}

function setup(e) {
    setupCanvas(e);
    setupThreeScene(e);
    tick();
}

function setupCanvas(e) {
    width = e.width;
    height = e.height;

    canvas = e.canvas;
    canvas.width = width;
    canvas.height = height;
}

function setupThreeScene() {
    threeScene = new ThreeNoise(canvas, width, height);
}

function tick() {
    threeScene.update();

    requestAnimationFrame(tick);
}

function close() {
    cancelAnimationFrame(tick);
    threeScene.close();
}

function resizeHandler(e) {
    width = e.width;
    height = e.height;

    canvas.width = width;
    canvas.height = height;
    
    threeScene.resize(width, height);
}