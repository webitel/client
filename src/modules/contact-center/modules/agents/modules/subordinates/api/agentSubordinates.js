import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/old/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

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

const listGetter = new SdkListGetterApiConsumer(subordinateService.searchAgent,
  { defaultListObject })
  .setGetListMethod(getSubordinatesList);
const itemGetter = new SdkGetterApiConsumer(subordinateService.readAgent, {
  itemResponseHandler: subordinateGetterResponseHandler,
});
const itemPatcher = new SdkPatcherApiConsumer(subordinateService.patchAgent);

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

const AgentSubordinatesAPI = {
  getList: getAgentSubordinatesList,
  get: getAgentSubordinate,
  add: addAgentSubordinate,
  update: updateAgentSubordinate,
  delete: deleteAgentSubordinate,
};

export default AgentSubordinatesAPI;
