import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'admin', 'maxNoAnswer', 'wrapUpTime',
  'noAnswerDelayTime', 'callTimeout'];

const defaultObject = {
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
  _dirty: false,
};

const listGetter = new WebitelSDKListGetter(teamService.searchAgentTeam);
const itemGetter = new WebitelSDKItemGetter(teamService.readAgentTeam, defaultObject);
const itemCreator = new WebitelSDKItemCreator(teamService.createAgentTeam, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(teamService.updateAgentTeam, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(teamService.deleteAgentTeam);

export const getTeamsList = (params) => listGetter.getList(params);
export const getTeam = ({ itemId }) => itemGetter.getItem(itemId);
export const addTeam = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateTeam = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteTeam = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getTeamsList,
  get: getTeam,
  add: addTeam,
  update: updateTeam,
  delete: deleteTeam,
};
