<template>
  <wt-upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="emit('close')"
  />
</template>

<script lang="ts" setup>
import { BlacklistNumbersAPI } from '@webitel/api-services/api';
import type { EngineListCommunication } from '@webitel/api-services/gen/models';
import {
	type CsvMappingField,
	WtUploadCsvPopup,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { ref } from 'vue';

const props = defineProps<{
	file: File;
	parentId: string | number;
}>();

const emit = defineEmits<{
	close: [];
}>();

const mappingFields = ref<CsvMappingField[]>([
	{
		name: 'number',
		required: true,
		locale: 'objects.lookups.blacklist.csvMappingFields.number',
		csv: '',
	},
	{
		name: 'description',
		required: false,
		locale: 'objects.lookups.blacklist.csvMappingFields.description',
		csv: '',
	},
	{
		name: 'expireAt',
		required: false,
		locale: 'objects.lookups.blacklist.csvMappingFields.expireAt',
		csv: '',
	},
]);

const saveBulkData = async (data: EngineListCommunication[]) => {
	let processedChunkIndex = 1;
	try {
		for (const itemInstance of data) {
			await BlacklistNumbersAPI.add({
				parentId: props.parentId,
				itemInstance,
			});
			processedChunkIndex += 1;
		}
	} catch (err) {
		throw `An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`;
	}
};
</script>
