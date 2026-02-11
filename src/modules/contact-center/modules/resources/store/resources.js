import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import ResourcesAPI from '../api/resources';
import numbers from '../modules/display/store/resource-display';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		gateway: {},
		cps: 10,
		limit: 10,
		description: '',
		maxErrors: 2,
		errorIds: [],
		patterns: [],
		failureDialDelay: 0,
		parameters: {
			cidType: '',
			ignoreEarlyMedia: '',
		},
	},
};

const actions = {
	RESET_ITEM_STATE: (context) => {
		context.commit('RESET_ITEM_STATE');
		context.dispatch(
			'ccenter/res/numbers/RESET_STATE',
			{},
			{
				root: true,
			},
		);
	},
	SET_ITEM_PARAMETERS_PROPERTY: (context, parameters) => {
		context.commit('SET_ITEM_PARAMETERS_PROPERTY', parameters);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
};

const mutations = {
	SET_ITEM_PARAMETERS_PROPERTY: (state, { prop, value }) => {
		state.itemInstance.parameters[prop] = value;
	},
};

const PERMISSIONS_API_URL = '/call_center/resources';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const resources = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ResourcesAPI)
	.generateAPIActions()
	.setChildModules({
		numbers,
		permissions,
	})
	.getModule({
		actions,
		mutations,
	});

export default resources;
