export interface ParsedCsv {
  headers: string[];
  rows: Record<string, string>[];
}
