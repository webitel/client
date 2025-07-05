import { computed, Ref, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCsvParser } from '../../../../../../_shared/upload-csv-popup/composables/useCsvParser';

type Row = Record<string, string>;

type RowValidator = (row: Row, rowIndex: number) => string | null;
type RowValidatorResult = {
  row: number;
  messages: string[];
};

export function useUploadCsvNumbers(
  file: Ref<File | null>,
  parentId: Ref<string | number>,
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
  const csvTableHeaders = computed(() =>
    parsed.value.headers.map((header) => ({
      text: header,
      value: header,
    })),
  );

  const checkEmptyRows = (column: string): RowValidator => {
    return (row) => (!row[column]?.trim() ? 'emptyRowError' : null);
  };

  const runCsvRowValidation = (): RowValidatorResult[] => {
    if (!parsed.value || !selectedColumn.value) return [];
    return parsed.value.rows.flatMap((row, idx) => {
      const messages = [
        checkEmptyRows(selectedColumn.value.id)(row, idx),
      ].filter(Boolean);
      return messages.length ? [{ row: idx, messages }] : [];
    });
  };

  const formatIssues = (issues: RowValidatorResult[]): string => {
    const rowNums = issues.map((issue) => issue.row + 1);
    return t('objects.ccenter.res.importCsv.emptyRequiredFieldsMessage', {
      rows: rowNums.join(', '),
    });
  };

  const isValid = () => {
    const issues = runCsvRowValidation();
    if (issues.length > 0) {
      preUploadIssue.value = formatIssues(issues);
      return false;
    }
    preUploadIssue.value = null;
    return true;
  };

  const getPayload = () => {
    if (!file.value || !selectedColumn.value) return null;
    return {
      parentId: toValue(parentId),
      file: file.value,
      delimiter: toValue(separator),
      map: selectedColumn.value.name,
    };
  };

  return {
    isValid,
    getPayload,
    parsedError,
    preUploadIssue,
    separator,
    columns,
    selectedColumn,
    previewRows,
    csvTableHeaders,
    loading,
  };
}
