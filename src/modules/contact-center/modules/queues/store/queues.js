import { getQueueDefaults, QueuesAPI } from '@webitel/api-services/api';
import deepMerge from 'deepmerge';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import members from '../modules/members/store/queue-members';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: getQueueDefaults(),
};

const actions = {
	LOAD_ITEM: async (context, type) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.dispatch('SET_TYPED_ITEM', {
				item,
				type: item.type,
			});
		} else {
			context.dispatch('SET_TYPED_ITEM', {
				type,
			});
		}
	},
	SET_TYPED_ITEM: (context, { type, item = {} }) => {
		const typedItem = deepMerge(getQueueDefaults(type), item);
		context.commit('SET_ITEM', typedItem);
	},
	SET_ITEM_PAYLOAD_PROPERTY: (context, payload) => {
		context.commit('SET_ITEM_PAYLOAD_PROPERTY', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	SET_ITEM_PROCESSING_PROPERTY: (context, payload) => {
		context.commit('SET_ITEM_PROCESSING_PROPERTY', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	SET_ITEM_PROLONGATION_OPTION: (context, payload) => {
		// When prolongation options are enabled for the first time, automatically set isTimeoutRetry to true.
		// This ensures the switcher is enabled by default on initial load.
		// https://webitel.atlassian.net/browse/WTEL-8174?focusedCommentId=709374
		const enablingProlongation = payload.prop === 'enabled' && payload.value;
		const wasDisabled =
			!context.state.itemInstance?.taskProcessing?.prolongationOptions?.enabled;

		if (enablingProlongation && wasDisabled) {
			context.commit('SET_ITEM_PROLONGATION_OPTION', {
				prop: 'isTimeoutRetry',
				value: true,
			});
		}
		context.commit('SET_ITEM_PROLONGATION_OPTION', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	SET_AMD_ITEM_PROPERTY: (context, payload) => {
		context.commit('SET_AMD_ITEM_PROPERTY', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	ADD_VARIABLE_PAIR: (context) => {
		const pair = {
			key: '',
			value: '',
		};
		context.commit('ADD_VARIABLE_PAIR', pair);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
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
	RESET_ITEM_STATE: async (context) => {
		context.commit('RESET_ITEM_STATE');
		context.dispatch(
			'ccenter/queues/members/RESET_STATE',
			{},
			{
				root: true,
			},
		);
	},
};

const mutations = {
	SET_ITEM_PAYLOAD_PROPERTY: (state, { prop, value }) => {
		state.itemInstance.payload[prop] = value;
	},
	SET_ITEM_PROCESSING_PROPERTY: (state, { prop, value }) => {
		state.itemInstance.taskProcessing[prop] = value;
	},
	SET_ITEM_PROLONGATION_OPTION: (state, { prop, value }) => {
		state.itemInstance.taskProcessing.prolongationOptions[prop] = value;
	},
	SET_AMD_ITEM_PROPERTY: (state, { prop, value }) => {
		state.itemInstance.payload.amd[prop] = value;
	},
	ADD_VARIABLE_PAIR: (state, pair) => {
		state.itemInstance.variables.push(pair);
	},
	SET_VARIABLE_PROP: (state, { index, prop, value }) => {
		state.itemInstance.variables[index][prop] = value;
	},
	DELETE_VARIABLE_PAIR: (state, index) => {
		state.itemInstance.variables.splice(index, 1);
	},
};

const PERMISSIONS_API_URL = '/call_center/queues';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const queues = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(QueuesAPI)
	.generateAPIActions()
	.setChildModules({
		members,
		permissions,
	})
	.getModule({
		actions,
		mutations,
	});

export default queues;
