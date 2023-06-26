import { AgentPauseCauseServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
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

const getPauseCauseList = (params) => listGetter.getList(params);
const getPauseCause = (params) => itemGetter.getItem(params);
const addPauseCause = (params) => itemCreator.createItem(params);
const patchPauseCause = (params) => itemPatcher.patchItem(params);
const updatePauseCause = (params) => itemUpdater.updateItem(params);
const deletePauseCause = (params) => itemDeleter.deleteItem(params);

const AgentPauseCauseAPI = {
  getList: getPauseCauseList,
  get: getPauseCause,
  add: addPauseCause,
  patch: patchPauseCause,
  update: updatePauseCause,
  delete: deletePauseCause,
};

export default AgentPauseCauseAPI;
