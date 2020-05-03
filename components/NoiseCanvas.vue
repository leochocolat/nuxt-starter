<template>
  <canvas class="noise-canvas">
  </canvas>
</template>

<script>
import NoiseCanvasComponent from '~/assets/javascript/components/NoiseCanvasComponent';

export default {
  mounted() {
    this._noiseCanvasComponent = new NoiseCanvasComponent({ el: this.$el });
  },
  beforeDestroy() {
    this._noiseCanvasComponent.close();
  }
}
</script>

<style>
</style>
