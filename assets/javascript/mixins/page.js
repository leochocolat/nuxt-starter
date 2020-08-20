import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.setup();

        this._setupSession();
        this._setupCurrentPage();
    },
    methods: {
        _setupSession() {
            if (!this.session) {
                this.$store.dispatch('session/setSession', Date.now());
            }
        },
        _setupCurrentPage() {
            this.$store.dispatch('page/setCurrent', this.namespace);
            document.documentElement.classList.add(`${this.namespace}`);
            document.body.classList.add(`${this.namespace}`);
        }
    },
    computed: {
        ...mapGetters({
          session: ['session/session'],
          currentPage: ['page/current'],
          previousPage: ['page/previous'],
        }),
    },
    beforeDestroy() {
        document.querySelector('html').classList.remove(`${this.namespace}`);
        document.body.classList.remove(`${this.namespace}`);
    },
}