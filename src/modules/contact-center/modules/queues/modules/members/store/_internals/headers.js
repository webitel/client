import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'createdAt',
    locale: 'objects.createdAt',
    field: 'created_at',
    sort: SortSymbols.NONE,
  },
  {
    value: 'priority',
    locale: 'objects.ccenter.queues.priority',
    field: 'priority',
    sort: SortSymbols.NONE,
  },
  {
    value: 'endCause',
    locale: 'objects.ccenter.queues.endCause',
    field: 'stopCause',
    sort: SortSymbols.NONE,
  },
  {
    value: 'destination',
    locale: ['objects.ccenter.queues.destination', 2],
    field: 'communications',
    sort: SortSymbols.NONE,
  },
];
