import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		width: '181.3px',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'channels',
		locale: [
			'vocabulary.channel',
			2,
		],
		width: '181.3px',
		field: 'channels',
		sort: SortSymbols.NONE,
	},
	{
		value: 'mimeTypes',
		locale: 'objects.integrations.storagePolicies.mimeTypes',
		width: '181.3px',
		field: 'mime_types',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
	{
		value: 'retentionDays',
		locale: 'objects.integrations.storagePolicies.retentionDays',
		width: '181.3px',
		field: 'retention_days',
		sort: SortSymbols.NONE,
	},
	{
		value: 'speedDownload',
		locale: 'objects.integrations.storagePolicies.maxDownloadSpeed',
		width: '181.3px',
		field: 'speed_download',
		sort: SortSymbols.NONE,
	},
	{
		value: 'speedUpload',
		locale: 'objects.integrations.storagePolicies.maxUploadSpeed',
		width: '181.3px',
		field: 'speed_upload',
		sort: SortSymbols.NONE,
	},
	{
		value: 'maxUploadSize',
		locale: 'objects.integrations.storagePolicies.maxUploadSize',
		width: '181.3px',
		field: 'max_upload_size',
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		width: '181.3px',
		field: 'description',
		sort: SortSymbols.NONE,
	},
	{
		value: 'position',
		locale: 'objects.routing.dialplan.position',
		width: '181.3px',
		field: 'position',
		sort: SortSymbols.ASC,
	},
];
