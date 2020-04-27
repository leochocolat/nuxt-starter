<template>
  <div class="page-error">
      <div class="page-error__container container">
        <div class="heading">{{ error.statusCode }}</div>
        <div class="heading">
            You're currently
        </div>
        <div class="heading">
            being
        </div>
        <div class="heading">
            Redirected. . .
        </div>
        <div class="heading">
            {{ this.counter }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
        counter: 5
    }
  },
  mounted() {
    let interval = setInterval(() => {
        this.counter--;
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        this.$router.push('/');
    }, this.counter * 1000)
  }
}
</script>