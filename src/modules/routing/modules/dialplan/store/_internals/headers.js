import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
 {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'pattern',
    locale: 'objects.routing.dialplan.pattern',
    field: 'pattern',
    sort: SortSymbols.NONE,
  },
  {
    value: 'schema',
    locale: ['objects.routing.schema', 1],
    field: 'schema',
    sort: SortSymbols.NONE,
  },
  {
    value: 'enabled',
    locale: 'objects.enabled',
    field: 'disabled',
    sort: SortSymbols.NONE,
  },
];
