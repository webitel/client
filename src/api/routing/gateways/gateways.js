import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemPatcher } from '../../utils/ApiControllers/Patcher/ApiPatcher';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import registerGateway
  from '../../../store/modules/routing/gateways/_internals/gatewaySchema/registerGateway';
import trunkingGateway
  from '../../../store/modules/routing/gateways/_internals/gatewaySchema/trunkingGateway';


const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
  'account', 'registrar', 'register', 'password', 'schema', 'enable'];

const defaultListItem = { // default object prototype, to merge response with it to get all fields
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


const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemPatcher = new WebitelAPIItemPatcher(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
  if (response.register) return coerceRegisterResponse(response);
  return coerceTrunkingResponse(response);
};

export const getGatewayList = (page = 1, size = 10, search) => (
  listGetter.getList({ page, size, search })
);

export const getGateway = (id) => itemGetter.getItem(id);

export const addGateway = (item) => itemCreator.createItem(item);

export const updateGateway = (id, item) => itemUpdater.updateItem(id, item);

export const patchGateway = (id, changes) => itemPatcher.patchItem(id, changes);

export const deleteGateway = (id) => itemDeleter.deleteItem(id);
