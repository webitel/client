import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import deepCopy from 'deep-copy';
import { CalendarServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const calendarService = new CalendarServiceApiFactory(
	configuration,
	'',
	instance,
);

const getCalendarList = async (params) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await calendarService.searchCalendar(
			page,
			size,
			search,
			sort,
			fields,
			id,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCalendar = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => {
		const copy = deepCopy(item);
		const defaultSingleObject = {
			name: '',
			timezone: {},
			description: '',
			startAt: Date.now(),
			endAt: Date.now(),
			expires: !!(copy.startAt || copy.endAt),
			accepts: [],
			excepts: [],
			specials: [],
		};

		copy.accepts = copy.accepts.map((accept) => ({
			day: accept.day || 0,
			disabled: accept.disabled || false,
			start: accept.startTimeOfDay || 0,
			end: accept.endTimeOfDay || 0,
		}));
		if (copy.specials) {
			copy.specials = copy.specials.map((special) => ({
				day: special.day || 0,
				disabled: special.disabled || false,
				start: special.startTimeOfDay || 0,
				end: special.endTimeOfDay || 0,
			}));
		}
		if (copy.excepts) {
			copy.excepts = copy.excepts.map((except) => ({
				name: except.name || '',
				date: except.date || 0,
				repeat: except.repeat || false,
				working: except.working || false,
				workStart: except.workStart || null,
				workStop: except.workStop || null,
			}));
		}
		return {
			...defaultSingleObject,
			...copy,
		};
	};

	try {
		const response = await calendarService.readCalendar(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'description',
	'timezone',
	'startAt',
	'endAt',
	'day',
	'accepts',
	'excepts',
	'specials',
	'startTimeOfDay',
	'endTimeOfDay',
	'disabled',
	'date',
	'repeat',
	'working',
	'workStart',
	'workStop',
];

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	copy.timezone.offset = undefined;
	if (!copy.expires) {
		copy.startAt = undefined;
		copy.endAt = undefined;
	}

	copy.accepts = copy.accepts.map((accept) => ({
		day: accept.day,
		disabled: accept.disabled,
		startTimeOfDay: accept.start,
		endTimeOfDay: accept.end,
	}));

	copy.specials = copy.specials.map((special) => ({
		day: special.day,
		disabled: special.disabled,
		startTimeOfDay: special.start,
		endTimeOfDay: special.end,
	}));
	return copy;
};

const addCalendar = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await calendarService.createCalendar(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCalendar = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await calendarService.updateCalendar(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCalendar = async ({ id }) => {
	try {
		const response = await calendarService.deleteCalendar(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCalendarsLookup = (params) =>
	getCalendarList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const getTimezonesLookup = async (params) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await calendarService.searchTimezones(
			page,
			size,
			search,
			sort,
			fields,
			id,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const CalendarsAPI = {
	getList: getCalendarList,
	get: getCalendar,
	add: addCalendar,
	update: updateCalendar,
	delete: deleteCalendar,
	getLookup: getCalendarsLookup,
	getTimezonesLookup,
};

export default CalendarsAPI;
