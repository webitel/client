import deepMerge from 'deepmerge';

import HistoryStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/HistoryStoreModule/HistoryStoreModule';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import DevicesAPI from '../api/devices';
import defaultDevice from './_internals/deviceSchema/defaults/defaultDevice';
import hotdeskDevice from './_internals/deviceSchema/hotdeskDevice';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: defaultDevice(),
};

const actions = {
	LOAD_ITEM: async (context, isHotdesk) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.dispatch('SET_TYPED_ITEM', {
				item,
				isHotdesk,
			});
		} else {
			context.dispatch('SET_TYPED_ITEM', {
				isHotdesk,
			});
		}
	},
	SET_TYPED_ITEM: (context, { isHotdesk, item = {} }) => {
		if (isHotdesk) {
			item = deepMerge(hotdeskDevice(), item);
		} else {
			item = deepMerge(defaultDevice(), item);
		}
		context.commit('SET_ITEM', item);
	},
};

const PERMISSIONS_API_URL = '/devices';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const history = new HistoryStoreModule()
	.generateGetListAction(DevicesAPI.getDeviceHistory)
	.getModule();

const devices = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(DevicesAPI)
	.generateAPIActions()
	.setChildModules({
		history,
		permissions,
	})
	.getModule({
		actions,
	});

export default devices;
