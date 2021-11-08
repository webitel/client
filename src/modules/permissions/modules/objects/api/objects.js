import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';

const baseUrl = '/objclass';

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  class: '',
  obac: false,
  rbac: false,
  id: 0,
};

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance });

export const getObjectList = (params) => listGetter.getList({ searchQuery: 'class', ...params });
export const patchObject = (params) => itemPatcher.patchItem(params);
export const getObject = (params) => itemGetter.getItem(params);

export default {
  getList: getObjectList,
  get: getObject,
  patch: patchObject,
};
