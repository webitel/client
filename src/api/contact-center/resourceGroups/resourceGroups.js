import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'communication', 'time'];

const defaultSingleObject = {
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

const listGetter = new SDKListGetter(resGrService.searchOutboundResourceGroup);
const itemGetter = new SDKGetter(resGrService.readOutboundResourceGroup,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKItemCreator(resGrService.createOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKItemUpdater(resGrService.updateOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKItemDeleter(resGrService.deleteOutboundResourceGroup);

export const getResGroupList = (params) => listGetter.getList(params);
export const getResGroup = (params) => itemGetter.getItem(params);
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
