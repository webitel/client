import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import proxy from '../../../../../app/utils/editProxy';
import ChatGatewaysAPI from '../api/chatGateways';
import headers from './_internals/headers';
import defaultChatGateway from './_internals/defaults/defaultChatGateway';
import facebookChatGateway from './_internals/providers/facebookChatGateway';
import infobipWhatsappChatGateway from './_internals/providers/infobipWhatsappChatGateway';
import telegramChatGateway from './_internals/providers/telegramChatGateway';
import viberChatGateway from './_internals/providers/viberChatGateway';
import webChatGateway from './_internals/providers/webChatGateway';


const resettableState = {
  itemInstance: {
    ...defaultChatGateway(),
  },
};

const actions = {
  LOAD_ITEM: async (context, provider) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.commit('SET_ITEM', proxy(item));
    } else {
      context.commit(`SET_${provider}_ITEM`);
    }
  },
  SET_ITEM_METADATA: (context, payload) => {
    context.commit('SET_ITEM_METADATA', payload);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

};

const mutations = {
  SET_TELEGRAM_ITEM: (state) => {
    state.itemInstance = telegramChatGateway();
  },
  SET_FACEBOOK_ITEM: (state) => {
    state.itemInstance = facebookChatGateway();
  },
  SET_WEBCHAT_ITEM: (state) => {
    state.itemInstance = webChatGateway();
  },
  SET_WHATSAPP_ITEM: (state) => {
    state.itemInstance = infobipWhatsappChatGateway();
  },
  SET_VIBER_ITEM: (state) => {
    state.itemInstance = viberChatGateway();
  },
  SET_ITEM_METADATA: (state, { prop, value }) => {
    state.itemInstance.metadata[prop] = value;
  },
};

const chatGateways = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(ChatGatewaysAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default chatGateways;
