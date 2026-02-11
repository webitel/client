import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PauseTemplatesAPI from '../api/pauseTemplates.js';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
		causes: [
			{
				cause: null,
				duration: 30,
			},
		],
	},
};

const actions = {
	ADD_CAUSE: (context) => {
		const array = [
			...context.state.itemInstance.causes,
		];
		array.push({
			duration: 0,
		});
		context.dispatch('SET_ITEM_PROPERTY', {
			prop: 'causes',
			value: array,
		});
	},
	SET_CAUSE: (context, { prop, index, value }) => {
		const array = [
			...context.state.itemInstance.causes,
		];

		if (prop) {
			array[index] = {
				...array[index],
				duration: value,
			};
		} else {
			array[index] = {
				...array[index],
				name: value.name,
				id: value.id,
			};
		}

		context.dispatch('SET_ITEM_PROPERTY', {
			prop: 'causes',
			value: array,
		});
	},
	REMOVE_CAUSE: (context, index) => {
		const array = [
			...context.state.itemInstance.causes,
		];
		array.splice(index, 1);
		context.dispatch('SET_ITEM_PROPERTY', {
			prop: 'causes',
			value: array,
		});
	},
};

const pauseTemplates = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(PauseTemplatesAPI)
	.generateAPIActions()
	.getModule({
		actions,
	});

export default pauseTemplates;
