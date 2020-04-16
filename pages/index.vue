<template>
  <div class="main page-home js-scroll-container">
    <div class="js-scroll-content">
      <div class="main__content">
        <HeaderHome :data="home" />
        <SectionProjects :projects="projects" />
        <SectionAbout :title="home.fields.descriptionTitle" :description="home.fields.description" :email="home.fields.email" :twitter="home.fields.twitter" :linkedin="home.fields.linkedin" />
        <Footer :name="'home'" :position="'top'" :first="home.fields.footerCredits" :second="home.fields.footerMessage" :third="home.fields.footerDesignCredits"  />
      </div>
    </div>
    <!-- <LoadingScreen /> -->
    <div class="transition-overlay js-transition-overlay"></div>
  </div>
</template>

<script>
import HeaderHome from '~/components/headers/HeaderHome';
import SectionProjects from '~/components/sections/SectionProjects';
import SectionAbout from '~/components/sections/SectionAbout';
import Footer from '~/components/partials/Footer';
import LoadingScreen from '~/components/partials/LoadingScreen';

import { createClient } from '~/plugins/contentful.js';
const client = createClient();

import ScrollModule from '~/assets/javascript/modules/ScrollModule';

import { TimelineLite, Power4 } from 'gsap';

export default {
  // transition: {
  //   mode: 'out-in',
  //   name: 'test',
  //   css: false,
  //   leave(el, done) {
  //     const content = el.querySelector('.main__content');
  //     const overlay = el.querySelector('.js-transition-overlay');
      
  //     const tl = new TimelineLite({
  //       onComplete: () => {
  //         done();
  //       }
  //     });

  //     tl.to(content, 1.1, { y: -300, ease: Power4.easeInOut }, 0);
  //     tl.to(overlay, 1, { y: 0, ease: Power4.easeInOut }, 0);
  //   },
  //   enter() {
  //     console.log('enter');
  //   }
  // },
  props: {

  },
  components: {
    HeaderHome,
    SectionProjects,
    SectionAbout,
    Footer,
    LoadingScreen
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    document.body.classList.add('is-ready');

    let scrollModule = new ScrollModule({
      container: document.querySelector('.js-scroll-container'),
      content: document.querySelector('.js-scroll-content'),
      smooth: true,
      smoothValue: 0.1
    });
    scrollModule.start();

    this.$store.dispatch('projects/setProjects', this.projects);
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
