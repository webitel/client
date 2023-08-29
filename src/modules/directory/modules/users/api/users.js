import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, notify, snakeToCamel,
  starToSearch, log, sanitize,
  generateUrl, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import instance from '../../../../../app/api/instance';

const baseUrl = '/users';
const fieldsToSend = [
  'name',
  'username',
  'password',
  'extension',
  'status',
  'note',
  'roles',
  'license',
  'devices',
  'device',
  'profile',
  'email',
];

const getUsersList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const defaultObject = {
    name: '',
    status: '',
    state: true,
    dnd: false,
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getUser = async ({ itemId: id }) => {
  const defaultObject = {
    roles: [],
    license: [],
    devices: [],
    device: {},
    variables: [
      { key: '', value: '' },
    ],
  };

  const itemResponseHandler = (item) => {
    const copy = deepCopy(item);
    if (copy.license) {
      copy.license.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.name = item.prod;
      });
    }
    if (copy.profile) {
      copy.variables = Object.keys(copy.profile).map((key) => ({
        key,
        value: copy.profile[key],
      }));
    } else {
      copy.variables = [{ key: '', value: '' }];
    }
    return copy;
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  if (item.device && !item.device.id) delete copy.device;
  // eslint-disable-next-line no-param-reassign
  if (copy.roles) copy.roles.forEach((copy) => delete copy.text);
  // eslint-disable-next-line no-param-reassign
  if (copy.devices) copy.devices.forEach((copy) => delete copy.text);
  if (copy.license) {
    copy.license = copy.license.map((copy) => ({ id: copy.id }));
  }
  copy.profile = {};
  if (copy.variables) {
    copy.variables.forEach((variable) => {
      copy.profile[variable.key] = variable.value;
    });
  }
  return copy;
};

const addUser = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};
const updateUser = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};
const patchUser = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.patch(url, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const patchUserPresence = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}/presence`;
  try {
    const response = await instance.patch(url, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteUser = async ({ id }) => {
  const url = `${baseUrl}/${id}?permanent=true`;
  // permanent=true for complete deletion
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getUsersLookup = (params) => getUsersList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const logoutUser = async ({ id }) => {
  const url = `${baseUrl}/${id}/logout`;
  try {
    const response = await instance.post(url, {});
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const UsersAPI = {
  getList: getUsersList,
  get: getUser,
  add: addUser,
  patch: patchUser,
  update: updateUser,
  delete: deleteUser,
  getLookup: getUsersLookup,
  patchUserPresence,
  logoutUser,
};

export default UsersAPI;
