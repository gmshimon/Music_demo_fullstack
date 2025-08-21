import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="text-green-400" size={20} />;
    case "uploading":
      return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500" />;
    case "error":
      return <AlertCircle className="text-red-400" size={20} />;
    default:
      return <Upload className="text-gray-400" size={20} />;
  }
};

export default function TrackCard({ track, onRemove, onUpdate }) {
  return (
    <Card className="bg-gray-800/50 border-gray-600">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <StatusIcon status={track.status} />
            <div>
              <h4 className="font-medium text-white">{track.file.name}</h4>
              <p className="text-sm text-gray-400">{(track.file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(track.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ✕
          </Button>
        </div>

        {/* Upload Progress */}
        {track.status === "uploading" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Uploading...</span>
              <span>{Math.round(track.uploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${track.uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Track Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Track Title</label>
            <input
              type="text"
              value={track.title}
              onChange={(e) => onUpdate(track.id, "title", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter track title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
            <select
              value={track.genre}
              onChange={(e) => onUpdate(track.id, "genre", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select genre</option>
              {[
                "pop","rock","hip-hop","electronic","jazz","classical","country","r&b","indie","other",
              ].map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">BPM</label>
            <input
              type="number"
              value={track.bpm}
              onChange={(e) => onUpdate(track.id, "bpm", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="120"
              min="1"
              max="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Key</label>
            <select
              value={track.key}
              onChange={(e) => onUpdate(track.id, "key", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select key</option>
              {["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"].map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={track.description}
            onChange={(e) => onUpdate(track.id, "description", e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Describe this track..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}