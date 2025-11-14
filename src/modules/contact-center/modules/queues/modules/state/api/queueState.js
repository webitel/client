import applyTransform, { snakeToCamel, notify } from '@webitel/ui-sdk/src/api/transformers/index.js';
import { getQueueService } from '@webitel/api-services/gen';

const getQueuesGlobalState = async () => {
  try {
    const response = await getQueueService().getQueuesGlobalState();
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const setQueuesGlobalState = async ({ enabled }) => {
  try {
    const response = await getQueueService().setQueuesGlobalState({ enabled: !!enabled });
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const QueuesStateAPI = {
  getQueuesGlobalState,
  setQueuesGlobalState,
};

export default QueuesStateAPI;
