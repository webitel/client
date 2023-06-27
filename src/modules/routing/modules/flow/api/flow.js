import {
  EngineRoutingSchemaType,
  RoutingSchemaServiceApiFactory,
} from 'webitel-sdk';
import applyTransform, {
  log,
  merge,
  starToSearch,
  camelToSnake,
  snakeToCamel,
  handleUnauthorized,
  notify,
  sanitize, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const flowService = new RoutingSchemaServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'type', 'payload', 'editor', 'tags'];

const getFlowList = async (params) => {
  const defaultObject = {
    type: EngineRoutingSchemaType.Default,
    editor: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    ids,
    name,
    type,
    tags,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('q'),
    camelToSnake(),
  ]);
  try {
    const response = await flowService.searchRoutingSchema(
      page,
      size,
      search,
      sort,
      fields,
      ids,
      name,
      Array.isArray(type) ? type.concat(EngineRoutingSchemaType.Default) : [
        type,
        EngineRoutingSchemaType.Default,
      ],
      undefined,
      tags,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
const getFlow = async ({ itemId: id }) => {
  const defaultObject = {
    tags: [],
    editor: false,
    type: EngineRoutingSchemaType.Default,
  };

  const itemResponseHandler = (item) => ({
      ...item,
      schema: JSON.stringify(item.schema, null, 4),
  });

  try {
    const response = await flowService.readRoutingSchema(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const preRequestHandler = (item) => ({
  ...item,
   schema: typeof item.schema === 'string' ? JSON.parse(item.schema) : item.schema,
});

const addFlow = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await flowService.createRoutingSchema(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
const updateFlow = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await flowService.updateRoutingSchema(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const deleteFlow = async ({ id }) => {
  try {
    const response = await flowService.deleteRoutingSchema(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getFlowsLookup = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields = ['id', 'name'],
    ids,
    type,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch(),
    camelToSnake(),
  ]);
  try {
    const response = await flowService.searchRoutingSchema(
      page,
      size,
      search,
      sort,
      fields,
      ids,
      undefined,
      type,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getFlowTags = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    ids,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch(),
    camelToSnake(),
  ]);
  try {
    const response = await flowService.searchRoutingSchemaTags(
      page,
      size,
      search,
      sort,
      fields,
      ids,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const FlowsAPI = {
  getList: getFlowList,
  get: getFlow,
  add: addFlow,
  update: updateFlow,
  delete: deleteFlow,
  getLookup: getFlowsLookup,
  getFlowTags,
};

export default FlowsAPI;
