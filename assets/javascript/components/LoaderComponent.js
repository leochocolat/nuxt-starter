import ScrollManager from '../managers/ScrollManager';
import bindAll from '../utils/bindAll';

import { TweenLite, TimelineLite, Power3, Power2, Power4 } from 'gsap';

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
            tinyWords: this.el.querySelectorAll('.js-tiny-word'),
            lineWrappers: this.el.querySelectorAll('.js-animated-line-wrapper'),
            animatedLines: this.el.querySelectorAll('.js-animated-line'),
            animatedRightLines: this.el.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.el.querySelectorAll('.js-animated-row'),
            //footer header
            footerArrow: this.el.querySelectorAll('.js-header-home .js-footer-button-arrow'),
            footerItems: this.el.querySelectorAll('.js-header-home .footer-list-item'),
        }

        this._bindAll();
        this._setup();
    }

    init() {
        this._setupTimeline();
    }

    remove() {
        TweenLite.set(this.ui.animatedLines, { y: 0, x: 0 });
        TweenLite.set(this.ui.animatedRows, { y: 0, overflow: 'initial' });
        TweenLite.set(this.ui.footerItems, { y: 0, autoAlpha: 1 });
        TweenLite.set(this.ui.loader, { width: 0, display: 'none' });
        TweenLite.set(this.ui.heading, { x: 0 });
        TweenLite.set(this.ui.animatedRightLines, { x: 0 });
        TweenLite.set(this.ui.footerArrow, { y: 0, autoAlpha: 1 });
        TweenLite.set(this.ui.lineWrappers, { overflow: 'initial' });
        TweenLite.set(this.ui.tinyWords, { opacity: 1 });

        ScrollManager.enable();
    }

    start() {
        setTimeout(() => {
            TweenLite.fromTo(this.uiMask2.footerLine, 2, { width: 0 }, { width: '100%', ease: Power3.easeOut });
            TweenLite.staggerTo(this.uiMask2.animatedLines, 1.2, { y: 0, ease: Power4.easeOut }, 0.1);
            TweenLite.staggerTo(this.uiMask1.animatedLines, 1.2, { y: 0, ease: Power4.easeOut }, 0.1);
            TweenLite.staggerTo(this.ui.animatedLines, 1.2, { y: 0, ease: Power4.easeOut }, 0.1);
            setTimeout(() => { this.timeline.play() }, 2000);
            setTimeout(() => { ScrollManager.enable(); }, 4500);
        }, 100);
    }

    _setup() {
        this._createClone();
        this._setupEventListeners();
    }

    _createClone() {
        this._headerClone1 = this.ui.header.cloneNode(true);
        this._headerClone2 = this.ui.header.cloneNode(true);

        this.ui.loaderMask1.appendChild(this._headerClone1);
        this.ui.loaderMask2.appendChild(this._headerClone2);

        this.uiMask1 = {
            animatedLines: this.ui.loaderMask1.querySelectorAll('.js-animated-line'),
            animatedRightLines: this.ui.loaderMask1.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.ui.loaderMask1.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask1.querySelector('.js-heading'),
            footerArrow: this.ui.loaderMask1.querySelectorAll('.js-header-home .js-footer-button-arrow'),
            footerItems: this.ui.loaderMask1.querySelectorAll('.js-header-home .footer-list-item'),
        };

        this.uiMask2 = {
            animatedLines: this.ui.loaderMask2.querySelectorAll('.js-animated-line'),
            animatedRightLines: this.ui.loaderMask2.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.ui.loaderMask2.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask2.querySelector('.js-heading'),
            footerLine: this.ui.loaderMask2.querySelector('.js-footer-line'),
            footerArrow: this.ui.loaderMask2.querySelectorAll('.js-header-home .js-footer-button-arrow'),
            footerItems: this.ui.loaderMask2.querySelectorAll('.js-header-home .footer-list-item'),
        };
    }

    _setupTimeline() {
        this.timeline = new TimelineLite({ paused: true, onComplete: this._onCompleteHandler });
        
        //animate out mask 2
        this.timeline.to(this.ui.loaderMask2, 1.5, { height: 0, ease: Power4.easeInOut }, 0);
        
        //animate rows
        this.timeline.to(this.uiMask2.animatedRows, 1.5, { y: 0, ease: Power4.easeInOut }, 0.1);
        this.timeline.to(this.uiMask1.animatedRows, 1.5, { y: 0, ease: Power4.easeInOut }, 0.1);
        this.timeline.to(this.ui.animatedRows, 1.5, { y: 0, ease: Power4.easeInOut }, 0.1);

        //animate footer
        this.timeline.fromTo(this.ui.footerItems, 1.5, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.5);
        this.timeline.fromTo(this.uiMask1.footerItems, 1.5, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.5);
        this.timeline.fromTo(this.uiMask2.footerItems, 1.5, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.5);

        //animate from right
        this.timeline.to(this.ui.loader, 2, { width: 0, ease: Power4.easeInOut }, 1.1);

        this.timeline.to(this.uiMask2.heading, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.uiMask1.heading, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.ui.heading, 2, { x: 0, ease: Power4.easeInOut }, 1.3);

        this.timeline.to(this.uiMask1.animatedRightLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.uiMask2.animatedRightLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.ui.animatedRightLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        
        this.timeline.to(this.uiMask2.animatedLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.uiMask1.animatedLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);
        this.timeline.to(this.ui.animatedLines, 2, { x: 0, ease: Power4.easeInOut }, 1.3);

        //animate arrows footer
        this.timeline.staggerFromTo(this.ui.footerArrow, 2, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.2, 2.5);
        this.timeline.staggerFromTo(this.uiMask1.footerArrow, 2, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.2, 2.5);
        this.timeline.staggerFromTo(this.uiMask2.footerArrow, 2, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power4.easeOut }, 0.2, 2.5);

        //reset overflows and display tiny words
        this.timeline.set(this.ui.animatedRows, { overflow: 'initial' }, 3.8);
        this.timeline.set(this.ui.lineWrappers, { overflow: 'initial' }, 3.8);
        this.timeline.staggerTo(this.ui.tinyWords, 1, { opacity: 1 }, 0.1, 3.8);
    }

    _bindAll() {
        bindAll(
            this,
            '_onCompleteHandler'
        );
    }

    _setupEventListeners() {

    }

    _onCompleteHandler() {
        ScrollManager.enable();
    }
}

export default LoaderComponent;