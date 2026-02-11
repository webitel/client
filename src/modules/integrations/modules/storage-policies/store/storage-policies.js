import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import StoragePoliciesAPI from '../api/storagePolicies.js';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
		channels: [],
		mimeTypes: [],
		retentionDays: 0,
		speedDownload: 0,
		speedUpload: 0,
		maxUploadSize: 0,
		position: 0,
		enabled: true,
		encrypt: false,
	},
};

const actions = {
	SWAP_ROWS: async (context, { fromId, toId }) => {
		/*
    UI swap commented
    because sortable reinitialization triggers on each dataList change
    but UI changes anyway
    await context.commit('SWAP_ROWS', {fromId, toId});
    */
		try {
			await StoragePoliciesAPI.movePosition({
				fromId,
				toId,
			});
		} catch {
		} finally {
			// context.dispatch('LOAD_DATA_LIST');
		}
	},
};

const storagePolicies = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(StoragePoliciesAPI)
	.generateAPIActions()
	.getModule({
		actions,
	});

export default storagePolicies;
