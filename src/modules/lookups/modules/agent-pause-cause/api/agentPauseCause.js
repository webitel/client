import { AgentPauseCauseServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKPatcher from '../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

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

const listGetter = new SDKListGetter(pauseCauseService.searchAgentPauseCause,
  { defaultListObject });
const itemGetter = new SDKGetter(pauseCauseService.readAgentPauseCause, { defaultSingleObject });
const itemCreator = new SDKCreator(pauseCauseService.createAgentPauseCause, { fieldsToSend });
const itemPatcher = new SDKPatcher(pauseCauseService.patchAgentPauseCause, { fieldsToSend });
const itemUpdater = new SDKUpdater(pauseCauseService.updateAgentPauseCause, { fieldsToSend });
const itemDeleter = new SDKDeleter(pauseCauseService.deleteAgentPauseCause);

export const getPauseCauseList = (params) => listGetter.getList(params);
export const getPauseCause = (params) => itemGetter.getItem(params);
export const addPauseCause = (params) => itemCreator.createItem(params);
export const patchPauseCause = (params) => itemPatcher.patchItem(params);
export const updatePauseCause = (params) => itemUpdater.updateItem(params);
export const deletePauseCause = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getPauseCauseList,
  get: getPauseCause,
  add: addPauseCause,
  patch: patchPauseCause,
  update: updatePauseCause,
  delete: deletePauseCause,
};
