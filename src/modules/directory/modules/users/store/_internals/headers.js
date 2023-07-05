import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
    show: true,
  },
  {
    value: 'status',
    locale: 'objects.directory.users.status',
    width: 'minmax(320px, 1fr)',
    field: 'presence',
    sortQuery: 'presence.status',
    sort: SortSymbols.NONE,
    show: true,
  },
  {
    value: 'username',
    locale: 'objects.directory.users.login',
    field: 'username',
    sort: SortSymbols.NONE,
    show: true,
  },
  {
    value: 'extensions',
    locale: 'objects.directory.users.extensions',
    field: 'extension',
    sort: SortSymbols.NONE,
    show: true,
  },
  {
    value: 'DnD',
    locale: 'objects.directory.users.DnD',
    width: '120px',
    sortQuery: 'dnd',
    sort: SortSymbols.NONE,
    show: true,
  },
];
