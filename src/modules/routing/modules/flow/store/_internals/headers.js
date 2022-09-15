import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'editor',
    locale: 'objects.routing.flow.editor',
    field: 'editor',
    sort: SortSymbols.NONE,
  },
  {
    value: 'type',
    locale: 'vocabulary.type',
    field: 'type',
    sort: SortSymbols.NONE,
  },
  {
    value: 'tags',
    locale: ['vocabulary.tag', 2],
    field: 'tags',
    sort: SortSymbols.NONE,
  },
];
