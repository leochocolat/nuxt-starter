<template>
    <div class="container footer" :class="`footer--${name}`">
        <div class="footer-arrows">
            <Arrow class="footer-arrow" :direction="position"/>
            <Arrow class="footer-arrow" :direction="position" />
        </div>
        <ul class="footer-list">
            <li class="footer-list-item"></li>
            <li class="footer-list-item">
                <div class="footer-text footer-text rich-text">
                    <RichTextRenderer :document="first" />
                </div>
                <svg class="footer-list-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
            <li class="footer-list-item">
                <div class="footer-text footer-text rich-text">
                    <RichTextRenderer :document="second" />
                </div>
                <svg class="footer-list-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
            <li class="footer-list-item">
                <div class="footer-text footer-text rich-text">
                    <RichTextRenderer :document="third" />
                </div>
                <svg class="footer-list-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>arrow-right</title><g><g><polygon class="cls-1" points="0 288 390.4 288 211.2 467.2 256 512 512 256 256 0 211.2 44.8 390.4 224 0 224 0 288"/></g></g></svg>
            </li>
        </ul>
        <span class="footer-line"></span>
    </div>
</template>

<script>
import Arrow from '~/components/partials/Arrow';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
    components: {
        RichTextRenderer,
        Arrow
    },    
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
    computed: {

    },
    methods: {

    },
    mounted() {
        
    },
}
</script>

<style>
</style>
