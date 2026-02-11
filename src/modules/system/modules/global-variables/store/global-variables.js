import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import GlobalVariablesAPI from '../api/global-variables';
import headers from './_internals/headers';

const actions = {
	// https://webitel.atlassian.net/browse/WTEL-4195
	ADD_ITEM: async (context) => {
		if (!context.state.itemId) {
			await context.dispatch('POST_ITEM');
			await context.dispatch('LOAD_DATA_LIST');
		}
	},
	UPDATE_ITEM: async (context) => {
		if (context.state.itemInstance._dirty) {
			await context.dispatch('UPD_ITEM');
			await context.dispatch('LOAD_DATA_LIST');
		}
	},
};

const globalVariables = new ObjectStoreModule({
	headers,
})
	.attachAPIModule(GlobalVariablesAPI)
	.generateAPIActions()
	.getModule({
		actions,
	});

export default globalVariables;
