import parse from 'csv-parse';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';

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
      required: true,
      description: '[{ name: String, required: Boolean, csv: String, multiple: Boolean }]',
    },
    addBulkItems: {
      type: Function,
    },
  },
  data: () => ({
    isReadingFile: false,
    isParsingCSV: false,
    parsedFile: null,
    isParsingPreview: false,
    parseErrorStackTrace: '',
    csvPreview: [[]],

    skipHeaders: true,
    separator: ',',
    charsetOptions: [],
    charset: { name: 'UTF-8', value: 'utf-8' },
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
    csvPreviewTableData() {
      return this.csvPreview;
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
    handleParseOptionsChange() {
      this.processCSVPreview();
      this.resetMappings();
      this.isParsingPreview = false;
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
      try {
        const data = await this.parseCSV();
        console.info('data', data);
        const normalizedData = this.normalizeCSVData(data);
        console.info('normalized data', normalizedData);
        await this.saveBulkData(normalizedData);
        // this.close();
      } catch (err) {
        this.parseErrorStackTrace = err;
        throw err;
      }
    },
    async parseCSV() {
      this.isParsingCSV = true;

      try {
        this.parseErrorStackTrace = '';
        return await parseCSV(this.parsedFile, this.parseCSVOptions);
      } catch (err) {
        throw err;
      } finally {
        this.isParsingCSV = false;
      }
    },
    normalizeCSVData(data) {
      const nonEmptyMappingFields = this.mappingFields.filter((field) => !isEmpty(field.csv));
      return data.map((dataItem) => (
        nonEmptyMappingFields.reduce((normalizedItem, { name, csv, multiple }) => ({
          ...normalizedItem,
          [name]: multiple // if multiple is true, csv is arr
            ? csv.reduce((list, key) => [...list, dataItem[key]], [])
            : dataItem[csv],
        }), {})
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
      this.mappingFields = this.mappingFields.map((field) => ({
        ...field,
        csv: field.tags ? [] : {},
      }));
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
        // eslint-disable-next-line no-throw-literal
        throw `An error occurred during saving ${(processedChunkIndex - 1) * chunkSize}-${processedChunkIndex * chunkSize} data chunk: ${JSON.stringify(err)}`;
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
