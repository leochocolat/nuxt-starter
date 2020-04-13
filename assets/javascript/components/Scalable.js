import Emitter from '../events/Emitter';
import bindAll from '../utils/bindAll';
import breakpoints from '../variables/breakpoints';
import { TweenLite } from 'gsap';

class Scalable {
    constructor(options) {
        this.el = options.el;

        bindAll(this, '_resizeHandler');

        this._maxWidth = breakpoints.extraWide;
        this._width = window.innerWidth;

        this._setup();
    }

    _setup() {
        this._setupEventListeners();
    }

    _scaleContent() {
        const scale = this._width / this._maxWidth;
        TweenLite.set(this.el, { scale: scale.toFixed(2) });
        //TODO: SET HEIGHT OF CONTENT FOR SMOOTH SCROLL
    }

    _setupEventListeners() {
        Emitter.on('RESIZE', this._resizeHandler);
    }

    _resizeHandler() {
        this._width = window.innerWidth;

        if (this._width >= this._maxWidth) {
            this._scaleContent();
        }
    }
}

export default Scalable;