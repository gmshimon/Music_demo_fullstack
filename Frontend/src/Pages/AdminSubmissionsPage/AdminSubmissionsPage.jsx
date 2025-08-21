import React, { useState } from 'react'
import { Search, Music, CheckCircle, XCircle, Clock, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WaveSurfer from 'wavesurfer.js'

// Dummy admin data (replace with API later)
const dummySubmissions = [
  {
    _id: 'sub1',
    name: 'John Doe',
    email: 'john@example.com',
    tracks: [
      { _id: 't1', title: 'Midnight Groove', url: 'http://res.cloudinary.com/dzx8yxn8k/video/upload/v1755786490/wdajgorkkzb2lr1u1vlw.mp4' },
      { _id: 't2', title: 'Sunrise Flow', url: 'http://res.cloudinary.com/dzx8yxn8k/video/upload/v1755786490/wdajgorkkzb2lr1u1vlw.mp4' }
    ],
    status: 'Pending',
    review: null,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'sub2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    tracks: [{ _id: 't3', title: 'Dreamscapes', url: '/tracks/dreamscapes.mp3' }],
    status: 'In-Review',
    review: { score: 7, feedbackForArtist: 'Good vibe, could polish mix more.' },
    createdAt: new Date().toISOString()
  }
]

const AdminSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState(dummySubmissions)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = submissions.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'All' || s.status === filter)
  )

  const getStatusBadge = status => {
    switch (status) {
      case 'Approved':
        return 'bg-green-700 text-green-100'
      case 'Rejected':
        return 'bg-red-700 text-red-100'
      case 'In-Review':
        return 'bg-blue-700 text-blue-100'
      default:
        return 'bg-yellow-600 text-yellow-100'
    }
  }

  const handleReviewSubmit = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    const updated = submissions.map(sub =>
      sub._id === selected._id
        ? {
            ...sub,
            review: {
              score: form.get('score'),
              notes: form.get('notes'),
              feedbackForArtist: form.get('feedback')
            },
            status: form.get('status')
          }
        : sub
    )
    setSubmissions(updated)
    setSelected(null)
  }

  // WaveSurfer init for streaming waveform
  const createWaveform = (id, url) => {
    const container = document.getElementById(id)
    if (!container) return
    container.innerHTML = '' // reset if re-rendered
    WaveSurfer.create({
      container,
      waveColor: '#888',
      progressColor: '#8b5cf6',
      height: 60,
      responsive: true,
      backend: 'MediaElement',
    }).load(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Admin Panel – Submissions
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center flex-1 bg-gray-800 rounded-2xl px-4 py-2 shadow-md">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search by artist name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center bg-gray-800 rounded-2xl px-4 py-2 shadow-md">
            <Filter className="text-gray-400 w-5 h-5 mr-2" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent text-gray-200 outline-none"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In-Review">In-Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(sub => (
            <div
              key={sub._id}
              onClick={() => setSelected(sub)}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all cursor-pointer border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{sub.name}</h2>
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(sub.status)}`}>
                  {sub.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{sub.email}</p>
              <div className="flex items-center mt-3 space-x-2">
                <Music className="w-4 h-4 text-purple-400" />
                <span>{sub.tracks.length} Tracks</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Submitted {new Date(sub.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">{selected.name}</h2>
              <p className="text-gray-400 mb-4">{selected.email}</p>

              {/* Tracks with waveform */}
              <h3 className="text-lg font-semibold mb-2">Tracks</h3>
              {selected.tracks.map(t => (
                <div key={t._id} className="mb-6">
                  <p className="mb-1">{t.title}</p>
                  <div id={`waveform-${t._id}`} className="rounded bg-gray-800"></div>
                  <Button
                    onClick={() => createWaveform(`waveform-${t._id}`, t.url)}
                    className="mt-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  >
                    ▶ Load & Play
                  </Button>
                </div>
              ))}

              {/* Review Form */}
              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block mb-1">Grade (1–10)</label>
                  <input
                    type="number"
                    name="score"
                    min="1"
                    max="10"
                    defaultValue={selected.review?.score || ''}
                    required
                    className="w-full rounded px-3 py-2 bg-gray-800 text-gray-200"
                  />
                </div>
                <div>
                  <label className="block mb-1">Internal Notes</label>
                  <textarea
                    name="notes"
                    defaultValue={selected.review?.notes || ''}
                    className="w-full rounded px-3 py-2 bg-gray-800 text-gray-200"
                  />
                </div>
                <div>
                  <label className="block mb-1">Feedback for Artist</label>
                  <textarea
                    name="feedback"
                    defaultValue={selected.review?.feedbackForArtist || ''}
                    className="w-full rounded px-3 py-2 bg-gray-800 text-gray-200"
                  />
                </div>
                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={selected.status}
                    className="w-full rounded px-3 py-2 bg-gray-800 text-gray-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Review">In-Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  Save Review
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSubmissionsPage
