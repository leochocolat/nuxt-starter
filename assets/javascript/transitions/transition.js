import { TimelineLite, Power4 } from 'gsap';

function transitionOutHome(el, done) {
    const content = el.querySelector('.main__content');
    const overlay = el.querySelector('.js-transition-overlay');
    
    const tl = new TimelineLite({ onComplete: () => done()});
    tl.to(content, 1.1, { y: -300, ease: Power4.easeInOut }, 0);
    tl.to(overlay, 1, { y: 0, ease: Power4.easeInOut }, 0);
}

function transitionOutProject(el, done) {
    const content = el.querySelector('.main__content');
    const overlay = el.querySelector('.js-transition-overlay');
    
    const tl = new TimelineLite({ onComplete: () => done()});
    tl.to(content, 1.1, { y: 300, ease: Power4.easeInOut }, 0);
    tl.to(overlay, 1, { y: 0, ease: Power4.easeInOut }, 0);
}

function transitionInHome(el, done) {
    console.log('enter home');
}

function transitionInProject(el, done) {
    console.log('enter project');
}

export {
    transitionOutHome,
    transitionOutProject,
    transitionInHome,
    transitionInProject
};