import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const socialPlatforms = [
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourusername" },
  { key: "soundcloud", label: "SoundCloud", placeholder: "https://soundcloud.com/yourusername" },
  { key: "spotify", label: "Spotify", placeholder: "https://open.spotify.com/artist/..." },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/channel/..." },
  { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/yourusername" },
];

export default function ArtistInfoForm({ artistInfo, setArtistInfo, errors }) {
  const handleInputChange = (field, value) => {
    setArtistInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <User className="mr-2 text-purple-400" size={20} />
          Artist Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Artist Name *</label>
            <input
              type="text"
              value={artistInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Your stage name or band name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              value={artistInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={artistInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={artistInfo.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Artist Biography</label>
          <textarea
            value={artistInfo.biography}
            onChange={(e) => handleInputChange("biography", e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Tell us about yourself, your musical journey, influences, and what makes your sound unique..."
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">{artistInfo.biography.length}/500 characters</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Social Media & Streaming Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{platform.label}</label>
                <input
                  type="url"
                  value={artistInfo.socialMedia[platform.key]}
                  onChange={(e) =>
                    handleInputChange("socialMedia", {
                      ...artistInfo.socialMedia,
                      [platform.key]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={platform.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}