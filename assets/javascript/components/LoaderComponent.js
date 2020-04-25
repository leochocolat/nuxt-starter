import ScrollManager from '../managers/ScrollManager';
import bindAll from '../utils/bindAll';

import { TweenLite, TimelineLite } from 'gsap';

class LoaderComponent {
    constructor(options) {
        this.el = options.el;

        this.ui = {
            //loader
            loader: this.el.querySelector('.js-loader'),
            loaderMask1: this.el.querySelector('.js-loader-mask-1'),
            loaderMask2: this.el.querySelector('.js-loader-mask-2'),
            //header home
            header: this.el.querySelector('.js-header-home'),
            heading: this.el.querySelector('.js-heading'),
            animatedLines: this.el.querySelectorAll('.js-animated-line'),
            animatedRows: this.el.querySelectorAll('.js-animated-row'),
        }

        this._bindAll();
        this._setup();
    }

    remove() {
        this.ui.loader.style.display = 'none';
        ScrollManager.enable();
    }

    start() {
        this.timeline.play();
    }

    _setup() {
        this._createClone();
        this._setupTimeline();
        this._setupEventListeners();
    }

    _createClone() {
        this._headerClone1 = this.ui.header.cloneNode(true);
        this._headerClone2 = this.ui.header.cloneNode(true);

        this.ui.loaderMask1.appendChild(this._headerClone1);
        this.ui.loaderMask2.appendChild(this._headerClone2);

        this.uiMask1 = {
            animatedLines: this.ui.loaderMask1.querySelectorAll('.js-animated-line'),
            animatedRows: this.ui.loaderMask1.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask1.querySelector('.js-heading'),
        };

        this.uiMask2 = {
            animatedLines: this.ui.loaderMask2.querySelectorAll('.js-animated-line'),
            animatedRows: this.ui.loaderMask2.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask2.querySelector('.js-heading'),
        };
    }

    _setupTimeline() {
        this.timeline = new TimelineLite({ paused: true });

        this.timeline.to(this.uiMask2.animatedLines, 1, { y: 0 }, 0);
        this.timeline.to(this.uiMask1.animatedLines, 1, { y: 0 }, 0);
        this.timeline.to(this.ui.animatedLines, 1, { y: 0 }, 0);
        
        this.timeline.to(this.ui.loaderMask2, 1, { height: 0 }, 1);

        this.timeline.to(this.uiMask2.animatedRows, 1, { y: 0 }, 1);
        this.timeline.to(this.uiMask1.animatedRows, 1, { y: 0 }, 1);
        this.timeline.to(this.ui.animatedRows, 1, { y: 0 }, 1);

        this.timeline.to(this.ui.loader, 1, { width: 0 }, 2);
        
        this.timeline.to(this.uiMask2.heading, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask1.heading, 1, { x: 0 }, 2);
        this.timeline.to(this.ui.heading, 1, { x: 0 }, 2);
    }

    _bindAll() {
        // bindAll(
        //     this,
        //     '_transitionendHandler'
        // );
    }

    _setupEventListeners() {
        setTimeout(() => { this.start() }, 1000);
    }
}

export default LoaderComponent;