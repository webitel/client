<template>
  <wt-popup
    class="upload-popup"
    min-width="680"
    @close="close"
  >
    <template slot="title">
      {{ $t('objects.importCSV') }}
    </template>
    <template slot="main">
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
          <article
            v-show="!isParsingPreview && parseErrorStackTrace"
            class="upload-popup-form__error-stack-trace"
          >{{ parseErrorStackTrace }}
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
              {{ field.name }}<span v-if="field.required">*</span>
            </p>
            <wt-select
              class="upload-popup-mapping-item__select"
              v-model="field.csv"
              :options="csvColumns"
              :multiple="field.multiple"
              :placeholder="field.name"
              :clearable="!field.required"
              :track-by="null"
            ></wt-select>
            <div class="upload-tooltip" v-if="field.tooltip">{{field.tooltip}}</div>
          </li>
        </ul>
      </section>
    </template>
    <template
      v-if="!isReadingFile"
      slot="actions"
    >
      <wt-button
        :loading="isParsingCSV"
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
};
</script>

<style lang="scss" scoped>
@import "../css/upload-popup";
</style>
