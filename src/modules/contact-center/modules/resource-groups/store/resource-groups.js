import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import ResGroupsAPI from '../api/resourceGroups';
import res from '../modules/resources/store/res-in-group';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		communication: {},
		description: '',
		time: [
			{
				start: 540,
				end: 1200,
			},
		],
	},
};

const actions = {
	ADD_VARIABLE_PAIR: (context) => {
		const pair = {
			start: 540,
			end: 1200,
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

	RESET_ITEM_STATE: (context) => {
		context.commit('RESET_ITEM_STATE');
		context.dispatch(
			'ccenter/resGroups/res/RESET_STATE',
			{},
			{
				root: true,
			},
		);
	},
};

const mutations = {
	ADD_VARIABLE_PAIR: (state, pair) => {
		state.itemInstance.time.push(pair);
	},

	SET_VARIABLE_PROP: (state, { index, prop, value }) => {
		state.itemInstance.time[index][prop] = value;
	},

	DELETE_VARIABLE_PAIR: (state, index) => {
		state.itemInstance.time.splice(index, 1);
	},
};

const PERMISSIONS_API_URL = '/call_center/resource_group';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const resGroups = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ResGroupsAPI)
	.generateAPIActions()
	.setChildModules({
		res,
		permissions,
	})
	.getModule({
		actions,
		mutations,
	});

export default resGroups;
