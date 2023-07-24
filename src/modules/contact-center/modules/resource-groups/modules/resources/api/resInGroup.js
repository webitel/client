import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import deepCopy from 'deep-copy';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import processing
  from '@/modules/contact-center/modules/queues/store/_internals/queueSchema/defaults/processing';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['groupId', 'name', 'description', 'resource', 'reserveResource', 'priority'];

const preRequestHandler = (item, parentId) => ({ ...item, groupId: parentId });

// const listGetter = new SdkListGetterApiConsumer(resGrService.searchOutboundResourceInGroup);
const getResInGroupList = async (params) => {
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
    const response = await resGrService.searchOutboundResourceInGroup(
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
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemGetter = new SdkGetterApiConsumer(resGrService.readOutboundResourceInGroup);
const getResInGroup = async ({ itemId: id }) => {
  const responseHandler = (item) => {
    const copy = deepCopy(item);
    try {
      if (copy.variables) {
        copy.variables = Object.keys(copy.variables)
          .map((key) => ({
            key,
            value: copy.variables[key],
          }));
      }
      if (isEmpty(copy.taskProcessing)) {
        copy.taskProcessing = processing({
          enabled: !!copy.processing,
          formSchema: copy.formSchema,
          sec: copy.processingSec || 0,
          renewalSec: copy.processingRenewalSec || 0,
        });
      }
      return copy;
    } catch (err) {
      throw err;
    }
  };
  try {
    const response = await resGrService.readOutboundResourceInGroup(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemCreator = new SdkCreatorApiConsumer(resGrService.createOutboundResourceInGroup,
//   { fieldsToSend, preRequestHandler });
const addResInGroup = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resGrService.createOutboundResourceInGroup(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemUpdater = new SdkUpdaterApiConsumer(resGrService.updateOutboundResourceInGroup,
//   { fieldsToSend, preRequestHandler });
const updateResInGroup = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await resGrService.updateOutboundResourceInGroup(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemDeleter = new SdkDeleterApiConsumer(resGrService.deleteOutboundResourceInGroup);
const deleteResInGroup = async ({ id }) => {
  try {
    const response = await resGrService.deleteOutboundResourceInGroup(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const ResInGroupAPI = {
  getList: getResInGroupList,
  get: getResInGroup,
  add: addResInGroup,
  update: updateResInGroup,
  delete: deleteResInGroup,
};

export default ResInGroupAPI;
