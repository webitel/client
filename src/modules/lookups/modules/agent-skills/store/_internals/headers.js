import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'objects.description',
    field: 'description',
    sort: SortSymbols.NONE,
  },
  {
    value: 'agents',
    locale: ['objects.ccenter.agents.agents', 2],
    field: 'agents',
    sort: SortSymbols.NONE,
  },
];
