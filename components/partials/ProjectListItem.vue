<template>
    <div class="project-list-item">
        <nuxt-link :to="`/projects/${index}`" class="project-list-item__link js-link">
            {{ project.fields.name }}
        </nuxt-link>
        <div class="project-list-item__content">
            <h3 class="project-list-item__project-name">
                {{ project.fields.name }}
            </h3
            ><div class="project-list-item__project-infos">
                {{ project.fields.projectType }}<br>
                /{{ project.fields.date }}
            </div
            ><a :href="project.fields.link" class="project-list-item__project-link"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
            </a>
        </div>
        <div class="project-list-item__border project-list-item__border--top"></div>
        <div class="project-list-item__border project-list-item__border--bottom"></div>
    </div>
</template>

<script>

export default {
    props: {
        project: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    components: {

    },
    methods: {
        setup() {
            this.setupEventListeners();
        },
        setupEventListeners() {
            this.$el.querySelector('.js-link').addEventListener('click', () => {
                this.$el.classList.add('is-active');
            });
        }
    },
    mounted() {
        this.setup();
    }
}
</script>

<style>
</style>
