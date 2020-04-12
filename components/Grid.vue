<template>
  <div class="container grid">
    <div v-for="item in 25" :key="item"></div>
  </div>
</template>

<script>
export default {
  props: {

  },
  components: {

  },
  computed: {

  },
  methods: {

  },
  mounted() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Control') {
            document.querySelector('.grid').classList.add('enable')
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Control') {
            document.querySelector('.grid').classList.remove('enable')
        }
    });
  },
}
</script>

<style>
</style>
