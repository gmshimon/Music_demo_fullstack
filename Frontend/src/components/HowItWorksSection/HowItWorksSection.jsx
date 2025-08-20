import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Star } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Tracks',
    description: 'Drag and drop your best tracks or browse to select files. Support for MP3, WAV, and FLAC formats.',
    step: '01',
  },
  {
    icon: FileText,
    title: 'Add Artist Info',
    description: 'Tell us about yourself, your musical style, and what makes your sound unique.',
    step: '02',
  },
  {
    icon: Star,
    title: 'Get Reviewed',
    description: 'Our professional A&R team will review your submission and provide valuable feedback.',
    step: '03',
  },
];

const HowItWorksSection = ({ isVisible }) => (
  <section id="how-it-works" className="py-20 bg-gray-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

    <div className="container mx-auto px-4 relative z-10">
      <div
        id="how-it-works-title"
        data-animate
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible['how-it-works-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How It <span className="text-purple-500">Works</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get your music heard in three simple steps</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div
            key={index}
            id={`step-${index}`}
            data-animate
            className={`transition-all duration-1000 delay-${index * 200} ${
              isVisible[`step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group h-full">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;