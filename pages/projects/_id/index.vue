<template>
  <div class="main page-project js-scroll-container">
    <div class="js-scroll-content main__content">
        <div class="container page-project__container">
            <div class="page-project__content">
                <Arrow class="page-project__arrow" :direction="`left`" :color="`black`" />
                <div class="page-project__description-container">
                    <div class="page-project__title">
                        {{ project.fields.name }}
                        <span class="page-project__date">
                            /{{ project.fields.date }}
                        </span>
                    </div>
                    <div class="page-project__description paragraph paragraph--small">
                        <RichTextRenderer :document="project.fields.description" />
                    </div>
                </div
                ><div class="page-project__video-wrapper">
                    <img class="page-project__video" src="https://i.picsum.photos/id/670/1920/1080.jpg" alt="">
                </div>
            </div>
            <FooterProject :project="project.fields" />
        </div>
    </div>
  </div>
</template>

<script>
import Arrow from '~/components/partials/Arrow';
import FooterProject from '~/components/partials/FooterProject';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

import { createClient } from '~/plugins/contentful.js';
const client = createClient();

import ScrollModule from '~/assets/javascript/modules/ScrollModule';

export default {
    props: {

    },
    components: {
        RichTextRenderer,
        FooterProject,
        Arrow
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
