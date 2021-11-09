import {
  EndpointListGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';

const baseUrl = '/users';
const nestedUrl = '/tokens';
const fieldsToSend = ['token', 'usage'];

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { nestedUrl });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, nestedUrl });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance }, { nestedUrl });

export const getTokensList = (params) => listGetter.getNestedList(params);
export const addToken = (params) => itemCreator.createNestedItem(params);
export const deleteToken = (params) => itemDeleter.deleteNestedItem(params);

const UserTokensAPI = {
  getList: getTokensList,
  add: addToken,
  delete: deleteToken,
};

export default UserTokensAPI;
