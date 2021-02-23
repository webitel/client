import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKItemPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';

const teamSupervisorService = new AgentServiceApiFactory(configuration, '', instance);

const listGetter = new SDKListGetter(teamSupervisorService.searchAgent);
const itemGetter = new SDKItemGetter(teamSupervisorService.readAgent);
const itemPatcher = new SDKItemPatcher(teamSupervisorService.patchAgent);

const subordinatesListGetter = new SDKListGetter(teamSupervisorService.searchAgent);

const _getTeamSupervisorsList = (getList) => function ({
                                                         page,
                                                         size,
                                                         search,
                                                         parentId,
                                                       }) {
  // parent id == team id
  const isSupervisor = true;
  const fields = ['id', 'user'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, parentId, undefined, undefined, isSupervisor];
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

export const getTeamSupervisorsList = (params) => (
  listGetter
    .setGetListMethod(_getTeamSupervisorsList)
    .getList(params)
);
export const getTeamSupervisor = ({ itemId }) => itemGetter.getItem(itemId);
export const addTeamSupervisor = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.user;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem(id, changes);
};
export const deleteTeamSupervisor = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem(id, changes);
};
export const updateTeamSupervisor = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamSupervisor({ parentId, itemInstance });
    await deleteTeamSupervisor({ id: itemId });
  } catch (err) {
    throw err;
  }
};

export const getTeamSupervisorSubordinatesList = (params) => (
  subordinatesListGetter
    .setGetListMethod(_getTeamSupervisorSubordinatesList)
    .getList(params)
);

export default {
  getList: getTeamSupervisorsList,
  get: getTeamSupervisor,
  add: addTeamSupervisor,
  update: updateTeamSupervisor,
  delete: deleteTeamSupervisor,
};
