<template>
  <div>
    <nuxt />
    <Grid />
  </div>
</template>

<style>
</style>

<script>
export default {
  components: {
    Grid: () => import('~/components/Grid'),
    ThreeCanvas: () => import('~/components/ThreeCanvas'),
  },
  mounted() {
    
  }
}
</script>
