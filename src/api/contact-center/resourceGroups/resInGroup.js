import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['groupId', 'name', 'description', 'resource'];

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
