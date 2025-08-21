import { emitNewSubmission } from '../../Socket/index.js'
import { submissionConfirmationTemplate } from '../../Utlis/EmailTemplate/email-templates.js'
import { sendEmail } from '../../Utlis/sendEmail.js'
import Email from '../Email/email.model.js'
import Submission from '../Submission/submission.model.js'
import { uploadTrackFile } from './track.cloudinary.js'
import Tracks from './track.model.js'

export const createTrack = async (req, res, next) => {
  try {
    const { _id } = req.user
    const files = req.files || []

    const {
      name,
      email,
      phone,
      biography,
      location,
      'socials.instagram': instagram,
      'socials.soundcloud': soundcloud,
      'socials.spotify': spotify,
      'socials.youtube': youtube,
      tracks: tracksMetaRaw
    } = req.body

    // Parse track metadata array (aligned with files order)
    let tracksMeta = []
    if (typeof tracksMetaRaw === 'string') {
      try {
        tracksMeta = JSON.parse(tracksMetaRaw)
      } catch {
        tracksMeta = []
      }
    } else if (Array.isArray(tracksMetaRaw)) {
      tracksMeta = tracksMetaRaw
    }

    // 1) upload all files in parallel
    const urls = await Promise.all(files.map(f => uploadTrackFile(f)))
    // 2) build track docs (order-based mapping)
    const trackData = urls.map((url, i) => ({
      title: tracksMeta[i]?.title,
      genre: tracksMeta[i]?.genre,
      bpm: tracksMeta[i]?.bpm,
      key: tracksMeta[i]?.key,
      url
    }))

    // 3) insert tracks
    const createdTracks = await Tracks.insertMany(trackData)

    // 4) create submission with artist snapshot + track IDs
    const submission = await Submission.create({
      name,
      email,
      phone,
      biography,
      location,
      socials: { instagram, soundcloud, spotify, youtube },
      tracks: createdTracks.map(t => t._id),
      createdBy: _id
    })

  // Send Email using the template

    const template = await Email.findOne({
      name: 'submission_confirmation'
    })

    if (template) {
      // Build track list HTML
      const trackListHtml = createdTracks
        .map(
          (t, i) =>
            `<div style="margin-bottom:6px;">
              ${i + 1}. <strong>${t.title || 'Untitled'}</strong> 
              (${t.genre || 'Unknown'} | BPM: ${t.bpm || '-'} | Key: ${
              t.key || '-'
            })
            </div>`
        )
        .join('')

      // Prepare variables
      const variables = {
        artist_name: name,
        label_name: 'Music Demo',
        track_list: trackListHtml
      }

      // Replace placeholders
      let subject = template.subject
      let html = template.html
      for (const key in variables) {
        const regex = new RegExp(`{{${key}}}`, 'g')
        subject = subject.replace(regex, variables[key] || '')
        html = html.replace(regex, variables[key] || '')
      }

      // ✅ Send email
      await sendEmail({
        to: email,
        subject,
        html
      })
    }

    // ✅ emit event to all connected admins
    emitNewSubmission({
      ...submission.toObject(),
      tracks: createdTracks // include full track docs so admin gets useful data
    })

    res.status(201).json({
      status: 'Success',
      message: 'Submission created',
      data: {
        ...submission.toObject(),
        tracks: createdTracks
      }
    })
  } catch (error) {
    next(error)
  }
}
