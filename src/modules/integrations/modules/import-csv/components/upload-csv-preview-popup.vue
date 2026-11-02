<template>
  <wt-popup
    :shown="shown"
    :size="ComponentSize.MD"
    class="upload-csv-preview-popup"
    @close="close"
  >
    <template #title>
      {{ t('objects.importCSV') }}
    </template>

    <template #main>
      <wt-loader
        v-show="isReadingFile"
        class="upload-csv-preview-popup__reading-file-loader"
      />

      <section v-show="!isReadingFile">
        <wt-loader
          v-show="isParsingPreview"
          class="upload-csv-preview-popup__parsing-preview-loader"
        />
        <article
          v-show="!isParsingPreview"
          class="upload-csv-preview-popup__file-preview"
        >
          <wt-table
            :data="csvPreviewTableData"
            :grid-actions="false"
            :headers="filteredCsvPreviewTableHeaders"
            :selectable="false"
          />
        </article>
      </section>
    </template>

    <template
      v-if="!isReadingFile"
      #actions
    >
      <wt-button
        :disabled="!allowSaveAction"
        :loading="isParsingCSV"
        @click="handleSave"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ButtonColor, ComponentSize } from '@webitel/ui-sdk/enums';
import {
	HandlingCSVMode,
	type UseUploadCsvProps,
	useUploadCsv,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { toRef } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props extends UseUploadCsvProps {
	shown?: boolean;
	skipHeaders?: boolean;
	separator?: string;
}

const props = withDefaults(defineProps<Props>(), {
	shown: false,
	skipHeaders: true,
	separator: ',',
	charset: 'utf-8',
	handlingMode: HandlingCSVMode.PROCESS,
});

const emit = defineEmits<{
	(e: 'changeMappingFields', value: unknown[]): void;
	(e: 'save'): void;
	(e: 'close'): void;
}>();

const { t } = useI18n();

const {
	isReadingFile,
	isParsingCSV,
	isParsingPreview,
	csvPreviewTableData,
	filteredCsvPreviewTableHeaders,
	allowSaveAction,
	handleSave,
	close,
} = useUploadCsv({
	props,
	emit,
	skipHeaders: toRef(props, 'skipHeaders'),
	separator: toRef(props, 'separator'),
});
</script>

<style scoped>
/* [Claude] the popup keeps its height while the file is read, so the loader sits in its middle */
.upload-csv-preview-popup :deep(.wt-popup__popup) {
  min-height: 40vh;
}

.upload-csv-preview-popup :deep(.wt-popup__main) {
  display: flex;
  flex-direction: column;
}

.upload-csv-preview-popup__reading-file-loader,
.upload-csv-preview-popup__parsing-preview-loader {
  margin: auto;
}

.upload-csv-preview-popup__file-preview .wt-table {
  overflow: auto;
}
</style>
