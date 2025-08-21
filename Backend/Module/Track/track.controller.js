export const createTrack = async (req, res, next) => {
  try {
    const userId = req.user?._id

    const {
      // track fields
      title,
      genre,
      bpm,
      key,
      url,

      // user updates (all optional; only provided fields will be updated)
      name,
      phone,
      bio,
      location,
      socials = {}
    } = req.body

    
  } catch (error) {}
}
