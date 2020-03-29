<template>
  <div class="main page-home js-scroll-container">
    <div class="js-scroll-content">
      <div class="page-home__container container">
        <span class="page-home__loading js-loading blink">loading</span>
        <Navbar />
        <SectionComingSoon />
        <SectionProject />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/partials/Navbar';
import SectionComingSoon from '~/components/sections/SectionComingSoon';
import SectionProject from '~/components/sections/SectionProject';

import ScrollModule from '~/assets/javascript/modules/ScrollModule';
import ComingSoonComponent from '~/assets/javascript/components/ComingSoonComponent';
import NavbarComponent from '~/assets/javascript/components/NavbarComponent';

export default {
  props: {

  },
  components: {
    Navbar,
    SectionComingSoon,
    SectionProject
  },
  methods: {
    start : () => {
      let scrollModule = new ScrollModule({
          container: document.querySelector('.js-scroll-container'),
          content: document.querySelector('.js-scroll-content'),
          smooth: true,
          smoothValue: 0.05
      });

      let navbarComponent = new NavbarComponent({ el: document.querySelector('.js-navbar') })
      navbarComponent.start();

      let comingSoonComponent = new ComingSoonComponent({ el: document.querySelector('.js-coming-soon') })

      setTimeout(() => {
        comingSoonComponent.start();
      }, 1000);

      setTimeout(() => {
        scrollModule.start();
      }, 2000);
    },
    destroy: () => {
      
    },
  },
  mounted() {
    let uiLoading = document.querySelector('.js-loading');

    setTimeout(() => {
      uiLoading.classList.remove('blink');
    }, 2000);

    setTimeout(() => {
      uiLoading.classList.add('remove');
      this.start();
    }, 2800);


  },
  beforeDestroy() {
    this.destroy();
  }
}
</script>

<style>
</style>
