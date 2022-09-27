import { TriggerServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const triggersService = new TriggerServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'description',
  'enabled',
  'id',
  'name',
  'schema',
  'timeout',
  'timezone',
  'type',
  'variables',
];

const defaultListObject = {
  enabled: false,
};

const defaultSingleObject = {
  id: 0,
  timeout: 60,
};

const itemResponseHandler = (response) => {
  return {
    ...response,
  };
};
const preRequestHandler = (item) => {
  return {
    ...item,
  };
};
const listGetter = new SdkListGetterApiConsumer(
  triggersService.searchTrigger,
  {
    defaultListObject,
  },
);
const itemGetter = new SdkGetterApiConsumer(
  triggersService.readTrigger,
  {
    defaultSingleObject,
    itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  triggersService.createTrigger,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemPatcher = new SdkPatcherApiConsumer(
  triggersService.patchTrigger,
  { fieldsToSend },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  triggersService.updateTrigger,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemDeleter = new SdkDeleterApiConsumer(triggersService.deleteTrigger);

const getList = (params) => listGetter.getList(params);
const get = (params) => itemGetter.getItem(params);
const add = (params) => itemCreator.createItem(params);
const patch = (params) => itemPatcher.patchItem(params);
const update = (params) => itemUpdater.updateItem(params);
const deleteItem = (params) => itemDeleter.deleteItem(params);

const getLookup = (params) => listGetter.getLookup(params);

const TriggersAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
};

export default TriggersAPI;
