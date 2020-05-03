<template>
  <div>
    <nuxt />
    <Grid />
    <NoiseCanvas />
    <!-- <ThreeCanvas /> -->
  </div>
</template>

<style>
</style>

<script>
import NoiseCanvas from '~/components/NoiseCanvas';

export default {
  components: {
    NoiseCanvas,
    ThreeCanvas: () => import('~/components/ThreeCanvas'),
    Grid: () => import('~/components/Grid'),
  },
  mounted() {
    
  }
}
</script>
