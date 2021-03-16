import { AgentSkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const agentSkillService = new AgentSkillServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  skill: {},
  capacity: 0,
  enabled: false,
};

const defaultSingleObject = {
  skill: {},
  capacity: 0,
  enabled: false,
};

const fieldsToSend = ['capacity', 'agentId', 'skill', 'enabled'];

const preRequestHandler = (item, parentId) => ({ ...item, agentId: parentId });

const listGetter = new SDKListGetter(agentSkillService.searchAgentSkill, { defaultListObject });
const itemGetter = new SDKGetter(agentSkillService.readAgentSkill, { defaultSingleObject });
const itemCreator = new SDKCreator(agentSkillService.createAgentSkill,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SDKPatcher(agentSkillService.patchAgentSkill, { fieldsToSend });
const itemUpdater = new SDKUpdater(agentSkillService.updateAgentSkill,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(agentSkillService.deleteAgentSkill);

export const getAgentSkillsList = (params) => listGetter.getNestedList(params);
export const getAgentSkill = (params) => itemGetter.getNestedItem(params);
export const addAgentSkill = (params) => itemCreator.createNestedItem(params);
export const patchAgentSkill = (params) => itemPatcher.patchNestedItem(params);
export const updateAgentSkill = (params) => itemUpdater.updateNestedItem(params);
export const deleteAgentSkill = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getAgentSkillsList,
  get: getAgentSkill,
  add: addAgentSkill,
  patch: patchAgentSkill,
  update: updateAgentSkill,
  delete: deleteAgentSkill,
};
