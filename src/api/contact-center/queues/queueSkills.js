import { QueueSkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const queueSkillService = new QueueSkillServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  agent: {},
  minCapacity: 0,
  maxCapacity: 0,
  buckets: [],
  lvl: 0,
  enabled: false,
  _isSelected: false,
};

const defaultObject = {
  agent: {},
  minCapacity: 0,
  maxCapacity: 0,
  buckets: [],
  lvl: 0,
  enabled: false,
  _dirty: false,
};

const fieldsToSend = ['domainId', 'maxCapacity', 'minCapacity', 'queueId',
  'lvl', 'buckets', 'skill', 'enabled'];

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SDKListGetter(queueSkillService.searchQueueSkill, defaultListObject);
const itemGetter = new SDKGetter(queueSkillService.readQueueSkill, defaultObject);
const itemCreator = new SDKCreator(queueSkillService.createQueueSkill,
  fieldsToSend, preRequestHandler);
const itemPatcher = new SDKPatcher(queueSkillService.patchQueueSkill, fieldsToSend);
const itemUpdater = new SDKUpdater(queueSkillService.updateQueueSkill,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(queueSkillService.deleteQueueSkill);

export const getQueueSkillsList = (params) => listGetter.getNestedList(params);
export const getQueueSkill = (params) => itemGetter.getNestedItem(params);
export const addQueueSkill = (params) => itemCreator.createNestedItem(params);
export const patchQueueSkill = (params) => itemPatcher.patchNestedItem(params);
export const updateQueueSkill = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueSkill = (params) => itemDeleter.deleteNestedItem(params);
