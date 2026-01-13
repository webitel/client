import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { LoggerAction } from 'webitel-sdk';

import ChangelogsAPI from '../../../../../../../../system/modules/changelogs/api/changelogs';

const state = {
  search: new BaseFilterSchema(),
  action: new EnumFilterSchema({
    locale: {
      label: 'objects.system.changelogs.logs.actions',
    },
    options: Object.values(LoggerAction)
      .filter((action) => action !== LoggerAction.DefaultNoAction && action !== LoggerAction.Read)
      .map((action) => ({
        value: action,
        locale: `objects.system.changelogs.logs.actionType.${action}`,
      })),
  }),
  object: new ApiFilterSchema({
    locale: {
      label: ['objects.system.changelogs.objects', 1],
    },
    API: (params) =>
      ChangelogsAPI.getObjectsList({
        ...params,
        includeExisting: true,
      }),
  }),
  from: new BaseFilterSchema({
    value: new Date().setHours(0, 0, 0, 0),
    defaultValue: new Date().setHours(0, 0, 0, 0),
  }),
  to: new BaseFilterSchema({
    value: new Date().setHours(23, 59, 59, 0),
    defaultValue: new Date().setHours(23, 59, 59, 0),
  }),
};

export default new QueryFiltersStoreModule({ state }).getModule();
