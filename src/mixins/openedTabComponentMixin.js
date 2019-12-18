import dropdownSearchMixin from '@/mixins/dropdownSearchMixin';
import editComponentMixin from './editComponentMixin';

export default {
    mixins: [editComponentMixin, dropdownSearchMixin],
    props: {
        v: {
            type: Object,
            // required: true
        }
    },
}