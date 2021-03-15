import APIItemDeleter from '../../utils/ApiControllers/Deleter/ApiDeleter';
import APIItemPatcher from '../../utils/ApiControllers/Patcher/ApiPatcher';
import APIItemUpdater from '../../utils/ApiControllers/Updater/ApiUpdater';
import APIItemCreator from '../../utils/ApiControllers/Creator/ApiCreator';
import APIItemGetter from '../../utils/ApiControllers/Getter/ApiGetter';
import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'note', 'roles', 'license', 'devices', 'device',
  'profile', 'profile', 'email'];

const defaultListObject = {
  _isSelected: false,
  name: '',
  status: '',
  state: true,
  dnd: false,
};

const defaultSingleObject = {
  name: '',
  username: '',
  password: '',
  extension: '',
  roles: [],
  license: [],
  devices: [],
  device: {},
  variables: [
    { key: '', value: '' },
  ],
  _dirty: false,
};

const itemResponseHandler = (response) => {
  const user = { ...defaultSingleObject, ...response };
  if (user.license) {
    user.license.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.name = item.prod;
    });
  }
  if (user.profile) {
    user.variables = Object.keys(user.profile).map((key) => ({
      key,
      value: user.profile[key],
    }));
  } else {
    user.variables = [{ key: '', value: '' }];
  }
  return user;
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  if (item.device && !item.device.id) delete item.device;
  // eslint-disable-next-line no-param-reassign
  if (item.roles) item.roles.forEach((item) => delete item.text);
  // eslint-disable-next-line no-param-reassign
  if (item.devices) item.devices.forEach((item) => delete item.text);
  if (item.license) {
    // eslint-disable-next-line no-param-reassign
    item.license = item.license.map((item) => ({ id: item.id }));
  }
  // eslint-disable-next-line no-param-reassign
  item.profile = {};
  if (item.variables) {
    item.variables.forEach((variable) => {
      // eslint-disable-next-line no-param-reassign
      item.profile[variable.key] = variable.value;
    });
  }
  return item;
};

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL, { defaultSingleObject, itemResponseHandler });
const itemCreator = new APIItemCreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIItemUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemPatcher = new APIItemPatcher(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

export const getUsersList = (params) => listGetter.getList(params);
export const getUser = (params) => itemGetter.getItem(params);
export const addUser = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateUser = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const patchUser = ({ id, changes }) => itemPatcher.patchItem(id, changes, 'presence');
export const deleteUser = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getUsersList,
  get: getUser,
  add: addUser,
  patch: patchUser,
  update: updateUser,
  delete: deleteUser,
};
