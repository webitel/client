import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: ['objects.lookups.buckets.buckets', 2],
    field: 'bucket',
    sort: SortSymbols.NONE,
  },
  {
    value: 'ratio',
    locale: 'objects.ccenter.queues.bucketRatio',
    field: 'ratio',
    sort: SortSymbols.NONE,
  },
];
