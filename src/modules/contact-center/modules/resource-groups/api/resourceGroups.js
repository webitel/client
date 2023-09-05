import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, notify, sanitize, snakeToCamel,
  starToSearch, log,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'strategy', 'communication', 'time'];

// const defaultSingleObject = {
//   name: '',
//   strategy: '',
//   description: '',
//   communication: {},
//   time: [
//     {
//       start: 0,
//       finish: 0,
//     },
//   ],
// };


const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  copy.time = copy.time.map((range) => ({
    startTimeOfDay: range.start,
    endTimeOfDay: range.end,
  }));
  return copy;
};

// const listGetter = new SdkListGetterApiConsumer(resGrService.searchOutboundResourceGroup);
const getResGroupList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await resGrService.searchOutboundResourceGroup(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemGetter = new SdkGetterApiConsumer(resGrService.readOutboundResourceGroup,
//   { defaultSingleObject, itemResponseHandler });
const getResGroup = async ({ itemId: id }) => {
  const defaultObject = {
      name: '',
      strategy: '',
      description: '',
      communication: {},
      time: [
        {
          start: 0,
          finish: 0,
        },
      ],
  };

  const responseHandler = (response) => {
    const time = response.time.map((range) => ({
      start: range.startTimeOfDay || 0,
      end: range.endTimeOfDay || 0,
    }));
    return { ...response, time };
  };

  try {
    const response = await resGrService.readOutboundResourceGroup(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemCreator = new SdkCreatorApiConsumer(resGrService.createOutboundResourceGroup,
//   { fieldsToSend, preRequestHandler });
const addResGroup = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resGrService.createOutboundResourceGroup(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemUpdater = new SdkUpdaterApiConsumer(resGrService.updateOutboundResourceGroup,
//   { fieldsToSend, preRequestHandler });
const updateResGroup = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    log,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resGrService.updateOutboundResourceGroup(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


const deleteResGroup = async ({ id }) => {
  try {
    const response = await resGrService.deleteOutboundResourceGroup(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


const getResGroupsLookup = (params) => getResGroupList({
   ...params,
   fields: params.fields || ['id', 'name'],
  });

const ResourceGroupsAPI = {
  getList: getResGroupList,
  get: getResGroup,
  add: addResGroup,
  update: updateResGroup,
  delete: deleteResGroup,
  getLookup: getResGroupsLookup,
};

export default ResourceGroupsAPI;
