import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import APIGetter from '../../utils/ApiControllers/Getter/ApiGetter';
import APIPatcher from '../../utils/ApiControllers/Patcher/ApiPatcher';

const BASE_URL = '/objclass';

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  class: '',
  obac: false,
  rbac: false,
  id: 0,
};

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIGetter(BASE_URL);
const itemPatcher = new APIPatcher(BASE_URL);

export const getObjectList = (params) => listGetter.getList({ searchQuery: 'class', ...params });
export const patchObject = (params) => itemPatcher.patchItem(params);
export const getObject = (params) => itemGetter.getItem(params);

export default {
  getList: getObjectList,
  get: getObject,
  patch: patchObject,
};
