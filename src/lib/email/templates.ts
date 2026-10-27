import { site } from "@/lib/site";

export type FieldRow = { label: string; value: string };

export function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Clean HTML table of every submitted field. */
export function fieldsTable(rows: FieldRow[]) {
  const body = rows
    .map(
      (row) => `        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6edf5;font-size:13px;color:#5b7186;width:38%;font-weight:600;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6edf5;font-size:14px;color:#0b2a4a;">${escapeHtml(row.value || "—")}</td>
        </tr>`
    )
    .join("\n");

  return `      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e6edf5;border-radius:12px;overflow:hidden;">
${body}
      </table>`;
}

export type MailMeta = {
  title: string;
  eyebrow: string;
  intro: string;
  rows: FieldRow[];
  footerNote?: string;
};

/** Standard branded wrapper for every transactional email we send. */
export function baseTemplate({ title, eyebrow, intro, rows, footerNote }: MailMeta) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background:#f2f7fb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:0 0 16px;">
              <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="font-size:18px;font-weight:800;color:#0b2a4a;letter-spacing:-0.02em;">
                    ${escapeHtml(site.name)}
                    <span style="display:block;font-size:11px;font-weight:600;color:#0e8fa8;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(site.tagline)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0b2a4a;border-radius:16px 16px 0 0;padding:26px 28px;">
              <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5fc6d6;font-weight:700;margin-bottom:8px;">${escapeHtml(eyebrow)}</div>
              <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.01em;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:26px 20px 8px;">
              <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#3d5771;">${escapeHtml(intro)}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:0 20px 24px;">
${fieldsTable(rows)}
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:0 28px 26px;">
              <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#7d93a8;">${escapeHtml(
                footerNote || `This message was sent from ${site.name} — ${site.address}.`
              )}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 4px 0;text-align:center;font-size:12px;color:#8aa0b5;">
              © ${year} ${escapeHtml(site.name)} · ${escapeHtml(site.phone)} · ${escapeHtml(site.email)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
