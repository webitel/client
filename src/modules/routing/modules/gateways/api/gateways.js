import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointPatcherApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import registerGateway
  from '../store/_internals/gatewaySchema/registerGateway';
import trunkingGateway
  from '../store/_internals/gatewaySchema/trunkingGateway';


const baseUrl = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'username', 'expires',
  'account', 'registrar', 'name', 'register', 'password', 'schema', 'usage', 'enable'];

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  _isSelected: false,
  name: '',
  proxy: '',
  enable: false,
  id: 0,
};

const coerceTrunkingResponse = (response) => {
  const defaultIPacl = {
    ip: '',
    proto: 'any',
    port: null,
  };

  const result = { ...trunkingGateway(), ...response, _dirty: false };
  result.ipacl = result.ipacl.map((acl) => (
    { ...defaultIPacl, ...acl }
  ));
  return result;
};

const coerceRegisterResponse = (response) => {
  const result = { ...registerGateway(), ...response, _dirty: false };
  return result;
};

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });

itemGetter.responseHandler = (response) => {
  if (response.register) return coerceRegisterResponse(response);
  return coerceTrunkingResponse(response);
};

export const getGatewayList = (params) => listGetter.getList({ ...params, searchQuery: 'q' });
export const getGateway = (params) => itemGetter.getItem(params);
export const addGateway = (params) => itemCreator.createItem(params);
export const updateGateway = (params) => itemUpdater.updateItem(params);
export const patchGateway = (params) => itemPatcher.patchItem(params);
export const deleteGateway = (params) => itemDeleter.deleteItem(params);
const getGatewaysLookup = (params) => listGetter.getLookup(params);

export default {
  getList: getGatewayList,
  get: getGateway,
  add: addGateway,
  patch: patchGateway,
  update: updateGateway,
  delete: deleteGateway,
  getLookup: getGatewaysLookup,
};
