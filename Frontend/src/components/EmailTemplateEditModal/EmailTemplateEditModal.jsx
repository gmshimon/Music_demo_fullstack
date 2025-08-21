// EmailTemplateEditModal.jsx
import React, { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Editor } from "@toast-ui/react-editor"
import "@toast-ui/editor/dist/toastui-editor.css"

const EmailTemplateEditModal = ({ template, onClose, onSave }) => {
  const editorRef = useRef()
  const [subject, setSubject] = useState(template?.subject || "")

  useEffect(() => {
    if (template?.html && editorRef.current) {
      editorRef.current.getInstance().setHTML(template.html)
    }
    if (template?.subject) {
      setSubject(template.subject)
    }
  }, [template])

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance()
    const html = editorInstance.getHTML()

    onSave({
      ...template,
      subject,
      html
    })

    onClose()
  }

  if (!template) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">
          Edit Template – {template.name}
        </h2>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-800 text-gray-200"
          />
        </div>

        {/* Variables Info */}
        {template.variables && template.variables.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-300">
              Available Variables:
            </label>
            <div className="flex flex-wrap gap-2">
              {template.variables.map((v) => (
                <span
                  key={v}
                  className="px-2 py-1 rounded bg-gray-700 text-xs text-purple-300 border border-purple-500"
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* HTML Editor */}
        <Editor
          ref={editorRef}
          initialValue={template.html || ""}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmailTemplateEditModal
