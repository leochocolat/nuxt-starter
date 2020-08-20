<template>
  <div :class="`page-${namespace}`">
  </div>
</template>

<script>
//vendors

//mixins
import page from '~/assets/javascript/mixins/page';

//modules

//components

//transition
import { transitionIn, transitionOut } from '~/assets/javascript/transitions/transition';

export default {
  data () { return { namespace: 'home' } },
  mixins: [ page ],
  components: {

  },
  methods: {
    setup() {
      
    }
  },
  transition: {
    mode: 'out-in',
    name: 'home',
    leave(el, done) { transitionOut(el, done) },
    enter(el, done) { transitionIn(el, done) },
    beforeLeave(el, done) { done() },
    afterLeave(el, done) { done() },
  }
}
</script>

<style>
</style>
