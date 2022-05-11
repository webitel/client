import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'provider',
    locale: 'objects.reusable.provider',
    field: 'provider',
    sort: SortSymbols.NONE,
  },
  {
    value: 'service',
    locale: 'objects.reusable.service',
    field: 'service',
    sort: SortSymbols.NONE,
  },
  {
    value: 'default',
    locale: 'objects.reusable.default',
    field: 'default',
    sort: SortSymbols.NONE,
  },
];
