import applyTransform, {
  camelToSnake, generateUrl,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import {
  getDefaultGetParams,
  getDefaultGetListResponse
} from '@webitel/ui-sdk/src/api/defaults/index.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/wfm/lookups/working_conditions`;

const getWorkingConditionList = async (params) => {
  const { search: q, page, size, sort, fields } = applyTransform(params, [
    merge(getDefaultGetParams()),
  ]);

  const url = await applyTransform({ q, page, size, sort, fields}, [
    camelToSnake(),
    generateUrl(baseUrl),
  ]);

  try {
    const response = await fetch(url, {
      headers: {
        'X-Webitel-Access': localStorage.getItem('access-token') || '',
      }
    });
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    const { items, next } = applyTransform(json, [
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

const getWorkingCondition = async ({ itemId }) => {

  try {
    const response = await fetch(`${baseUrl}/${itemId}`, {
      headers: {
        'X-Webitel-Access': localStorage.getItem('access-token') || '',
      }
    });
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    return applyTransform(json, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = ['name', 'description', 'workdayHours', 'workdayPerMonth', 'pauseDuration', 'vacation', 'pauseTemplate', 'sickLeaves', 'shiftTemplate', 'daysOff', 'createdAt', 'createdBy', 'domainId', 'id', 'updatedAt', 'updatedBy'];

const addWorkingCondition = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ item: { ...item } }),
      headers: {
        'X-Webitel-Access': localStorage.getItem('access-token') || '',
      },
    });
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    return applyTransform(json, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateWorkingCondition = async ({ itemInstance, itemId }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await fetch(`${baseUrl}/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ item: { ...item } }),
      headers: {
        'X-Webitel-Access': localStorage.getItem('access-token') || '',
      },
    });
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    return applyTransform(json, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteWorkingCondition = async ({ id }) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Webitel-Access': localStorage.getItem('access-token') || '',
      },
    });
    if (!response.ok) throw new Error(response.status);
    const json = await response.json();

    return applyTransform(json, []);
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
