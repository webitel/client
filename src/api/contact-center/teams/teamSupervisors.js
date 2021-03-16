import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';

const teamSupervisorService = new AgentServiceApiFactory(configuration, '', instance);

const _getTeamSupervisorsList = (getList) => function ({
                                                         page,
                                                         size,
                                                         search,
                                                         parentId,
                                                       }) {
  // parent id == team id
  if (!parentId) return;
  const isSupervisor = true;
  const fields = ['id', 'name'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
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
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, supervisorId, teamId, undefined, undefined];
  return getList(params);
};

const subordinateGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SDKListGetter(teamSupervisorService.searchAgent)
  .setGetListMethod(_getTeamSupervisorsList);
const itemGetter = new SDKGetter(teamSupervisorService.readAgent, {
  itemResponseHandler: subordinateGetterResponseHandler,
});
const itemPatcher = new SDKPatcher(teamSupervisorService.patchAgent);

const subordinatesListGetter = new SDKListGetter(teamSupervisorService.searchAgent)
  .setGetListMethod(_getTeamSupervisorSubordinatesList);

export const getTeamSupervisorsList = (params) => listGetter.getList(params);
export const getTeamSupervisor = (params) => itemGetter.getItem(params);
export const addTeamSupervisor = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem({ id, changes });
};
export const deleteTeamSupervisor = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem({ id, changes });
};
export const updateTeamSupervisor = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamSupervisor({ parentId, itemInstance });
    await deleteTeamSupervisor({ id: itemId });
  } catch (err) {
    throw err;
  }
};

export const getTeamSupervisorSubordinatesList = (params) => subordinatesListGetter.getList(params);

export default {
  getList: getTeamSupervisorsList,
  get: getTeamSupervisor,
  add: addTeamSupervisor,
  update: updateTeamSupervisor,
  delete: deleteTeamSupervisor,
};
