<template>
  <wt-upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import { WtUploadCsvPopup } from '@webitel/ui-sdk/modules/UploadCsvPopup';

defineProps<{
	file: File;
}>();

const emit = defineEmits<{
	close: [];
}>();

const baseLocale = 'objects.directory.users.csvMappingFields';

const mappingFields = [
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
];

const close = () => emit('close');

const addItem = (itemInstance: Record<string, string>) =>
	UsersAPI.add({
		itemInstance,
	});

const saveBulkData = async (data: Record<string, string>[]) => {
	let processedChunkIndex = 1;
	try {
		for (const item of data) {
			await addItem(item);
			processedChunkIndex += 1;
		}
	} catch (err) {
		throw new Error(
			`An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`,
		);
	}
};
</script>
