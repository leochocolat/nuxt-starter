<template>
  <div class="main page-project">
    <div class="main__content">
        <div class="container page-project__container">
            <div class="page-project__content">
                <Arrow class="page-project__arrow" :direction="`left`" :color="`black`" :link="'/'" />
                <div class="page-project__description-container">
                    <div class="page-project__title">
                        {{ project.fields.name }}
                        <span class="page-project__date">
                            /{{ project.fields.date }}
                        </span>
                    </div>
                    <div class="page-project__description paragraph paragraph--small rich-text">
                        <RichTextRenderer :document="project.fields.description" />
                    </div>
                </div
                ><div class="page-project__video-wrapper">
                    <img class="page-project__video js-poster" :src="project.fields.videoPoster.fields.file.url"
                    :width="project.fields.videoPoster.fields.file.details.image.width"
                    :height="project.fields.videoPoster.fields.file.details.image.height"
                    alt="">
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
import RichTextRenderer from 'contentful-rich-text-vue-renderer';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

//mixins
import page from '~/assets/javascript/mixins/page';

//module
import { transitionOutProject, transitionInProject } from '~/assets/javascript/transitions/transition';

export default {
    components: {
        RichTextRenderer,
        Arrow: () => import('~/components/partials/Arrow'),
        FooterProject: () => import('~/components/partials/FooterProject'),
    },
    methods: {
        setup() {
            document.body.classList.add('is-ready');
            this.$el.querySelector('.js-poster').classList.add('is-active');
        }
    },
    transition: {
        mode: 'out-in',
        name: 'test1',
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
