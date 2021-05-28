import instance from '../../../../../app/api/instance';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';

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

const _getDeviceHistory = (getList) => function ({
                                                   parentId,
                                                   from,
                                                   to,
                                                   page,
                                                   size,
                                                 }) {
  const baseUrl = `${BASE_URL}/${parentId}/users/audit?time_from=${from}&time_to=${to}`;
  return getList({ page, size }, baseUrl);
};

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL, { defaultSingleObject, itemResponseHandler });
const itemCreator = new APICreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemDeleter = new APIItemDeleter(BASE_URL);

const historyListGetter = new APIListGetter(BASE_URL)
  .setGetListMethod(_getDeviceHistory);

export const getDeviceList = (params) => listGetter.getList({ ...params, searchQuery: 'q' });
export const getDevice = (params) => itemGetter.getItem(params);
export const addDevice = async (params) => itemCreator.createItem(params);
export const updateDevice = (params) => itemUpdater.updateItem(params);
export const deleteDevice = (params) => itemDeleter.deleteItem(params);

export const getDeviceHistory = (params) => historyListGetter.getList(params);

export default {
  getList: getDeviceList,
  get: getDevice,
  add: addDevice,
  update: updateDevice,
  delete: deleteDevice,
};
