import { emitNewSubmission } from '../../Socket/index.js'
import { submissionConfirmationTemplate } from '../../Utlis/EmailTemplate/email-templates.js'
import { sendEmail } from '../../Utlis/sendEmail.js'
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

    // 1) Build email HTML
    const html = submissionConfirmationTemplate({
      userName: name,
      tracks: createdTracks.map(t => ({
        title: t.title,
        genre: t.genre,
        bpm: t.bpm,
        key: t.key,
        url: t.url,
        uploadedAt: t.createdAt
      })),
      labelName: 'Music Demo'
    })

    // 2) Send email
    await sendEmail({
      to: email,
      subject: `Submission received – ${createdTracks.length} track(s) uploaded`,
      html
    })

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
