import eventBus from '../utils/eventBus';

export default {
    methods: {
        _showInfo(info = 'an info occured!') {
            eventBus.$emit('notificationInfo', info);
        },
        _showError(error = 'an error occured!') {
            eventBus.$emit('notificationError', error);
        },
    },
};
