/**
 * RFC 4180 compliant CSV generator and browser downloader.
 */

export function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If the string contains comma, newline, carriage return, or double quote, wrap in quotes and escape quotes.
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function generateCsvString(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const headerLine = headers.map(escapeCsvField).join(",");
  const rowLines = rows.map((row) => row.map(escapeCsvField).join(","));
  return [headerLine, ...rowLines].join("\r\n");
}

export function downloadCsv(filename: string, headers: string[], rows: (string | number | boolean | null | undefined)[][]): void {
  const csvContent = generateCsvString(headers, rows);
  // Include UTF-8 BOM so Excel properly displays non-ASCII characters
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  // Sanitize filename
  const cleanName = filename.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
  link.download = cleanName.endsWith(".csv") ? cleanName : `${cleanName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
