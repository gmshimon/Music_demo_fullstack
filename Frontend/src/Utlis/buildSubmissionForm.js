export function buildSubmissionForm(data) {
  const form = new FormData();

  // 1) Artist info
  const artist = data.artistInfo;
  form.append("name", artist.name);
  form.append("email", artist.email);
  form.append("phone", artist.phone);
  form.append("biography", artist.biography);
  form.append("location", artist.location);

  // Socials (flatten them)
  form.append("socials.instagram", artist.socialMedia.instagram || "");
  form.append("socials.soundcloud", artist.socialMedia.soundcloud || "");
  form.append("socials.spotify", artist.socialMedia.spotify || "");
  form.append("socials.youtube", artist.socialMedia.youtube || "");

  // 2) Files + track metadata (order matters)
  const trackMetas = [];
  data.tracks.forEach((track) => {
    // append file (must be File or Blob object from input type="file")
    if (track.file) {
      form.append("files", track.file); 
    }

    // collect metadata in the same index order
    trackMetas.push({
      title: track.title,
      genre: track.genre,
      bpm: track.bpm,
      key: track.key,
      description: track.description,
    });
  });

  // 3) Add track metadata as JSON string
  form.append("tracks", JSON.stringify(trackMetas));

  return form;
}
