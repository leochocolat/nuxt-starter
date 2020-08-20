<template>
  <div :class="`page-${namespace}`">
    <h1 style="font-size: 20px; font-family: arial; margin: 20px 20px">Nuxt Starter</h1>
  </div>
</template>

<script>
const NAMESPACE = 'home';

//vendors

//mixins
import page from '~/assets/javascript/mixins/page';

//modules

//components

//transition
import { transitionIn, transitionOut } from '~/assets/javascript/transitions/transition';

export default {
  data () { return { namespace: NAMESPACE } },
  mixins: [ page ],
  components: {},
  methods: {
    setup() {}
  },
  transition: {
    mode: 'out-in',
    name: NAMESPACE,
    leave(el, done) { transitionOut(el, done) },
    enter(el, done) { transitionIn(el, done) },
    beforeLeave(el, done) { done() },
    afterLeave(el, done) { done() },
  }
}
</script>

<style>
</style>
