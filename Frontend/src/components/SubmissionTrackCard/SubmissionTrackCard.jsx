import { CheckCircle, Clock, Music, XCircle } from 'lucide-react'
import React from 'react'
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
const SubmissionTrackCard = ({setSelected,sub}) => {
  return (
    <div

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
  )
}

export default SubmissionTrackCard
