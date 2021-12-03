import deepCopy from 'deep-copy';
import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import ApplicationsAccess from '@webitel/ui-sdk/src/modules/Userinfo/classes/ApplicationsAccess';
import instance from '../../../../../app/api/instance';

const baseUrl = '/roles';

const fieldsToSend = ['name', 'description', 'permissions', 'metadata'];

const defaultSingleObject = {
  name: '',
  description: '',
  permissions: [],
  metadata: {},
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

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance },
  { defaultSingleObject, itemResponseHandler });
const extendedRolesListGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });

const PERMISSIONS_LIST_URL = '/permissions';
const permissionsListGetter = new EndpointListGetterApiConsumer(
  { baseUrl: PERMISSIONS_LIST_URL, instance },
);

const getRoleList = (params) => listGetter.getList(params);
const getExtendedRoles = (params) => extendedRolesListGetter.getList(params);
const getRole = (params) => itemGetter.getItem(params);
const addRole = (params) => itemCreator.createItem(params);
const updateRole = (params) => itemUpdater.updateItem(params);
const deleteRole = (params) => itemDeleter.deleteItem(params);
const getRolesLookup = (params) => listGetter.getLookup(params);

const getPermissionsOptions = (payload) => permissionsListGetter.getList(payload);

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
