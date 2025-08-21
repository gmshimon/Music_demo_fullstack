const esc = (s = '') =>
  String(s).replace(
    /[&<>"']/g,
    m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        m
      ])
  )
// 1) Submission Confirmation
export const submissionConfirmationTemplate = ({
  userName, // from updated user profile or req.user
  title, // req.body.title
  genre, // req.body.genre (optional)
  bpm, // req.body.bpm (optional)
  key, // req.body.key (optional)
  url, // finalUrl || req.body.url (stream/download)
  uploadedAt, // trackDoc.createdAt or new Date()
  labelName = 'Your Label'
} = {}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50; margin: 0 0 8px;">Hi ${esc(
        userName || 'there'
      )},</h2>
      <p>Your track titled <strong>"${esc(
        title
      )}"</strong> has been uploaded successfully.</p>

      <div style="margin:12px 0 16px; padding:12px; border:1px solid #eee; border-radius:8px; background:#fafafa;">
        <div style="font-weight:600; margin-bottom:6px;">Track details</div>
        <div style="font-size:14px;">
          ${genre ? `<div><strong>Genre:</strong> ${esc(genre)}</div>` : ''}
          ${
            bpm || bpm === 0
              ? `<div><strong>BPM:</strong> ${esc(bpm)}</div>`
              : ''
          }
          ${key ? `<div><strong>Key:</strong> ${esc(key)}</div>` : ''}
          ${
            uploadedAt
              ? `<div><strong>Uploaded:</strong> ${new Date(
                  uploadedAt
                ).toLocaleString()}</div>`
              : ''
          }
          ${
            url
              ? `<div><strong>Link:</strong> <a href="${esc(
                  url
                )}" style="color:#2563eb; text-decoration:none;">Listen / Download</a></div>`
              : ''
          }
        </div>
      </div>

      <p>We’ll notify you once the review is complete.</p>
      <br />
      <p style="color: #888;">Thank you for submitting to ${esc(labelName)}.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa; margin:0;">This is an automated message from ${esc(
        labelName
      )}.</p>
    </div>
  `
}
