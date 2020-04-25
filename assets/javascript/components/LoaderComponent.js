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
            tinyWords: this.el.querySelectorAll('.js-tiny-word'),
            lineWrappers: this.el.querySelectorAll('.js-animated-line-wrapper'),
            animatedLines: this.el.querySelectorAll('.js-animated-line'),
            animatedRightLines: this.el.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.el.querySelectorAll('.js-animated-row'),
            //footer header
            footerArrow: this.el.querySelectorAll('.js-header-home .js-footer-arrow'),
            footerItems: this.el.querySelectorAll('.js-header-home .footer-list-item'),
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
            animatedRightLines: this.ui.loaderMask1.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.ui.loaderMask1.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask1.querySelector('.js-heading'),
            footerArrow: this.ui.loaderMask1.querySelectorAll('.js-header-home .js-footer-arrow'),
            footerItems: this.ui.loaderMask1.querySelectorAll('.js-header-home .footer-list-item'),
        };

        this.uiMask2 = {
            animatedLines: this.ui.loaderMask2.querySelectorAll('.js-animated-line'),
            animatedRightLines: this.ui.loaderMask2.querySelectorAll('.js-animated-line-right'),
            animatedRows: this.ui.loaderMask2.querySelectorAll('.js-animated-row'),
            heading: this.ui.loaderMask2.querySelector('.js-heading'),
            footerLine: this.ui.loaderMask2.querySelector('.js-footer-line'),
            footerArrow: this.ui.loaderMask2.querySelectorAll('.js-header-home .js-footer-arrow'),
            footerItems: this.ui.loaderMask2.querySelectorAll('.js-header-home .footer-list-item'),
        };
    }

    _setupTimeline() {
        this.timeline = new TimelineLite({ paused: true });

        //animate in words
        this.timeline.staggerTo(this.uiMask2.animatedLines, 1, { y: 0 }, 0.1, 0);
        this.timeline.staggerTo(this.uiMask1.animatedLines, 1, { y: 0 }, 0.1, 0);
        this.timeline.staggerTo(this.ui.animatedLines, 1, { y: 0 }, 0.1, 0);
        
        //animate out mask 2
        this.timeline.to(this.ui.loaderMask2, 1, { height: 0 }, 1);
        
        //animate rows
        this.timeline.to(this.uiMask2.animatedRows, 1, { y: 0 }, 1);
        this.timeline.to(this.uiMask1.animatedRows, 1, { y: 0 }, 1);
        this.timeline.to(this.ui.animatedRows, 1, { y: 0 }, 1);

        //animate footer
        this.timeline.staggerFromTo(this.ui.footerItems, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 1);
        this.timeline.staggerFromTo(this.uiMask1.footerItems, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 1);
        this.timeline.staggerFromTo(this.uiMask2.footerItems, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 1);

        this.timeline.staggerFromTo(this.ui.footerArrow, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 2);
        this.timeline.staggerFromTo(this.uiMask1.footerArrow, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 2);
        this.timeline.staggerFromTo(this.uiMask2.footerArrow, 1, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.05, 2);

        //animate from right
        this.timeline.to(this.ui.loader, 1, { width: 0 }, 2);        
        this.timeline.to(this.uiMask2.heading, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask1.heading, 1, { x: 0 }, 2);
        this.timeline.to(this.ui.heading, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask1.animatedRightLines, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask2.animatedRightLines, 1, { x: 0 }, 2);
        this.timeline.to(this.ui.animatedRightLines, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask2.animatedLines, 1, { x: 0 }, 2);
        this.timeline.to(this.uiMask1.animatedLines, 1, { x: 0 }, 2);
        this.timeline.to(this.ui.animatedLines, 1, { x: 0 }, 2);

        //reset overflows and display tiny words
        this.timeline.set(this.ui.animatedRows, { overflow: 'initial' }, 3);
        this.timeline.set(this.ui.lineWrappers, { overflow: 'initial' }, 3);
        this.timeline.staggerTo(this.ui.tinyWords, 1, { opacity: 1 }, 0.1, 3);
    }

    _bindAll() {
        // bindAll(
        //     this,
        //     '_transitionendHandler'
        // );
    }

    _setupEventListeners() {
        TweenLite.fromTo(this.uiMask2.footerLine, 1, { width: 0 }, { width: '100%' })
        setTimeout(() => { this.start() }, 1000);
    }
}

export default LoaderComponent;