<template>
  <div class="main page-project">
    <div class="main__content">
        <div class="container page-project__container">
            <div class="page-project__content">
                <Arrow class="page-project__arrow" :direction="`left`" :color="`black`" :link="'/'" />
                <div class="page-project__description-container">
                    <h1 class="page-project__title">
                        {{ project.fields.name }}
                        <span class="page-project__date">
                            /{{ project.fields.date }}
                        </span>
                    </h1>
                    <div class="page-project__description paragraph paragraph--small rich-text">
                        <RichTextRenderer :document="getDescription()" />
                    </div>
                </div
                ><div class="page-project__video-wrapper">
                    <VideoPlayer :images="project.fields.images" :videos="project.fields.videos" />
                </div>
            </div>
            <FooterProject :project="project.fields" />
        </div>
    </div>
    <div class="transition-overlay js-transition-overlay"></div>
  </div>
</template>

<script>
//vendors
import { mapGetters } from 'vuex';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

//mixins
import page from '~/assets/javascript/mixins/page';

//module
import { transitionOutProject, transitionInProject } from '~/assets/javascript/transitions/transition';

//modules
import VideoPlayer from '~/components/partials/VideoPlayer';

export default {
    components: {
        RichTextRenderer,
        VideoPlayer,
        Arrow: () => import('~/components/partials/Arrow'),
        FooterProject: () => import('~/components/partials/FooterProject'),
    },
    methods: {
        setup() {
            this.setupSession();
        },
        setupSession() {
            if (!this.session) {
                this.startLoading();
                this.$store.dispatch('session/setSession', Date.now());
            } else {
                this.removeLoading();
            }
        },
        getDescription() {
            let description = '';
            if (this.device.breakpoint === 'extra-narrow') {
                description = this.project.fields.descriptionMobile;
            } else {
                description = this.project.fields.description;
            }

            return description;
        }
    },
    computed: {
        ...mapGetters({
            device: ['device/viewportSize'],
            session: ['session/session'],
        }),
    },
    transition: {
        mode: 'out-in',
        name: 'project',
        leave(el, done) { transitionOutProject(el, done) },
        enter(el, done) { transitionInProject(el, done) },
    },
    asyncData ({ env, params }) {
        return Promise.all([
        client.getEntries({
            'content_type': 'project',
            order: 'sys.createdAt'
        }),
        ]).then(([projects]) => {
            return {
                project: projects.items[params.id],
            }
        }).catch(console.error)
    },
    validate ({ params }) {
        return Promise.all([
            client.getEntries({
                'content_type': 'project'
            }),
        ]).then(([data]) => {
            return data.items[params.id] != null;
        }).catch(console.error)
    }
}
</script>

<style>
</style>
