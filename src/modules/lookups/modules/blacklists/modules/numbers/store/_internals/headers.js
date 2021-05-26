import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'number',
    locale: ['objects.lookups.blacklist.number', 1],
    field: 'number',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'objects.description',
    field: 'description',
    sort: SortSymbols.NONE,
  },
];
