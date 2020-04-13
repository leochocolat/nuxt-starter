<template>
  <div class="main page-home js-scroll-container">
    <div class="js-scroll-content">
      <HeaderHome />
      <SectionProjects :projects="projects" />
      <SectionAbout />
      <Footer />
    </div>
  </div>
</template>

<script>
import HeaderHome from '~/components/headers/HeaderHome';
import SectionProjects from '~/components/sections/SectionProjects';
import SectionAbout from '~/components/sections/SectionAbout';
import Footer from '~/components/partials/Footer';

import { createClient } from '~/plugins/contentful.js';
const client = createClient();

import ScrollModule from '~/assets/javascript/modules/ScrollModule';

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
    let scrollModule = new ScrollModule({
      container: document.querySelector('.js-scroll-container'),
      content: document.querySelector('.js-scroll-content'),
      smooth: true,
      smoothValue: 0.1
    });
    scrollModule.start();
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
