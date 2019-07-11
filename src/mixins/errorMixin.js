export default {
    data() {
        return {
            error: null
        }
    },

    methods: {
        showError() {
            this.error = "an error occured!";

            setTimeout(() => {
                this.error = null;
            }, 4000);
        }
    }
}