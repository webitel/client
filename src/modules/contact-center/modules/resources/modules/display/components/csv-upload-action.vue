<template>
  <div>
    <upload-file-icon-btn
      accept=".csv"
      class="icon-action"
      @change="handleChange"
    />

    <wt-popup
      :shown="isPopupShown"
      class="upload-popup"
      v-bind="$attrs" @close="close">
      <template #title>
        {{ $t('objects.importCSV') }}
      </template>

      <template #main>
        <form class="upload-popup-form__form">
          <wt-input
            v-model="separator"
            :label="t('objects.ccenter.res.importCsv.separator')"
            :placeholder="t('objects.ccenter.res.importCsv.exampleSeparator')"
            required
          />

          <wt-select
            v-model="selectedColumn"
            :options="columns"
            :label="t('objects.ccenter.res.importCsv.numberColumn')"
            required
          />
        </form>


        <section class="upload-popup-form__preview-section">
          <wt-loader v-if="loading" />

          <wt-table
            v-else-if="previewRows.length"
            :data="previewRows"
            :headers="csvTableHeaders"
            :grid-actions="false"
            :selectable="false"
            class="upload-popup-form__file-preview"
          />
        </section>

        <article v-if="parsedError" class="upload-popup-form__error-stack-trace">
          {{ parsedError }}
        </article>

        <article v-if="preUploadIssue" class="upload-popup-form__error-stack-trace">
          {{ preUploadIssue }}
        </article>
      </template>

      <template #actions>
        <wt-button :disabled="!selectedColumn" @click="upload">
          {{ t('objects.ccenter.res.importCsv.upload') }}
        </wt-button>
        <wt-button color="secondary" @click="close">
          {{ t('objects.ccenter.res.importCsv.close') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
import resourceDisplayApi from '../api/resourceDisplay';
import { useUploadCsvNumbers } from '../composables/useUploadCsvNumbers';

const props = defineProps<{
  parentId: string | number;
  onSuccess?: () => void;
}>();
const emit = defineEmits(['success']);

const file = ref<File | null>(null);
const { t } = useI18n();
const isPopupShown = computed(() => !!file.value);
const close = () => {
  file.value = null;
  preUploadIssue.value = null;
  parsedError.value = null;
};
const handleChange = (files: File[]) => {
  file.value = files[0] ?? null;
};

const {
  separator,
  selectedColumn,
  columns,
  previewRows,
  csvTableHeaders,
  parsedError,
  preUploadIssue,
  loading,
  isValid,
  getPayload,
} = useUploadCsvNumbers(file, toRef(props, 'parentId'));

const upload = async () => {
  if (!isValid()) return;
  const payload = getPayload();
  if (!payload) return;

  try {
    await resourceDisplayApi.uploadNumbers(payload);
    emit('success');
    props.onSuccess?.();
    close();
  } catch (e) {
    preUploadIssue.value =
      e instanceof Error
        ? e.message
        : t('objects.ccenter.res.importCsv.uploadError');
  }
};

watch(selectedColumn, () => {
  preUploadIssue.value = null;
});
</script>
<style lang="scss" scoped>
  @use '../css/upload-popup';
</style>
