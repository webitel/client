import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/old/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const teamSupervisorService = new AgentServiceApiFactory(configuration, '', instance);

const _getTeamSupervisorsList = (getList) => function ({
                                                         page,
                                                         size,
                                                         search,
                                                         parentId,
                                                         sort,
                                                       }) {
  // parent id == team id
  if (!parentId) return;
  const isSupervisor = true;
  const fields = ['id', 'name'];
  const params = [page, size, search, sort, fields, undefined,
    undefined, undefined, parentId, undefined, undefined, isSupervisor];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const _getTeamSupervisorSubordinatesList = (getList) => function ({
                                                                    page,
                                                                    size,
                                                                    search,
                                                                    supervisorId,
                                                                    teamId,
                                                                  }) {
  const fields = ['id', 'user'];
  const params = [page, size, search, undefined, fields, undefined,
    undefined, supervisorId, teamId, undefined, undefined];
  return getList(params);
};

const subordinateGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SdkListGetterApiConsumer(teamSupervisorService.searchAgent)
  .setGetListMethod(_getTeamSupervisorsList);
const itemGetter = new SdkGetterApiConsumer(teamSupervisorService.readAgent, {
  itemResponseHandler: subordinateGetterResponseHandler,
});
const itemPatcher = new SdkPatcherApiConsumer(teamSupervisorService.patchAgent);

const subordinatesListGetter = new SdkListGetterApiConsumer(teamSupervisorService.searchAgent)
  .setGetListMethod(_getTeamSupervisorSubordinatesList);

const getTeamSupervisorsList = (params) => listGetter.getList(params);
const getTeamSupervisor = (params) => itemGetter.getItem(params);
const addTeamSupervisor = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem({ id, changes });
};
const deleteTeamSupervisor = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem({ id, changes });
};
const updateTeamSupervisor = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamSupervisor({ parentId, itemInstance });
    await deleteTeamSupervisor({ id: itemId });
  } catch (err) {
    throw err;
  }
};

const getTeamSupervisorSubordinatesList = (params) => subordinatesListGetter.getList(params);

const TeamSupervisorsAPI = {
  getList: getTeamSupervisorsList,
  get: getTeamSupervisor,
  add: addTeamSupervisor,
  update: updateTeamSupervisor,
  delete: deleteTeamSupervisor,
  getTeamSupervisorSubordinatesList,
};

export default TeamSupervisorsAPI;
