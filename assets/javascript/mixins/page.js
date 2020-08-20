import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.setup();
        this.setupSession();
        this.setupCurrentPage();
    },
    methods: {
        setupSession() {
            if (!this.session) {
                this.$store.dispatch('session/setSession', Date.now());
            }
        },
        setupCurrentPage() {
            this.$store.dispatch('page/setCurrent', this.name);
            document.querySelector('html').classList.add(`${this.name}`);
            document.body.classList.add(`${this.name}`);
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
        document.querySelector('html').classList.remove(`${this.name}`);
        document.body.classList.remove(`${this.name}`);
    },
}