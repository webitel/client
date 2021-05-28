import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';
import instance from '../../../../../app/api/instance';

const baseUrl = '/roles';

const fieldsToSend = ['name', 'description', 'permissions'];

const defaultSingleObject = {
  name: '',
  description: '',
  permissions: [],
};

const listGetter = new APIListGetter(baseUrl);
const extendedRolesListGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }); // fixme reuse listGetter after refactor
const itemGetter = new APIItemGetter(baseUrl, { defaultSingleObject });
const itemCreator = new APICreator(baseUrl, { fieldsToSend });
const itemUpdater = new APIUpdater(baseUrl, { fieldsToSend });
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
