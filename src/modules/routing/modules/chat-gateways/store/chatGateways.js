import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import proxy from '../../../../../app/utils/editProxy';
import ChatGatewaysAPI from '../api/chatGateways';
import defaultChatGateway from './_internals/defaults/defaultChatGateway';
import headers from './_internals/headers';
import messengerChatGateway from './_internals/providers/messengerChatGateway';
import infobipChatGateway from './_internals/providers/infobipChatGateway';
import telegramChatGateway from './_internals/providers/telegramChatGateway';
import viberChatGateway from './_internals/providers/viberChatGateway';
import webChatGateway from './_internals/providers/webChatGateway';

import facebook from '../modules/messenger/facebook/store/facebook';
import instagram from '../modules/messenger/instagram/store/instagram';

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
  SET_WEBCHAT_ITEM_METADATA: async (context, payload) => {
    await context.dispatch('SET_ITEM_METADATA', payload);
    context.commit('SET_ITEM_METADATA', { prop: '_btnCodeDirty', value: true });
  },
  SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE: (
    context,
    { channel, prop, value },
  ) => {
    context.commit('SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE', {
      channel,
      prop,
      value,
    });
    context.commit('SET_ITEM_METADATA', { prop: '_btnCodeDirty', value: true });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  RESET_WEBCHAT_COPY_DIRTY_FLAG: (context) => {
    context.commit('SET_ITEM_METADATA', {
      prop: '_btnCodeDirty',
      value: false,
    });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
};

const mutations = {
  SET_TELEGRAM_ITEM: (state) => {
    state.itemInstance = telegramChatGateway();
  },
  SET_MESSENGER_ITEM: (state) => {
    state.itemInstance = messengerChatGateway();
  },
  SET_WEBCHAT_ITEM: (state) => {
    state.itemInstance = webChatGateway(true);
  },
  SET_INFOBIP_ITEM: (state) => {
    state.itemInstance = infobipChatGateway();
  },
  SET_VIBER_ITEM: (state) => {
    state.itemInstance = viberChatGateway();
  },
  SET_ITEM_METADATA: (state, { prop, value }) => {
    state.itemInstance.metadata[prop] = value;
  },
  SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE: (state, { channel, prop, value }) => {
    state.itemInstance.metadata.alternativeChannels[channel][prop] = value;
  },
};

const chatGateways = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(ChatGatewaysAPI)
  .generateAPIActions()
  .setChildModules({ facebook, instagram })
  .getModule({ actions, mutations });

export default chatGateways;
