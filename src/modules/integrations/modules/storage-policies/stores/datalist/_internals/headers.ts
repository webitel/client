import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		show: true,
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'channels',
		locale: [
			'vocabulary.channel',
			2,
		],
		show: true,
		field: 'channels',
		sort: SortSymbols.NONE,
	},
	{
		value: 'mimeTypes',
		locale: 'objects.integrations.storagePolicies.mimeTypes',
		show: true,
		field: 'mime_types',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		show: true,
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
	{
		value: 'retentionDays',
		locale: 'objects.integrations.storagePolicies.retentionDays',
		show: true,
		field: 'retention_days',
		sort: SortSymbols.NONE,
	},
	{
		value: 'speedDownload',
		locale: 'objects.integrations.storagePolicies.maxDownloadSpeed',
		show: true,
		field: 'speed_download',
		sort: SortSymbols.NONE,
	},
	{
		value: 'speedUpload',
		locale: 'objects.integrations.storagePolicies.maxUploadSpeed',
		show: true,
		field: 'speed_upload',
		sort: SortSymbols.NONE,
	},
	{
		value: 'maxUploadSize',
		locale: 'objects.integrations.storagePolicies.maxUploadSize',
		show: true,
		field: 'max_upload_size',
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		show: true,
		field: 'description',
		sort: SortSymbols.NONE,
	},
	{
		value: 'position',
		locale: 'objects.routing.dialplan.position',
		show: true,
		field: 'position',
		sort: SortSymbols.ASC,
	},
];
