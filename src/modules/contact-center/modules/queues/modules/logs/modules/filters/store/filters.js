import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { CallReportingStatus } from 'webitel-sdk';

import AgentsAPI from '../../../../../../agents/api/agents';

const state = {
	search: new BaseFilterSchema(),
	joinedAtFrom: new BaseFilterSchema({
		value: new Date().setHours(0, 0, 0, 0),
		defaultValue: new Date().setHours(0, 0, 0, 0),
	}),
	joinedAtTo: new BaseFilterSchema({
		value: new Date().setHours(23, 59, 59, 0),
		defaultValue: new Date().setHours(23, 59, 59, 0),
	}),
	result: new EnumFilterSchema({
		options: Object.values(CallReportingStatus).map((value) => ({
			value,
			locale: `objects.ccenter.queues.logs.resultName.${value}`,
		})),
		locale: {
			label: 'objects.ccenter.queues.logs.result',
		},
	}),
	agent: new ApiFilterSchema({
		API: AgentsAPI.getLookup,
		locale: {
			label: [
				'objects.ccenter.agents.agents',
				1,
			],
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
