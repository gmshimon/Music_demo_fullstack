import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload, User, CheckCircle } from 'lucide-react'
import MultiTrackUploader from '@/components/MultiTrackUploader/MultiTrackUploader'
import ArtistInfoForm from '@/components/ArtistInfoForm/ArtistInfoForm'
import ReviewSubmission from '@/components/ReviewSubmission/ReviewSubmission'
import StepsProgress from '@/components/StepsProgress/StepsProgress'

const ArtistSubmissionPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [tracks, setTracks] = useState([])
  const [artistInfo, setArtistInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    biography: '',
    socialMedia: {
      instagram: '',
      soundcloud: '',
      spotify: '',
      youtube: '',
      twitter: ''
    }
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateArtistInfo = () => {
    const newErrors = {}
    if (!artistInfo.name.trim()) newErrors.name = 'Artist name is required'
    if (!artistInfo.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(artistInfo.email))
      newErrors.email = 'Email is invalid'
    if (!artistInfo.phone.trim()) newErrors.phone = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateArtistInfo()) {
      setCurrentStep(2)
      return
    }

    if (tracks.length === 0) {
      alert('Please upload at least one track')
      setCurrentStep(1)
      return
    }

    const incomplete = tracks.filter(t => t.status !== 'completed')
    if (incomplete.length > 0) {
      alert('Please wait for all tracks to finish uploading')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 3000)) // simulate API
    setIsSubmitting(false)
    alert(
      "Submission successful! We'll review your tracks and get back to you soon."
    )

    // Reset
    setTracks([])
    setArtistInfo({
      name: '',
      email: '',
      phone: '',
      location: '',
      biography: '',
      socialMedia: {
        instagram: '',
        soundcloud: '',
        spotify: '',
        youtube: '',
        twitter: ''
      }
    })
    setCurrentStep(1)
  }

  const steps = [
    { number: 1, title: 'Upload Tracks', icon: Upload },
    { number: 2, title: 'Artist Info', icon: User },
    { number: 3, title: 'Review & Submit', icon: CheckCircle }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800'>
      <div className='container mx-auto px-4 pb-8 max-w-4xl pt-24'>
        <StepsProgress steps={steps} currentStep={currentStep} />

        <div className='space-y-8'>
          {currentStep === 1 && (
            <MultiTrackUploader tracks={tracks} setTracks={setTracks} />
          )}
          {currentStep === 2 && (
            <ArtistInfoForm
              artistInfo={artistInfo}
              setArtistInfo={setArtistInfo}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <ReviewSubmission artistInfo={artistInfo} tracks={tracks} />
          )}
        </div>

        <div className='flex justify-between mt-8'>
          <Button
            variant='outline'
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className='border-gray-600 text-gray-300 hover:bg-gray-700'
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
            >
              {isSubmitting ? (
                <div className='flex items-center'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Submitting...
                </div>
              ) : (
                'Submit for Review'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default ArtistSubmissionPage
