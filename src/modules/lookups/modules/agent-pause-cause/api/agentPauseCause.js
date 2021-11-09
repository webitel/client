import { AgentPauseCauseServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const pauseCauseService = new AgentPauseCauseServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'limitMin', 'allowAdmin', 'allowSupervisor', 'allowAgent', 'description'];

const defaultListObject = {
  name: '',
  limitMin: 0,
  allowAdmin: false,
  allowSupervisor: false,
  allowAgent: false,
};

const defaultSingleObject = {
  name: '',
  limitMin: 0,
  allowAdmin: false,
  allowSupervisor: false,
  allowAgent: false,
};

const listGetter = new SdkListGetterApiConsumer(pauseCauseService.searchAgentPauseCause,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(pauseCauseService.readAgentPauseCause,
  { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(pauseCauseService.createAgentPauseCause,
  { fieldsToSend });
const itemPatcher = new SdkPatcherApiConsumer(pauseCauseService.patchAgentPauseCause,
  { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(pauseCauseService.updateAgentPauseCause,
  { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(pauseCauseService.deleteAgentPauseCause);

export const getPauseCauseList = (params) => listGetter.getList(params);
export const getPauseCause = (params) => itemGetter.getItem(params);
export const addPauseCause = (params) => itemCreator.createItem(params);
export const patchPauseCause = (params) => itemPatcher.patchItem(params);
export const updatePauseCause = (params) => itemUpdater.updateItem(params);
export const deletePauseCause = (params) => itemDeleter.deleteItem(params);

const AgentPauseCauseAPI = {
  getList: getPauseCauseList,
  get: getPauseCause,
  add: addPauseCause,
  patch: patchPauseCause,
  update: updatePauseCause,
  delete: deletePauseCause,
};

export default AgentPauseCauseAPI;
