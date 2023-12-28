import ApiFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueueTypeOptions from './QueueTypeOptions';
import TeamLookupApi from '../api/teamLookupApi';
import QueuesAPI from '../../../api/queues';

const state = {
  search: new BaseFilterSchema(),
  queueType: new EnumFilterSchema({
    options: QueueTypeOptions,
    locale: { label: 'filters.queueType' },
  }),
  team: new ApiFilterSchema({
    API: TeamLookupApi,
    locale: { label: 'filters.team' },
  }),
  tags: new ApiFilterSchema({
    value: [],
    defaultValue: [],
    API: QueuesAPI.getQueuesTags,
    locale: { label: ['vocabulary.tag', 2] },
    storedProp: 'name',
  }),
};

export default new QueryFiltersStoreModule({ state }).getModule();
