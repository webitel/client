import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

// NOW MIXIN ISN'T IN USE BECAUSE ALL SHOWN NOTIFICATIONS
// ARE RELATED TO REQUEST ERRORS AND ARE TRIGGERED BY
// API INSTANCE ITSELF

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
