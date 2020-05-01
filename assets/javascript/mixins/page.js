import ScrollManager from '../managers/ScrollManager';

export default {
    mounted() {
        this.setup();
    },
    beforeDestroy() {
        ScrollManager.disable();
    },
    head() {
        return {
            bodyAttrs: {
                class: this.name
            },
            htmlAttrs: {
                class: this.name
            }
        }
    }
}