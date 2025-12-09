import {
  getQueuesGlobalStateQueryParams,
  getQueueService,
  setQueuesGlobalStateBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import applyTransform, {
  camelToSnake,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

const getQueuesGlobalState = async (params = {}) => {
  const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    getQueuesGlobalStateQueryParams,
  );

  const transformedParams = applyTransform(params, [
    starToSearch('search'),
    (params) => ({
      q: params.search,
      type: params.queueType,
      teamId: params.team,
      tags: params.tags,
    }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await getQueueService().getQueuesGlobalState(transformedParams);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const setQueuesGlobalState = async ({ enabled, params }) => {
  const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    setQueuesGlobalStateBody,
  );

  const transformedParams = applyTransform(params, [
    starToSearch('search'),
    (params) => ({
      q: params.search,
      type: params.queueType,
      teamId: params.team,
      tags: params.tags,
    }),
  ]);

  const body = applyTransform(
    {
      enabled: !!enabled,
      ...transformedParams,
    },
    [sanitize(fieldsToSend), camelToSnake()],
  );

  try {
    const response = await getQueueService().setQueuesGlobalState(body);
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
