import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import deepMerge from 'deepmerge';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ChatGatewaysAPI from '../api/chatGateways';
import facebook from '../modules/messenger/facebook/store/facebook';
import instagram from '../modules/messenger/instagram/store/instagram';
import whatsapp from '../modules/messenger/whatsapp/store/whatsapp';
import defaultChatGateway from './_internals/defaults/defaultChatGateway';
import headers from './_internals/headers';
import customChatGateway from './_internals/providers/customChatGateway.js';
import infobipChatGateway from './_internals/providers/infobipChatGateway';
import messengerChatGateway from './_internals/providers/messengerChatGateway';
import telegramAppChatGateway from './_internals/providers/telegramAppChatGateway';
import telegramBotChatGateway from './_internals/providers/telegramBotChatGateway';
import viberChatGateway from './_internals/providers/viberChatGateway';
import webChatGateway from './_internals/providers/webChatGateway';

const resettableState = {
	itemInstance: {
		...defaultChatGateway(),
	},
};

const chatGatewayStateMap = {
	[ChatGatewayProvider.TELEGRAM_BOT]: telegramBotChatGateway,
	[ChatGatewayProvider.TELEGRAM_APP]: telegramAppChatGateway,
	[ChatGatewayProvider.WEBCHAT]: webChatGateway,
	[ChatGatewayProvider.INFOBIP]: infobipChatGateway,
	[ChatGatewayProvider.MESSENGER]: messengerChatGateway,
	[ChatGatewayProvider.VIBER]: viberChatGateway,
	[ChatGatewayProvider.CUSTOM]: customChatGateway,
};

const actions = {
	LOAD_ITEM: async (context, type) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.dispatch('SET_TYPED_ITEM', {
				item,
				type: item.provider,
			});
		} else {
			context.dispatch('SET_TYPED_ITEM', {
				type,
			});
		}
	},
	SET_TYPED_ITEM: (context, { type, item = {} }) => {
		const typedItem = deepMerge(chatGatewayStateMap[type](), item);
		context.commit('SET_ITEM', typedItem);
	},
	SET_ITEM_METADATA: (context, { path, prop, value }) => {
		context.commit('SET_ITEM_PROPERTY', {
			path: path || `metadata.${prop}`,
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			path: '_dirty',
			value: true,
		});
	},
	SET_TEMPLATE: async (context, payload) => {
		context.commit('SET_TEMPLATE', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	SET_WEBCHAT_ITEM_METADATA: async (context, payload) => {
		await context.dispatch('SET_ITEM_METADATA', payload);
		context.commit('SET_ITEM_METADATA', {
			prop: '_btnCodeDirty',
			value: true,
		});
	},
	SET_WEBCHAT_VIEW_METADATA: (context, { prop, value }) => {
		const view = {
			...context.state.itemInstance.metadata.view,
		};
		view[prop] = value;
		return context.dispatch('SET_WEBCHAT_ITEM_METADATA', {
			prop: 'view',
			value: view,
		});
	},
	SET_WEBCHAT_CHAT_METADATA: (context, { prop, value }) => {
		const chat = {
			...context.state.itemInstance.metadata.chat,
		};
		chat[prop] = value;
		return context.dispatch('SET_WEBCHAT_ITEM_METADATA', {
			prop: 'chat',
			value: chat,
		});
	},
	SET_WEBCHAT_APPOINTMENT_METADATA: (context, { prop, value }) => {
		const appointment = {
			...context.state.itemInstance.metadata.appointment,
		};
		appointment[prop] = value;
		return context.dispatch('SET_WEBCHAT_ITEM_METADATA', {
			prop: 'appointment',
			value: appointment,
		});
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
		context.commit('SET_ITEM_METADATA', {
			prop: '_btnCodeDirty',
			value: true,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	RESET_WEBCHAT_COPY_DIRTY_FLAG: (context) => {
		context.commit('SET_ITEM_METADATA', {
			prop: '_btnCodeDirty',
			value: false,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
};

const mutations = {
	SET_TELEGRAM_BOT_ITEM: (state) => {
		state.itemInstance = telegramBotChatGateway();
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
	SET_TEMPLATE: (state, { prop, value }) => {
		state.itemInstance.updates[prop] = value;
	},
};

const chatGateways = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ChatGatewaysAPI)
	.generateAPIActions()
	.setChildModules({
		facebook,
		instagram,
		whatsapp,
	})
	.getModule({
		actions,
		mutations,
	});

export default chatGateways;
