import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'status',
    locale: 'objects.directory.users.status',
    width: '320px',
    field: 'presence.status',
    sort: SortSymbols.NONE,
  },
  {
    value: 'username',
    locale: 'objects.directory.users.login',
    field: 'username',
    sort: SortSymbols.NONE,
  },
  {
    value: 'extensions',
    locale: 'objects.directory.users.extensions',
    field: 'extension',
    sort: SortSymbols.NONE,
  },
  {
    value: 'DnD',
    locale: 'objects.directory.users.DnD',
    width: '120px',
    field: 'dnd',
    sort: SortSymbols.NONE,
  },
];
