import React from 'react'
import { Button } from '@/components/ui/button'

const EmailTemplatePreviewModal = ({ template, onClose }) => {
  if (!template) return null

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className='bg-gray-900 rounded-2xl p-8 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-white'
        >
          ✕
        </button>
        <h2 className='text-2xl font-bold mb-4'>{template.name}</h2>
        <p className='text-gray-400 mb-4'>Subject: {template.subject}</p>
        <div
          className='bg-white text-black rounded-lg p-4 overflow-auto'
          dangerouslySetInnerHTML={{ __html: template.html }}
        ></div>
      </div>
    </div>
  )
}

export default EmailTemplatePreviewModal
