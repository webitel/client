import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'communication',
    locale: ['objects.lookups.communications.communications', 1],
    field: 'communication',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'objects.description',
    field: 'description',
    sort: SortSymbols.NONE,
  },
];
