import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';

const BASE_URL = '/roles';

const fieldsToSend = ['name', 'description', 'permissions'];

const defaultSingleObject = {
  name: '',
  description: '',
  permissions: [],
};

const listGetter = new APIListGetter(BASE_URL);
const itemGetter = new APIItemGetter(BASE_URL, { defaultSingleObject });
const itemCreator = new APICreator(BASE_URL, { fieldsToSend });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

const PERMISSIONS_LIST_URL = '/permissions';
const permissionsListGetter = new APIListGetter(PERMISSIONS_LIST_URL);

export const getRoleList = (params) => listGetter.getList(params);

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