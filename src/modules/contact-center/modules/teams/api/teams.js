import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'admin', 'maxNoAnswer', 'wrapUpTime',
  'noAnswerDelayTime', 'callTimeout'];

const defaultSingleObject = {
  name: '',
  strategy: {},
  admin: [],
  description: '',
  busyDelayTime: 0,
  callTimeout: 0,
  maxNoAnswer: 0,
  noAnswerDelayTime: 0,
  rejectDelayTime: 0,
  wrapUpTime: 0,
};

const listGetter = new SdkListGetterApiConsumer(teamService.searchAgentTeam);
const itemGetter = new SdkGetterApiConsumer(teamService.readAgentTeam, { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(teamService.createAgentTeam, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(teamService.updateAgentTeam, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(teamService.deleteAgentTeam);

export const getTeamsList = (params) => listGetter.getList(params);
export const getTeam = (params) => itemGetter.getItem(params);
export const addTeam = (params) => itemCreator.createItem(params);
export const updateTeam = (params) => itemUpdater.updateItem(params);
export const deleteTeam = (params) => itemDeleter.deleteItem(params);
const getTeamsLookup = (params) => listGetter.getLookup(params);

const TeamsAPI = {
  getList: getTeamsList,
  get: getTeam,
  add: addTeam,
  update: updateTeam,
  delete: deleteTeam,
  getLookup: getTeamsLookup,
};

export default TeamsAPI;
