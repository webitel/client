import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule.js';
import { LoggerAction } from 'webitel-sdk';
import ChangelogsAPI from '../../../../../../../../system/modules/changelogs/api/changelogs';

const filtersList = [
  {
    name: 'page',
    value: 1,
  },
  {
    name: 'size',
    value: 10,
  },
  { name: 'sort' },
  { name: 'search' },
  {
    name: 'action',
    options: Object.values(LoggerAction)
      .filter((action) => action !== LoggerAction.DefaultNoAction && action !== LoggerAction.Read)
      .map((action) => ({
        value: action,
        locale: `objects.system.changelogs.logs.actionType.${action}`,
      })),
  },
  {
    name: 'object',
    search: (params) =>
      ChangelogsAPI.getObjectsList({
        ...params,
        includeExisting: true,
      }),
  },
  {
    name: 'from',
    value: new Date().setHours(0, 0, 0, 0),
  },
  {
    name: 'to',
    value: new Date().setHours(23, 59, 59, 0),
  },
];

const filters = new FiltersStoreModule().addFilter(filtersList).getModule();

export default filters;
