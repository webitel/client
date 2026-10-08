<template>
  <wt-upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :handling-mode="HandlingCSVMode.UPLOAD"
    :file-upload-handler="uploadFile"
    @close="emit('close')"
  />
</template>

<script lang="ts" setup>
import { ResourceDisplaysAPI } from '@webitel/api-services/api';
import {
	type CsvMappingField,
	HandlingCSVMode,
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
		locale: 'objects.ccenter.res.csvMappingFields.number',
		required: true,
		csv: '',
	},
]);

const uploadFile = async ({ separator }: { separator?: string }) => {
	await ResourceDisplaysAPI.upload({
		parentId: props.parentId,
		file: props.file,
		delimiter: separator || ',',
		map: mappingFields.value[0].csv as string,
	});
};
</script>
