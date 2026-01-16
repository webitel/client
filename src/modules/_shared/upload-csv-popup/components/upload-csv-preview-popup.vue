<template>
  <wt-popup
    class="upload-popup"
    v-bind="$attrs"
    min-width="680"
    @close="close"
  >
    <template #title>
      {{ $t('objects.importCSV') }}
    </template>
    <template #main>
      <wt-loader
        v-show="isReadingFile"
        class="upload-popup__reading-file-loader"
      />
      <section
        v-show="!isReadingFile"
        class="upload-popup-form"
      >
        <!--        PREVIEW SECTION: preview loader, preview table, parsing stack trace-->
        <section>
          <wt-loader
            v-show="isParsingPreview"
            class="upload-popup__parsing-preview-loader"
          />
          <article
            v-show="!isParsingPreview"
            class="upload-popup-form__file-preview"
          >
            <wt-table
              :data="csvPreviewTableData"
              :grid-actions="false"
              :headers="filteredCsvPreviewTableHeaders"
              :selectable="false"
            />
          </article>
        </section>
      </section>
      <article
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="upload-popup-form__error-stack-trace typo-caption"
      >
        {{ parseErrorStackTrace }}
      </article>
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
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import uploadCSVMixin from '../mixins/uploadCSVMixin';

export default {
  name: 'UploadCsvPreviewPopup',
  mixins: [uploadCSVMixin],
  props: {
    skipHeaders: {
      type: Boolean,
      default: true,
    },
    separator: {
      type: String,
      default: ',',
    },
    charset: {
      type: String,
      default: 'utf-8',
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../css/upload-popup';
</style>
