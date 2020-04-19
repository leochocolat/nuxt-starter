import DeviceUtils from '../utils/DeviceUtils';
import bindAll from '../utils/bindAll';
import Emitter from '../events/Emitter';
import ScrollManager from '../managers/ScrollManager';
import { TweenLite } from 'gsap';

class FooterHoverComponent {
    constructor(options) {
        this.el = options.el;

        bindAll(
            this,
            '_resizeHandler',
            '_scrollHandler'  
        );

        this.ui = {
            items: this.el.querySelectorAll('.js-footer-item'),
            arrows: this.el.querySelectorAll('.js-footer-arrow'),
        }

        this._setup();
    }

    //public
    destroy() {
        this._removeEventListeners();
    }   

    _setup() {
        if (DeviceUtils.isTouch()) return;
        if (!this.ui.arrows.length === 0) return;
        
        this._scrollPosition = ScrollManager.getPosition();

        this._setupItemPositions();
        this._setupEventListeners();
    }

    _setupItemPositions() {
        this._positions = [];
        for (let i = 0; i < this.ui.items.length; i++) {
            const element = this.ui.items[i];
            const { top, bottom, height } = element.getBoundingClientRect();
            this._positions.push({ top: top, bottom: bottom, height: height });
        }
    }

    _setupEventListeners() {
        for (let i = 0; i < this.ui.items.length; i++) {
            this.ui.items[i].addEventListener('mousemove', (e) => this._mousemoveHandler(e, i)); 
            this.ui.items[i].addEventListener('mouseenter', () => this._mouseenterHandler(i)); 
            this.ui.items[i].addEventListener('mouseleave', () => this._mouseleaveHandler(i)); 
        }

        Emitter.on('RESIZE:END', this._resizeHandler, { passive: true });
        ScrollManager.addEventListener('scroll', this._scrollHandler);
        ScrollManager.addEventListener('scroll:end', this._scrollEndHandler);
    }

    _removeEventListeners() {
        Emitter.remove('RESIZE:END', this._resizeHandler);
        ScrollManager.removeEventListener('scroll', this._scrollHandler);
        ScrollManager.removeEventListener('scroll:end', this._scrollEndHandler);
    }

    _mousemoveHandler(e, index) {
        const arrow = this.ui.items[index].querySelector('.js-footer-arrow');
        if (!arrow) return;

        const relativePositionY = e.clientY - (this._positions[index].top - this._scrollPosition.y);

        if (relativePositionY > this._positions[index].height/2) {
            TweenLite.to(arrow, 0.3, { y: this._positions[index].height/2 });
        } else {
            TweenLite.to(arrow, 0.3, { y: 0 });
        }
    }

    _mouseenterHandler(index) {

    }

    _mouseleaveHandler(index) {
        const arrow = this.ui.items[index].querySelector('.js-footer-arrow');
        if (!arrow) return;

        // TweenLite.to(arrow, 0.5, { y: 0 });
    }

    _resizeHandler() {
        this._setupItemPositions();
    }

    _scrollHandler() {
        this._scrollPosition.y = ScrollManager.getPosition().y;
    }

    _scrollEndHandler() {
        
    }
}

export default FooterHoverComponent;