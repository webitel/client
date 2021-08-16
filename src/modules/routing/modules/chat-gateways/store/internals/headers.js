import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'url',
    locale: 'Url',
    field: 'proxy',
    sort: SortSymbols.NONE,
  },
  {
    value: 'flow',
    locale: 'objects.routing.flow.flow',
    field: 'enable',
    sort: SortSymbols.NONE,
  },
  {
    value: 'provider',
    locale: 'objects.lookups.media.provider',
    field: 'r_state',
    sort: SortSymbols.NONE,
  },
  {
    value: 'state',
    locale: 'reusable.state',
    field: 'onOff',
    sort: SortSymbols.NONE,
  },
];
