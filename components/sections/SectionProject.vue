<template>
  <section class="section-project" data-scroll>
     <div class="section-project__container">
         <h2 class="heading section-project__heading">
             <span>some selected</span>
             Projects
         </h2>
         <ul class="section-project__list">
             <li class="section-project__list-item" data-scroll data-scroll-offset="150">
                 <ProjectListItem />
             </li>
             <li class="section-project__list-item" data-scroll data-scroll-offset="150">
                 <ProjectListItem />
             </li>
             <li class="section-project__list-item" data-scroll data-scroll-offset="150">
                 <ProjectListItem />
             </li>
             <li class="section-project__list-item" data-scroll data-scroll-offset="150">
                 <ProjectListItem />
             </li>
         </ul>
     </div>
  </section>
</template>

<script>
import ProjectListItem from '~/components/partials/ProjectListItem';

export default {
  props: {

  },
  components: {
      ProjectListItem
  },
  methods: {
    setup: () => {
      
    }
  },
  mounted() {
    this.setup();
  }
}
</script>

<style>
</style>
