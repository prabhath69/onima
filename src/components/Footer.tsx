import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent mb-4">
              ONIMA
            </div>
            <p className="text-neutral-400 italic mb-4">Built by humans who hate boring shit.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              We deploy emotionally intelligent AI agents that kill busywork permanently. 
              From chatbots to voice agents to custom automations—we reclaim your time.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/work" className="block text-neutral-400 hover:text-violet-400 transition-colors text-sm">
                Our Work
              </Link>
              <Link to="/story" className="block text-neutral-400 hover:text-violet-400 transition-colors text-sm">
                Our Story
              </Link>
              <Link to="/services" className="block text-neutral-400 hover:text-violet-400 transition-colors text-sm">
                Services
              </Link>
              <Link to="/contact" className="block text-neutral-400 hover:text-violet-400 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a href="mailto:build@onima.in" className="flex items-center text-neutral-400 hover:text-violet-400 transition-colors text-sm">
                <Mail className="w-4 h-4 mr-2" />
                build@onima.in
              </a>
              <div className="flex space-x-3">
                <a href="#" className="text-neutral-400 hover:text-violet-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-violet-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>&copy; 2025 Onima. All rights reserved.</p>
          <p>Repetition is a system failure.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;