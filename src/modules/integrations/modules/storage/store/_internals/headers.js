import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.integrations.storage.type',
		field: 'type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'maxSize',
		locale: 'objects.integrations.storage.maxSize',
		field: 'max_size',
		sort: SortSymbols.NONE,
	},
	{
		value: 'expireDays',
		locale: 'objects.integrations.storage.expireDays',
		field: 'expire_days',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'disabled',
		sort: SortSymbols.NONE,
	},
];
