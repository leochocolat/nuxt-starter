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

const NAMESPACE = 'home';

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
