import React, { useEffect, useState } from 'react'
import { Search, CheckCircle, XCircle, Clock, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getMySubmissions } from '@/Redux/Slice/SubmissionSlice'
import Loading from '@/components/Loading/Loading'
import SubmissionTrackCard from '@/components/SubmissionTrackCard/SubmissionTrackCard'

const ArtistSubmissionsListPage = () => {
  const { submissions, getSubmissionLoading } = useSelector(
    state => state.submission
  )
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMySubmissions())
  }, [dispatch])

  const filtered = submissions.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  if (getSubmissionLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200'>
      <div className='container mx-auto px-4 py-16 max-w-6xl'>
        <h1 className='text-3xl font-bold mb-8 text-center text-white'>
          Artist Submissions
        </h1>

        {/* Search Bar */}
        <div className='flex items-center mb-8 bg-gray-800 rounded-2xl px-4 py-2 shadow-md'>
          <Search className='text-gray-400 w-5 h-5 mr-2' />
          <input
            type='text'
            placeholder='Search by artist name...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='bg-transparent w-full outline-none text-gray-200 placeholder-gray-500'
          />
        </div>

        {/* Submissions Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map(sub => (
            <div key={sub._id}>
              <SubmissionTrackCard setSelected={setSelected} sub={sub} />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
            <div className='bg-gray-900 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative'>
              <button
                onClick={() => setSelected(null)}
                className='absolute top-3 right-3 text-gray-400 hover:text-white'
              >
                ✕
              </button>
              <h2 className='text-2xl font-bold mb-4'>{selected.name}</h2>
              <p className='text-gray-400 mb-2'>Email: {selected.email}</p>
              {selected.phone && (
                <p className='text-gray-400 mb-2'>Phone: {selected.phone}</p>
              )}
              {selected.location && (
                <p className='text-gray-400 mb-2'>
                  Location: {selected.location}
                </p>
              )}
              {selected.biography && (
                <p className='text-gray-400 mb-4 text-sm'>
                  Bio: {selected.biography}
                </p>
              )}

              <h3 className='text-lg font-semibold mt-4 mb-2'>Tracks</h3>
              <ul className='list-disc pl-5 text-gray-300 text-sm mb-4'>
                {selected.tracks.map(t => (
                  <li key={t._id} className='flex flex-col'>
                    <span className='mb-1'>
                      {t.title} ({t.genre || 'Unknown'}) – {t.bpm} BPM [{t.key}]
                    </span>
                    <audio
                      src={t.url}
                      controls
                      autoPlay // 🔥 makes it play automatically
                      className='w-full mt-1'
                    />
                  </li>
                ))}
              </ul>

              {selected.review && (
                <div className='mb-4'>
                  <h3 className='text-lg font-semibold'>Review</h3>
                  <p className='text-gray-400 text-sm'>
                    Score: {selected.review.score || 0}/10
                  </p>
                  {selected.review.feedbackForArtist && (
                    <p className='text-gray-400 text-sm mt-1'>
                      Feedback: {selected.review.feedbackForArtist}
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={() => alert('Taking action...')}
                className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
              >
                Take Action
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtistSubmissionsListPage
