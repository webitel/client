<template>
  <wt-popup
    class="upload-popup"
    min-width="480"
    @close="close"
  >
    <template slot="title">
      {{ $t('objects.importCSV') }}
    </template>
    <template slot="main">
      <wt-loader v-show="isReadingFile"></wt-loader>
      <section
        v-show="!isReadingFile"
        class="upload-popup-form"
      >
        <wt-checkbox
          v-model="skipHeaders"
          :label="$t('objects.CSV.skipHeaders')"
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
        <article class="upload-popup-form__file-preview">
          <wt-table
            :headers="csvPreviewTableHeaders"
            :data="csvPreviewTableData"
            :selectable="false"
          ></wt-table>
        </article>
        <article
          v-if="parseErrorStackTrace"
          class="upload-popup-form__error-stack-trace"
        >{{ parseErrorStackTrace }}
        </article>
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
              :placeholder="field.name"
              :track-by="null"
            ></wt-select>
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
import parse from 'csv-parse';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import { addUser } from '../api/users';

const processFile = (file, { charset = 'utf-8' } = {}) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const loadedFile = e.target.result;
      resolve(loadedFile);
    });
    reader.addEventListener('error', (e) => reject(e));
    reader.readAsText(file, charset);
  })
);

const parseCSV = (csvStr, options = {}) => (
  new Promise((resolve, reject) => {
    const callback = (err, output) => {
      if (output) resolve(output, err);
      reject(err);
    };
    parse(csvStr, options, callback);
  })
);

export default {
  name: 'upload-users-popup',
  // mixins: [uploadCSVMixin],
  props: {
    file: {
      required: true,
    },
  },
  data: () => ({
    isReadingFile: false,
    isParsingCSV: false,
    parsedFile: null,
    parseErrorStackTrace: '',
    csvPreview: [[]],

    skipHeaders: true,
    separator: ',',
    charsetOptions: [],
    charset: { name: 'UTF-8', value: 'utf-8' },
    mappingFields: [
      {
        name: 'username',
        required: true,
        csv: {},
      },
      {
        name: 'name',
        required: false,
        csv: {},
      },
      {
        name: 'extension',
        required: false,
        csv: {},
      },
      {
        name: 'email',
        required: false,
        csv: {},
      },
    ],
  }),
  computed: {
    csvColumns() {
      return this.skipHeaders
        ? Object.keys(this.csvPreview[0])
        : Object.keys(this.csvPreview[0]).map((col, index) => `${index + 1} column`);
    },
    parseCSVOptions() {
      /* docs: https://csv.js.org/parse/options/ */
      return {
        delimiter: this.separator,
        columns: (firstLine) => {
          if (this.skipHeaders) return firstLine;
          return firstLine.map((item, index) => `${index}`);
        },
        skipLinesWithError: true,
        skipEmptyLines: true,
        cast: true,
      };
    },
    csvPreviewTableHeaders() {
      return this.csvColumns.map((col, index) => ({
        text: col,
        value: this.skipHeaders ? col : `${index}`,
      }));
    },
    csvPreviewTableData() {
      // const data = this.skipHeaders ? this.csvPreview.slice(1) : this.csvPreview;
      const data = this.csvPreview;
      // return data.map((row) => (
      //   row.reduce((rowObj, field, index) => ({
      //     ...rowObj,
      //     [index]: field,
      //   }), {})
      // ));
      return data;
    },
  },
  watch: {
    skipHeaders() {
      this.handleParseOptionsChange();
    },
    separator() {
      this.handleParseOptionsChange();
    },
  },
  methods: {
    handleParseOptionsChange() {
      this.processCSVPreview();
      this.resetMappings();
    },
    async processCSVPreview() {
      try {
        this.parseErrorStackTrace = '';
        this.csvPreview = await parseCSV(this.parsedFile, { ...this.parseCSVOptions, toLine: 4 });
      } catch (err) {
        this.parseErrorStackTrace = err;
        this.csvPreview = [[]];
      }
    },
    async processCSV() {
      const data = await this.parseCSV();
      console.info('data', data);
    },
    async parseCSV() {
      this.isParsingCSV = true;

      try {
        this.parseErrorStackTrace = '';
        return await parseCSV(this.parsedFile, this.parseCSVOptions);
      } catch (err) {
        this.parseErrorStackTrace = err;
        return err;
      } finally {
        this.isParsingCSV = false;
      }
    },
    async readFile() {
      this.parsedFile = await processFile(this.file, {});
    },
    async initUploadPopup() {
      this.isReadingFile = true;

      await this.readFile();
      await this.processCSVPreview();

      this.isReadingFile = false;
    },
    resetMappings() {
      // reset previously selected values
      this.mappingFields = this.mappingFields.map((field) => ({
        ...field,
        csv: field.tags ? [] : {},
      }));
    },
    async addItem(item) {
      await addUser(item);
    },
    close() {
      this.$emit('close');
    },
  },
  created() {
    this.initUploadPopup();
    this.handleParseOptionsChange = debounce(this.handleParseOptionsChange);
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../app/css/objects/upload-popup";
</style>
