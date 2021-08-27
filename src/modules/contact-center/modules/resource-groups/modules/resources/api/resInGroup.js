import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['groupId', 'name', 'description', 'resource', 'reserveResource', 'priority'];

const preRequestHandler = (item, parentId) => ({ ...item, groupId: parentId });

const listGetter = new SDKListGetter(resGrService.searchOutboundResourceInGroup);
const itemGetter = new SDKGetter(resGrService.readOutboundResourceInGroup);
const itemCreator = new SDKCreator(resGrService.createOutboundResourceInGroup,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(resGrService.updateOutboundResourceInGroup,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(resGrService.deleteOutboundResourceInGroup);

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
