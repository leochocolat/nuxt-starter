<template>
  <div>
      {{ error.statusCode }} {{ error.message }} 
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() { return { namespace: 'error' } }
}
</script>