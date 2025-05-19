import { computed, Ref, ref, toValue, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCsvParser } from '../../../../../../_shared/upload-csv-popup/composables/useCsvParser';
import { ParsedCsv } from '../../../../../../_shared/upload-csv-popup/types/parsedCsv';

type Row = Record<string, string>;

type RowValidator = (row: Row, rowIndex: number) => string | null;
type RowValidatorResult = {
  row: number;
  messages: string[];
};

interface UseUploadCsvNumbersOpts {
  parentId: Ref<string | number>;
  close: () => void;
  upload: (formData: FormData) => Promise<void>;
}

export function useUploadCsvNumbers(
  file: Ref<File | null>,
  options: UseUploadCsvNumbersOpts,
) {
  const { t } = useI18n();

  const separator = ref(',');
  const selectedColumn = ref<{ id: string; name: string } | null>(null);
  const preUploadIssue = ref<string | null>(null);

  const { parsed, loading, parsedError } = useCsvParser(file, {
    separator,
  });

  const columns = computed(() => {
    if (!parsed.value) return [];
    if (parsed.value.headers.length === 1) return [];

    return parsed.value.headers
      .filter((header) => header.trim() !== '')
      .map((header) => ({ id: header, name: header }));
  });

  const previewRows = computed(() => {
    if (!parsed.value) return [];
    return parsed.value.rows.slice(0, 3);
  });
  const csvTableHeaders = computed(
    () =>
      parsed.value.headers.map((header) => ({
        text: header,
        value: header,
      })) || [],
  );

  const checkEmptyRows = (column: string): RowValidator => {
    return (row) => (!row[column].trim() ? 'emptyRowError' : null);
  };

  const runCsvRowValidation = (
    parsed: ParsedCsv,
    validators: RowValidator[],
  ): RowValidatorResult[] => {
    return parsed.rows.flatMap((row, idx) => {
      const messages = validators
        .map((rule) => rule(row, idx))
        .filter((msg): msg is string => !!msg);

      return messages.length ? [{ row: idx, messages }] : [];
    });
  };

  const formatIssues = (issues: RowValidatorResult[]): string => {
    const rowNums = issues.map((issue) => issue.row + 1);
    return t('objects.ccenter.res.importCsv.emptyRequiredFieldsMessage', {
      rows: rowNums.join(', '),
    });
  };

  const upload = async () => {
    if (!file.value || !selectedColumn.value || !parsed.value) return;

    const issues = runCsvRowValidation(parsed.value, [
      checkEmptyRows(selectedColumn.value.id),
    ]);
    if (issues.length > 0) {
      preUploadIssue.value = formatIssues(issues);
      return;
    }

    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('delimiter', toValue(separator));
    formData.append('map', selectedColumn.value.name);

    try {
      await options.upload(formData);
      options.close();
    } catch (error) {
      if (error instanceof Error) {
        preUploadIssue.value = error.message;
      } else {
        preUploadIssue.value = t('objects.ccenter.res.importCsv.uploadError');
      }
    }
  };

  watch([selectedColumn, separator], () => {
    preUploadIssue.value = null;
  });

  return {
    parsedError,
    preUploadIssue,
    separator,
    columns,
    selectedColumn,
    previewRows,
    csvTableHeaders,
    loading,
    upload,
  };
}
