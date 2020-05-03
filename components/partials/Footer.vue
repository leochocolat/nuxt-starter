<template>
    <div class="container footer" data-scroll :class="`footer--${name}`">
        <div class="footer-arrows">
            <Arrow class="footer-arrow js-footer-button-arrow" :scrollTo="position == 'bottom' ? '.footer--header' : 'body'" :direction="position"/>
            <Arrow class="footer-arrow js-footer-button-arrow" :scrollTo="position == 'bottom' ? '.footer--header' : 'body'" :direction="position" />
        </div>
        <ul class="footer-list">
            <li class="footer-list-item"></li>
            <li class="footer-list-item js-footer-item">
                <div class="footer-text footer-text rich-text">
                    <CustomRichTextRenderer :document="first" />
                </div>
                <svg class="footer-list-arrow js-footer-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
            <li class="footer-list-item js-footer-item">
                <div class="footer-text footer-text rich-text">
                    <CustomRichTextRenderer :document="second" />
                </div>
                <svg class="footer-list-arrow js-footer-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
            <li class="footer-list-item js-footer-item">
                <div class="footer-text footer-text rich-text">
                    <CustomRichTextRenderer :document="third" />
                </div>
                <svg class="footer-list-arrow js-footer-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
        </ul>
        <span class="footer-line js-footer-line"></span>
    </div>
</template>

<script>
//vendor
import CustomRichTextRenderer from '~/components/partials/CustomRichTextRenderer';

import FooterHoverComponent from '~/assets/javascript/components/FooterHoverComponent';

//components
import Arrow from '~/components/partials/Arrow';

export default {
    props: {
        name: {
            type: String,
            required: false
        },
        position: {
            type: String,
            required: false
        },
        first: {
            type: Object,
            required: false,
        },
        second: {
            type: Object,
            required: false,
        },
        third: {
            type: Object,
            required: false
        }
    },
    components: {
        Arrow,
        CustomRichTextRenderer,
    }, 
    methods: {

    },
    computed: {
        
    },
    mounted() {
        new FooterHoverComponent({ el: this.$el });
    },
}
</script>

<style>
</style>
