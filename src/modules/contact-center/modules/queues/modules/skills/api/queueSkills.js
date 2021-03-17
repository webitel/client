import { QueueSkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKPatcher from '../../../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

const queueSkillService = new QueueSkillServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  agent: {},
  minCapacity: 0,
  maxCapacity: 0,
  buckets: [],
  lvl: 0,
  enabled: false,
};

const defaultSingleObject = {
  agent: {},
  minCapacity: 0,
  maxCapacity: 0,
  buckets: [],
  lvl: 0,
  enabled: false,
};

const fieldsToSend = ['maxCapacity', 'minCapacity', 'queueId', 'lvl', 'buckets', 'skill',
  'enabled'];

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SDKListGetter(queueSkillService.searchQueueSkill, { defaultListObject });
const itemGetter = new SDKGetter(queueSkillService.readQueueSkill, { defaultSingleObject });
const itemCreator = new SDKCreator(queueSkillService.createQueueSkill,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SDKPatcher(queueSkillService.patchQueueSkill, { fieldsToSend });
const itemUpdater = new SDKUpdater(queueSkillService.updateQueueSkill,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(queueSkillService.deleteQueueSkill);

export const getQueueSkillsList = (params) => listGetter.getNestedList(params);
export const getQueueSkill = (params) => itemGetter.getNestedItem(params);
export const addQueueSkill = (params) => itemCreator.createNestedItem(params);
export const patchQueueSkill = (params) => itemPatcher.patchNestedItem(params);
export const updateQueueSkill = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueSkill = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getQueueSkillsList,
  get: getQueueSkill,
  add: addQueueSkill,
  patch: patchQueueSkill,
  update: updateQueueSkill,
  delete: deleteQueueSkill,
};
