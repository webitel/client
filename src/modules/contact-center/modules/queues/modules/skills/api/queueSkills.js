import { QueueSkillServiceApiFactory } from 'webitel-sdk';
// import {
//   SdkListGetterApiConsumer,
//   SdkGetterApiConsumer,
//   SdkCreatorApiConsumer,
//   SdkUpdaterApiConsumer,
//   SdkPatcherApiConsumer,
//   SdkDeleterApiConsumer,
// } from 'webitel-sdk/esm2015/api-consumers';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch, log,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueSkillService = new QueueSkillServiceApiFactory(configuration, '', instance);

// const defaultListObject = {
//   agent: {},
//   minCapacity: 0,
//   maxCapacity: 0,
//   buckets: [],
//   lvl: 0,
//   enabled: false,
// };

// const defaultSingleObject = {
//   agent: {},
//   minCapacity: 0,
//   maxCapacity: 0,
//   buckets: [],
//   lvl: 0,
//   enabled: false,
// };

const doNotConvertKeys = ['variables'];

const fieldsToSend = ['maxCapacity', 'minCapacity', 'queueId', 'lvl', 'buckets', 'skill',
  'enabled'];

const preRequestHandler = (item, parentId) => {
  console.log(item, 'parentId:', parentId);
  console.log({ ...item, queueId: parentId });
  return { ...item, queueId: parentId }
};

// const listGetter = new SdkListGetterApiConsumer(queueSkillService.searchQueueSkill,
//   { defaultListObject });
export const getQueueSkillsList = async (params) => {

  const defaultObject = {
    agent: {},
    minCapacity: 0,
    maxCapacity: 0,
    buckets: [],
    lvl: 0,
    enabled: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    parentId,
    skillId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await queueSkillService.searchQueueSkill(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      id,
      skillId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemGetter = new SdkGetterApiConsumer(queueSkillService.readQueueSkill,
//   { defaultSingleObject });
export const getQueueSkill = async ({ parentId, itemId: id }) => {

  const defaultObject = {
    agent: {},
    minCapacity: 0,
    maxCapacity: 0,
    buckets: [],
    lvl: 0,
    enabled: false,
  };

  try {
    const response = await queueSkillService.readQueueSkill(parentId, id);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemCreator = new SdkCreatorApiConsumer(queueSkillService.createQueueSkill,
//   { fieldsToSend, preRequestHandler });
export const addQueueSkill = async ({ parentId, itemInstance }) => {
  console.log('parentId add:', parentId);
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueSkillService.createQueueSkill(parentId, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemPatcher = new SdkPatcherApiConsumer(queueSkillService.patchQueueSkill,
//   { fieldsToSend });
export const patchQueueSkill = async ({ changes, itemId: id, parentId }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueSkillService.patchQueueSkill(parentId, id, body);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemUpdater = new SdkUpdaterApiConsumer(queueSkillService.updateQueueSkill,
//   { fieldsToSend, preRequestHandler });
export const updateQueueSkill = async ({ itemInstance, itemId: id, parentId}) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueSkillService.updateQueueSkill(parentId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemDeleter = new SdkDeleterApiConsumer(queueSkillService.deleteQueueSkill);
export const deleteQueueSkill = async ({ parentId, id }) => {
  try {
    const response = await queueSkillService.deleteQueueSkill(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const QueueSkillsAPI = {
  getList: getQueueSkillsList,
  get: getQueueSkill,
  add: addQueueSkill,
  patch: patchQueueSkill,
  update: updateQueueSkill,
  delete: deleteQueueSkill,
};

export default QueueSkillsAPI;
