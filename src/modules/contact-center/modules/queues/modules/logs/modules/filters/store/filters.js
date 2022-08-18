import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { CallReportingStatus } from 'webitel-sdk';

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
    options: Object.values(CallReportingStatus)
    .map((value) => ({
      value,
      locale: `objects.ccenter.queues.logs.resultName.${value}`,
    })),
    locale: { label: 'objects.ccenter.queues.logs.result' },
  }),
  duration: new BaseFilterSchema({
    value: { from: 0, to: undefined },
    defaultValue: { from: 0, to: undefined },
  }),
};

export default new QueryFiltersStoreModule({ state }).getModule();
