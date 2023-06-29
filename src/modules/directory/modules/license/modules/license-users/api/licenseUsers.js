import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, generateUrl, handleUnauthorized,
  log,
  merge, mergeEach, notify, sanitize, snakeToCamel, starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';

const baseUrl = '/products';
const nestedUrl = 'users';

const getList = async ({ parentId, ...rest }) => {
  const fieldsToSend = ['page', 'size', 'q', 'fields', 'id'];

  const defaultObject = {
    sessions: 0,
  };

  const url = applyTransform(rest, [
    log,
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(`${baseUrl}/${parentId}/${nestedUrl}`),
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

const LicenseUsersAPI = {
  getList,
};

export default LicenseUsersAPI;
