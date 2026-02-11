import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import BlacklistNumbersAPI from '../api/blacklistNumbers';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		number: '',
		description: '',
		expireAt: 0,
	},
};

const state = {
	fields: [
		'id',
	].concat(headers.map((header) => header.field)),
};

const blacklistNumbers = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(BlacklistNumbersAPI)
	.generateAPIActions()
	.getModule({
		state,
	});

export default blacklistNumbers;
