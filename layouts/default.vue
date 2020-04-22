<template>
  <div>
    <nuxt />
    <Grid />
    <ThreeCanvas />
  </div>
</template>

<style>
</style>

<script>
import ThreeCanvas from '~/components/ThreeCanvas';

export default {
  components: {
    ThreeCanvas,
    Grid: () => import('~/components/Grid'),
  },
  mounted() {
    
  }
}
</script>
