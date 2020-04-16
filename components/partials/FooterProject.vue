<template>
  <div class="footer-project">
    <ul class="footer-project__list">
        <li class="footer-project__list-item">
            <span class="footer-project__list-title tiny-word tiny-word--small">(category)</span>
            <p class="footer-project__list-content footer-text footer-text--small">
                {{ project.projectType }}
            </p>
        </li
        ><li class="footer-project__list-item">
            <span class="footer-project__list-title tiny-word tiny-word--small">({{ project.agency ? 'agency' : 'context' }})</span>
            <p class="footer-project__list-content footer-text footer-text--small">
                {{ project.agency ? project.agency : project.context }}
            </p>
        </li
        ><li class="footer-project__list-item">
            <span class="footer-project__list-title tiny-word tiny-word--small">(role)</span>
            <p class="footer-project__list-content footer-text footer-text--small">
                {{ project.role }}
            </p>
        </li
        ><li class="footer-project__list-item">
            <a target="_blank" :href="project.link" class="footer-project__list-button footer-text footer-text--small">
                {{ project.buttonLabel }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
            </a>
        </li>
    </ul>
    <div class="footer-project__line">
    </div>
  </div>
</template>

<script>
export default {
  props: {
      project: {
        type: Object,
        required: false
      }
  },
  components: {

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
