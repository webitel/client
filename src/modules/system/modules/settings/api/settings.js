import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  merge, mergeEach, notify, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { SystemSettingServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const service = new SystemSettingServiceApiFactory(configuration, '', instance);

const getList = async (params = {}) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
  } = params;

  try {
    const response = await service.searchSystemSetting(
      page,
      size,
      search,
      sort,
      fields,
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

const SettingsAPI = {
  getList,
  // get,
  // add,
  // update,
  // delete: deleteItem,
};

export default SettingsAPI;
