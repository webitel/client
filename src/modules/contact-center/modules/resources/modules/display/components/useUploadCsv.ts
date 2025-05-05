import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';

import instance from '../../../../../../../app/api/instance';
import parseCSV from '../../../../../../_shared/upload-csv-popup/scripts/parseCSV';

export function useUploadCsv(
  file: Ref<File | null>,
  parentId: Ref<string | number>,
  emit: (event: 'close') => void,
) {
  const separator = ref(',');
  const selectedColumn = ref<{ id: string; name: string } | null>(null);
  const columns = ref<{ id: string; name: string }[]>([]);
  const csvRows = ref<unknown[]>([]);
  const parseError = ref('');
  const isLoading = ref(false);

  const rules = {
    separator: { required },
    selectedColumn: { required },
  };
  const v$ = useVuelidate(rules, { separator, selectedColumn });

  const previewRows = computed(() => csvRows.value.slice(0, 100));

  const csvTableHeaders = computed(() => {
    if (!previewRows.value.length) return [];
    return Object.keys(previewRows.value[0]).map((key) => ({
      text: key,
      value: key,
    }));
  });

  const getFirstLine = (text: string): string => {
    return text.split('\n')[0];
  };
  const parseHeaders = async (
    firstLine: string,
    separator: string,
  ): Promise<string[]> => {
    const headerRecord = await parseCSV(firstLine, { delimiter: separator });
    return headerRecord[0] || [];
  };

  const validateHeaders = (headers: string[]): boolean => {
    return headers.length >= 2;
  };
  const generateColumns = (
    headers: string[],
  ): { id: string; name: string }[] => {
    return headers
      .filter((header) => header.trim() !== '')
      .map((header) => ({ id: header, name: header }));
  };
  const parseFullCsv = async (
    text: string,
    separator: string,
  ): Promise<unknown[]> => {
    return parseCSV(text, {
      delimiter: separator,
      columns: true,
    });
  };

  const setError = (error: string) => {
    parseError.value = error;
  };

  const reset = () => {
    columns.value = [];
    selectedColumn.value = null;
    csvRows.value = [];
  };

  const processCsvFile = async (inputFile: File) => {
    isLoading.value = true;
    parseError.value = '';

    try {
      const text = await inputFile.text();

      const firstLine = getFirstLine(text);
      const headers = await parseHeaders(firstLine, separator.value);

      if (!validateHeaders(headers)) {
        reset();
        throw new Error('Невірний роздільник або файл має замало колонок.');
      }

      columns.value = generateColumns(headers);
      selectedColumn.value = columns.value[0];

      csvRows.value = await parseFullCsv(text, separator.value);
    } catch (e) {
      setError(e.message || 'Не вдалося прочитати CSV файл.');
      reset();
    } finally {
      isLoading.value = false;
    }
  };

  const validateRows = async () => {
    const columnId = selectedColumn.value!.id;

    const invalidRows = csvRows.value
      .map((row, index) => {
        const cell = row[columnId];
        return !cell || cell.trim() === '' ? index + 1 : null;
      })
      .filter((index) => index !== null);

    if (invalidRows.length > 0) {
      throw new Error(
        `Помилка: знайдено ${invalidRows.length} незаповнених рядків на позиціях ${invalidRows.join(', ')}. Заповніть всі рядки перед завантаженням.`,
      );
    }
  };

  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.append('file', file.value!);
    formData.append('delimiter', separator.value);
    formData.append('map', selectedColumn.value!.name);
    return formData;
  };

  const sendFile = async (formData: FormData) => {
    await instance.post(`/displays/${parentId.value}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const upload = async () => {
    v$.value.$touch();
    if (v$.value.$invalid || !file.value || !selectedColumn.value) return;

    try {
      validateRows();
      const formData = createFormData();
      await sendFile(formData);
      close();
    } catch (error) {
      setError(`Сталася помилка при відправці: ${error.message}`);
    }
  };

  const close = () => {
    emit('close');
  };

  watch(
    file,
    async (newFile) => {
      if (newFile) await processCsvFile(newFile);
    },
    { immediate: true },
  );

  watch(
    separator,
    debounce(async () => {
      if (file.value) await processCsvFile(file.value);
    }, 500),
  );

  return {
    separator,
    selectedColumn,
    columns,
    csvRows,
    parseError,
    isLoading,
    previewRows,
    csvTableHeaders,
    v$,
    processCsvFile,
    upload,
    close,
  };
}
