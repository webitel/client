import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';


const BASE_URL = '/roles';
const fieldsToSend = ['name', 'description', 'permissions'];
const defaultItemObject = {
  name: '',
  description: '',
  permissions: [],
  _dirty: false,
};
const listGetter = new WebitelAPIListGetter(BASE_URL);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItemObject);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

const PERMISSIONS_LIST_URL = '/permissions';
const permissionsListGetter = new WebitelAPIListGetter(PERMISSIONS_LIST_URL, {});

export const getRoleList = (params) => listGetter.getList(params);

export const getRole = ({ itemId }) => itemGetter.getItem(itemId);
export const addRole = ({ itemInstance }) => itemCreator.createItem(itemInstance);
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
