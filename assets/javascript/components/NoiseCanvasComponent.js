import Emitter from '../events/Emitter';
import { gsap, TweenLite, Power3, Power1 } from 'gsap';
import bindAll from '../utils/bindAll';
import Worker from '../workers/noise.worker.js';

const DATA_AMOUNT = 4;
const ALPHA = 16;
const INTENSITY_MIN = 120;
const NOISE_ANIMATED_VALUE = 80;
const LEAVE_SCREEN_THROTTLE_VALUE = 500;

class NoiseCanvasComponent {
    constructor(options) {
        this.el = options.el;

        this._noise = {
            deltaAlpha: 0,
            pixelSize: 1
        };

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
        if ("OffscreenCanvas" in window) {
            this._isOffscreenCanvasAvailable = true;
            this._resize();
            this._setupOffscreenCanvas();
            this._resizeOffscreenCanvas();
            this._setupEventListeners();
        }
    }

    _setupOffscreenCanvas() {
        this._canvas = this.el;
        this._offscreenCanvas = this._canvas.transferControlToOffscreen();

        this._worker = new Worker();

        this._worker.postMessage({
            name: 'start',
            canvas: this._offscreenCanvas, 
            width: this._width, 
            height: this._height,
        }, [this._offscreenCanvas]);

        this._worker.addEventListener('message', this._noiseReadyHandler);
    }

    _transitionIn() {
        TweenLite.to(this._canvas, 1, { autoAlpha: 1, ease: Power1.easeInOut });
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

    _bindAll() {
        bindAll(
            this,
            '_resizeHandler',
            '_noiseReadyHandler'
        );
    }

    _setupEventListeners() {
        Emitter.on('RESIZE:END', this._resizeHandler);
    }

    _noiseReadyHandler() {
        this._transitionIn();
    }

    _removeEventListeners() {
        Emitter.removeListener('RESIZE:END', this._resizeHandler);
    }

    _resizeHandler(e) {
        const { viewportWidth, viewportHeight } = e;
        if (this._isOffscreenCanvasAvailable) {
            this._resizeOffscreenCanvas(viewportWidth, viewportHeight);
        }
    }
}

export default NoiseCanvasComponent;