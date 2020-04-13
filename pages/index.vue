<template>
  <div class="main page-home js-scroll-container">
    <HeaderHome />
    <SectionProjects :projects="projects" />
    <SectionAbout />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import HeaderHome from '~/components/headers/HeaderHome';
import SectionProjects from '~/components/sections/SectionProjects';
import SectionAbout from '~/components/sections/SectionAbout';
import Footer from '~/components/partials/Footer';

import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
  props: {

  },
  components: {
    HeaderHome,
    SectionProjects,
    SectionAbout,
    Footer
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },
  asyncData () {
    return Promise.all([
      client.getEntries({
        'content_type': 'project',
        order: 'sys.createdAt'
      })
    ]).then(([projects]) => {
      return {
        projects: projects.items,
      }
    }).catch(console.error)
  },
}
</script>

<style>
</style>
