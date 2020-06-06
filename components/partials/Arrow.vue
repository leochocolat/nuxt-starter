<template>
  <div :class="`arrow arrow--${direction} arrow--${color}`">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
    <nuxt-link v-if="link && link != 'back'" :to="link" @click="clickHandler" class="arrow__button"></nuxt-link>
    <nuxt-link v-if="link && link === 'back' && !this.previousPage" :to="'/'" @click="clickHandler" class="arrow__button"></nuxt-link>
    <span v-if="link === 'back' && this.previousPage" @click="goBack" class="arrow__button"></span>
    <button v-if="scrollTo" :data-scroll-to="scrollTo" class="arrow__button">Scroll {{ direction }}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    direction: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    scrollTo: {
      type: String,
      required: false
    }
  },
  methods: {
    goBack() {
      this.clickHandler();
      this.$router.back();
    },
    clickHandler() {
      console.log('click handler');
      this.$el.classList.add('is-active');
    }
  },
  computed: {
    ...mapGetters({
      currentPage: ['page/current'],
      previousPage: ['page/previous'],
    }),
  }
}
</script>

<style>
</style>
