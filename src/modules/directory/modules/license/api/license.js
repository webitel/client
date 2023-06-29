import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, generateUrl, handleUnauthorized,
  merge, notify, sanitize, snakeToCamel,
  starToSearch, log, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../app/api/instance';

const LICENSE_URL = '/license';
const CUSTOMER_URL = '/customer';

const getLicenseList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'fields', 'id'];

  const defaultObject = {
    remain: 0,
    limit: 0,
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(LICENSE_URL),
  ]);
  try {
    const response = await instance.get(url);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
        log,
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
const updateLicense = async (data) => {
  try {
    const response = await instance.put(CUSTOMER_URL, data);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const licenseAPI = {
  getList: getLicenseList,
  update: updateLicense,
};

export default licenseAPI;
