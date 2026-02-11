import ObjectStoreModule from '../../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import FacebookAPI from '../api/facebook';
import headers from './_internals/headers';

const getters = {
	CHAT_URI: (s, g, rootState) =>
		rootState.routing.chatGateways.itemInstance.uri,
};

const actions = {
	LOAD_DATA_LIST: async (context) => {
		const uri = context.getters.CHAT_URI;
		const items = await context.dispatch('GET_LIST', {
			uri,
		});
		context.commit('SET_DATA_LIST', items);
	},
	UPDATE_SUBSCRIPTION_STATE: async (context, { value, item }) => {
		try {
			const uri = context.getters.CHAT_URI;
			await FacebookAPI.updateSubscribe({
				uri,
				value,
				id: item.id,
			});
		} finally {
			await context.dispatch('LOAD_DATA_LIST');
		}
	},
};

const facebook = new ObjectStoreModule({
	headers,
})
	.attachAPIModule(FacebookAPI)
	.generateAPIActions()
	.getModule({
		getters,
		actions,
	});

export default facebook;
