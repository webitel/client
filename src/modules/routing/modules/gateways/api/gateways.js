import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../app/api/instance';
import registerGateway from '../store/_internals/gatewaySchema/registerGateway';
import trunkingGateway from '../store/_internals/gatewaySchema/trunkingGateway';

const baseUrl = '/sip/gateways';

const getGatewayList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const defaultObject = {
    name: '',
    proxy: '',
    enable: false,
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
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

      notify,
    ]);
  }
};

const getGateway = async ({ itemId: id }) => {
  const coerceTrunkingResponse = (response) => {
    const defaultIPacl = {
      ip: '',
      proto: 'any',
      port: null,
    };

    const result = { ...trunkingGateway(), ...response };
    result.ipacl = result.ipacl.map((acl) => (
      { ...defaultIPacl, ...acl }
    ));
    return result;
  };

  const coerceRegisterResponse = (response) => {
    const result = { ...registerGateway(), ...response };
    return result;
  };

  const itemResponseHandler = (response) => {

    // https://webitel.atlassian.net/browse/WTEL-4268
    // Password field can be set to a new value, the current will not be displayed
    // !Temporary solution
    // Fix needed on the backend side that password field is not returned to API (or is encrypted, as it works on Users page)

    response.password = '';

    if (response.register) return coerceRegisterResponse(response);
    return coerceTrunkingResponse(response);
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const fieldsToSend = [
  'name',
  'proxy',
  'id',
  'host',
  'ipacl',
  'account',
  'username',
  'expires',
  'account',
  'registrar',
  'name',
  'register',
  'password',
  'schema',
  'usage',
  'enable',
];

const addGateway = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};
const updateGateway = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const patchGateway = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.patch(url, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const deleteGateway = async ({ id }) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const getGatewaysLookup = (params) => getGatewayList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const GatewaysAPI = {
  getList: getGatewayList,
  get: getGateway,
  add: addGateway,
  patch: patchGateway,
  update: updateGateway,
  delete: deleteGateway,
  getLookup: getGatewaysLookup,
};

export default GatewaysAPI;
