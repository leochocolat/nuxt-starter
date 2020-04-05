<template>
  <section class="section-project" data-scroll>
     <div class="section-project__container">
         <h2 class="heading section-project__heading">
             <span>some selected</span>
             Projects
         </h2>
         <ul class="section-project__list">
             <li v-for="(project, index) in projects" :key="index" class="section-project__list-item" data-scroll data-scroll-offset="150">
                 <ProjectListItem :project="project" />
             </li>
         </ul>
     </div>
  </section>
</template>

<script>
import ProjectListItem from '~/components/partials/ProjectListItem';


export default {
  props: {
    projects: {
        type: Array,
        required: true
    },
  },
  components: {
      ProjectListItem
  },
  methods: {
    setup: () => {
      
    }
  },
  mounted() {
    console.log(this.projects);
    this.setup();
  }
}
</script>

<style>
</style>
