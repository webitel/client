<template>
  <wt-popup
    v-bind="$attrs"
    :shown="file"
    class="upload-popup"
    @close="close"
  >
    <template #title>
      {{ $t('objects.ccenter.res.importCsv.title') }} 
    </template>

    <template #main>
      <form class="upload-popup-form__form">
        <wt-input
          v-model="separator"
          :v="v$.separator"
          :label="$t('objects.ccenter.res.importCsv.separator')"
          :placeholder="$t('objects.ccenter.res.importCsv.exampleSeparator')"
          required
        />

        <wt-select
          v-if="columns.length"
          v-model="selectedColumn"
          :v="v$.selectedColumn"
          :options="columns"
          :label="$t('objects.ccenter.res.importCsv.numberColumn')"
          required
        />
      </form>

      <section class="upload-popup-form__preview-section">
        <wt-loader v-if="isLoading" />

        <wt-table
          v-else-if="columns.length"
          :data="previewRows"
          :headers="csvTableHeaders"
          :grid-actions="false"
          :selectable="false"
          class="upload-popup-form__file-preview"
        />

        <article
          v-if="parseError"
          class="upload-popup-form__error-stack-trace"
        >
          {{ parseError }}
        </article>
      </section>
    </template>

    <template #actions>
      <wt-button
        :disabled="!selectedColumn || v$.$invalid"
        @click="upload"
      >
        {{ $t('objects.ccenter.res.importCsv.upload') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.ccenter.res.importCsv.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

import { useUploadCsv } from './useUploadCsv';

const props = defineProps({
  file: { type: File, required: true },
  parentId: { type: [String, Number], required: true },
});
const emit = defineEmits(['close']);

const {
  separator,
  selectedColumn,
  columns,
  parseError,
  isLoading,
  previewRows,
  csvTableHeaders,
  v$,
  upload,
  close,
} = useUploadCsv(toRef(props, 'file'), toRef(props, 'parentId'), emit);
</script>

<style lang="scss" scoped>
@use '../css/upload-popup';
</style>
