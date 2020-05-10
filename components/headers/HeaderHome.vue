<template>
  <header class="header-home js-header-home" data-scroll>
    <div class="container header-home__container">
        <h1 class="heading header-home__heading js-heading">
            <span class="header-home__row header-home__row--0 align-left animated-row js-animated-row">
                <span class="animated-line js-animated-line">
                    Leo
                </span>
                <span class="animated-line js-animated-line">
                    Mouraire
                </span>
            </span>
            <span class="header-home__row header-home__row--1 align-left animated-row js-animated-row">
                <span class="animated-line js-animated-line">
                    Creative
                </span>
            </span>
            <span class="header-home__row header-home__row--2 align-left animated-row js-animated-row">
                <span class="animated-line js-animated-line animated-line--5">
                    Dev.
                    <span class="tiny-word js-tiny-word">Front</span>
                </span>
            </span>
        </h1>
        <h2 class="heading header-home__subheading js-subheading">
            <span class="header-home__row header-home__row--1 align-right">
                <span class="animated-line-right js-animated-line-right">
                    Projects
                </span>
            </span>
            <span class="header-home__dates">
                <span class="header-home__dates-item">
                    <span class="header-home__animated-line-wrapper js-animated-line-wrapper">
                        <span class="animated-line-right js-animated-line-right">
                            {{ data.fields.startingWorkYear }}<span class="and-char">&</span>
                            <span class="tiny-word js-tiny-word">
                                {{ data.fields.workYearTinyText }}
                            </span>
                        </span>
                    </span>
                </span>
                <span class="header-home__dates-item">
                    <span class="header-home__animated-line-wrapper js-animated-line-wrapper">
                        <span class="animated-line-right js-animated-line-right">
                            {{ data.fields.lastWorkYear }}    
                        </span>
                    </span>
                </span>
            </span>
        </h2>
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
