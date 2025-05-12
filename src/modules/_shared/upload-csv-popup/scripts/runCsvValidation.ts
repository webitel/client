import { ParsedCsv } from '../types/parsedCsv';

export type RowValidator = (
  row: Record<string, string>,
  rowIndex: number,
) => string | null;

export function runCsvValidation(
  parsed: ParsedCsv,
  validators: RowValidator[],
): { row: number; messages: string[] }[] {
  return parsed.rows.flatMap((row, idx) => {
    const messages = validators
      .map((rule) => rule(row, idx))
      .filter((msg): msg is string => !!msg);

    return messages.length ? [{ row: idx, messages }] : [];
  });
}
