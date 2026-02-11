import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import FlowAPI from '../api/flow';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		schema: '[]',
		payload: {},
		type: '',
		tags: [],
		editor: false,
	},
};

const state = {
	fields: [
		'id',
	].concat(headers.map((header) => header.field)),
};

const flow = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(FlowAPI)
	.setChildModules({
		filters,
	})
	.generateAPIActions()
	.getModule({
		state,
	});

export default flow;
