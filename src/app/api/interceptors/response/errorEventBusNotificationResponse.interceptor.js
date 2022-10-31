import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

const onFulfilled = (response) => response;

const onReject = (error) => {
  eventBus.$emit('notification', {
    type: 'error',
    text: error.response.data.detail || error.response.data.message,
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
