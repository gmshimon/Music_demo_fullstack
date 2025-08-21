import React from "react"
import { Button } from "@/components/ui/button"

const EmailTemplateCard = ({ template, onPreview, onEdit }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
      <p className="text-sm text-gray-400 mb-2">Subject: {template.subject}</p>
      <p className="text-xs text-gray-500 mb-4">
        Last updated: {new Date(template.updatedAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        <Button
          onClick={() => onPreview(template)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          Preview
        </Button>
        <Button
          onClick={() => onEdit(template)}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
        >
          Edit
        </Button>
      </div>
    </div>
  )
}

export default EmailTemplateCard
