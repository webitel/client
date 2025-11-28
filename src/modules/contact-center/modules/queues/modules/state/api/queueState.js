import applyTransform, { snakeToCamel, notify, starToSearch } from '@webitel/ui-sdk/src/api/transformers/index.js';
import { getQueueService } from '@webitel/api-services/gen';

const getQueuesGlobalState = async (params = {}) => {
  const transformedParams = applyTransform(params, [
    starToSearch('search'),
    (params) => ({
      q: params.search,
      type: params.queueType,
      teamId: params.team,
      tags: params.tags,
    }),
  ]);

  try {
    const response = await getQueueService().getQueuesGlobalState(transformedParams);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const setQueuesGlobalState = async ({ enabled, params }) => {
  const transformedParams = applyTransform(params, [
    starToSearch('search'),
    (params) => ({
      q: params.search,
      type: params.queueType,
      teamId: params.team,
      tags: params.tags,
    }),
  ]);

  try {
    const response = await getQueueService().setQueuesGlobalState({
      enabled: !!enabled,
      ...transformedParams,
    });
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
