import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ReviewSubmission=({ artistInfo, tracks })=>{
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <CheckCircle className="mr-2 text-green-400" size={20} />
          Review Your Submission
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Artist Summary */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Artist Information</h3>
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
            <p className="text-gray-300"><span className="text-gray-400">Name:</span> {artistInfo.name}</p>
            <p className="text-gray-300"><span className="text-gray-400">Email:</span> {artistInfo.email}</p>
            <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {artistInfo.phone}</p>
            {artistInfo.location && (
              <p className="text-gray-300"><span className="text-gray-400">Location:</span> {artistInfo.location}</p>
            )}
          </div>
        </div>

        {/* Tracks Summary */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Tracks ({tracks.length})</h3>
          <div className="space-y-2">
            {tracks.map((track) => (
              <div key={track.id} className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{track.title}</p>
                  <p className="text-sm text-gray-400">{track.genre} • {track.bpm} BPM • Key of {track.key}</p>
                </div>
                <CheckCircle className="text-green-400" size={20} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default ReviewSubmission