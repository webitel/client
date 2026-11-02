import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.integrations.storage.type',
		field: 'type',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'maxSize',
		locale: 'objects.integrations.storage.maxSize',
		field: 'max_size',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'expireDays',
		locale: 'objects.integrations.storage.expireDays',
		field: 'expire_days',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'disabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
