<template>
  <wt-popup
    v-bind="$attrs"
    :shown="file"
    class="upload-popup"
    @close="close"
  >
    <template #title>
      {{ t('objects.importCSV') }}
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
        <wt-checkbox
          v-model:selected="skipHeaders"
          :label="t('objects.CSV.skipHeaders')"
          disabled
        />
        <form class="upload-popup-form__form">
          <wt-select
            v-model="charset"
            :clearable="false"
            :label="t('objects.CSV.charSet')"
            :options="charsetOptions"
            disabled
          />

          <wt-input
            v-model="separator"
            :label="t('objects.CSV.separator')"
          />
        </form>

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
              :headers="csvPreviewTableHeaders"
              :selectable="false"
            />
          </article>
        </section>

        <!--        FIELDS MAPPING-->
        <ul class="upload-popup-mapping">
          <li class="upload-popup-mapping-item">
            <p
              class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title typo-subtitle-1"
            >
              {{ t('objects.CSV.fieldName') }}
            </p>
            <p
              class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title typo-subtitle-1"
            >
              {{ t('objects.CSV.CSVColumn') }}
            </p>
          </li>
          <li
            v-for="(field, key) in mappingFields"
            :key="key"
            class="upload-popup-mapping-item"
          >
            <p class="upload-popup-mapping-item__field typo-body-1">
              {{ t(field.locale) }}<span v-if="field.required">*</span>
            </p>
            <wt-select
              v-if="!field.multiple"
              v-model="field.csv"
              :clearable="!field.required"
              :options="csvColumns"
              :placeholder="t(field.locale)"
              :track-by="null"
              open-direction="above"
              class="upload-popup-mapping-item__select"
            />
            <wt-tags-input
              v-else
              v-model="field.csv"
              :options="csvColumns"
              :placeholder="t(field.locale)"
              class="upload-popup-mapping-item__select"
            />
            <div
              v-if="field.tooltip"
              class="upload-tooltip typo-caption"
            >
              {{ field.tooltip }}
            </div>
          </li>
        </ul>
      </section>
      <article
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="upload-popup-form__error-stack-trace"
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
        @click="processCSV"
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

<script>
import { useI18n } from 'vue-i18n';

import uploadCSVMixin from '../mixins/uploadCSVMixin';

export default {
  name: 'UploadCsvPopup',
  mixins: [uploadCSVMixin],
  setup() {
    const { t } = useI18n();

    return { t };
  },
  data: () => ({
    skipHeaders: true,
    separator: ',',
    charsetOptions: [],
    charset: { name: 'UTF-8', value: 'utf-8' },
  }),
};
</script>

<style lang="scss" scoped>
@use '../css/upload-popup';
</style>
