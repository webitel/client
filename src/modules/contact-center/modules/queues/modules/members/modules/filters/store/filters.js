import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { MemberStopCause } from 'webitel-sdk/esm2015/enums';

import BucketsAPI from '../../../../../../../../lookups/modules/buckets/api/buckets';
import AgentsAPI from '../../../../../../agents/api/agents';

const defaultDateFrom = () => {
	const dateNow = new Date();
	dateNow.setMonth(dateNow.getMonth() - 1, 1);
	return dateNow.setHours(0, 0, 0, 0);
};

const state = {
	search: new BaseFilterSchema(),
	from: new BaseFilterSchema({
		value: defaultDateFrom(),
		defaultValue: defaultDateFrom(),
	}),
	to: new BaseFilterSchema({
		value: new Date().setHours(23, 59, 59, 0),
		defaultValue: new Date().setHours(23, 59, 59, 0),
	}),
	cause: new EnumFilterSchema({
		options: Object.values(MemberStopCause).map((value) => ({
			value,
			locale: `objects.ccenter.members.endCause.${value}`,
		})),
		locale: {
			label: 'objects.ccenter.queues.endCause',
		},
	}),
	bucket: new ApiFilterSchema({
		API: BucketsAPI.getLookup,
		locale: {
			label: [
				'objects.lookups.buckets.buckets',
				1,
			],
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
	priority: new BaseFilterSchema({
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
