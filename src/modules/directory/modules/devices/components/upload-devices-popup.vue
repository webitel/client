<template>
  <wt-upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script setup lang="ts">
import { DevicesAPI } from '@webitel/api-services/api';
import { WtUploadCsvPopup } from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { useI18n } from 'vue-i18n';

defineProps<{
	file: File | null;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const baseLocale = 'objects.directory.devices.csvMappingFields';

const mappingFields = [
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
		tooltip: t('objects.directory.devices.passwordSetFromAccount'),
	},
];

const close = () => emit('close');

const addItem = (item: Record<string, string>) => {
	if (!item.password) item.password = item.account;
	return DevicesAPI.add({
		itemInstance: item,
	});
};

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
