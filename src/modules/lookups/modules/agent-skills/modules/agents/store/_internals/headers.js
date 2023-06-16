import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'team',
    locale: 'objects.ccenter.agents.state',
    field: 'team',
    sort: SortSymbols.NONE,
  },
  {
    value: 'capacity',
    locale: ['objects.ccenter.agents.supervisors', 1],
    field: 'capacity',
    sort: SortSymbols.NONE,
  },
  {
    value: 'state',
    locale: ['objects.lookups.skills.skills', 2],
    field: 'state',
    sort: SortSymbols.NONE,
  },
];
