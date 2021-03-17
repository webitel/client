import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'admin', 'maxNoAnswer', 'wrapUpTime',
  'noAnswerDelayTime', 'callTimeout'];

const defaultSingleObject = {
  name: '',
  strategy: {},
  admin: {},
  description: '',
  busyDelayTime: 0,
  callTimeout: 0,
  maxNoAnswer: 0,
  noAnswerDelayTime: 0,
  rejectDelayTime: 0,
  wrapUpTime: 0,
};

const listGetter = new SDKListGetter(teamService.searchAgentTeam);
const itemGetter = new SDKGetter(teamService.readAgentTeam, { defaultSingleObject });
const itemCreator = new SDKCreator(teamService.createAgentTeam, fieldsToSend);
const itemUpdater = new SDKUpdater(teamService.updateAgentTeam, fieldsToSend);
const itemDeleter = new SDKDeleter(teamService.deleteAgentTeam);

export const getTeamsList = (params) => listGetter.getList(params);
export const getTeam = (params) => itemGetter.getItem(params);
export const addTeam = (params) => itemCreator.createItem(params);
export const updateTeam = (params) => itemUpdater.updateItem(params);
export const deleteTeam = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getTeamsList,
  get: getTeam,
  add: addTeam,
  update: updateTeam,
  delete: deleteTeam,
};
