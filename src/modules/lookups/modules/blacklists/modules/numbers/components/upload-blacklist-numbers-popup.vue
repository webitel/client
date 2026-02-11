<template>
  <upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import BlacklistNumbersAPI from '../api/blacklistNumbers';

const baseLocale = 'objects.lookups.blacklist.csvMappingFields';

export default {
	name: 'UploadUsersPopup',
	mixins: [
		uploadCSVWrapperComponentMixin,
	],
	props: {
		parentId: {
			type: [
				Number,
				String,
			],
			required: true, // required to create new numbers
		},
	},
	data: () => ({
		mappingFields: [
			{
				name: 'number',
				required: true,
				locale: `${baseLocale}.number`,
				csv: '',
			},
			{
				name: 'description',
				required: false,
				locale: `${baseLocale}.description`,
				csv: '',
			},
			{
				name: 'expireAt',
				required: false,
				locale: `${baseLocale}.expireAt`,
				csv: '',
			},
		],
	}),

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
		addItem(itemInstance) {
			return BlacklistNumbersAPI.add({
				parentId: this.parentId,
				itemInstance,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
