import bindAll from '../utils/bindAll';
import ScrollManager from '../managers/ScrollManager';

import ThreeScene from '../modules/ThreeScene';

import { TweenLite } from 'gsap';

class ThreeCanvasComponent {
    constructor(options) {
        bindAll(
            this,
            '_tickHandler',
            '_resizeHandler',
            '_scrollHandler'
        );

        this.el = options.el;

        this.sceneEntities = {
            
        }

        this._setup();
    }

    _setup() {
        this._setupDeltaTime();
        this._resize();
        this._setupThreeScene();
        this._setupEventListeners();
    }

    _setupThreeScene() {
        this._threeScene = new ThreeScene({
            canvas: this.el,
            width: this._width,
            height: this._height,
        });
    }

    _setupDeltaTime() {
        this._time = 0;
        this._startTime = Date.now();
        this._dateNow = this._startTime;
        this._lastTime = this._dateNow;
        this._deltaTime = 16;
        this._fps = Math.round(1000 / this._deltaTime);
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        if (!this._threeScene) return;
        this._threeScene.resize(this._width, this._height);
    }

    _updateDeltaTime() {
        this._dateNow = Date.now();
        this._time = this._dateNow - this._startTime;
        this._deltaTime = this._dateNow - this._lastTime;
        this._lastTime = this._dateNow;
        this._fps = Math.round(1000 / this._deltaTime);
    }

    _tick() {
        this._updateDeltaTime();

        if (!this._threeScene) return;
        this._threeScene.update(this._time, this._deltaTime, this._fps);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
        TweenLite.ticker.addEventListener('tick', this._tickHandler);
        ScrollManager.addEventListener('scroll', this._scrollHandler);
    }

    _tickHandler() {
        this._tick();
    }

    _resizeHandler() {
        this._resize();
    }

    _scrollHandler(e) {
        
    }
}

export default ThreeCanvasComponent;