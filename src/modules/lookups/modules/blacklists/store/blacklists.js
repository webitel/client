import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import BlacklistsAPI from '../api/blacklists';
import numbers from '../modules/numbers/store/blacklistNumbers';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
	},
};

const actions = {
	RESET_ITEM_STATE: (context) => {
		context.commit('RESET_ITEM_STATE');
		context.dispatch(
			'lookups/blacklists/numbers/RESET_STATE',
			{},
			{
				root: true,
			},
		);
	},
};

const PERMISSIONS_API_URL = '/call_center/list';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const blacklists = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(BlacklistsAPI)
	.generateAPIActions()
	.setChildModules({
		numbers,
		permissions,
	})
	.getModule({
		actions,
	});

export default blacklists;
