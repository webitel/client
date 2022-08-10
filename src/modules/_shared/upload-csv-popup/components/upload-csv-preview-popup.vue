<template>
  <wt-popup
    class="upload-popup"
    min-width="680"
    @close="close"
  >
    <template slot="title">
      {{ $t('objects.importCSV') }}
    </template>
    <template v-slot:main>
      <wt-loader
        v-show="isReadingFile"
        class="upload-popup__reading-file-loader"
      ></wt-loader>
      <section
        v-show="!isReadingFile"
        class="upload-popup-form"
      >
        <!--        PREVIEW SECTION: preview loader, preview table, parsing stack trace-->
        <section>
          <wt-loader
            v-show="isParsingPreview"
            class="upload-popup__parsing-preview-loader"
          ></wt-loader>
          <article
            v-show="!isParsingPreview"
            class="upload-popup-form__file-preview"
          >
            <wt-table
              :headers="csvPreviewTableHeaders"
              :data="csvPreviewTableData"
              :selectable="false"
              :grid-actions="false"
            ></wt-table>
          </article>
        </section>
      </section>
      <article
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="upload-popup-form__error-stack-trace"
      >{{ parseErrorStackTrace }}
      </article>
    </template>
    <template
      v-if="!isReadingFile"
      slot="actions"
    >
      <wt-button
        :loading="isParsingCSV"
        :disabled="!allowSaveAction"
        @click="handleSave"
      >{{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import uploadCSVMixin from '../mixins/uploadCSVMixin';

export default {
  name: 'upload-csv-preview-popup',
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
@import "../css/upload-popup";
</style>
