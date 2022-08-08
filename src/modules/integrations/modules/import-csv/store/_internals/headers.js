import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'charSet',
    locale: 'objects.CSV.charSet',
    field: 'charSet',
    sort: SortSymbols.NONE,
  },
  {
    value: 'separator',
    locale: 'objects.CSV.separator',
    field: 'separator',
    sort: SortSymbols.NONE,
  },
  {
    value: 'Skip headers',
    locale: 'objects.CSV.skipHeaders',
    field: 'Skip headers',
    sort: SortSymbols.NONE,
  },
  {
    value: 'Clear member',
    locale: 'objects.CSV.clearMember',
    field: 'Clear member',
    sort: SortSymbols.NONE,
  },
  {
    value: 'Queue',
    locale: ['objects.ccenter.queues.queues', 1],
    field: 'Queue',
    sort: SortSymbols.NONE,
  },
];
