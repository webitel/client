import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import APIPermissionsGetter
  from '../../../../../../../app/api/old/PermissionsAPIService/APIPermissionsGetter';

const baseUrl = '/acl/objclass';

const _getObjclassDefaultList = (method) => function(params) {
  const baseUrl = `${this.baseUrl}/${params.parentId}`;
  return method(params, baseUrl);
};

// const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, {
//   listResponseHandler: APIPermissionsGetter.handlePermissionsListResponse,
// }).setGetListMethod(_getObjclassDefaultList);
export const getObjclassDefaultList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const defaultObject = {
    // default object prototype, to merge response with it to get all fields
    class: '',
    obac: false,
    rbac: false,
    id: 0,
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const itemPatcher = new EndpointPatcherApiConsumer({
//   baseUrl,
//   instance,
// }, { nestedUrl: 'grantor' });
export const patchObjclassDefaultMode = (params) => itemPatcher.patchNestedItem(params);
