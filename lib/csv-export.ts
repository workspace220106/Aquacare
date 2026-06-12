/**
 * Utility to trigger a client-side download of a CSV file.
 * Automatically escapes values containing commas, quotes, or newlines.
 */
export function exportToCSV(filename: string, headers: string[], rows: (string | number | boolean | null | undefined)[][]) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(val => {
        const stringVal = String(val === null || val === undefined ? '' : val);
        const escaped = stringVal.replace(/"/g, '""');
        if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
          return `"${escaped}"`;
        }
        return escaped;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
