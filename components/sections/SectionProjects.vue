<template>
  <section class="section-projects">
    <div class="container section-projects__container">
        <ul class="section-projects__list">
            <li v-for="(project, index) in projects" :key="index" class="section-projects__list-item">
                <ProjectListItem :index="index" :project="project" />
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
      }
  },
  components: {
      ProjectListItem
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    
  },
}
</script>

<style>
</style>
