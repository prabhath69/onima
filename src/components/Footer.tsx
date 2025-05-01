
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-onima-dark border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-onima-neon mb-4">ONIMA</h2>
            <p className="text-white/70 mb-6 max-w-md">
              India's premier AI Automation Agency helping businesses leverage artificial intelligence 
              to optimize workflows, increase productivity, and drive growth.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/prabhathb/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-onima-blue/20 transition-colors">
                <span className="text-onima-neon">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-onima-blue/20 transition-colors">
                <span className="text-onima-neon">XXX</span>
              </a>
              <a href="https://www.instagram.com/onima.services?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-onima-blue/20 transition-colors">
                <span className="text-onima-neon">IG</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-white/70 hover:text-onima-neon transition-colors">Email Automation</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-onima-neon transition-colors">CRM Integration</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-onima-neon transition-colors">AI Sales Pitching</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-onima-neon transition-colors">Website Generation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white/70 hover:text-onima-neon transition-colors">About Us</a></li>
              <li><a href="#works" className="text-white/70 hover:text-onima-neon transition-colors">Our Work</a></li>
              <li><a href="#works" className="text-white/70 hover:text-onima-neon transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-onima-neon transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">© {currentYear} Onima AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/50 text-sm hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/50 text-sm hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
