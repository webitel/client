import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import applyTransform, {
  camelToSnake,
  merge, mergeEach, notify,
  sanitize, snakeToCamel,
  starToSearch
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['display', 'resourceId'];

const preRequestHandler = (parentId) => (item) => ({ ...item, resourceId: parentId });

// const listGetter = new SdkListGetterApiConsumer(resService.searchOutboundResourceDisplay);
const getResDisplayList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    parentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await resService.searchOutboundResourceDisplay(
      parentId,
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

// const itemGetter = new SdkGetterApiConsumer(resService.readOutboundResourceDisplay);
const getResDisplay = async ({ parentId, itemId: id }) => {
  try {
    const response = await resService.readOutboundResourceDisplay(parentId, id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const itemCreator = new SdkCreatorApiConsumer(resService.createOutboundResourceDisplay,
//   { fieldsToSend, preRequestHandler });
const addResDisplay = async ({ parentId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resService.createOutboundResourceDisplay(parentId, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const itemUpdater = new SdkUpdaterApiConsumer(resService.updateOutboundResourceDisplay,
//   { fieldsToSend, preRequestHandler });
const updateResDisplay = async ({ itemInstance, itemId: id, parentId }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resService.updateOutboundResourceDisplay(parentId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const itemDeleter = new SdkDeleterApiConsumer(resService.deleteOutboundResourceDisplay);
const deleteResDisplay = async ({ parentId, id }) => {
  try {
    const response = await resService.deleteOutboundResourceDisplay(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

export default {
  getList: getResDisplayList,
  get: getResDisplay,
  add: addResDisplay,
  update: updateResDisplay,
  delete: deleteResDisplay,
};
