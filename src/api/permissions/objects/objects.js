import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import WebitelAPIPermissionsGetter
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import WebitelAPIDefaultAccess
  from '../../utils/ApiControllers/Permissions/WebitelAPIDefaultAccess';

const BASE_URL = '/objclass';
const BASE_DEFAULTS_URL = '/acl/objclass';

const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);
const permissionsDefaultsPatcher = new WebitelAPIDefaultAccess(BASE_DEFAULTS_URL);
const defaultAccessList = new WebitelAPIDefaultAccess(BASE_DEFAULTS_URL);

export const getObjectList = async (search, page = 1, size = 10) => {
  const defaultObject = { // default object prototype, to merge response with it to get all fields
    class: '',
    obac: false,
    rbac: false,
    id: 0,
  };

  let url = BASE_URL;

  url += `?size=${size}`;
  url += `&page=${page}`;
  if (search) {
    url += '&class=' + search;
    if (search.slice(-1) != '*') url += '*';
  }

  try {
    const response = await instance.get(url);
    return {
      list: response.items.map((item) => ({ ...defaultObject, ...item })),
      next: response.next,
    };
  } catch (error) {
    throw error;
  }
};

export const updateObject = async (id, changes) => {
  const url = `${BASE_URL}/${id}`;
  try {
    await instance.put(url, changes);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (error) {
    throw error;
  }
};

export const updateObacObject = async (id, changes) => {
  const url = `${BASE_URL}/${id}/acl`;
  try {
    await instance.put(url, changes);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (error) {
    throw error;
  }
};


export const getObject = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getObjectPermissions = ({ id, page, size, search }) => (
  permissionsGetter.getList(id, page, size, search)
);

export const patchObjectPermissions = (id, item) => permissionsPatcher.patchItem(id, item);

export const patchObjectDefaultPermissions = async (id, grantorId, item) => await permissionsDefaultsPatcher.patchDefaultItem(id, grantorId, item);

export const fetchObjclassDefaultList = async ({ id, page, size, search }) => {
  const response = await defaultAccessList.searchObjclassDefaultList(id, page, size, search);
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
  return [];
};

export const toggleObjclassDefaultMode = (objectId, grantorId, rule) => defaultAccessList.toggleObjclassDefaultMode(objectId, grantorId, rule);
