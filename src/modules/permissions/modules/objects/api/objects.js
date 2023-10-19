import {
  EndpointGetterApiConsumer,
  EndpointListGetterApiConsumer,
  EndpointPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';

const baseUrl = '/objclass';

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  class: '',
  obac: false,
  rbac: false,
  id: 0,
};

const listGetter = new EndpointListGetterApiConsumer({
  baseUrl,
  instance,
}, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance });

const getObjectList = (params) => listGetter.getList({ searchQuery: 'class', ...params });
const patchObject = (params) => itemPatcher.patchItem(params);
const getObject = (params) => itemGetter.getItem(params);

const ObjectsAPI = {
  getList: getObjectList,
  get: getObject,
  patch: patchObject,
};

export default ObjectsAPI;
