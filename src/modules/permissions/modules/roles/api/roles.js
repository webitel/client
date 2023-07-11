import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, handleUnauthorized,
  merge, notify, snakeToCamel,
  starToSearch, log, sanitize,
  generateUrl, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import ApplicationsAccess from '@webitel/ui-sdk/src/modules/Userinfo/classes/ApplicationsAccess';
import instance from '../../../../../app/api/instance';

const baseUrl = '/roles';
const fieldsToSend = ['name', 'description', 'permissions', 'metadata'];

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  console.log('copy.metadata.access:', copy.metadata.access);
  copy.metadata.access = ApplicationsAccess.minify(copy.metadata.access);
  console.log('copy.metadata.access:', copy.metadata.access);
  return copy;
};

// const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const getRoleList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
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
// const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance },
//   { defaultSingleObject, itemResponseHandler });
const getRole = async ({ itemId: id }) => {
  const defaultObject = {
    name: '',
    description: '',
    permissions: [],
    metadata: {},
  };

  const itemResponseHandler = (response) => {
    const copy = deepCopy(response);
    copy.metadata.access = new ApplicationsAccess({ access: copy.metadata.access }).getAccess();
    return copy;
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
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
// const extendedRolesListGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const getExtendedRoles = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
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
// const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
//   { fieldsToSend, preRequestHandler });
const addRole = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
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
// const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
//   { fieldsToSend, preRequestHandler });
const updateRole = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
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
// const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });
const deleteRole = async ({ id }) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getRolesLookup = (params) => getRoleList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const PERMISSIONS_LIST_URL = '/permissions';
// const permissionsListGetter = new EndpointListGetterApiConsumer(
//   { baseUrl: PERMISSIONS_LIST_URL, instance },
// );
const getPermissionsOptions = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(PERMISSIONS_LIST_URL),
  ]);
  try {
    const response = await instance.get(url);
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

const RolesAPI = {
  getList: getRoleList,
  get: getRole,
  add: addRole,
  update: updateRole,
  delete: deleteRole,
  getLookup: getRolesLookup,

  getExtendedRoles,
  getPermissionsOptions,
};

export default RolesAPI;
