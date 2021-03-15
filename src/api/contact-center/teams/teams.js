import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

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

const listGetter = new SDKListGetter(teamService.searchAgentTeam);
const itemGetter = new SDKItemGetter(teamService.readAgentTeam, defaultObject);
const itemCreator = new SDKItemCreator(teamService.createAgentTeam, fieldsToSend);
const itemUpdater = new SDKItemUpdater(teamService.updateAgentTeam, fieldsToSend);
const itemDeleter = new SDKItemDeleter(teamService.deleteAgentTeam);

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
