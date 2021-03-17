import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKPatcher from '../../../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';

const subordinateService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  skills: [],
};

const getSubordinatesList = (getList) => function ({
                                                     page,
                                                     size,
                                                     search,
                                                     parentId,
                                                   }) {
  const fields = ['id', 'name', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, parentId];
  return getList(params);
};

const subordinateGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SDKListGetter(subordinateService.searchAgent, { defaultListObject })
  .setGetListMethod(getSubordinatesList);
const itemGetter = new SDKGetter(subordinateService.readAgent, {
  itemResponseHandler: subordinateGetterResponseHandler,
});
const itemPatcher = new SDKPatcher(subordinateService.patchAgent);

export const getAgentSubordinatesList = (params) => listGetter.getList(params);
export const getAgentSubordinate = (params) => itemGetter.getItem(params);
export const addAgentSubordinate = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { supervisor: { id: parentId } };
  return itemPatcher.patchItem({ id, changes });
};
export const deleteAgentSubordinate = ({ id }) => {
  const changes = { supervisor: { id: null } };
  return itemPatcher.patchItem({ id, changes });
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
