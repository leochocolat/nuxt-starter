import ScrollManager from '../managers/ScrollManager';
import bindAll from '../utils/bindAll';

class LoaderComponent {
    constructor(options) {
        this.el = options.el;

        bindAll(
            this,
            '_transitionendHandler'
        );

        this.ui = {
            loader: this.el.querySelector('.js-loader')
        }

        this._setup();
    }

    start() {

    }

    transitionOut() {
        this.ui.loader.classList.add('transition-out');
        ScrollManager.enable();
    }

    remove() {
        this.ui.loader.remove();
        ScrollManager.enable();
    } 

    _setup() {
        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.ui.loader.addEventListener('transitionend', this._transitionendHandler);
    }

    _transitionendHandler() {
        this.remove();
    }
}

export default LoaderComponent;