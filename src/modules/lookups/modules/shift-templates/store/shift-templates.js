import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ShiftTemplatesAPI from '../api/shiftTemplates.js';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
		times: [],
	},
};

const actions = {
	ADD_TIME: (context) => {
		const array = [
			...context.state.itemInstance.times,
		];
		const defaultTimes = {
			start: 9 * 60,
			end: 20 * 60,
			duration: 11 * 60,
		};
		array.push(defaultTimes);
		context.dispatch('SET_ITEM_PROPERTY', {
			path: 'times',
			value: array,
		});
	},
	SET_TIME: (context, { prop, index, value }) => {
		const array = [
			...context.state.itemInstance.times,
		];
		array[index][prop] = value;
		context.dispatch('SET_ITEM_PROPERTY', {
			path: 'times',
			value: array,
		});
	},
	REMOVE_TIME: (context, index) => {
		const array = [
			...context.state.itemInstance.times,
		];
		array.splice(index, 1);
		context.dispatch('SET_ITEM_PROPERTY', {
			path: 'times',
			value: array,
		});
	},
};

const shiftTemplates = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ShiftTemplatesAPI)
	.generateAPIActions()
	.getModule({
		actions,
	});

export default shiftTemplates;
