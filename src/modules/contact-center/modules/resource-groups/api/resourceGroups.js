import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';

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

const listGetter = new SdkListGetterApiConsumer(resGrService.searchOutboundResourceGroup);
const itemGetter = new SdkGetterApiConsumer(resGrService.readOutboundResourceGroup,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SdkCreatorApiConsumer(resGrService.createOutboundResourceGroup,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(resGrService.updateOutboundResourceGroup,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(resGrService.deleteOutboundResourceGroup);

const getResGroupList = (params) => listGetter.getList(params);
const getResGroup = (params) => itemGetter.getItem(params);
const addResGroup = (params) => itemCreator.createItem(params);
const updateResGroup = (params) => itemUpdater.updateItem(params);
const deleteResGroup = (params) => itemDeleter.deleteItem(params);
const getResGroupsLookup = (params) => listGetter.getLookup(params);

const ResourceGroupsAPI = {
  getList: getResGroupList,
  get: getResGroup,
  add: addResGroup,
  update: updateResGroup,
  delete: deleteResGroup,
  getLookup: getResGroupsLookup,
};

export default ResourceGroupsAPI;
