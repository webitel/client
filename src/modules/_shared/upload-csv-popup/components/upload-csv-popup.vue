<template>
  <wt-popup
    class="upload-popup"
    min-width="680"
    @close="close"
  >
    <template v-slot:title>
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
        <wt-checkbox
          v-model="skipHeaders"
          :label="$t('objects.CSV.skipHeaders')"
          disabled
        ></wt-checkbox>
        <form class="upload-popup-form__form">
          <wt-select
            v-model="charset"
            :options="charsetOptions"
            :clearable="false"
            disabled
            :label="$t('objects.CSV.charSet')"
          ></wt-select>

          <wt-input
            v-model="separator"
            :label="$t('objects.CSV.separator')"
          ></wt-input>
        </form>

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

        <!--        FIELDS MAPPING-->
        <ul class="upload-popup-mapping">
          <li class="upload-popup-mapping-item">
            <p class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title">
              {{ $t('objects.CSV.fieldName') }}
            </p>
            <p class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title">
              {{ $t('objects.CSV.CSVColumn') }}
            </p>
          </li>
          <li
            class="upload-popup-mapping-item"
            v-for="(field, key) in mappingFields"
            :key="key"
          >
            <p class="upload-popup-mapping-item__field">
              {{ field.text || field.name }}<span v-if="field.required">*</span>
            </p>
            <wt-select
              v-if="!field.multiple"
              class="upload-popup-mapping-item__select"
              v-model="field.csv"
              :options="csvColumns"
              :placeholder="field.text || field.name"
              :clearable="!field.required"
              :track-by="null"
            ></wt-select>
            <wt-tags-input
              v-else
              class="upload-popup-mapping-item__select"
              v-model="field.csv"
              :options="csvColumns"
              :placeholder="field.text || field.name"
            ></wt-tags-input>
            <div class="upload-tooltip" v-if="field.tooltip">{{field.tooltip}}</div>
          </li>
        </ul>
      </section>
      <article
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="upload-popup-form__error-stack-trace"
      >{{ parseErrorStackTrace }}
      </article>
    </template>
    <template
      v-if="!isReadingFile"
      v-slot:actions
    >
      <wt-button
        :loading="isParsingCSV"
        :disabled="!allowSaveAction"
        @click="processCSV"
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
  name: 'upload-csv-popup',
  mixins: [uploadCSVMixin],
  data: () => ({
    skipHeaders: true,
    separator: ',',
    charsetOptions: [],
    charset: { name: 'UTF-8', value: 'utf-8' },
  }),
};
</script>

<style lang="scss" scoped>
@import "../css/upload-popup";
</style>
