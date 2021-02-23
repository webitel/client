import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';

const subordinateService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  user: {},
  skills: [],
  _isSelected: false,
};

const subordinateGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SDKListGetter(subordinateService.searchAgent, defaultListObject);
const itemGetter = new SDKItemGetter(subordinateService.readAgent, null,
  subordinateGetterResponseHandler);
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
export const getAgentSubordinate = ({ itemId }) => itemGetter.getItem(itemId);
export const addAgentSubordinate = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { supervisor: { id: parentId } };
  return itemPatcher.patchItem(id, changes);
};
export const deleteAgentSubordinate = ({ id }) => {
  const changes = { supervisor: { id: null } };
  return itemPatcher.patchItem(id, changes);
};
export const updateAgentSubordinate = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addAgentSubordinate({ parentId, itemInstance });
    await deleteAgentSubordinate({ id: itemId });
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getAgentSubordinatesList,
  get: getAgentSubordinate,
  add: addAgentSubordinate,
  update: updateAgentSubordinate,
  delete: deleteAgentSubordinate,
};
