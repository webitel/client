import { BlacklistsAPI } from '@webitel/api-services/api';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
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

const blacklists = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(BlacklistsAPI)
	.generateAPIActions()
	.setChildModules({
		numbers,
	})
	.getModule({
		actions,
	});

export default blacklists;
