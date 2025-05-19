<template>
  <wt-popup :shown="file" class="upload-popup" v-bind="$attrs" @close="close">
    <template #title>
      {{ $t('objects.ccenter.res.importCsv.title') }}
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
</template>


<script setup lang="ts">
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'

import resourceDisplayApi from '../api/resourceDisplay.js'
import { useUploadCsvNumbers } from '../composables/useUploadCsvNumbers.js'

const props = defineProps({
  file: { type: File, required: true },
  parentId: { type: [String, Number], required: true },
})

const { t } = useI18n()

const emit = defineEmits(['close'])

const close = () => emit('close')


const {
  separator,
  selectedColumn,
  columns,
  parsedError,
  preUploadIssue,
  loading,
  previewRows,
  csvTableHeaders,
  upload,
} = useUploadCsvNumbers(toRef(props, 'file'), {
  parentId: toRef(props, 'parentId'),
  close,
  upload: (formData) =>
    resourceDisplayApi.uploadNumbers({
      parentId: props.parentId,
      formData: formData,
    }),
})

</script>


<style lang="scss" scoped>
@use '../css/upload-popup';
</style>
