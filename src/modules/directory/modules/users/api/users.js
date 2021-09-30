import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIPatcher from '../../../../../app/api/BaseAPIServices/Patcher/ApiPatcher';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';

const baseUrl = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'note', 'roles', 'license', 'devices', 'device',
  'profile', 'profile', 'email'];

const defaultListObject = {
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

const listGetter = new APIListGetter(baseUrl, { defaultListObject });
const itemGetter = new APIItemGetter(baseUrl, { defaultSingleObject, itemResponseHandler });
const itemCreator = new APICreator(baseUrl, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIUpdater(baseUrl, { fieldsToSend, preRequestHandler });
const itemPatcher = new APIPatcher(baseUrl, { fieldsToSend });
const itemDeleter = new APIItemDeleter(baseUrl);

export const getUsersList = (params) => listGetter.getList({ searchQuery: 'q', ...params });
export const getUser = (params) => itemGetter.getItem(params);
export const addUser = (params) => itemCreator.createItem(params);
export const updateUser = (params) => itemUpdater.updateItem(params);
export const patchUser = (params) => itemPatcher.patchItem(params, 'presence');
export const deleteUser = (params) => itemDeleter.deleteItem(params);


// FIXME REFACTOR ALL COMPONENTS WITH WEBITEL-SDK CONSUMERS
const _listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });
const getUsersLookup = (params) => _listGetter.getLookup(params);

export default {
  getList: getUsersList,
  get: getUser,
  add: addUser,
  patch: patchUser,
  update: updateUser,
  delete: deleteUser,
  getLookup: getUsersLookup,
};
