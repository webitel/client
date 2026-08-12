<template>
  <div class="import-csv-upload-action">
    <upload-file-icon-btn
      :disabled="disabled"
      accept=".csv"
      @change="processCSV"
    />
    <upload-csv-preview-popup
      :add-bulk-items="saveBulkData"
      :charset="item.parameters.charset.value"
      :disabled="disabled"
      :file="file"
      :mapping-fields="mappingFields"
      :separator="item.parameters.separator"
      :shown="file"
      :skip-headers="item.parameters.skipHeaders"
      @close="close"
      @save="handleSave"
    />
  </div>
</template>

<script lang="ts" setup>
import { QueueMembersAPI } from '@webitel/api-services/api';
import { computed, ref } from 'vue';

import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import UploadCsvPreviewPopup from '../../../../_shared/upload-csv-popup/components/upload-csv-preview-popup.vue';
import { useNormalizeCsvMembers } from '../../../../contact-center/modules/queues/modules/members/composables/useNormalizeCsvMembers';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';

const props = defineProps<{
	// biome-ignore lint/suspicious/noExplicitAny: the import-csv entity shape
	item: Record<string, any>;
	disabled?: boolean;
}>();

const file = ref<File | null>(null);

const parentId = computed(() => String(props.item.source.id));

const mappingFields = computed(() =>
	Object.entries(ImportCsvMemberMappings).map(([name, mapping]) => ({
		...(mapping as object),
		name,
		csv: props.item.parameters.mappings[name],
	})),
);

const { saveBulkData } = useNormalizeCsvMembers({
	parentId,
	file,
	mappingFields,
});

const processCSV = (files: FileList) => {
	const selected = files?.[0];
	if (selected) file.value = selected;
};

const close = () => {
	file.value = null;
};

const handleSave = () => {
	if (props.item.parameters.clearMembers) {
		QueueMembersAPI.deleteBulk({
			parentId: parentId.value,
			id: [],
		});
	}
};
</script>

<style lang="scss" scoped></style>
