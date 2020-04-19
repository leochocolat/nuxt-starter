<template>
    <canvas></canvas>
</template>

<script>
import ThreeScene from '~/assets/javascript/components/ThreeScene';

export default {
  props: {

  },
  components: {

  },
  methods: {
      setup() {
        this.threeScene = new ThreeScene(this.$el);
      }
  },
  mounted() {
    this.setup()
  }
}
</script>

<style>
    canvas {
        position: fixed;
        left: 0;
        top: 0;
    }

    .fragment, .vertex {
        display: none;
    }
</style>
