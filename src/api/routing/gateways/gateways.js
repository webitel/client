import APIItemDeleter from '../../utils/ApiControllers/Deleter/ApiDeleter';
import APIUpdater from '../../utils/ApiControllers/Updater/ApiUpdater';
import APICreator from '../../utils/ApiControllers/Creator/ApiCreator';
import APIPatcher from '../../utils/ApiControllers/Patcher/ApiPatcher';
import APIItemGetter from '../../utils/ApiControllers/Getter/ApiGetter';
import APIListGetter from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import registerGateway
  from '../../../store/modules/routing/gateways/_internals/gatewaySchema/registerGateway';
import trunkingGateway
  from '../../../store/modules/routing/gateways/_internals/gatewaySchema/trunkingGateway';


const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
  'account', 'registrar', 'register', 'password', 'schema', 'enable'];

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

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL);
const itemCreator = new APICreator(BASE_URL, { fieldsToSend });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend });
const itemPatcher = new APIPatcher(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
  if (response.register) return coerceRegisterResponse(response);
  return coerceTrunkingResponse(response);
};

export const getGatewayList = (params) => listGetter.getList(params);
export const getGateway = (params) => itemGetter.getItem(params);
export const addGateway = (params) => itemCreator.createItem(params);
export const updateGateway = (params) => itemUpdater.updateItem(params);
export const patchGateway = (params) => itemPatcher.patchItem(params);
export const deleteGateway = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getGatewayList,
  get: getGateway,
  add: addGateway,
  patch: patchGateway,
  update: updateGateway,
  delete: deleteGateway,
};
