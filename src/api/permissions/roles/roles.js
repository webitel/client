import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import APIItemDeleter from '../../utils/ApiControllers/Deleter/ApiDeleter';
import APIItemUpdater from '../../utils/ApiControllers/Updater/ApiUpdater';
import APICreator from '../../utils/ApiControllers/Creator/ApiCreator';
import APIItemGetter from '../../utils/ApiControllers/Getter/ApiGetter';

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
const itemUpdater = new APIItemUpdater(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

const PERMISSIONS_LIST_URL = '/permissions';
const permissionsListGetter = new APIListGetter(PERMISSIONS_LIST_URL);

export const getRoleList = (params) => listGetter.getList(params);

export const getRole = (params) => itemGetter.getItem(params);
export const addRole = (params) => itemCreator.createItem(params);
export const updateRole = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteRole = ({ id }) => itemDeleter.deleteItem(id);

export const getPermissionsOptions = (payload) => permissionsListGetter.getList(payload);

export default {
  getList: getRoleList,
  get: getRole,
  add: addRole,
  update: updateRole,
  delete: deleteRole,
};
