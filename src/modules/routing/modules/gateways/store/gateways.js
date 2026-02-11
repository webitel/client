import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import GatewaysAPI from '../api/gateways';
import registerGateway from './_internals/gatewaySchema/registerGateway';
import trunkingGateway from './_internals/gatewaySchema/trunkingGateway';
import headers from './_internals/headers';

const actions = {
	LOAD_REGISTER_ITEM: async (context) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.commit('SET_ITEM', item);
		} else {
			context.commit('SET_REGISTER_ITEM');
		}
	},
	LOAD_TRUNKING_ITEM: async (context) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.commit('SET_ITEM', item);
		} else {
			context.commit('SET_TRUNKING_ITEM');
		}
	},
	ADD_VARIABLE_PAIR: (context) => {
		const pair = {
			ip: '',
			proto: 'any',
			port: null,
		};
		context.commit('ADD_VARIABLE_PAIR', pair);
	},
	SET_VARIABLE_PROP: (context, { index, prop, value }) => {
		context.commit('SET_VARIABLE_PROP', {
			index,
			prop,
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	DELETE_VARIABLE_PAIR: (context, index) => {
		context.commit('DELETE_VARIABLE_PAIR', index);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
};

const mutations = {
	SET_REGISTER_ITEM: (state) => {
		state.itemInstance = registerGateway();
	},
	SET_TRUNKING_ITEM: (state) => {
		state.itemInstance = trunkingGateway();
	},
	ADD_VARIABLE_PAIR: (state, pair) => {
		state.itemInstance.ipacl.push(pair);
	},
	SET_VARIABLE_PROP: (state, { index, prop, value }) => {
		state.itemInstance.ipacl[index][prop] = value;
	},
	DELETE_VARIABLE_PAIR: (state, index) => {
		state.itemInstance.ipacl.splice(index, 1);
	},
};

const gateways = new ObjectStoreModule({
	headers,
})
	.attachAPIModule(GatewaysAPI)
	.generateAPIActions()
	.getModule({
		actions,
		mutations,
	});

export default gateways;
