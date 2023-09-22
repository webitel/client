import { LoggerAction } from 'webitel-sdk';
import ApiFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import UsersAPI
  from '../../../../../../../../directory/modules/users/api/users';

const state = {
  search: new BaseFilterSchema(),
  action: new EnumFilterSchema({
    locale: { label: ['objects.system.changelogs.logs.actions', 1] },
    options: Object.values(LoggerAction)
    .filter((action) => action !== LoggerAction.DefaultNoAction && action !== LoggerAction.Read)
    .map((action, index) => {
      console.log('action:', action);
      const newSome = {
        value: `${action}1`,
        locale: `objects.system.changelogs.logs.actionType.${action}`
      };
      console.log(newSome);
      return newSome
      }
    ),
  }),
  user: new ApiFilterSchema({
    locale: { label: ['reusable.modifiedBy', 1] },
    API: UsersAPI.getLookup,
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
