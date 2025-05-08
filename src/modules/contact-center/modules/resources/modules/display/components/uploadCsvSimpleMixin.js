import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';

import parseCSV from '../../../../../../_shared/upload-csv-popup/scripts/parseCSV.js';
// Make it a normal hook
export const useUploadCsvSimple = {
  setup() {
    return { v$: useVuelidate() };
  },

  data: () => ({
    separator: ';',
    selectedColumn: '',
    columns: [],
    csvRows: [],
    parseError: '',
    isLoading: false,
  }),

  validations() {
    return {
      separator: { required },
      selectedColumn: { required },
    };
  },

  computed: {
    previewRows() {
      return this.csvRows.slice(0, 100);
    },
    csvTableHeaders() {
      if (!this.previewRows.length) return [];
      return Object.keys(this.previewRows[0]).map((key) => ({
        text: key,
        value: key,
      }));
    },
  },

  watch: {
    file: {
      immediate: true,
      handler(file) {
        if (file) this.processCsvFile(file);
      },
    },
    separator: {
      handler: debounce(function () {
        if (this.file) this.processCsvFile(this.file);
      }, 300),
    },
  },

  methods: {
    async processCsvFile(file) {
      this.isLoading = true;
      this.parseError = '';

      try {
        const text = await file.text();

        // 1. Читання заголовка
        const firstLine = text.split('\n')[0];
        const headerRecord = await parseCSV(firstLine, {
          delimiter: this.separator,
        });

        const headers = headerRecord[0] || [];

        if (headers.length < 2) {
          throw new Error('Невірний роздільник або файл має замало колонок.');
        }

        this.columns = headers.map((header) => ({
          label: header,
          value: header,
        }));

        if (!this.selectedColumn) {
          this.selectedColumn = this.columns[0]?.value || '';
        }

        // 2. Читання всього CSV
        const fullRecords = await parseCSV(text, {
          delimiter: this.separator,
          columns: true,
          skip_empty_lines: true,
        });

        this.csvRows = fullRecords;
      } catch (e) {
        console.error('Помилка парсингу CSV:', e);
        this.parseError = e.message || 'Не вдалося прочитати CSV файл.';
        this.csvRows = [];
        this.columns = [];
        this.selectedColumn = '';
      } finally {
        this.isLoading = false;
      }
    },

    async upload() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('delimiter', this.separator);
      formData.append('map', this.selectedColumn);

      try {
        await this.$axios.post(
          `https://dev.webitel.com/api/displays/${this.parentId}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
        this.close();
      } catch (error) {
        console.error('Помилка при відправці файлу:', error);
        alert('Сталася помилка при відправці!');
      }
    },

    close() {
      this.$emit('close');
    },
  },
};
