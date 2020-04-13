<template>
  <div class="main page-home js-scroll-container">
    <div class="js-scroll-content main__content">
      <HeaderHome :data="home" />
      <SectionProjects :projects="projects" />
      <SectionAbout :title="home.fields.descriptionTitle" :description="home.fields.description" :email="home.fields.email" :twitter="home.fields.twitter" :linkedin="home.fields.linkedin" />
      <Footer :name="'home'" :position="'top'" :first="home.fields.footerCredits" :second="home.fields.footerMessage" :third="home.fields.footerDesignCredits"  />
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
import Scalable from '~/assets/javascript/components/Scalable';

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

    this.$store.dispatch('projects/setProjects', this.projects);
    // let scalable = new Scalable({
    //   el: document.querySelector('.js-scroll-content')
    // });
  },
  asyncData () {
    return Promise.all([
      client.getEntries({
        'content_type': 'project',
        order: 'sys.createdAt'
      }),
      client.getEntries({
        'content_type': 'home',
      }),
    ]).then(([projects, home]) => {
      return {
        projects: projects.items,
        home: home.items[0]
      }
    }).catch(console.error)
  },
}
</script>

<style>
</style>
