import ApiFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueueTypeOptions from './QueueTypeOptions';
import TeamLookupApi from '../api/teamLookupApi';

const state = {
  search: new BaseFilterSchema(),
  type: new EnumFilterSchema({
    options: QueueTypeOptions,
    locale: { label: 'filters.queueType' },
  }),
  // team: new ApiFilterSchema({
  //   API: TeamLookupApi,
  //   locale: { label: 'filters.team' },
  // }),
};

export default new QueryFiltersStoreModule({ state }).getModule();
