import { AgentsAPI } from '@webitel/api-services/api';
import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { MemberStopCause } from 'webitel-sdk/enums';
import BucketsAPI from '../../../../../../../../lookups/modules/buckets/api/buckets';

const state = {
	search: new BaseFilterSchema(),
	from: new BaseFilterSchema({
		value: undefined,
		defaultValue: undefined,
	}),
	to: new BaseFilterSchema({
		value: undefined,
		defaultValue: undefined,
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
