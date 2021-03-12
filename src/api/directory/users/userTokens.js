import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';

const BASE_URL = '/users';
const nestedUrl = '/tokens';
const fieldsToSend = ['token', 'usage'];

const listGetter = new WebitelAPIListGetter(BASE_URL, { nestedUrl });
const itemCreator = new WebitelAPIItemCreator(BASE_URL, { fieldsToSend, nestedUrl });
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL, { nestedUrl });

export const getTokensList = (params) => listGetter.getNestedList(params);
export const addToken = (params) => itemCreator.createNestedItem(params);
export const deleteToken = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getTokensList,
  add: addToken,
  delete: deleteToken,
};
