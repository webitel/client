import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
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
import TriggerTypes from '../lookups/TriggerTypes.lookup';

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
  'expression',
];

const defaultListObject = {
  enabled: false,
};

const defaultSingleObject = {
  timeout: 0,
  variables: {},
};

const itemResponseHandler = (response) => {
  if (response.variables) {
    // eslint-disable-next-line no-param-reassign
    response.variables = Object.keys(response.variables)
    .map((key) => ({
      key,
      value: response.variables[key],
    }));
  }
  return {
    ...response,
    type: TriggerTypes.find(({ value }) => value === response.type),
  };
};
const preRequestHandler = (item) => {
  item.variables = item.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  return {
    ...item,
    type: item.type.value,
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

const startTrigger = async (params, item) => {
  const url = `/trigger/${item.id}/job`;

  try {
    const response = await instance.post(url, item);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    return response;
  } catch (err) {
    throw err;
  }
};

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
  start: startTrigger,
};

export default TriggersAPI;
