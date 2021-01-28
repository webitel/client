import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';


const BASE_URL = '/roles';
const fieldsToSend = ['name', 'description'];
const defaultItemObject = {
  name: '',
  description: '',
  _dirty: false,
};
const listGetter = new WebitelAPIListGetter(BASE_URL);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItemObject);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

export const getRoleList = async (page = 0, size = 10, search) => await listGetter.getList({ page, size, search });

export const getRole = async (id) => await itemGetter.getItem(id);

export const addRole = (item) => itemCreator.createItem(item);

export const updateRole = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteRole = async (id) => await itemDeleter.deleteItem(id);
