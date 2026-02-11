import ObjectStoreModule from '../../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import WhatsappAPI from '../api/whatsapp';
import headers from './_internals/headers';

const getters = {
	CHAT_URI: (s, g, rootState) =>
		rootState.routing.chatGateways.itemInstance.uri,
};

const actions = {
	LOAD_DATA_LIST: async (context) => {
		const uri = context.getters.CHAT_URI;
		let items = [];
		try {
			items = await context.dispatch('GET_LIST', {
				uri,
			});
		} finally {
			context.commit('SET_DATA_LIST', items);
		}
	},
	UPDATE_SUBSCRIPTION_STATE: async (context, { value, item }) => {
		try {
			const uri = context.getters.CHAT_URI;
			await WhatsappAPI.updateSubscribe({
				uri,
				value,
				id: item.id,
			});
		} finally {
			await context.dispatch('LOAD_DATA_LIST');
		}
	},
	DELETE: async (context, { id }) => {
		try {
			const uri = context.getters.CHAT_URI;
			await WhatsappAPI.delete({
				uri,
				id,
			});
		} finally {
			await context.dispatch('LOAD_DATA_LIST');
		}
	},
};

const facebook = new ObjectStoreModule({
	headers,
})
	.attachAPIModule(WhatsappAPI)
	.generateAPIActions()
	.getModule({
		getters,
		actions,
	});

export default facebook;
