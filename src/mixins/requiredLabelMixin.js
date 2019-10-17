export default {
    computed: {
        computeRequiredLabel() {
            return this.required ? this.label + '*' : this.label;
        }
    }
}