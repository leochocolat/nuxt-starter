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
    <div class="transition-overlay js-transition-overlay"></div>
    <Loader />
  </div>
</template>

<script>
//vendors
import { mapGetters } from 'vuex';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

//mixins
import page from '~/assets/javascript/mixins/page';

//modules
import ScrollModule from '~/assets/javascript/modules/ScrollModule';
import { transitionOutHome, transitionInHome } from '~/assets/javascript/transitions/transition';
import LoaderComponent from '~/assets/javascript/components/LoaderComponent';

//components
import Loader from '~/components/partials/Loader';

export default {
  data () { return { name: 'home' } },
  mixins: [ page ],
  components: {
    Loader,
    HeaderHome: () => import('~/components/headers/HeaderHome'),
    SectionProjects: () => import('~/components/sections/SectionProjects'),
    SectionAbout: () => import('~/components/sections/SectionAbout'),
    Footer: () => import('~/components/partials/Footer'),
  },
  computed: {
    ...mapGetters({
      scrollPosition: ['scroll/position'],
      session: ['session/session'],
    }),
  },
  methods: {
    setup() {
      this.setupLoading();
      this.setupSession();
      this.setupSmoothScroll();
      this.setupStore();
    },
    setupLoading() {
      this.loader = new LoaderComponent({ el: this.$el });
    },
    setupSession() {
      if (!this.session) {
        this.startLoading();
        this.$store.dispatch('session/setSession', Date.now());
      } else {
        this.removeLoading();
      }
    },
    setupSmoothScroll() {
      let scrollModule = new ScrollModule({
        container: document.querySelector('.js-scroll-container'),
        content: document.querySelector('.js-scroll-content'),
        smooth: true,
        smoothValue: 0.1
      });
      scrollModule.start();
      scrollModule.scrollTo(this.scrollPosition.y);
    },
    setupStore() {
      this.$store.dispatch('projects/setProjects', this.projects);
      this.$store.dispatch('page/setCurrent', this.name);
    },
    startLoading() {
      this.loader.transitionOut();
    },
    removeLoading() {
      this.loader.remove();
    }
  },
  transition: {
    mode: 'out-in',
    name: 'home',
    leave(el, done) { transitionOutHome(el, done) },
    enter(el, done) { transitionInHome(el, done) }
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
