import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { parse } from 'csv-parse';

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
  props: {
    file: {
      required: true,
    },
    mappingFields: {
      type: Array,
      description: '[{ name: String, required: Boolean, csv: String, multiple: Boolean }]',
    },
    addBulkItems: {
      type: Function,
    },
  },
  model: {
    prop: 'mappingFields',
    event: 'changeMappingFields',
  },
  data: () => ({
    isReadingFile: false,
    isParsingCSV: false,
    parsedFile: null,
    isParsingPreview: false,
    parseErrorStackTrace: '',
    csvPreview: [[]],
  }),
  computed: {
    csvValues() {
      return  this.mappingFields
      .filter(field => field.csv)
      .map(field => field.csv)
      .flat();
    },
    filteredCsvColumns() {
      return this.csvColumns.filter(item => this.csvValues.indexOf(item) !== -1);
    },
    csvColumns() {
      return this.skipHeaders
        ? Object.keys(this.csvPreview[0])
        : Object.keys(this.csvPreview[0])
        .map((col, index) => `${index + 1} column`);
    },
    parseCSVOptions() {
      /* docs: https://csv.js.org/parse/options/ */
      return {
        delimiter: this.separator,
        columns: (firstLine) => {
          if (this.skipHeaders) return firstLine;
          return firstLine.map((item, index) => `${index}`);
        },
        // skipLinesWithError: true,
        skipEmptyLines: true,
        // cast: true,
      };
    },
    csvPreviewTableHeaders() {
      return this.csvColumns.map((col, index) => ({
        text: col,
        value: this.skipHeaders ? col : `${index}`,
      }));
    },
    filteredCsvPreviewTableHeaders() {
      return this.filteredCsvColumns.map((col, index) => ({
        text: col,
        value: this.skipHeaders ? col : `${index}`,
      }));
    },
    csvPreviewTableData() {
      return this.csvPreview;
    },
    allowSaveAction() {
      return this.mappingFields.every((field) => !field.required ||
        !isEmpty(field.csv));
    },
  },
  watch: {
    skipHeaders() {
      this.isParsingPreview = true;
      this.handleParseOptionsChange();
    },
    separator() {
      this.isParsingPreview = true;
      this.handleParseOptionsChange();
    },
  },
  methods: {
    handleSave() {
      this.$emit('save');
      return this.processCSV();
    },
    handleParseOptionsChange() {
      this.processCSVPreview();
      this.resetMappings();
      this.isParsingPreview = false;
    },
    async processCSVPreview() {
      try {
        this.parseErrorStackTrace = '';
        this.csvPreview = await parseCSV(this.parsedFile, {
          ...this.parseCSVOptions,
          toLine: 4,
        });
      } catch (err) {
        this.parseErrorStackTrace = err;
        this.csvPreview = [[]];
      }
    },
    async processCSV() {
      this.isParsingCSV = true;
      try {
        const sourceData = await this.parseCSV();
        console.info('upload csv: source data', sourceData);
        const normalizedData = this.normalizeCSVData(sourceData);
        console.info('upload csv: normalized data', normalizedData);
        await this.saveBulkData(normalizedData);
        this.close();
      } catch (err) {
        this.parseErrorStackTrace = err;
        throw err;
      } finally {
        this.isParsingCSV = false;
      }
    },
    async parseCSV() {
      try {
        this.parseErrorStackTrace = '';
        return await parseCSV(this.parsedFile, this.parseCSVOptions);
      } catch (err) {
        throw err;
      }
    },
    normalizeCSVData(data) {
      const nonEmptyMappingFields = this.mappingFields.filter((field) => !isEmpty(field.csv));
      return data.map((dataItem, index) => (
        nonEmptyMappingFields.reduce((
          normalizedItem,
          { name, csv, required },
        ) => {
          // if one of required fields on any row is empty, throw an error
          if (required &&
            isEmpty(dataItem[csv])) {
            // +1 because of indexing starts from 0, but rows counting from 1
            throw new Error(`Required field is empty: ${name} on row ${index +
            1}`);
          }
          return {
            ...normalizedItem,
            [name]: Array.isArray(csv)
              ? csv.map((csv) => dataItem[csv])
              : dataItem[csv],
          };
        }, {})
      ));
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
      const mappingFields = this.mappingFields.map((field) => ({
        ...field,
        csv: field.multiple ? [] : '',
      }));
      this.$emit('changeMappingFields', mappingFields);
    },
    async saveBulkData(data) {
      const chunkSize = 100;
      const chunksCount = Math.ceil(data.length / chunkSize);
      let processedChunkIndex = 1;
      try {
        for (; processedChunkIndex <= chunksCount; processedChunkIndex += 1) {
          // eslint-disable-next-line no-await-in-loop
          await this.addBulkItems(data.slice(
            (processedChunkIndex - 1) * chunkSize,
            processedChunkIndex * chunkSize,
          ));
        }
      } catch (err) {
        const errMessage = JSON.stringify(err instanceof Error
          ? err.message
          : err);
        // eslint-disable-next-line no-throw-literal
        throw new Error(`An error occurred during saving ${(processedChunkIndex -
          1) * chunkSize}-${processedChunkIndex *
        chunkSize} data chunk: ${errMessage}`);
      }
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
