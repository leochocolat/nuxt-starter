<template>
  <div :class="`arrow arrow--${direction} arrow--${color}`">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
    <a v-if="link" :href="link" class="arrow__button"></a>
    <button v-if="scrollTo" :data-scroll-to="scrollTo" class="arrow__button"></button>
  </div>
</template>

<script>
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
}
</script>

<style>
</style>
