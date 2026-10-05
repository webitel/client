<template>
  <wt-popup
    size="sm"
    class="export-members-popup"
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.members.exportMembers.exportMembers') }}
    </template>
    <template #main>
      <div class="export-members-popup__main">
        <wt-single-select
          v-model:model-value="format"
          :show-clear="false"
          :options="formatOptions"
          :label="t('vocabulary.format')"
          :data-key="null"
          required
        />
        <wt-input-text
          v-if="isCSV"
          v-model:model-value="separator"
          :label="t('objects.CSV.separator')"
          required
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="disableExport"
        :loading="isExporting"
        @click="exportMembers"
      >
        {{ t('reusable.export') }}
      </wt-button>
      <wt-button
        color="secondary"
        :disabled="isExporting"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { QueueMembersAPI } from '@webitel/api-services/api';
import { downloadFile, FileFormat } from '@webitel/api-services/scripts';
import { ExportFormat } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	parentId: string | number;
	filters: Record<string, unknown>;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const format = ref<ExportFormat>(null);
const separator = ref('');
const isExporting = ref(false);

const isCSV = computed(() => format.value === ExportFormat.CSV);

const formatOptions = computed(() =>
	Object.values(ExportFormat).map((value) => value),
);

const disableExport = computed(
	() => !format.value || (isCSV.value && !separator.value) || isExporting.value,
);

const close = () => emit('close');

const exportMembers = async () => {
	isExporting.value = true;
	try {
		const { response } = await QueueMembersAPI.exportMembers({
			parentId: props.parentId,
			...props.filters,
			format: format.value,
			separator: isCSV.value ? separator.value : undefined,
		});
		downloadFile({
			response,
			fileFormat: format.value as unknown as FileFormat,
			filename: 'members',
		});
		close();
	} finally {
		isExporting.value = false;
	}
};
</script>

<style scoped>
.export-members-popup__main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
