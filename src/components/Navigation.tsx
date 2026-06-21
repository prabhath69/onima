"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <div 
        className={`w-full max-w-5xl px-6 py-3 rounded-full flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? 'nav-glass-scrolled py-2.5' 
            : 'nav-glass'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(56px) saturate(170%)' : 'blur(48px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(56px) saturate(170%)' : 'blur(48px) saturate(150%)'
        }}
      >
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-85 transition-opacity tracking-wider">
          ONIMA
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
                pathname === item.path 
                  ? 'text-zinc-50 bg-white/[0.07] shadow-inner shadow-white/[0.02]' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-300 hover:text-zinc-50 transition-colors p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 md:hidden glass-card p-5 rounded-2xl animate-slide-up shadow-2xl z-40">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  pathname === item.path 
                    ? 'text-zinc-50 bg-white/[0.07]' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
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