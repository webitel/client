import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { WorkingConditionServiceApi } from 'webitel-sdk';
import {
  getDefaultGetParams,
  getDefaultGetListResponse
} from '@webitel/ui-sdk/src/api/defaults/index.js';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const workingConditionService = new WorkingConditionServiceApi(configuration, '', instance);

const getWorkingConditionList = async (params) => {
  const { search: q, page, size, sort, fields } = applyTransform(params, [
    merge(getDefaultGetParams()),
  ]);

  try {
    const response = await workingConditionService.searchWorkingCondition(q, page, size, sort, fields);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const itemResponseHandler = (item) => {
  return { ...item.item }
};

const getWorkingCondition = async ({ itemId: id }) => {

  try {
    const response = await workingConditionService.readWorkingCondition(id);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = ['name', 'description', 'workdayHours', 'workdayPerMonth', 'pauseDuration', 'vacation', 'pauseTemplate', 'sickLeaves', 'shiftTemplate', 'daysOff'];

const addWorkingCondition = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await workingConditionService.createWorkingCondition({ item: { ...item } });
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateWorkingCondition = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await workingConditionService.updateWorkingCondition(id, { item: { ...item }});
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteWorkingCondition = async ({ id }) => {
  try {
    const response = await workingConditionService.deleteWorkingCondition(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getWorkingConditionLookup = (params) =>
  getWorkingConditionList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const WorkingConditionsAPI = {
  getList: getWorkingConditionList,
  get: getWorkingCondition,
  add: addWorkingCondition,
  update: updateWorkingCondition,
  delete: deleteWorkingCondition,
  getLookup: getWorkingConditionLookup,
}

export default WorkingConditionsAPI;
