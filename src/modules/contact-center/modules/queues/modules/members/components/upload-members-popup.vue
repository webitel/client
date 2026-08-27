<template>
  <wt-upload-csv-popup
    v-bind="$attrs"
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @change-mapping-fields="mappingFields = $event as CsvMappingField[]"
    @close="emit('close')"
  />
</template>

<script lang="ts" setup>
import {
	type CsvMappingField,
	WtUploadCsvPopup,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { ref, toRef } from 'vue';

import ImportCsvMemberMappings from '../../../../../../integrations/modules/import-csv/lookups/ImportCsvMemberMappings.lookup';
import { useNormalizeCsvMembers } from '../composables/useNormalizeCsvMembers';

const props = defineProps<{
	file: File | null;
	parentId: string | number;
}>();

const emit = defineEmits<{
	close: [];
}>();

/**
 * The csv importers' shared mixin was only a `file` prop and a `close` emit,
 * both of which are declared here.
 */
const mappingFields = ref<CsvMappingField[]>(
	Object.entries(ImportCsvMemberMappings).map(([name, mapping]) => ({
		// the popup fills this in as the user maps columns
		csv: '',
		...(mapping as object),
		name,
	})),
);

const { saveBulkData } = useNormalizeCsvMembers({
	parentId: toRef(() => String(props.parentId)),
	file: toRef(props, 'file'),
	mappingFields,
});
</script>

<style lang="scss" scoped></style>
