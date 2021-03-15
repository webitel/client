import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
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
const itemCreator = new SDKCreator(resGrService.createOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKUpdater(resGrService.updateOutboundResourceGroup,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(resGrService.deleteOutboundResourceGroup);

export const getResGroupList = (params) => listGetter.getList(params);
export const getResGroup = (params) => itemGetter.getItem(params);
export const addResGroup = (params) => itemCreator.createItem(params);
export const updateResGroup = (params) => itemUpdater.updateItem(params);
export const deleteResGroup = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getResGroupList,
  get: getResGroup,
  add: addResGroup,
  update: updateResGroup,
  delete: deleteResGroup,
};
