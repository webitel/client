import editComponentMixin from './editComponentMixin';

export default {
    mixins: [editComponentMixin],
    props: {
        v: {
            type: Object,
            // required: true
        },
    },
};
