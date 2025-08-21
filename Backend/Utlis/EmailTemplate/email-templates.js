const esc = (s = '') =>
  String(s).replace(
    /[&<>"']/g,
    m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        m
      ])
  )

export const submissionConfirmationTemplate = ({
  userName,
  tracks = [], // array of { title, genre, bpm, key, url, uploadedAt }
  labelName = 'Music Demo'
} = {}) => {
  const trackListHtml = tracks
    .map(
      (t, i) => `
      <div style="margin-bottom:12px; padding:12px; border:1px solid #eee; border-radius:6px; background:#fafafa;">
        <div style="font-weight:600; margin-bottom:6px;">Track ${i + 1}</div>
        <div style="font-size:14px;">
          <div><strong>Title:</strong> ${esc(t.title || 'Untitled')}</div>
          ${t.genre ? `<div><strong>Genre:</strong> ${esc(t.genre)}</div>` : ''}
          ${
            typeof t.bpm !== 'undefined'
              ? `<div><strong>BPM:</strong> ${esc(t.bpm)}</div>`
              : ''
          }
          ${t.key ? `<div><strong>Key:</strong> ${esc(t.key)}</div>` : ''}
          ${
            t.uploadedAt
              ? `<div><strong>Uploaded:</strong> ${new Date(
                  t.uploadedAt
                ).toLocaleString()}</div>`
              : ''
          }
          ${
            t.url
              ? `<div><strong>Link:</strong> <a href="${esc(
                  t.url
                )}" style="color:#2563eb; text-decoration:none;">Listen / Download</a></div>`
              : ''
          }
        </div>
      </div>
    `
    )
    .join('')

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:0 auto; color:#333; line-height:1.6;">
      <h2 style="color:#1a1a1a; margin:0 0 16px;">Hello ${esc(
        userName || 'Artist'
      )},</h2>
      <p style="margin:0 0 16px;">
        Thank you for submitting your music to <strong>${esc(
          labelName
        )}</strong>.
        We’ve received the following tracks:
      </p>

      ${trackListHtml}

      <p style="margin:0 0 12px;">
        Our A&amp;R team will review your submission and get back to you shortly.
      </p>

      <p style="color:#777; font-size:13px; margin:0;">
        – The ${esc(labelName)} Team
      </p>

      <hr style="margin:24px 0; border:none; border-top:1px solid #eee;" />
      <p style="font-size:11px; color:#999; margin:0;">
        This is an automated confirmation email from ${esc(
          labelName
        )}. Please do not reply directly.
      </p>
    </div>
  `
}
