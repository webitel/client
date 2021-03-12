import instance from '../../instance';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';

const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
  'mac', 'ip', 'brand', 'model', 'hotdesks', 'hotdesk',
];

const defaultListItem = { // default object prototype, to merge response with it to get all fields
  _isSelected: false,
  state: 0,
};

const defaultItem = { // default object prototype, to merge response with it to get all fields
  state: 0,
  hotdesks: [],
  hotdesk: false,
  _dirty: false,
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

const listGetter = new WebitelAPIListGetter(BASE_URL, { defaultItem: defaultListItem });
const itemGetter = new WebitelAPIItemGetter(BASE_URL, { defaultItem, itemResponseHandler });
const itemCreator = new WebitelAPIItemCreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

export const getDeviceList = (params) => listGetter.getList(params);
export const getDevice = ({ itemId }) => itemGetter.getItem(itemId);
export const addDevice = async ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateDevice = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
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
