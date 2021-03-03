import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import APIGetter from '../../utils/ApiControllers/Getter/ApiGetter';
import APIPatcher from '../../utils/ApiControllers/Patcher/ApiPatcher';
import WebitelAPIDefaultAccess
  from '../../utils/ApiControllers/Permissions/WebitelAPIDefaultAccess';

const BASE_URL = '/objclass';
const BASE_DEFAULTS_URL = '/acl/objclass';

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  class: '',
  obac: false,
  rbac: false,
  id: 0,
};

const listGetter = new APIListGetter(BASE_URL, defaultListObject);
const itemGetter = new APIGetter(BASE_URL);
const itemPatcher = new APIPatcher(BASE_URL);
const defaultAccessList = new WebitelAPIDefaultAccess(BASE_DEFAULTS_URL);

export const getObjectList = (params) => listGetter.getList({ searchQuery: 'class', ...params });
export const patchObject = ({ id, changes }) => itemPatcher.patchItem(id, changes);
export const getObject = ({ itemId }) => itemGetter.getItem(itemId);

export const fetchObjclassDefaultList = async ({ parentId, page, size, search }) => {
  const response = await defaultAccessList.searchObjclassDefaultList(parentId, page, size, search);
  if (Array.isArray(response.items)) {
    const list = response.items.map((item) => ({
      grantee: item.grantee,
      grantor: item.grantor,
      access: {
        r: {
          id: ((item.granted.match(/r/g) || []).length + 1),
          rule: 'r'.repeat((item.granted.match(/r/g) || []).length),
        },
        w: {
          id: ((item.granted.match(/w/g) || []).length + 1),
          rule: 'w'.repeat((item.granted.match(/w/g) || []).length),
        },
        d: {
          id: ((item.granted.match(/d/g) || []).length + 1),
          rule: 'd'.repeat((item.granted.match(/d/g) || []).length),
        },
      },
    }));
    return { list, next: response.next };
  }
  return { list: [], next: false };
};

export const toggleObjclassDefaultMode = (objectId, grantorId, rule) => (
  defaultAccessList.toggleObjclassDefaultMode(objectId, grantorId, rule)
);
