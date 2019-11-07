import dropdownSearchMixin from '@/mixins/dropdownSearchMixin';
import editComponentMixin from './editComponentMixin';

export default {
    mixins: [editComponentMixin, dropdownSearchMixin],
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

    created() {
        this.itemInstance = this.itemInstanceProp;
    },
}