import { AgentPauseCauseServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

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
const itemCreator = new SDKCreator(pauseCauseService.createAgentPauseCause, fieldsToSend);
const itemPatcher = new SDKPatcher(pauseCauseService.patchAgentPauseCause, fieldsToSend);
const itemUpdater = new SDKUpdater(pauseCauseService.updateAgentPauseCause, fieldsToSend);
const itemDeleter = new SDKDeleter(pauseCauseService.deleteAgentPauseCause);

export const getPauseCauseList = (params) => listGetter.getList(params);
export const getPauseCause = (params) => itemGetter.getItem(params);
export const addPauseCause = (params) => itemCreator.createItem(params);
export const patchPauseCause = (params) => itemPatcher.patchItem(params);
export const updatePauseCause = (params) => itemUpdater.updateItem(params);
export const deletePauseCause = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getPauseCauseList,
  get: getPauseCause,
  add: addPauseCause,
  patch: patchPauseCause,
  update: updatePauseCause,
  delete: deletePauseCause,
};
