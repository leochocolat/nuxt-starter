import Emitter from '../events/Emitter';
import { gsap } from 'gsap';
import bindAll from '../utils/bindAll';

const DATA_AMOUNT = 4;
const ALPHA = 16;
const INTENSITY_MIN = 120;

class NoiseCanvasComponent {
    constructor(options) {
        this.el = options.el;

        this._bindAll();
        this._setup();
    }

    close() {
        if (this._isOffscreenCanvasAvailable) {
            this._worker.terminate();
        }

        this._removeEventListeners();
    }

    _setup() {
        //check if offscreen available
        if ("OffscreenCanvas" in window) {
            this._isOffscreenCanvasAvailable = true;
            this._resize();
            this._setupOffscreenCanvas();
            this._resizeOffscreenCanvas();
            this._setupEventListeners();
        } else {
            // this._setupCanvas();
            // this._resize();
            // this._createNoiseImageData();
            // this._setupEventListeners();
        }
    }

    _setupOffscreenCanvas() {
        this._canvas = this.el;
        this._offscreenCanvas = this._canvas.transferControlToOffscreen();

        this._worker = new Worker('workers/NoiseWorker.js');

        this._worker.postMessage({
            name: 'start',
            canvas: this._offscreenCanvas, 
            width: this._width, 
            height: this._height,
        }, [this._offscreenCanvas]);
    }

    _setupCanvas() {
        this._canvas = this.el;
        this._ctx = this._canvas.getContext('2d');
    }

    
    _resize(width, height) {
        this._width = width || window.innerWidth;
        this._height = height || window.innerHeight;
        
        this.el.width = this._width;
        this.el.height = this._height;

        this.el.style.width = `${this._width} px`;
        this.el.style.height = `${this._height} px`;
    }

    _resizeOffscreenCanvas(width, height) {        
        this._width = width || window.innerWidth;
        this._height = height || window.innerHeight;

        this._worker.postMessage({
            name: 'resize',
            width: this._width, 
            height: this._height,
        }, []);
    }

    _createNoiseImageData() {
        this._noiseImageDatas = [];

        for (let i = 0; i <= DATA_AMOUNT; i++) {    
            const imageData = this._ctx.createImageData(this._width, this._height);
    
            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = INTENSITY_MIN + Math.floor(Math.random() * (255 - INTENSITY_MIN));
                imageData.data[i + 0] = r;      // R value
                imageData.data[i + 1] = r;      // G value
                imageData.data[i + 2] = r;      // B value
                imageData.data[i + 3] = ALPHA;  // A value
            }

            this._noiseImageDatas.push(imageData);
        }
    }

    _draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);

        this._ctx.save();

        this._ctx.mozImageSmoothingEnabled = false;
        this._ctx.imageSmoothingEnabled = false;

        this._drawNoiseImage();

        this._ctx.restore();
    }

    _drawNoiseImage() {
        const index = Math.floor(Math.random() * DATA_AMOUNT);
        const imageData = this._noiseImageDatas[index];

        this._ctx.putImageData(imageData, 0, 0);
    }

    _bindAll() {
        bindAll(
            this,
            '_resizeHandler',
            '_tickHandler'
        );
    }

    _setupEventListeners() {
        Emitter.on('RESIZE:END', this._resizeHandler);

        if (this._isOffscreenCanvasAvailable) return;
        // gsap.ticker.add(this._tickHandler);
    }

    _removeEventListeners() {
        Emitter.removeListener('RESIZE:END', this._resizeHandler);

        if (this._isOffscreenCanvasAvailable) return;
        // gsap.ticker.remove(this._tickHandler);
    }

    _resizeHandler(e) {
        const { viewportWidth, viewportHeight } = e;
        if (this._isOffscreenCanvasAvailable) {
            this._resizeOffscreenCanvas(viewportWidth, viewportHeight);
        } else {
            // this._resize();
            // this._createNoiseImageData();
        }
    }

    _tickHandler() {
        this._draw();
    }
}

export default NoiseCanvasComponent;