import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'communication', 'time'];

const defaultItemObject = {
  name: '',
  strategy: '',
  description: '',
  communication: {},
  time: [
    {
      start: 0,
      finish: 0,
    },
  ],
  _dirty: false,
};

const itemResponseHandler = (response) => {
    const time = response.time.map((range) => ({
      start: range.startTimeOfDay || 0,
      end: range.endTimeOfDay || 0,
    }));

    return { ...response, time };
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.time = item.time.map((range) => ({
    startTimeOfDay: range.start,
    endTimeOfDay: range.end,
  }));
  return item;
};

const listGetter = new WebitelSDKListGetter(resGrService.searchOutboundResourceGroup);
const itemGetter = new WebitelSDKItemGetter(resGrService.readOutboundResourceGroup,
  defaultItemObject, itemResponseHandler);
const itemCreator = new WebitelSDKItemCreator(resGrService.createOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(resGrService.updateOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelSDKItemDeleter(resGrService.deleteOutboundResourceGroup);

export const getResGroupList = (params) => listGetter.getList(params);
export const getResGroup = ({ itemId }) => itemGetter.getItem(itemId);
export const addResGroup = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateResGroup = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteResGroup = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getResGroupList,
  get: getResGroup,
  add: addResGroup,
  update: updateResGroup,
  delete: deleteResGroup,
};
