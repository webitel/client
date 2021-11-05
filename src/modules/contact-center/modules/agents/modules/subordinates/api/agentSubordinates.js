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
                                                     sort,
                                                     parentId,
                                                   }) {
  const fields = ['id', 'name', 'supervisor', 'skills'];
  const params = [page, size, search, sort, fields, undefined,
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
  const { id, supervisor } = itemInstance.agent;
  // Set and .map() from obj to string and backwards is used to prevent duplicates
  const newSupervisor = [
    ...new Set(supervisor.map((sup) => sup.id).concat(parentId)),
  ].map((id) => ({ id }));
  const changes = { supervisor: newSupervisor };
  return itemPatcher.patchItem({ id, changes });
};
export const deleteAgentSubordinate = ({ id, parentId, dataList }) => {
  /* deleted subordinate is in dataList,
   so first we should find it and retrieve his supervisors list */
  const subordinate = dataList.find((sup) => sup.id === id);
  const newSupervisor = subordinate.supervisor.filter(({ id }) => id !== parentId);
  const changes = { supervisor: newSupervisor };
  return itemPatcher.patchItem({ id, changes });
};
export const updateAgentSubordinate = async ({
                                               parentId,
                                               itemId,
                                               itemInstance,
                                               dataList,
                                             }) => {
  try {
    await addAgentSubordinate({ parentId, itemInstance });
    await deleteAgentSubordinate({ id: itemId, parentId, dataList });
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
