import ScrollManager from '../managers/ScrollManager';
import { TweenMax, Power3, TweenLite } from 'gsap';
import bindAll from '../utils/bindAll';
import mod from '../utils/mod';
import lerp from '../utils/lerp';
import Emitter from '../events/Emitter';

const INTERVAL = 20;
const SOON_INTERVAL = 5;

class ComingSoonComponent {
    constructor(options) {
        this.el = options.el; 

        this.ui = {
            soons: this.el.querySelectorAll('.js-soon')
        }

        bindAll(
            this,
            '_scrollHandler',
            '_resizeHandler',
            '_tickHandler'
        );

        this._soonStep = 1;
        this._scrollStep = 1;

        this._scrollPosition = 0;

        this._setup();
    }

    start() {
        const amount = this._splitSoons.length;
        const staggerInterval = 80;

        let i = 0;
        let stagger = setInterval(() => {
            this._splitSoons[i].classList.add('animate');
            i++;
            if (i >= amount) {
                clearInterval(stagger);
                this._splitSoons[i - 1].addEventListener('transitionend', () => {
                    this._resetTransitionDuration();
                });
            }
        }, staggerInterval);

        this.el.style.opacity = 1;
    }

    close() {
        this._removeEventListeners();
    }

    _setup() {
        ScrollManager.disable();
        this._setupSoonObjects();
        this._setupSplitText();
        this._getLetterSize()
        this._setupEventListeners();
    }

    _getLetterSize() {
        this._letterSizes = {
            s: this._splitSoons[0].getBoundingClientRect().width,
            o: this._splitSoons[1].getBoundingClientRect().width,
        };
    }

    _setupSoonObjects() {
        this._soons = [];
        for (let i = 0; i < this.ui.soons.length; i++) {
            const soon = {
                el: this.ui.soons[i],
                extraSpansContainer: undefined,
                extraSpans: []
            }
            this._soons.push(soon);
        }
    } 

    _setupSplitText() {
        this._splitSoons = [];

        for (let i = 0; i < this.ui.soons.length; i++) {
            let string = this.ui.soons[i].innerText;
            let letters = string.split('');

            this.ui.soons[i].innerHTML = "";

            for (let j = 0; j < letters.length; j++) {
                if (j === 1) {
                    let extraSpansContainer = document.createElement('span');
                    extraSpansContainer.setAttribute('class', 'js-extra-span-container');
                    this._soons[i].extraSpansContainer = extraSpansContainer;
                    this.ui.soons[i].appendChild(extraSpansContainer);
                }
                let span = this._createSpan(letters[j]);
                this._splitSoons.push(span);
                this.ui.soons[i].appendChild(span);
            }

            this._soons[i].s = this.ui.soons[i].querySelectorAll('span')[0];
            this._soons[i].s.classList.add('js-animated-s');
        }
    }

    _createSpan(content) {
        let span = document.createElement('span');
        span.style.display = 'inline-block';
        span.innerHTML = content;

        return span;
    }

    _resetTransitionDuration() {
        for (let i = 0; i < this._soons.length; i++) {
            this._soons[i].s.transitionDuration = '2s';
            this._soons[i].s.transitionTimingFunction = 'linear';
        }
        ScrollManager.enable();
    }

    _insertSpan(soon) {
        let span = this._createSpan('O');
        span.style.right =  `${this._letterSizes.o * soon.extraSpans.length}px`;
        soon.extraSpansContainer.appendChild(span);
        soon.extraSpans.push(span);

        setTimeout(() => {
            span.classList.add('animate');
        }, 10);

        TweenLite.set(soon.s, { x: - this._letterSizes.o * (soon.extraSpans.length)});
    }

    _removeSpan(soon) {
        const lastSpan = soon.extraSpans[soon.extraSpans.length - 1];
        soon.extraSpans.pop();
        setTimeout(() => {
            lastSpan.classList.remove('animate');
        }, 10);

        TweenLite.set(soon.s, { x: - this._letterSizes.o * (soon.extraSpans.length)});

        lastSpan.addEventListener('transitionend', () => {
            lastSpan.remove();
        });
    }

    _updateTitle() {
        let oArray = [];
        for (let i = 0; i < this._scrollStep; i++) {
            oArray.push('O');
        }
        document.title = `Léo Mouraire | SOO${oArray.join('')}N`;
    }

    _setupEventListeners() {
        ScrollManager.addEventListener('scroll', this._scrollHandler);

        Emitter.on('RESIZE:END', this._resizeHandler);
        TweenLite.ticker.addEventListener('tick', this._tickHandler);
    }
    
    _removeEventListeners() {
        ScrollManager.removeEventListener('scroll', this._scrollHandler);
        ResizeManager.removeEventListener('resize:end', this._resizeHandler);
        TweenLite.ticker.removeEventListener('tick', this._tickHandler);
    };

    _scrollHandler(event) {
        this._scrollPosition = event.y;
        const roundedScrollPosition = Math.ceil(this._scrollPosition);

        if (this._roundedScrollPosition != roundedScrollPosition) {
            this._roundedScrollPosition = roundedScrollPosition

            switch (event.direction) {
                case 'up':
                    this._scrollUpHandler(event);
                    break;
                case 'down':
                    this._scrollDownHandler(event);
                    break;
            }
        }
    }

    _scrollDownHandler() {
        const value = this._roundedScrollPosition;
        if (value >= this._scrollStep * INTERVAL) {            
            if (this._scrollStep >= this._soonStep * SOON_INTERVAL && this._soonStep <= this._soons.length) {
                this._soonStep++;
            }
            
            this._scrollStep++;
            this._insertSpan(this._soons[this._soonStep - 1]);
            this._updateTitle();
        }
    }

    _scrollUpHandler() {
        const value = this._roundedScrollPosition;
        if (value < this._scrollStep * INTERVAL) {
            if (this._scrollStep < this._soonStep * SOON_INTERVAL && this._soonStep > 0) {
                this._soonStep--;
            }
            
            this._scrollStep--;
            this._removeSpan(this._soons[this._soonStep - 1]);
            this._updateTitle();
        }
    }

    _resizeHandler() {
        this._getLetterSize();
    }

    _tickHandler() {
        
    }

}

export default ComingSoonComponent;