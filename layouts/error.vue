<template>
  <div class="page-error">
      <div class="page-error__container container js-container">
        <div class="page-error__content">
          <div class="page-error__row">
            <div class="heading page-error__col page-error__col--3 js-heading">
              {{ error.statusCode }}
              <span class="tiny-word">
                {{ getErrorMessage(error) }} 
              </span>
            </div>
          </div>
          <div class="page-error__row no-mobile">
            <div class="heading page-error__col page-error__col--0-5 js-heading">You're currently</div>
          </div>
          <div class="page-error__row no-desktop">
            <div class="heading page-error__col page-error__col--0-5 js-heading">You're</div>
          </div>
          <div class="page-error__row page-error__row--right no-desktop">
            <div class="heading page-error__col page-error__col--0-5 js-heading">Currently</div>
          </div>
          <div class="page-error__row">
            <div class="heading page-error__col page-error__col--0 js-heading">being</div>
          </div>
          <div class="page-error__row">
            <div class="heading page-error__col page-error__col--3 js-heading">Redirected</div>
          </div>
        </div>

        <div class="page-error__progress js-progress"></div>
      </div>
      <div class="transition-overlay js-transition-overlay"></div>
  </div>
</template>

<script>
import { TimelineLite, Power4, Power2 } from 'gsap';

export default {
  props: ['error'],
  data() {
    return {
      name: 'error'
    }
  },
  mounted() {
    this.enter();
  },
  methods: {
    enter() {
      setTimeout(() => {
        this.leave();
      }, 500);
    },
    leave() {
      let timeline = new TimelineLite({
        onComplete: () => { this.$router.push('/'); }
      });

      timeline.staggerTo(this.$el.querySelectorAll('.js-heading'), 1.2, { y: 0, ease: Power4.easeOut }, 0.1);
      timeline.to(this.$el.querySelector('.js-progress'), 3, { scaleX: 1, ease: Power2.easeOut }, 0.8);
      timeline.to(this.$el.querySelector('.js-transition-overlay'), 1, { y: 0, ease: Power4.easeInOut }, 3.1);
      timeline.to(this.$el.querySelector('.js-container'), 1.1, { y: -200, ease: Power4.easeInOut }, 3.1);
    },
    getErrorMessage(error) {
      let errorMessage = error.message;

      if (error.statusCode === 404) {
        errorMessage = 'not found'
      }

      return errorMessage;
    }
  },
  head() {
    if (this.error.statusCode === 404) {
      return {
        title: 'You got lost...'
      }
    } else {
      return {
        title: `Error: ${this.error.message}`
      }
    }
  }
}
</script>