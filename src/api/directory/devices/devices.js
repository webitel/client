import instance from '../../instance';
import APIItemDeleter from '../../utils/ApiControllers/Deleter/ApiDeleter';
import APIUpdater from '../../utils/ApiControllers/Updater/ApiUpdater';
import APICreator from '../../utils/ApiControllers/Creator/ApiCreator';
import APIItemGetter from '../../utils/ApiControllers/Getter/ApiGetter';
import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';

const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
  'mac', 'ip', 'brand', 'model', 'hotdesks', 'hotdesk',
];

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  state: 0,
};

const defaultSingleObject = {
  state: 0,
  hotdesks: [],
  hotdesk: false,
};

const itemResponseHandler = (response) => {
  if (response.hotdesks) {
    // eslint-disable-next-line no-param-reassign
    response.hotdesks = response.hotdesks.map((item) => ({ name: item }));
  }
  return response;
};

const preRequestHandler = (item) => {
  if (item.hotdesks) {
    // eslint-disable-next-line no-param-reassign
    item.hotdesks = item.hotdesks.map((item) => item.name || item.text);
  }
  // eslint-disable-next-line no-param-reassign
  if (!item.password) delete item.password;
  return item;
};

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL, { defaultSingleObject, itemResponseHandler });
const itemCreator = new APICreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemDeleter = new APIItemDeleter(BASE_URL);

export const getDeviceList = (params) => listGetter.getList(params);
export const getDevice = (params) => itemGetter.getItem(params);
export const addDevice = async (params) => itemCreator.createItem(params);
export const updateDevice = (params) => itemUpdater.updateItem(params);
export const deleteDevice = ({ id }) => itemDeleter.deleteItem(id);

export const getDeviceHistory = async ({ id, from, to, page, size }) => {
  const url = `${BASE_URL}/${id}/users/audit?time_from=${from}&time_to=${to}&page=${page}&size=${size}`;
  try {
    const response = await instance.get(url);
    if (response.items) return response.items;
    return [];
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getDeviceList,
  get: getDevice,
  add: addDevice,
  update: updateDevice,
  delete: deleteDevice,
};
