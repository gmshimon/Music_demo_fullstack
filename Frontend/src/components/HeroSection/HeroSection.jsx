import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ChevronDown } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import AnimatedParticles from '../AnimatedParticles/AnimatedParticles';

const HeroSection = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Animated background */}
      <AnimatedParticles />

      {/* Navigation */}
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Submit Your Music.{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Be Discovered.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload your demo and get heard by our professional A&R team.
            Your next big break is just one submission away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Upload className="mr-2" size={20} />
              Submit Your Demo
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex justify-center animate-bounce">
            <ChevronDown className="text-purple-400" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;