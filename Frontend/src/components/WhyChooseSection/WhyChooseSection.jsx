import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Clock, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Zap,
    title: 'Professional A&R Feedback',
    description: 'Get detailed feedback from industry professionals who know what labels are looking for.',
  },
  {
    icon: Clock,
    title: 'Quick Response Times',
    description: 'Receive feedback within 7-14 days. No more waiting months for a response.',
  },
  {
    icon: Globe,
    title: 'Connect with Major Platforms',
    description: 'Direct connections to record labels, streaming platforms, and industry networks.',
  },
];

const WhyChooseSection = ({ isVisible }) => (
  <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <div className="container mx-auto px-4">
      <div
        id="why-choose-title"
        data-animate
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible['why-choose-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose <span className="text-purple-500">MusicHub?</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
          We're not just another submission platform. We're your gateway to the music industry,
          connecting talented artists with the opportunities they deserve.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {benefits.map((item, index) => (
          <div
            key={index}
            id={`benefit-${index}`}
            data-animate
            className={`transition-all duration-1000 delay-${index * 200} ${
              isVisible[`benefit-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <item.icon className="text-black" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        id="cta-section"
        data-animate
        className={`text-center transition-all duration-1000 ${
          isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/30 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Discovered?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of artists who have already taken the first step toward their musical success.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Upload className="mr-2" size={20} />
              Submit Your Demo Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;