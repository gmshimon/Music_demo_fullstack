import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import EmailTemplatePreviewModal from '@/components/EmailTemplatePreviewModal/EmailTemplatePreviewModal'
import EmailTemplateCard from '@/components/EmailTemplateCard/EmailTemplateCard'
import EmailTemplateEditModal from '@/components/EmailTemplateEditModal/EmailTemplateEditModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmails, reset, updateEmail } from '@/Redux/Slice/EmailSlice'
import Loading from '@/components/Loading/Loading'
import { showErrorToast, showSuccessToast } from '@/Utlis/toastUtils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AdminEmailTemplatesPage = () => {
  const {
    emails,
    getEmailLoading,
    updateEmailLoading,
    updateEmailSuccess,
    updateEmailError
  } = useSelector(state => state.email)

  const [search, setSearch] = useState('')
  const [preview, setPreview] = useState(null)
  const [edit, setEdit] = useState(null)

  const filtered = emails.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEmails())
  }, [dispatch])

  useEffect(() => {
    if (updateEmailSuccess) {
      showSuccessToast('Email updated Successfully')
      dispatch(reset())
    }
    if (updateEmailError) {
      showErrorToast('Something went wrong')
      dispatch(reset())
    }
  }, [dispatch, updateEmailError, updateEmailSuccess])

  const handleSaveEdit = updated => {
    dispatch(updateEmail({ id: updated?._id, data: updated }))
  }

  if (getEmailLoading || updateEmailLoading) {
    return <Loading />
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200'>
      <ToastContainer />
      <div className='container mx-auto px-4 py-16 max-w-7xl'>
        <h1 className='text-3xl font-bold mb-8 text-center text-white'>
          Admin Panel – Email Templates
        </h1>

        {/* Search Bar */}
        <div className='flex items-center mb-8 bg-gray-800 rounded-2xl px-4 py-2 shadow-md'>
          <Search className='text-gray-400 w-5 h-5 mr-2' />
          <input
            type='text'
            placeholder='Search templates...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='bg-transparent w-full outline-none text-gray-200 placeholder-gray-500'
          />
        </div>

        {/* Templates Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map(template => (
            <EmailTemplateCard
              key={template._id}
              template={template}
              onPreview={setPreview}
              onEdit={setEdit}
            />
          ))}
        </div>

        {/* Modals */}
        {preview && (
          <EmailTemplatePreviewModal
            template={preview}
            onClose={() => setPreview(null)}
          />
        )}

        {edit && (
          <EmailTemplateEditModal
            template={edit}
            onClose={() => setEdit(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  )
}

export default AdminEmailTemplatesPage
