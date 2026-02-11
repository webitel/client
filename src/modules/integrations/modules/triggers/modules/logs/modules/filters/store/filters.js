import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { EngineTriggerJobState } from 'webitel-sdk';

const state = {
	startedAtFrom: new BaseFilterSchema({
		value: new Date().setHours(0, 0, 0, 0),
		defaultValue: new Date().setHours(0, 0, 0, 0),
	}),
	startedAtTo: new BaseFilterSchema({
		value: new Date().setHours(23, 59, 59, 0),
		defaultValue: new Date().setHours(23, 59, 59, 0),
	}),
	result: new EnumFilterSchema({
		options: Object.values(EngineTriggerJobState).map((value) => ({
			value,
			locale: `objects.integrations.triggers.logs.resultName.${value}`,
		})),
		locale: {
			label: 'objects.integrations.triggers.logs.result',
		},
	}),
	duration: new BaseFilterSchema({
		value: {
			from: 0,
			to: undefined,
		},
		defaultValue: {
			from: 0,
			to: undefined,
		},
	}),
};

export default new QueryFiltersStoreModule({
	state,
}).getModule();
