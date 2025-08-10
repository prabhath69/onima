import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/story', label: 'Story' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
          ONIMA
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative hover:text-violet-400 transition-colors ${
                location.pathname === item.path ? 'text-violet-400' : ''
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-red-400"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block hover:text-violet-400 transition-colors ${
                  location.pathname === item.path ? 'text-violet-400' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;