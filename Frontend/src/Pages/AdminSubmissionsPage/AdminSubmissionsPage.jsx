import React, { useEffect, useState } from 'react'
import { Search, Filter, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WaveSurfer from 'wavesurfer.js'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllSubmissions,
  reset,
  updateSubmission
} from '@/Redux/Slice/SubmissionSlice'
import SubmissionTrackCard from '@/components/SubmissionTrackCard/SubmissionTrackCard'
import Loading from '@/components/Loading/Loading'
import { showErrorToast, showSuccessToast } from '@/Utlis/toastUtils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAdminSocket } from '@/hooks/useAdminSocket'
import { useNavigate } from 'react-router-dom'

const AdminSubmissionsPage = () => {
  const {
    submissions,
    getSubmissionLoading,
    updateSubmissionLoading,
    updateSubmissionSuccess,
    updateSubmissionError
  } = useSelector(state => state.submission)
  const { user } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [formData, setFormData] = useState({
    score: '',
    notes: '',
    feedback: '',
    status: 'Pending'
  })

  useAdminSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllSubmissions())
  }, [dispatch])

  useEffect(() => {
    if (selected) {
      setFormData({
        score: selected.review?.score || '',
        notes: selected.review?.notes || '',
        feedback: selected.review?.feedback || '',
        status: selected.status || 'Pending'
      })
    }
  }, [selected])
  useEffect(() => {
    if (updateSubmissionSuccess) {
      showSuccessToast('Successfully review submitted')
      dispatch(reset())
      setSelected(null)
    }
    if (updateSubmissionError) {
      showErrorToast('Something went Wrong')
      dispatch(reset())
      setSelected(null)
    }
  }, [dispatch, updateSubmissionError, updateSubmissionSuccess])

  const filtered = submissions.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'All' || s.status === filter)
  )

  const handleReviewSubmit = e => {
    e.preventDefault()
    const data = {
      review: {
        feedback: formData.feedback,
        notes: formData.notes,
        score: parseInt(formData.score)
      },
      status: formData.status
    }
    dispatch(updateSubmission({ id: selected._id, data }))
    console.log('Review submitted:', data)
  }

  // WaveSurfer init for streaming waveform
  const createWaveform = (id, url) => {
    const container = document.getElementById(id)
    if (!container) return
    container.innerHTML = '' // reset if re-rendered

    const ws = WaveSurfer.create({
      container,
      waveColor: '#888',
      progressColor: '#8b5cf6',
      height: 60,
      responsive: true,
      backend: 'MediaElement'
    })

    ws.load(url)

    // ✅ auto-play after waveform is ready
    ws.on('ready', () => {
      ws.play()
    })
  }

  if (user?.role !== "Admin") {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200">
      <div className="text-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-md shadow-lg max-w-md animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-red-400 mb-2">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-400 mb-6">
          Oops! 🚫 This page is restricted to <span className="text-gray-200 font-semibold">Admin users</span> only.
        </p>

        {/* Action */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition text-white font-medium shadow-md"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

  if (getSubmissionLoading || updateSubmissionLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200'>
      <ToastContainer />
      <div className='container mx-auto px-4 py-16 max-w-7xl'>
        <h1 className='text-3xl font-bold mb-8 text-center text-white'>
          Admin Panel – Submissions
        </h1>

        {/* Search + Filter */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <div className='flex items-center flex-1 bg-gray-800 rounded-2xl px-4 py-2 shadow-md'>
            <Search className='text-gray-400 w-5 h-5 mr-2' />
            <input
              type='text'
              placeholder='Search by artist name...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='bg-transparent w-full outline-none text-gray-200 placeholder-gray-500'
            />
          </div>
          <div className='flex items-center bg-gray-800 rounded-2xl px-4 py-2 shadow-md'>
            <Filter className='text-gray-400 w-5 h-5 mr-2' />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='bg-transparent text-gray-200 outline-none'
            >
              <option value='All'>All</option>
              <option value='Pending'>Pending</option>
              <option value='In-Review'>In-Review</option>
              <option value='Approved'>Approved</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
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
            <div className='bg-gray-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]'>
              <button
                onClick={() => setSelected(null)}
                className='absolute top-3 right-3 text-gray-400 hover:text-white'
              >
                ✕
              </button>
              <h2 className='text-2xl font-bold mb-4'>{selected.name}</h2>
              <p className='text-gray-400 mb-4'>{selected.email}</p>

              {/* Tracks with waveform */}
              <h3 className='text-lg font-semibold mb-2'>Tracks</h3>
              {selected.tracks.map(t => (
                <div key={t._id} className='mb-6'>
                  <p className='mb-1'>{t.title}</p>
                  <div
                    id={`waveform-${t._id}`}
                    className='rounded bg-gray-800'
                  ></div>
                  <Button
                    onClick={() => createWaveform(`waveform-${t._id}`, t.url)}
                    className='mt-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                  >
                    ▶ Load & Play
                  </Button>
                </div>
              ))}

              {/* Review Form */}
              <form onSubmit={handleReviewSubmit} className='mt-6 space-y-4'>
                <div>
                  <label className='block mb-1'>Grade (1–10)</label>
                  <input
                    type='number'
                    name='score'
                    min='1'
                    max='10'
                    onChange={e =>
                      setFormData({ ...formData, score: e.target.value })
                    }
                    defaultValue={selected.review?.score || ''}
                    required
                    className='w-full rounded px-3 py-2 bg-gray-800 text-gray-200'
                  />
                </div>
                <div>
                  <label className='block mb-1'>Internal Notes</label>
                  <textarea
                    name='notes'
                    defaultValue={selected.review?.notes || ''}
                    onChange={e =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className='w-full rounded px-3 py-2 bg-gray-800 text-gray-200'
                  />
                </div>
                <div>
                  <label className='block mb-1'>Feedback for Artist</label>
                  <textarea
                    name='feedback'
                    defaultValue={selected.review?.feedback || ''}
                    onChange={e =>
                      setFormData({ ...formData, feedback: e.target.value })
                    }
                    className='w-full rounded px-3 py-2 bg-gray-800 text-gray-200'
                  />
                </div>
                <div>
                  <label className='block mb-1'>Status</label>
                  <select
                    name='status'
                    defaultValue={selected.status}
                    onChange={e =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className='w-full rounded px-3 py-2 bg-gray-800 text-gray-200'
                  >
                    <option value='Pending'>Pending</option>
                    <option value='In-Review'>In-Review</option>
                    <option value='Approved'>Approved</option>
                    <option value='Rejected'>Rejected</option>
                  </select>
                </div>
                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
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
