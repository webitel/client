import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'state',
    locale: 'reusable.state',
    field: 'enabled',
    sort: SortSymbols.NONE,
  },
];
