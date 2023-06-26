import { QueueSkillServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/old/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

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

const listGetter = new SdkListGetterApiConsumer(queueSkillService.searchQueueSkill,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(queueSkillService.readQueueSkill,
  { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(queueSkillService.createQueueSkill,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SdkPatcherApiConsumer(queueSkillService.patchQueueSkill, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(queueSkillService.updateQueueSkill,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(queueSkillService.deleteQueueSkill);

export const getQueueSkillsList = (params) => listGetter.getNestedList(params);
export const getQueueSkill = (params) => itemGetter.getNestedItem(params);
export const addQueueSkill = (params) => itemCreator.createNestedItem(params);
export const patchQueueSkill = (params) => itemPatcher.patchNestedItem(params);
export const updateQueueSkill = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueSkill = (params) => itemDeleter.deleteNestedItem(params);

const QueueSkillsAPI = {
  getList: getQueueSkillsList,
  get: getQueueSkill,
  add: addQueueSkill,
  patch: patchQueueSkill,
  update: updateQueueSkill,
  delete: deleteQueueSkill,
};

export default QueueSkillsAPI;
