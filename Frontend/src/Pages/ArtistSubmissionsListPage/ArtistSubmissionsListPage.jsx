import React, { useState } from 'react'
import { Search, CheckCircle, XCircle, Clock, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dummy data matching your Submission + Track schema
const dummySubmissions = [
  {
    _id: 'sub1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+49123456789',
    biography: 'John is an upcoming DJ and music producer focusing on techno and house.',
    location: 'Berlin, Germany',
    socials: {
      instagram: 'https://instagram.com/johndoe',
      soundcloud: 'https://soundcloud.com/johndoe'
    },
    tracks: [
      { _id: 't1', title: 'Midnight Groove', genre: 'Techno', bpm: 128, key: 'Am', url: '/tracks/midnight.mp3' },
      { _id: 't2', title: 'Sunrise Flow', genre: 'House', bpm: 124, key: 'C#', url: '/tracks/sunrise.mp3' }
    ],
    review: {
      reviewer: 'rev1',
      score: 8,
      notes: 'Strong rhythm, needs better mastering.',
      feedbackForArtist: 'Great track overall! Work a bit more on your mix balance.'
    },
    status: 'In-Review',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'sub2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '',
    biography: 'Jane creates experimental ambient music with cinematic soundscapes.',
    location: 'Munich, Germany',
    socials: {
      spotify: 'https://open.spotify.com/jane-smith'
    },
    tracks: [
      { _id: 't3', title: 'Dreamscapes', genre: 'Ambient', bpm: 70, key: 'C', url: '/tracks/dreamscapes.mp3' }
    ],
    review: null,
    status: 'Pending',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'sub3',
    name: 'DJ Nightfall',
    email: 'dj@beats.com',
    phone: '+49111222333',
    biography: 'Nightfall is a festival DJ known for high-energy progressive sets.',
    location: 'Hamburg, Germany',
    socials: {
      youtube: 'https://youtube.com/djnightfall'
    },
    tracks: [
      { _id: 't4', title: 'Bassline Attack', genre: 'Progressive House', bpm: 130, key: 'Gm', url: '/tracks/bassline.mp3' },
      { _id: 't5', title: 'Festival Anthem', genre: 'EDM', bpm: 132, key: 'Dm', url: '/tracks/festival.mp3' }
    ],
    review: {
      reviewer: 'rev2',
      score: 6,
      notes: 'Energetic but repetitive.',
      feedbackForArtist: 'Try varying your drops to keep the energy fresh.'
    },
    status: 'Approved',
    createdAt: new Date().toISOString()
  }
]

const ArtistSubmissionsListPage = () => {
    const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = dummySubmissions.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusIcon = status => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className='text-green-500 w-5 h-5' />
      case 'Rejected':
        return <XCircle className='text-red-500 w-5 h-5' />
      case 'In-Review':
        return <Clock className='text-blue-400 w-5 h-5' />
      default:
        return <Clock className='text-yellow-400 w-5 h-5' />
    }
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
            <div
              key={sub._id}
              onClick={() => setSelected(sub)}
              className='bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all cursor-pointer border border-gray-700'
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>{sub.name}</h2>
                {getStatusIcon(sub.status)}
              </div>
              <p className='text-gray-400 text-sm'>{sub.email}</p>
              {sub.location && (
                <p className='text-xs text-gray-500 mt-1'>{sub.location}</p>
              )}
              <div className='flex items-center mt-3 space-x-2'>
                <Music className='w-4 h-4 text-purple-400' />
                <span>{sub.tracks.length} Tracks</span>
              </div>
              <p className='mt-2 text-xs text-gray-500'>
                Submitted on {new Date(sub.createdAt).toLocaleDateString()}
              </p>
              <span
                className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  sub.status === 'Approved'
                    ? 'bg-green-700 text-green-100'
                    : sub.status === 'Rejected'
                    ? 'bg-red-700 text-red-100'
                    : sub.status === 'In-Review'
                    ? 'bg-blue-700 text-blue-100'
                    : 'bg-yellow-600 text-yellow-100'
                }`}
              >
                {sub.status}
              </span>
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
                <p className='text-gray-400 mb-2'>Location: {selected.location}</p>
              )}
              {selected.biography && (
                <p className='text-gray-400 mb-4 text-sm'>
                  Bio: {selected.biography}
                </p>
              )}

              <h3 className='text-lg font-semibold mt-4 mb-2'>Tracks</h3>
              <ul className='list-disc pl-5 text-gray-300 text-sm mb-4'>
                {selected.tracks.map(t => (
                  <li key={t._id}>
                    {t.title} ({t.genre || 'Unknown'}) – {t.bpm} BPM [{t.key}]
                  </li>
                ))}
              </ul>

              {selected.review && (
                <div className='mb-4'>
                  <h3 className='text-lg font-semibold'>Review</h3>
                  <p className='text-gray-400 text-sm'>
                    Score: {selected.review.score}/10
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
};

export default ArtistSubmissionsListPage;