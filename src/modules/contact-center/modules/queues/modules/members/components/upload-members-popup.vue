<template>
  <upload-csv-popup
    v-bind="$attrs"
    v-model="mappingFields"
    :add-bulk-items="saveBulkData"
    :file="file"
    @close="emit('close')"
  />
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue';

import UploadCsvPopup from '../../../../../../_shared/upload-csv-popup/components/upload-csv-popup.vue';
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
 * `uploadCSVWrapperComponentMixin` was only a `file` prop and a `close` emit,
 * both of which are declared here. The mixin file stays — other csv importers
 * still use it.
 */
const mappingFields = ref<
	{
		name: string;
		csv?: string | string[];
	}[]
>(
	Object.entries(ImportCsvMemberMappings).map(([name, mapping]) => ({
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
