import {
  EndpointListGetterApiConsumer,
  EndpointPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/old/instance';
import APIPermissionsGetter
  from '../../../../../../../app/api/old/PermissionsAPIService/APIPermissionsGetter';

const baseUrl = '/acl/objclass';

const _getObjclassDefaultList = (method) => function (params) {
  const baseUrl = `${this.baseUrl}/${params.parentId}`;
  return method(params, baseUrl);
};

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, {
  listResponseHandler: APIPermissionsGetter.handlePermissionsListResponse,
}).setGetListMethod(_getObjclassDefaultList);
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { nestedUrl: 'grantor' });

export const getObjclassDefaultList = (params) => listGetter.getList(params);
export const patchObjclassDefaultMode = (params) => itemPatcher.patchNestedItem(params);
