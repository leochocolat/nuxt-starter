import EventDispatcher from '../events/EventDispatcher';

import bindAll from '../utils/bindAll';

const THROTTLE_VALUE = 300;
const MIN_HEIGHT_RESIZE = 100;

class ResizeManager extends EventDispatcher {
    constructor() {
        super();

        bindAll(
            this,
            '_resizeHandler'
        );

        this._setup();
    }   

    _setup() {
        this._getViewportSize();
        this._getDocumentSize();
        this._resizeCssViewportVariable();
        this._setupEventListeners();
    }

    _getViewportSize() {
        const newHeight = Math.min(window.innerHeight || 0);
        const delta = Math.abs(newHeight - this._viewportHeight);
        
        this._viewportWidth = Math.min(window.innerWidth || 0);
        this._viewportHeight = Math.min(window.innerHeight || 0);

        if (delta > MIN_HEIGHT_RESIZE) { this._resizeCssViewportVariable() };
    }

    _getDocumentSize() {
        const body = document.body;
        const html = document.documentElement;

        this._documentWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
        this._documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }

    _resizeCssViewportVariable() {
        document.documentElement.style.setProperty('--vh', `${this._viewportHeight * 0.01}px`);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
    }

    _resizeHandler() {
        this._getViewportSize();
        this._getDocumentSize();

        this.dispatchEvent('resize', {
            viewportWidth: this._viewportWidth,
            viewportHeight: this._viewportHeight,
            documentWidth: this._documentWidth,
            documentHeight: this._documentHeight
        });

        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            this._resizeEndHandler();
        }, THROTTLE_VALUE)
    }

    _resizeEndHandler() {
        this._getViewportSize();
        this._getDocumentSize();

        this.dispatchEvent('resize:end', {
            viewportWidth: this._viewportWidth,
            viewportHeight: this._viewportHeight,
            documentWidth: this._documentWidth,
            documentHeight: this._documentHeight
        });
    }
}

export default new ResizeManager();