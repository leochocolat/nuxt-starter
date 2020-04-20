<template>
    <canvas></canvas>
</template>

<script>
import ThreeCanvasComponent from '~/assets/javascript/components/ThreeCanvasComponent';

export default {
  props: {

  },
  components: {

  },
  methods: {
      setup() {
        this.threeScene = new ThreeCanvasComponent({ el: this.$el });
      }
  },
  mounted() {
    this.setup()
  },
  beforeDestroy() {
    this.threeScene.destroy()
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
