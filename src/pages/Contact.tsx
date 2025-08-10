import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [formData, setFormData] = useState({ timeDrain: '', email: '' });

  const handleFormSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    setIsModalOpen(false);
    setShowSuccessNotification(true);
    setFormData({ timeDrain: '', email: '' });
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Let's <span className="text-red-400">Break</span> Your<br />
              Biggest <span className="text-violet-400">Bottleneck</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              No forms. No demos. No sales pitches. Just a conversation about your biggest time drain 
              and how we can eliminate it permanently.
            </p>
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-violet-900/20 to-red-900/20 p-12 rounded-lg border border-violet-500/30 text-center">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Show us your worst bottleneck.
            </h2>
            
            <p className="text-xl text-neutral-300 mb-8">
              Tell us what's killing your team's productivity. We'll show you how to eliminate it.
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              Let's Break It
              <Send className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-neutral-400 mt-4 text-sm">Action over paperwork.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Get in <span className="text-violet-400">Touch</span>
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-violet-400 mr-4" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:build@onima.in" className="text-violet-400 hover:text-violet-300 transition-colors">
                      build@onima.in
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-violet-400 mr-4" />
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <div className="text-neutral-300">Within 2 hours (usually faster)</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-violet-400 mr-4" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-neutral-300">Global (Remote-First)</div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
                <div className="space-y-3 text-neutral-300">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We analyze your bottleneck within 24 hours</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>You get a custom action plan (not a generic proposal)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>If it's a fit, we deploy your solution within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Direct Contact */}
            <div>
              <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why <span className="text-red-400">Direct</span> Contact?
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-violet-500 pl-6">
                  <h3 className="text-xl font-bold mb-2 text-violet-400">No Generic Solutions</h3>
                  <p className="text-neutral-300">
                    Every business is different. We don't believe in one-size-fits-all automation. 
                    Your bottleneck gets a custom solution, not a template.
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-bold mb-2 text-red-400">Speed Over Process</h3>
                  <p className="text-neutral-300">
                    While others schedule discovery calls and send proposals, we're already building 
                    your solution. Time is money—we don't waste either.
                  </p>
                </div>
                
                <div className="border-l-4 border-violet-500 pl-6">
                  <h3 className="text-xl font-bold mb-2 text-violet-400">Results-First Approach</h3>
                  <p className="text-neutral-300">
                    We're not here to sell you features. We're here to solve your problem. 
                    If we can't deliver measurable results, we'll tell you upfront.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-violet-900/20 to-red-900/20 p-6 rounded-lg border border-violet-500/30">
                <blockquote className="text-lg italic mb-4">
                  "Most agencies want to schedule a call to schedule another call. 
                  Onima sent us a working solution before our first meeting ended."
                </blockquote>
                <cite className="text-violet-400 font-semibold">
                  — VP of Operations, SaaS Company
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Prefer a Different Approach?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Quick Question?</h3>
              <p className="text-neutral-300 mb-6">
                Send us a quick email with your question. We respond to every message personally.
              </p>
              <a 
                href="mailto:build@onima.in"
                className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                build@onima.in
              </a>
            </div>
            
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">See Our Work First?</h3>
              <p className="text-neutral-300 mb-6">
                Check out our case studies and see how we've solved similar problems for other businesses.
              </p>
              <a 
                href="/work"
                className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                View Case Studies
                <CheckCircle className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Let's Break Your Bottleneck</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">
                  What's your biggest time drain & how many hours per week does this cost you?
                </label>
                <textarea 
                  className="w-full bg-neutral-800 border border-neutral-600 rounded p-3 text-white placeholder-neutral-400" 
                  rows={3} 
                  placeholder="Email follow-ups take 15+ hours per week..."
                  value={formData.timeDrain}
                  onChange={(e) => setFormData({...formData, timeDrain: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm text-neutral-300 mb-2">What's your email?</label>
                <input 
                  type="email" 
                  className="w-full bg-neutral-800 border border-neutral-600 rounded p-3 text-white placeholder-neutral-400" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleFormSubmit}
                disabled={!formData.timeDrain || !formData.email}
                className="flex-1 bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 py-3 rounded font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Break It
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-neutral-600 rounded hover:border-neutral-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-violet-600 to-red-600 text-white px-6 py-4 rounded-lg shadow-2xl border border-violet-500/50">
            <p className="font-medium">Sent. We'll get back fast—with an action plan, not a form.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;