import { computed, Ref, ref, unref } from 'vue';

import { useCsvParser } from '../../../../../../_shared/upload-csv-popup/composables/useCsvParser';
import { runCsvValidation } from '../../../../../../_shared/upload-csv-popup/scripts/runCsvValidation';

interface UseUploadCsvNumbersOpts {
  parentId: Ref<string | number>;
  close: () => void;
  upload: (formData: FormData) => Promise<void>;
}

export function useUploadCsvNumbers(
  file: Ref<File | null>,
  opts: UseUploadCsvNumbersOpts,
) {
  const separator = ref(',');
  const selectedColumn = ref<{ id: string; name: string } | null>(null);

  const { parsed, loading, error } = useCsvParser(file, {
    separator,
  });

  const columns = computed(() => {
    if (!parsed.value) return [];
    return parsed.value.headers
      .filter((header) => header.trim() !== '')
      .map((header) => ({ id: header, name: header }));
  });

  const previewRows = computed(() => parsed.value?.rows.slice(0, 100) || []);
  const csvTableHeaders = computed(
    () =>
      parsed.value?.headers.map((header) => ({
        text: header,
        value: header,
      })) || [],
  );

  const upload = async () => {
    if (!file.value || !selectedColumn.value || !parsed.value) return;

    const issues = runCsvValidation(parsed.value, [
      (row, idx) =>
        !row[selectedColumn.value.name].trim()
          ? `Row ${idx + 1} is empty`
          : null,
    ]);

    if (issues.length > 0) {
      const messages = issues
        .map(({ row, messages }) => `Row ${row + 1}: ${messages.join(', ')}`)
        .join('\\n');

      alert(`Cannot upload:\\n${messages}`);
    }

    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('delimiter', unref(separator));
    formData.append('map', selectedColumn.value.name);

    await opts.upload(formData);
    opts.close();
  };

  return {
    separator,
    columns,
    selectedColumn,
    previewRows,
    csvTableHeaders,
    error,
    loading,
    upload,
  };
}
