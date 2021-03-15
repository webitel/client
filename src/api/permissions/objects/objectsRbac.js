import ApiListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import ApiPatcher from '../../utils/ApiControllers/Patcher/ApiPatcher';
import APIPermissionsGetter
  from '../../utils/ApiControllers/Permissions/APIPermissionsGetter';

const BASE_URL = '/acl/objclass';

const _getObjclassDefaultList = (method) => function (params) {
  const baseUrl = `${this.baseUrl}/${params.parentId}`;
  return method(params, baseUrl);
};

const listGetter = new ApiListGetter(BASE_URL, {
  responseHandler: APIPermissionsGetter.handlePermissionsListResponse,
}).setGetListMethod(_getObjclassDefaultList);
const itemPatcher = new ApiPatcher(BASE_URL, { nestedUrl: 'grantor' });

export const getObjclassDefaultList = (params) => listGetter.getList(params);
export const patchObjclassDefaultMode = (params) => itemPatcher.patchNestedItem(params);
