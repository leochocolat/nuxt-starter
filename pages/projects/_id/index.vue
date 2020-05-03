<template>
  <div class="main page-project js-scroll-container">
    <div class="js-scroll-content">
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
                        <div class="page-project__description paragraph paragraph--small rich-text js-scroll-paragraph">
                            <CustomRichTextRenderer :document="getDescription()" />
                        </div>
                    </div
                    ><div class="page-project__video-wrapper">
                        <VideoPlayer class="js-video-player" :images="project.fields.images" :videos="project.fields.videos" />
                    </div>
                </div>
                <FooterProject class="js-footer-project" :project="project.fields" />
            </div>
        </div>
    </div>
    <div class="transition-overlay js-transition-overlay"></div>
  </div>
</template>

<script>
//vendors
import { mapGetters } from 'vuex';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

//mixins
import page from '~/assets/javascript/mixins/page';

//module
import { transitionOutProject, transitionInProject, beforeLeaveState, afterLeaveState } from '~/assets/javascript/transitions/transition';
import SplitText from '~/assets/javascript/vendors/SplitText.js';

//modules
import VideoPlayer from '~/components/partials/VideoPlayer';
import FooterProject from '~/components/partials/FooterProject';
import Arrow from '~/components/partials/Arrow';
import CustomRichTextRenderer from '~/components/partials/CustomRichTextRenderer';

export default {
    data () { return { name: 'project' } },
    mixins: [ page ],
    components: {
        CustomRichTextRenderer,
        Arrow,
        FooterProject,
        VideoPlayer,
    },
    methods: {
        setup() {
            this.setupScrollParagraph();

            setTimeout(() => {
                this.$el.classList.add('isInView');
                this.$el.querySelector('.js-footer-project').classList.add('isInView');
                this.$el.querySelector('.js-video-player').classList.add('isInView');
                this.$el.querySelector('.js-scroll-paragraph').classList.add('isInView');
            }, 100);
        },
        getDescription() {
            let description = '';
            if (this.device.breakpoint === 'extra-narrow') {
                description = this.project.fields.descriptionMobile;
            } else {
                description = this.project.fields.description;
            }

            return description;
        },
        setupScrollParagraph() {
            let scrollParagraph = this.$el.querySelector('.js-scroll-paragraph');
            let originalContent = scrollParagraph.innerHTML;
            let splits = new SplitText(scrollParagraph, {
                type: 'lines',
                linesClass: 'line-container line-container--++',
            });

            let lines = [];

            for (let i = 0; i < splits.lines.length; i++) {
                const element = splits.lines[i];
                let line = new SplitText(element, {
                type: 'lines',
                    linesClass: 'line line--++',
                }).lines;
                lines.push(line[0]);
            }

            lines[lines.length - 1].addEventListener('transitionend', () => {
                scrollParagraph.innerHTML = splits.originalHTML;
            });
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
        beforeLeave(el, done) { beforeLeaveState(el, done) },
        afterLeave(el, done) { afterLeaveState(el, done) },
    },
    asyncData ({ env, params, redirect }) {
        return Promise.all([
        client.getEntries({
            'content_type': 'project',
            order: 'sys.createdAt'
        }),
        ]).then(([projects]) => {
            if (!projects.items[params.id]) redirect('/')

            return {
                project: projects.items[params.id],
            }
        }).catch(console.error)
    },
    validate ({ params, redirect }) {
        return Promise.all([
            client.getEntries({
                'content_type': 'project'
            }),
        ]).then(([data]) => {
            if (!data.items[params.id]) redirect('/where-the-fuck-do-you-think-youre-going');
            return data.items[params.id] != null;
        }).catch(console.error)
    }
}
</script>

<style>
</style>
