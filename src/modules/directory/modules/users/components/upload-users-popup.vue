<template>
  <wt-upload-csv-popup
    v-bind="$attrs"
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script>
import { WtUploadCsvPopup } from '@webitel/ui-sdk/modules/UploadCsvPopup';

import UsersAPI from '../api/users';

const baseLocale = 'objects.directory.users.csvMappingFields';

export default {
	name: 'UploadUsersPopup',
	components: {
		WtUploadCsvPopup,
	},
	props: {
		file: {
			required: true,
		},
	},
	data: () => ({
		mappingFields: [
			{
				name: 'username',
				required: true,
				locale: `${baseLocale}.login`,
				csv: '',
			},
			{
				name: 'name',
				required: true,
				locale: `${baseLocale}.name`,
				csv: '',
			},
			{
				name: 'extension',
				required: false,
				locale: `${baseLocale}.extension`,
				csv: '',
			},
			{
				name: 'email',
				required: false,
				locale: `${baseLocale}.email`,
				csv: '',
			},
		],
	}),
	methods: {
		close() {
			this.$emit('close');
		},
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
			return UsersAPI.add({
				itemInstance,
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
