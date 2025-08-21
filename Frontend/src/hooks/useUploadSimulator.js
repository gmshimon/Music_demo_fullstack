import { useRef } from 'react'

/**
 * Simulates async uploads for a list of tracks and reports progress via setTracks.
 * Call: simulateUpload(newTracks, setTracks)
 */
export default function useUploadSimulator () {
  const timersRef = useRef([])

  const simulateUpload = (newTracks, setTracks) => {
    newTracks.forEach((track, trackIndex) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          timersRef.current = timersRef.current.filter(t => t !== interval)
          setTracks(prev =>
            prev.map(t =>
              t.id === track.id
                ? { ...t, uploadProgress: 100, status: 'completed' }
                : t
            )
          )
        } else {
          setTracks(prev =>
            prev.map(t =>
              t.id === track.id
                ? {
                    ...t,
                    uploadProgress: Math.min(progress, 100),
                    status: 'uploading'
                  }
                : t
            )
          )
        }
      }, 200 + trackIndex * 100) // stagger
      timersRef.current.push(interval)
    })
  }

  return { simulateUpload }
}
