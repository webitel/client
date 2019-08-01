export default {
    data() {
        return {
            info: null,
            error: null,
        };
    },

    methods: {
        showInfo() {
            this.error = 'an info occured!';

            setTimeout(() => {
                this.error = null;
            }, 4000);
        },
    },
    showError() {
        this.error = 'an error occured!';

        setTimeout(() => {
            this.error = null;
        }, 4000);
    },
};
