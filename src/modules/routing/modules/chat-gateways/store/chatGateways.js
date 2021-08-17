import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ChatGatewaysAPI from '../api/chatGateways';
import headers from './internals/headers';

const actions = {};
const mutations = {};

const chatGateways = new ObjectStoreModule({ headers })
  .attachAPIModule(ChatGatewaysAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default chatGateways;
