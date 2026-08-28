import { QueuesAPI, TeamsAPI } from '@webitel/api-services/api';
import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import QueueTypeOptions from './QueueTypeOptions';

const state = {
	search: new BaseFilterSchema(),
	queueType: new EnumFilterSchema({
		options: QueueTypeOptions,
		locale: {
			label: 'filters.queueType',
		},
	}),
	team: new ApiFilterSchema({
		API: TeamsAPI.getList,
		locale: {
			label: 'webitelUI.filters.team',
		},
	}),
	tags: new ApiFilterSchema({
		value: [],
		defaultValue: [],
		API: QueuesAPI.getQueuesTags,
		locale: {
			label: [
				'vocabulary.tag',
				2,
			],
		},
		storedProp: 'name',
	}),
};

export default new QueryFiltersStoreModule({
	state,
}).getModule();
