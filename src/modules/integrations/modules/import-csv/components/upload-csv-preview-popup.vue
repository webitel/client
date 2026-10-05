<template>
  <wt-popup
    v-bind="$attrs"
    class="upload-csv-preview-popup"
    min-width="680"
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
        color="secondary"
        @click="close"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import {
	HandlingCSVMode,
	type UseUploadCsvProps,
	useUploadCsv,
} from '@webitel/ui-sdk/modules/UploadCsvPopup';
import { toRef } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props extends UseUploadCsvProps {
	skipHeaders?: boolean;
	separator?: string;
	/** dead until WTEL defect #2 is fixed: processFile always reads utf-8 */
	charset?: string;
}

const props = withDefaults(defineProps<Props>(), {
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

<style lang="scss" scoped>
.upload-csv-preview-popup {
  :deep(.wt-popup__popup) {
    min-height: 40vh; // to place loader in the center, till file is parsed
  }

  .upload-csv-preview-popup__reading-file-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .upload-csv-preview-popup__parsing-preview-loader {
    margin: auto;
  }

  .upload-csv-preview-popup__file-preview .wt-table {
    overflow: auto;
    max-width: 60vw;
  }
}
</style>
