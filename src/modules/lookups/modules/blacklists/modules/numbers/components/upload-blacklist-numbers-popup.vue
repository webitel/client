<template>
  <wt-upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :import-runner="importRunner"
    :mapping-fields="mappingFields"
    @change-mapping-fields="mappingFields = $event as CsvMappingField[]"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { BlacklistNumbersAPI } from '@webitel/api-services/api';
import { type ImportRunner, useEventBus } from '@webitel/ui-sdk/composables';
import {
	type CsvMappingField,
	WtUploadCsvPopup,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	file: File | null;
	parentId: string | number; // required to create new numbers
	importRunner: ImportRunner;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const eventBus = useEventBus();

const baseLocale = 'objects.lookups.blacklist.csvMappingFields';

const mappingFields = ref<CsvMappingField[]>([
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
]);

// [Claude] the file is saved in chunks, so counts are summed up to report once the import is done
const importedCount = ref(0);
const skippedCount = ref(0);

const saveBulkData = async (items: unknown[]) => {
	const { data = [], failures = [] } = await BlacklistNumbersAPI.addBulk({
		parentId: props.parentId,
		items: items as Record<string, unknown>[],
	});
	importedCount.value += data.length;
	skippedCount.value += failures.length;
};

// [Claude] the popup closes when the import starts, so skipped numbers are reported after the page's runner is done
const importRunner: ImportRunner = async (job, options) => {
	importedCount.value = 0;
	skippedCount.value = 0;
	await props.importRunner(job, options);
	if (skippedCount.value) {
		eventBus.$emit('notification', {
			type: 'info',
			text: t('objects.lookups.blacklist.importResult', {
				imported: importedCount.value,
				skipped: skippedCount.value,
			}),
		});
	}
};

const close = () => emit('close');
</script>
