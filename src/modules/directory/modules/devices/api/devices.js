import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';

const baseUrl = '/devices';
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
  const _baseUrl = `${baseUrl}/${parentId}/users/audit`;
  const params = {
    page,
    size,
    time_from: from, // query format
    time_to: to, // query format
  };
  return getList(params, _baseUrl);
};
const getDeviceHistoryResponseHandler = (response) => ({ ...response, list: response.items });

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance },
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });

const historyListGetter = new EndpointListGetterApiConsumer(
  { baseUrl, instance },
  { listResponseHandler: getDeviceHistoryResponseHandler },
).setGetListMethod(_getDeviceHistory);

export const getDeviceList = (params) => listGetter.getList({ searchQuery: 'q', ...params });
export const getDevice = (params) => itemGetter.getItem(params);
export const addDevice = async (params) => itemCreator.createItem(params);
export const updateDevice = (params) => itemUpdater.updateItem(params);
export const deleteDevice = (params) => itemDeleter.deleteItem(params);
const getDevicesLookup = (params) => listGetter.getLookup(params);

export const getDeviceHistory = (params) => historyListGetter.getList(params);

const DevicesAPI = {
  getList: getDeviceList,
  get: getDevice,
  add: addDevice,
  update: updateDevice,
  delete: deleteDevice,
  getLookup: getDevicesLookup,
};

export default DevicesAPI;
