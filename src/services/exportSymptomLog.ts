import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { SymptomLogEntry } from './symptomLog';

function formatDate(entry: SymptomLogEntry): string {
  return entry.loggedAt ? entry.loggedAt.toDate().toLocaleDateString() : '—';
}

function buildHtml(entries: SymptomLogEntry[]): string {
  const rows = entries
    .map(
      (entry) => `
      <tr>
        <td>${formatDate(entry)}</td>
        <td>${entry.category}</td>
        <td>${entry.severity}/5</td>
        <td>${entry.note}</td>
      </tr>`
    )
    .join('');

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, sans-serif; padding: 24px; color: #1F2A20; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          p { color: #4A5548; font-size: 12px; margin-top: 0; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #DCD3BE; font-size: 13px; }
          th { color: #6B5D4F; text-transform: uppercase; font-size: 11px; letter-spacing: 0.4px; }
        </style>
      </head>
      <body>
        <h1>Symptom Log</h1>
        <p>Exported from Unfurl on ${new Date().toLocaleDateString()}</p>
        <table>
          <thead>
            <tr><th>Date</th><th>Category</th><th>Severity</th><th>Notes</th></tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;
}

/** Generates a PDF of the given symptom log entries and opens the native share sheet. */
export async function exportSymptomLogToPdf(entries: SymptomLogEntry[]): Promise<void> {
  const { uri } = await Print.printToFileAsync({ html: buildHtml(entries) });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' });
  }
}
