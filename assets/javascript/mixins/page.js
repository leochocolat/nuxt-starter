import ScrollManager from '../managers/ScrollManager';

export default {
    mounted() {
        this.setup();
    },
    beforeDestroy() {
        ScrollManager.disable();
    },
}