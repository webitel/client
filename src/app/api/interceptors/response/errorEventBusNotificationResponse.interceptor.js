import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

const onFulfilled = (response) => response;

const onReject = (error) => {
  eventBus.$emit('notification', {
    type: 'error',
    text: error.response.data.detail,
  });
  return Promise.reject(error);
};

const errorEventBusNotificationResponse = {
  default: [
    onFulfilled,
    onReject,
  ],
};

export default errorEventBusNotificationResponse;
