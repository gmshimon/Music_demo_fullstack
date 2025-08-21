import React from 'react'

const Loading = ({ size = 40, color = 'border-purple-500' }) => {
  return (
    <div className='h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200'>
      <div className='flex justify-center items-center h-screen'>
        <div
          className={`animate-spin rounded-full border-4 border-gray-700 ${color} border-t-transparent`}
          style={{ width: size, height: size }}
        ></div>
      </div>
    </div>
  )
}

export default Loading
