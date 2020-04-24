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
export default {
  components: {
    ThreeCanvas: () => import('~/components/ThreeCanvas'),
    Grid: () => import('~/components/Grid'),
  },
  mounted() {
    
  }
}
</script>
