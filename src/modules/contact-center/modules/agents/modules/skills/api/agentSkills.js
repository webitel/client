import { AgentSkillServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

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

const listGetter = new SdkListGetterApiConsumer(agentSkillService.searchAgentSkill,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(agentSkillService.readAgentSkill,
  { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(agentSkillService.createAgentSkill,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SdkPatcherApiConsumer(agentSkillService.patchAgentSkill, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(agentSkillService.updateAgentSkill,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(agentSkillService.deleteAgentSkill);

export const getAgentSkillsList = (params) => listGetter.getNestedList(params);
export const getAgentSkill = (params) => itemGetter.getNestedItem(params);
export const addAgentSkill = (params) => itemCreator.createNestedItem(params);
export const patchAgentSkill = (params) => itemPatcher.patchNestedItem(params);
export const updateAgentSkill = (params) => itemUpdater.updateNestedItem(params);
export const deleteAgentSkill = (params) => itemDeleter.deleteNestedItem(params);

const AgentSkillsAPI = {
  getList: getAgentSkillsList,
  get: getAgentSkill,
  add: addAgentSkill,
  patch: patchAgentSkill,
  update: updateAgentSkill,
  delete: deleteAgentSkill,
};

export default AgentSkillsAPI;
