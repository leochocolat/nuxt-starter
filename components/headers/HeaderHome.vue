<template>
  <header class="header-home">
    <div class="container header-home__container">
        <h1 class="heading header-home__heading">
            <!-- <span class="header-home__row header-home__row--1">
                <span class="header-home__word header-home__word--0">Loading</span> 
            </span> -->
            <span class="header-home__row header-home__row--1">
                <span class="header-home__word header-home__word--0">Léo Mouraire</span> 
            </span>
            <span class="header-home__row header-home__row--2">
                Creative
            </span>
            <span class="header-home__row header-home__row--3">
                <span class="header-home__word header-home__word--5">
                    Dev.
                    <span class="tiny-word header-home__tiny-word header-home__tiny-word--top">Front</span>
                </span>
            </span>
            <span class="header-home__row header-home__row--right-2">
                <span class="header-home__word header-home__word--right-0">
                    Projects
                </span>
            </span>
            <span class="header-home__row header-home__row--right-3">
                <span class="header-home__word header-home__date header-home__word--right-3">
                    2019
                    <span class="tiny-word header-home__tiny-word header-home__tiny-word--bottom">+2018</span>
                    <span class="header-home__second-date">
                        2020
                    </span>
                </span>
                <!-- <span class="header-home__word header-home__word--right-3">
                </span> -->
            </span>
            <!-- <span class="header-home__row header-home__row--right-4">
                <span class="header-home__word header-home__word--right-3">
                    2020
                </span>
            </span> -->
        </h1>
    </div>
    <Footer :name="'header'" :position="'bottom'" :first="data.fields.currentPosition" :second="data.fields.previousPosition" :third="data.fields.message" />
  </header>
</template>

<script>
import Footer from '~/components/partials/Footer';

export default {
    props: {
        data: {
            type: Object,
            required: false
        }
    },
    components: {
        Footer
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
