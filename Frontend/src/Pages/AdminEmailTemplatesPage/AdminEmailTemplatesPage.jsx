import React, { useState } from "react"
import { Search } from "lucide-react"
import EmailTemplatePreviewModal from "@/components/EmailTemplatePreviewModal/EmailTemplatePreviewModal"
import EmailTemplateCard from "@/components/EmailTemplateCard/EmailTemplateCard"
import EmailTemplateEditModal from "@/components/EmailTemplateEditModal/EmailTemplateEditModal"


const initialTemplates = [
  {
    _id: "1",
    name: "submission_confirmation",
    subject: "Your submission to {{label_name}} has been received 🎶",
    html: "<h2>Hello {{artist_name}}</h2><p>Thank you for submitting!</p>",
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    name: "submission_approved",
    subject: "Congratulations {{artist_name}} 🎉 Your submission was approved!",
    html: "<h2>Great news {{artist_name}}!</h2><p>Your track was approved!</p>",
    updatedAt: new Date().toISOString()
  }
]

const AdminEmailTemplatesPage = () => {
  const [templates, setTemplates] = useState(initialTemplates)
  const [search, setSearch] = useState("")
  const [preview, setPreview] = useState(null)
  const [edit, setEdit] = useState(null)

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSaveEdit = updated => {
    setTemplates(prev =>
      prev.map(t => (t._id === updated._id ? updated : t))
    )
    setEdit(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Admin Panel – Email Templates
        </h1>

        {/* Search Bar */}
        <div className="flex items-center mb-8 bg-gray-800 rounded-2xl px-4 py-2 shadow-md">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-500"
          />
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
