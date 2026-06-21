import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] glass-section py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/[0.04]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-['Outfit'] font-bold text-lg tracking-wider text-white">
                ONIMA
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm">
              Deploying high-performance AI agents and custom workflow automations.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <Link href="/work" className="text-zinc-400 hover:text-white transition-colors duration-300">
              Work
            </Link>
            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors duration-300">
              Services
            </Link>
            <Link href="/story" className="text-zinc-400 hover:text-white transition-colors duration-300">
              Story
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors duration-300">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="mailto:build@onima.in" 
              className="flex items-center text-xs text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <Mail className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
              build@onima.in
            </a>
            <div className="h-3 w-px bg-white/[0.06]" />
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              aria-label="Twitter"
              className="text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-xs text-zinc-500 gap-2">
          <p>&copy; {new Date().getFullYear()} Onima. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Repetition is a system failure.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;