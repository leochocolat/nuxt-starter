<template>
    <div class="project-list-item">
        <a :href="project.fields.link" target="_blank" class="project-list-item__link">
            {{ project.fields.name }}
        </a>
        <div class="project-list-item__content">
            <h3 class="project-list-item__project-name">
                {{ project.fields.name }}
            </h3>
            <div class="project-list-item__project-infos">
                {{ project.fields.projectType }}<br>
                /{{ project.fields.date }}
            </div>
            <a :href="project.fields.link" class="project-list-item__project-link">
                ({{ project.fields.buttonLabel }})
            </a>
        </div>
    </div>
</template>

<script>

export default {
  props: {
      project: {
          type: Object,
          required: true
      }
  },
  components: {

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
