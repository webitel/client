import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['groupId', 'name', 'description', 'resource', 'reserveResource', 'priority'];

const preRequestHandler = (item, parentId) => ({ ...item, groupId: parentId });

const listGetter = new SdkListGetterApiConsumer(resGrService.searchOutboundResourceInGroup);
const itemGetter = new SdkGetterApiConsumer(resGrService.readOutboundResourceInGroup);
const itemCreator = new SdkCreatorApiConsumer(resGrService.createOutboundResourceInGroup,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(resGrService.updateOutboundResourceInGroup,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(resGrService.deleteOutboundResourceInGroup);

export const getResInGroupList = (params) => listGetter.getNestedList(params);
export const getResInGroup = (params) => itemGetter.getNestedItem(params);
export const addResInGroup = (params) => itemCreator.createNestedItem(params);
export const updateResInGroup = (params) => itemUpdater.updateNestedItem(params);
export const deleteResInGroup = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getResInGroupList,
  get: getResInGroup,
  add: addResInGroup,
  update: updateResInGroup,
  delete: deleteResInGroup,
};
