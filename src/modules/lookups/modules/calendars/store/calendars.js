import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import CalendarsAPI from '../api/calendars';
import headers from './_internals/headers';

const defaultAccepts = () => {
	const accepts = [];
	for (let i = 0; i < 7; i++) {
		accepts.push({
			day: i,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		});
	}
	return accepts;
};

const defaultSpecials = () => {
	const specials = [];
	for (let i = 0; i < 7; i++) {
		specials.push({
			day: i,
			disabled: true,
			start: 9 * 60,
			end: 20 * 60,
		});
	}
	return specials;
};

const resettableState = {
	itemInstance: {
		name: '',
		timezone: {},
		description: '',
		startAt: Date.now(),
		endAt: Date.now(),
		expires: false,
		accepts: defaultAccepts(),
		specials: defaultSpecials(),
		excepts: [],
	},
};

const actions = {
	SET_CALENDAR_ITEM_PROPERTY: async (context, payload) => {
		context.commit('SET_CALENDAR_ITEM_PROPERTY', payload);
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},

	ADD_RANGE: (context, { day, name }) => {
		const value = context.state.itemInstance[name];
		// iterates through array and tries to find first day next to param day
		const dayIndex = value.findIndex((workday) => workday.day > day);
		const dayItem = {
			day,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		};
		value.splice(dayIndex, 0, dayItem);
		context.commit('SET_ITEM_PROPERTY', {
			prop: name,
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},

	REMOVE_RANGE: (context, { index, name }) => {
		const value = context.state.itemInstance[name];
		value.splice(index, 1);
		context.commit('SET_ITEM_PROPERTY', {
			prop: name,
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	INITIALIZE_SPECIALS: (context) => {
		context.commit('SET_ITEM_PROPERTY', {
			prop: 'specials',
			value: defaultSpecials(),
		});
	},

	ADD_EXCEPT_ITEM: (context, item) => {
		const value = context.state.itemInstance.excepts.concat(item);
		context.commit('SET_ITEM_PROPERTY', {
			prop: 'excepts',
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},

	UPDATE_EXCEPT_ITEM: (context, { index, item }) => {
		const value = context.state.itemInstance.excepts;
		value.splice(index, 1, item);
		context.commit('SET_ITEM_PROPERTY', {
			prop: 'excepts',
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},

	DELETE_EXCEPT_ITEM: async (context, deleted) => {
		let action = 'DELETE_SINGLE_EXCEPT_ITEM';
		if (Array.isArray(deleted)) {
			if (deleted.length) action = 'DELETE_BULK_EXCEPT_ITEMS';
		}
		try {
			await context.dispatch(action, deleted);
		} catch (err) {
			throw err;
		}
	},
	DELETE_SINGLE_EXCEPT_ITEM: async (context, item) => {
		const { excepts } = context.state.itemInstance;
		excepts.splice(
			excepts.findIndex(
				(except) => except.name === item.name && except.date === item.date,
			),
			1,
		);
		context.commit('SET_ITEM_PROPERTY', {
			prop: 'excepts',
			value: excepts,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
	DELETE_BULK_EXCEPT_ITEMS: async (context, deleted) =>
		Promise.allSettled(
			deleted.map((item) =>
				context.dispatch('DELETE_SINGLE_EXCEPT_ITEM', item),
			),
		),

	SET_EXCEPT_ITEM_PROPERTY: (context, { index, prop, value }) => {
		context.commit('SET_CALENDAR_ITEM_PROPERTY', {
			name: 'excepts',
			index,
			prop,
			value,
		});
		context.commit('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
};

const mutations = {
	SET_CALENDAR_ITEM_PROPERTY: (state, { name, prop, index, value }) => {
		state.itemInstance[name][index][prop] = value;
	},
};

const PERMISSIONS_API_URL = '/calendars';
const permissions = new PermissionsStoreModule()
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

const calendars = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(CalendarsAPI)
	.generateAPIActions()
	.setChildModules({
		permissions,
	})
	.getModule({
		actions,
		mutations,
	});

export default calendars;
