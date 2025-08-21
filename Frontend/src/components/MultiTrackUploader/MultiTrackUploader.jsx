import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload } from 'lucide-react'
import TrackCard from '../TrackCard/TrackCard'
import { validateFile } from '@/Utlis/fileValidation'
import useUploadSimulator from '@/hooks/useUploadSimulator'

const MultiTrackUploader = ({ tracks, setTracks }) => {
  const [dragActive, setDragActive] = useState(false)
  const { simulateUpload } = useUploadSimulator()

  const handleFiles = fileList => {
    const newTracks = []
    const errors = []

    Array.from(fileList).forEach((file, index) => {
      const error = validateFile(file)
      if (error) {
        errors.push({ file: file.name, error })
      } else {
        newTracks.push({
          id: Date.now() + index,
          file,
          title: file.name.replace(/\.[^/.]+$/, ''),
          genre: '',
          bpm: '',
          key: '',
          description: '',
          uploadProgress: 0,
          status: 'pending' // pending, uploading, completed, error
        })
      }
    })

    if (errors.length > 0) {
      alert(
        `Upload errors:\n${errors.map(e => `${e.file}: ${e.error}`).join('\n')}`
      )
    }

    if (newTracks.length > 0) {
      setTracks(prev => [...prev, ...newTracks])
      simulateUpload(newTracks, setTracks)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInput = e => {
    handleFiles(e.target.files)
  }

  const removeTrack = trackId => {
    setTracks(prev => prev.filter(t => t.id !== trackId))
  }

  const updateTrackInfo = (trackId, field, value) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, [field]: value } : t))
    )
  }

  const overallPct = tracks.length
    ? (tracks.filter(t => t.status === 'completed').length / tracks.length) *
      100
    : 0

  return (
    <Card className='bg-gray-900/50 border-gray-700'>
      <CardHeader>
        <CardTitle className='flex items-center text-white'>
          <Upload className='mr-2 text-purple-400' size={20} />
          Upload Your Tracks
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className='mx-auto mb-4 text-gray-400' size={48} />
          <p className='text-gray-300 mb-2'>
            Drag and drop your music files here
          </p>
          <p className='text-sm text-gray-500 mb-4'>
            Supported formats: MP3, WAV, FLAC, M4A (Max 100MB each)
          </p>
          <input
            type='file'
            multiple
            accept='.mp3,.wav,.flac,.m4a'
            onChange={handleFileInput}
            className='hidden'
            id='file-upload'
          />
          <label htmlFor='file-upload'>
            <Button
              variant='outline'
              className='border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
            >
              Choose Files
            </Button>
          </label>
        </div>

        {/* Uploaded Tracks */}
        {tracks.length > 0 && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white'>
              Uploaded Tracks ({tracks.length})
            </h3>
            {tracks.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                onRemove={removeTrack}
                onUpdate={updateTrackInfo}
              />
            ))}
          </div>
        )}

        {/* Overall Progress */}
        {tracks.length > 0 && (
          <div className='bg-gray-800/50 rounded-lg p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-300'>Overall Progress</span>
              <span className='text-sm text-gray-300'>
                {tracks.filter(t => t.status === 'completed').length} /{' '}
                {tracks.length} completed
              </span>
            </div>
            <div className='w-full bg-gray-700 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
export default MultiTrackUploader
