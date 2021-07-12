import deepCopy from 'deep-copy';
import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import instance from '../../../../../app/api/instance';
import ApplicationsAccess from '../store/_internals/ApplicationsAccess';

const baseUrl = '/roles';

const fieldsToSend = ['name', 'description', 'permissions', 'metadata'];

const defaultSingleObject = {
  name: '',
  description: '',
  permissions: [],
  metadata: {},
  _dirty: false,
};

const itemResponseHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.metadata.access = new ApplicationsAccess({ access: item.metadata.access }).getAccess();
  return item;
};

const preRequestHandler = (item) => {
  const itemCopy = deepCopy(item);
  itemCopy.metadata.access = ApplicationsAccess.minify(item.metadata.access);
  return itemCopy;
};

const listGetter = new APIListGetter(baseUrl);
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance },
  { defaultSingleObject, itemResponseHandler });
const extendedRolesListGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemDeleter = new APIItemDeleter(baseUrl);

const PERMISSIONS_LIST_URL = '/permissions';
const permissionsListGetter = new APIListGetter(PERMISSIONS_LIST_URL);

export const getRoleList = (params) => listGetter.getList({ ...params, searchQuery: 'q' });
export const getExtendedRoles = (params) => extendedRolesListGetter.getList({ ...params, searchQuery: 'q' });
export const getRole = (params) => itemGetter.getItem(params);
export const addRole = (params) => itemCreator.createItem(params);
export const updateRole = (params) => itemUpdater.updateItem(params);
export const deleteRole = (params) => itemDeleter.deleteItem(params);

export const getPermissionsOptions = (payload) => permissionsListGetter.getList(payload);

export default {
  getList: getRoleList,
  get: getRole,
  add: addRole,
  update: updateRole,
  delete: deleteRole,
};
