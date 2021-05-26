import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'grantee',
    locale: 'objects.name',
    field: 'grantee',
    sort: SortSymbols.NONE,
  },
  {
    value: 'read',
    locale: 'objects.read',
    field: 'access',
  },
  {
    value: 'edit',
    locale: 'objects.edit',
    field: 'access',
  },
  {
    value: 'delete',
    locale: 'objects.delete',
    field: 'access',
  },
];
