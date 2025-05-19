import type { Ref } from 'vue';
import { isRef, ref, toValue, watch } from 'vue';

import parseCSV from '../scripts/parseCSV';
import type { ParsedCsv } from '../types/parsedCsv';

interface CsvParserOptions {
  separator?: string | Ref<string>;
}

export function useCsvParser(
  file: Ref<File | null>,
  opts: CsvParserOptions = {},
) {
  const separator = isRef(opts.separator)
    ? opts.separator
    : ref(opts.separator ?? ',');

  const parsed = ref<ParsedCsv | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const process = async () => {
    if (!file.value) return;
    loading.value = true;
    try {
      const text = await file.value.text();
      const [firstLine, ...rest] = text.split(/\r?\n/);
      const headers: string[] =
        (await parseCSV(firstLine, { delimiter: toValue(separator) }))[0] || [];
      const rows: Record<string, string>[] = await parseCSV(rest.join('\n'), {
        delimiter: toValue(separator),
        columns: headers,
      });

      parsed.value = { headers, rows };
      error.value = null;
    } catch (e) {
      error.value = (e as Error).message;
      parsed.value = null;
    } finally {
      loading.value = false;
    }
  };

  watch([file, separator], process, { immediate: true });

  return { parsed, loading, parsedError: error };
}
