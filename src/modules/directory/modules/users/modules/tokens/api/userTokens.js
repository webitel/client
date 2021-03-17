import APIItemDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APICreator from '../../../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';

const BASE_URL = '/users';
const nestedUrl = '/tokens';
const fieldsToSend = ['token', 'usage'];

const listGetter = new APIListGetter(BASE_URL, { nestedUrl });
const itemCreator = new APICreator(BASE_URL, { fieldsToSend, nestedUrl });
const itemDeleter = new APIItemDeleter(BASE_URL, { nestedUrl });

export const getTokensList = (params) => listGetter.getNestedList(params);
export const addToken = (params) => itemCreator.createNestedItem(params);
export const deleteToken = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getTokensList,
  add: addToken,
  delete: deleteToken,
};
