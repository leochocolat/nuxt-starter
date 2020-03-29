import { TweenMax, Power3 } from "gsap";

class NavbarComponent {
    constructor(options) {
        this.el = options.el;

        this.ui = {
            listItems: this.el.querySelectorAll('.js-navbar-item')
        };
        
        this._setup();
    }

    start() {
        TweenMax.staggerFromTo(this._splitedSpans, 2.1, { opacity: 0 }, { opacity: 1, ease: Power3.easeOut }, 0.02);
        
        this.el.style.opacity = 1;
    } 

    _setup() {
        this._setupSplitText();
    }

    _setupSplitText() {
        this._splitedSpans = [];

        for (let i = 0; i < this.ui.listItems.length; i++) {
            const listItem = this.ui.listItems[i];
            const string = listItem.innerText;
            const chars = string.split('');

            listItem.innerHTML = '';

            for (let j = 0; j < chars.length; j++) {
                const char = chars[j];
                const span = document.createElement('span');
                span.innerHTML = char === ' ' ?  '&nbsp' : `${char}`;
                span.style.display = 'inline-block';
                this._splitedSpans.push(span);
                listItem.appendChild(span);
            }
        }
    }
}

export default NavbarComponent;