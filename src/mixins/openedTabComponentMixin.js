import editComponentMixin from './editComponentMixin';

export default {
    mixins: [editComponentMixin],
    props: {
        itemInstanceProp: {
            type: Object,
            required: true,
        },
        v: {
            type: Object,
            required: true
        }
    },

    mounted() {
        this.itemInstance = this.itemInstanceProp;
    },
}