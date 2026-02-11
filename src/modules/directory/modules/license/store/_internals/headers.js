import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'id',
		locale: 'objects.directory.license.licenseId',
		width: '50px',
		field: 'id',
		sort: SortSymbols.NONE,
	},
	{
		value: 'product',
		locale: 'objects.directory.license.product',
		field: 'product',
		sort: SortSymbols.NONE,
	},
	{
		value: 'valid-from',
		locale: 'objects.directory.license.validFrom',
		width: '150px',
		field: 'not_before',
		sort: SortSymbols.NONE,
	},
	{
		value: 'valid-till',
		locale: 'objects.directory.license.validTill',
		field: 'not_after',
		sort: SortSymbols.NONE,
	},
	{
		value: 'used',
		locale: 'objects.directory.license.used',
		field: 'used',
		sort: SortSymbols.NONE,
	},
	{
		value: 'limit',
		locale: 'objects.directory.license.limit',
		field: 'limit',
		sort: SortSymbols.NONE,
	},
	{
		value: 'competitive',
		locale: 'objects.directory.license.competitive',
		field: 'competitive',
		sort: SortSymbols.NONE,
	},
	{
		value: 'status',
		locale: 'objects.directory.license.status',
		width: '120px',
		field: 'not_after',
		sort: SortSymbols.NONE,
	},
];
