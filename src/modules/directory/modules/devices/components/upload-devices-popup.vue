<template>
  <upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import DevicesAPI from '../api/devices';

const baseLocale = 'objects.directory.devices.csvMappingFields';

export default {
	name: 'UploadDevicesPopup',
	mixins: [
		uploadCSVWrapperComponentMixin,
	],
	data() {
		return {
			mappingFields: [
				{
					name: 'account',
					required: true,
					locale: `${baseLocale}.account`,
					csv: '',
				},
				{
					name: 'name',
					required: false,
					locale: `${baseLocale}.name`,
					csv: '',
				},
				{
					name: 'brand',
					required: false,
					locale: `${baseLocale}.vendor`,
					csv: '',
				},
				{
					name: 'model',
					required: false,
					locale: `${baseLocale}.model`,
					csv: '',
				},
				{
					name: 'mac',
					required: false,
					locale: `${baseLocale}.mac`,
					csv: '',
				},
				{
					name: 'ip',
					required: false,
					locale: `${baseLocale}.ip`,
					csv: '',
				},
				{
					name: 'password',
					required: false,
					locale: `${baseLocale}.password`,
					csv: '',
					tooltip: this.$t('objects.directory.devices.passwordSetFromAccount'),
				},
			],
		};
	},

	methods: {
		async saveBulkData(data) {
			let processedChunkIndex = 1;
			try {
				for (const item of data) {
					await this.addItem(item);
					processedChunkIndex += 1;
				}
			} catch (err) {
				throw `An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`;
			}
		},
		addItem(item) {
			if (!item.password) item.password = item.account;
			return DevicesAPI.add({
				itemInstance: item,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
