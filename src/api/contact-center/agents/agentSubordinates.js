import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';

const subordinateService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  user: {},
  skills: [],
  _isSelected: false,
};

const listGetter = new SDKListGetter(subordinateService.searchAgent, defaultListObject);
const itemPatcher = new SDKPatcher(subordinateService.patchAgent);

const getSubordinatesList = (getList) => function ({
                                                     page,
                                                     size,
                                                     search,
                                                     parentId,
                                                   }) {
  const fields = ['id', 'user', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, parentId];
  return getList(params);
};

export const getAgentSubordinatesList = (params) => (
  listGetter
    .setGetListMethod(getSubordinatesList)
    .getList(params)
);
export const addAgentSubordinate = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { supervisor: { id: parentId } };
  return itemPatcher.patchItem(id, changes);
};
export const deleteAgentSubordinate = ({ id }) => {
  const changes = { supervisor: { id: null } };
  return itemPatcher.patchItem(id, changes);
};

export default {
  getList: getAgentSubordinatesList,
  add: addAgentSubordinate,
  delete: deleteAgentSubordinate,
};
