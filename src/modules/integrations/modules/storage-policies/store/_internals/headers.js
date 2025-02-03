import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'channels',
    locale: ['vocabulary.channel', 2],
    field: 'channels',
    sort: SortSymbols.NONE,
  },
  {
    value: 'mimeTypes',
    locale: 'objects.integrations.storagePolicies.mimeTypes',
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
    field: 'retention_days',
    sort: SortSymbols.NONE,
  },
  {
    value: 'speedDownload',
    locale: 'objects.integrations.storagePolicies.maxDownloadSpeed',
    field: 'speed_download',
    sort: SortSymbols.NONE,
  },
  {
    value: 'speedUpload',
    locale: 'objects.integrations.storagePolicies.maxUploadSpeed',
    field: 'speed_upload',
    sort: SortSymbols.NONE,
  },
  {
    value: 'maxUploadSize',
    locale: 'objects.integrations.storagePolicies.maxUploadSize',
    field: 'max_upload_size',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'objects.description',
    field: 'description',
    sort: SortSymbols.NONE,
  },
  {
    value: 'position',
    locale: 'objects.routing.dialplan.position',
    field: 'position',
    sort: SortSymbols.ASC,
  },
];
