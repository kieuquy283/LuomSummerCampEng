type CsvValue = string | number | boolean | null | undefined | string[];

type CsvRecord = Record<string, CsvValue>;

const escapeCsvValue = (value: CsvValue) => {
  const normalized = Array.isArray(value) ? value.join(' | ') : value ?? '';
  const stringValue = String(normalized);

  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
};

export const exportToCsv = (records: CsvRecord[], filename: string) => {
  if (records.length === 0 || typeof document === 'undefined') {
    return;
  }

  const headers = Array.from(
    records.reduce((set, record) => {
      Object.keys(record).forEach((key) => set.add(key));
      return set;
    }, new Set<string>()),
  );

  const lines = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => escapeCsvValue(record[header])).join(',')),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
