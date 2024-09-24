// import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
// import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
// import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
// import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
// import { LoggerAction } from 'webitel-sdk';
// import ChangelogsAPI from '../../../../../../../../system/modules/changelogs/api/changelogs';
//
// const state = {
//   search: new BaseFilterSchema(),
//   action: new EnumFilterSchema({
//     locale: {
//       label: ['objects.system.changelogs.logs.actions', 1],
//     },
//     options: Object.values(LoggerAction)
//       .filter((action) => action !== LoggerAction.DefaultNoAction && action !== LoggerAction.Read)
//       .map((action) => ({
//         value: action,
//         locale: `objects.system.changelogs.logs.actionType.${action}`,
//       })),
//   }),
//   object: new ApiFilterSchema({
//     locale: {
//       label: ['objects.system.changelogs.objects', 1],
//     },
//     API: (params) =>
//       ChangelogsAPI.getObjectsList({
//         ...params,
//         includeExisting: true,
//       }),
//   }),
//   from: new BaseFilterSchema({
//     value: new Date().setHours(0, 0, 0, 0),
//     defaultValue: new Date().setHours(0, 0, 0, 0),
//   }),
//   to: new BaseFilterSchema({
//     value: new Date().setHours(23, 59, 59, 0),
//     defaultValue: new Date().setHours(23, 59, 59, 0),
//   }),
// };

import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule.js';

const filtersList = [
  {
    name: 'page',
    value: 1,
    defaultValue: 1,
  },
  {
    name: 'size',
    value: 10,
    defaultValue: 10,
  },
  { name: 'sort' },
  { name: 'search' },
];

const filters = new FiltersStoreModule().addFilter(filtersList).getModule();

export default filters;
