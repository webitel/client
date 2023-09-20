import { LoggerServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  sanitize,
  merge, notify, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const service = new LoggerServiceApiFactory(configuration, '', instance);

const getList = async (params) => {
  const fieldsToSend = ['parentId', 'page', 'size', 'search', 'sort', 'fields', 'action', 'object', 'from', 'to', 'userIp'];

  const {
    parentId,
    page,
    size,
    search,
    sort,
    fields,
    action,
    object,
    from,
    to,
    userIp,
  } = applyTransform(params, [
    sanitize(fieldsToSend),
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await service.searchLogByUserId(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      object,
      action,
      userIp,
      from,
      to,
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

const LogsAPI = {
  getList,
};

export default LogsAPI;
