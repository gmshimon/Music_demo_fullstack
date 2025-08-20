import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate()
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={"/"}>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          MusicHub
        </div>
        </Link>
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">How It Works</a>
          <a href="#why-choose" className="text-gray-300 hover:text-purple-400 transition-colors">Why Choose Us</a>
          <Button onClick={()=>navigate('/login')} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#how-it-works" className="block text-gray-300 hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#why-choose" className="block text-gray-300 hover:text-purple-400 transition-colors">Why Choose Us</a>
            <Button onClick={()=>navigate('/login')} variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;