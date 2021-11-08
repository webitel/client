import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointPatcherApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';

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

const listGetter = new EndpointGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance },
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });

export const getUsersList = (params) => listGetter.getList({ searchQuery: 'q', ...params });
export const getUser = (params) => itemGetter.getItem(params);
export const addUser = (params) => itemCreator.createItem(params);
export const updateUser = (params) => itemUpdater.updateItem(params);
export const patchUser = (params) => itemPatcher.patchItem(params, 'presence');
export const deleteUser = (params) => itemDeleter.deleteItem(params);
const getUsersLookup = (params) => listGetter.getLookup(params);

export default {
  getList: getUsersList,
  get: getUser,
  add: addUser,
  patch: patchUser,
  update: updateUser,
  delete: deleteUser,
  getLookup: getUsersLookup,
};
