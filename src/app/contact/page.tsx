"use client";

import { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [formData, setFormData] = useState({ timeDrain: '', email: '' });

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    setShowSuccessNotification(true);
    setFormData({ timeDrain: '', email: '' });
    setTimeout(() => { setShowSuccessNotification(false); }, 5000);
  };

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden">

      {/* Hero */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight">
              Let's <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Optimize</span> Your<br />
              Biggest Operations
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              No forms. No demos. No sales pitches. Just a conversation about your biggest time drain and how we can eliminate it permanently.
            </p>
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <section className="py-12 relative z-10">
        <div
          className="max-w-4xl mx-auto px-6"
        >
          <div className="glass-card p-12 rounded-2xl text-center animate-shimmer">
            <h2 className="text-4xl font-bold mb-6 font-outfit text-zinc-100">Show us your worst bottleneck.</h2>
            <p className="text-xl text-zinc-400 mb-8 font-light">Tell us what's killing your team's productivity. We'll show you how to eliminate it.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 inline-flex items-center text-zinc-950 cursor-pointer"
            >
              Let's Break It
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-zinc-500 mt-4 text-sm font-light">Action over paperwork.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 glass-section border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8 font-outfit">
                Get in <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
              </h2>

              <div className="flex flex-col gap-6 mb-8">
                {[
                  { icon: Mail, title: 'Email', content: <a href="mailto:build@onima.in" className="text-cyan-400 hover:text-cyan-300 transition-colors">build@onima.in</a> },
                  { icon: Clock, title: 'Response Time', content: <span className="text-zinc-400 font-light">Within 2 hours (usually faster)</span> },
                  { icon: MapPin, title: 'Location', content: <span className="text-zinc-400 font-light">Global (Remote-First)</span> },
                ].map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={i} className="flex items-center">
                      <ItemIcon className="w-6 h-6 text-indigo-400 mr-4" />
                      <div>
                        <div className="font-semibold text-zinc-200 font-outfit">{item.title}</div>
                        {item.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="glass-card p-6 rounded-2xl animate-shimmer">
                <h3 className="text-xl font-bold mb-4 font-outfit text-zinc-100">What Happens Next?</h3>
                <div className="flex flex-col gap-3 text-zinc-300 font-light">
                  {['We analyze your bottleneck within 24 hours', 'You get a custom action plan (not a generic proposal)', "If it's a fit, we deploy your solution within 48 hours"].map((step, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8 font-outfit">
                Why <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Direct</span> Contact?
              </h2>

              <div className="flex flex-col gap-8">
                {[
                  { color: 'border-indigo-500/40', titleColor: 'text-indigo-300', title: 'No Generic Solutions', desc: "Every business is different. We don't believe in one-size-fits-all automation. Your bottleneck gets a custom solution, not a template." },
                  { color: 'border-cyan-500/40', titleColor: 'text-cyan-300', title: 'Speed Over Process', desc: "While others schedule discovery calls and send proposals, we're already building your solution. Time is money—we don't waste either." },
                  { color: 'border-indigo-500/40', titleColor: 'text-indigo-300', title: 'Results-First Approach', desc: "We're not here to sell you features. We're here to solve your problem. If we can't deliver measurable results, we'll tell you upfront." },
                ].map((item, i) => (
                  <div key={i} className={`border-l-4 ${item.color} pl-6`}>
                    <h3 className={`text-xl font-bold mb-2 ${item.titleColor} font-outfit`}>{item.title}</h3>
                    <p className="text-zinc-400 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 glass-card p-6 rounded-2xl animate-shimmer">
                <blockquote className="text-lg italic text-zinc-200 mb-4 font-light leading-relaxed">
                  "Most agencies want to schedule a call to schedule another call. Onima sent us a working solution before our first meeting ended."
                </blockquote>
                <cite className="text-indigo-400 font-medium font-outfit not-italic">— VP of Operations, SaaS Company</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-24 border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center font-outfit">Prefer a Different Approach?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between animate-shimmer">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">Quick Question?</h3>
                <p className="text-zinc-400 mb-8 font-light">Send us a quick email with your question. We respond to every message personally.</p>
              </div>
              <a href="mailto:build@onima.in" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors font-outfit">
                <Mail className="w-5 h-5 mr-2" /> build@onima.in
              </a>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-1 flex flex-col justify-between animate-shimmer">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">See Our Work First?</h3>
                <p className="text-zinc-400 mb-8 font-light">Check out our case studies and see how we've solved similar problems.</p>
              </div>
              <Link href="/work" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors font-outfit group">
                View Case Studies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6"
          >
            <div
              className="glass-panel p-8 max-w-md w-full rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 font-outfit text-zinc-100">Let's Break Your Bottleneck</h3>
              <div className="flex flex-col gap-5 mb-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-light">What's your biggest time drain & how many hours per week does this cost you?</label>
                  <textarea className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl p-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-light" rows={3} placeholder="Email follow-ups take 15+ hours per week..." value={formData.timeDrain} onChange={(e) => setFormData({...formData, timeDrain: e.target.value})}></textarea>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-light">What's your email?</label>
                  <input type="email" className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl p-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-light" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleFormSubmit} disabled={!formData.timeDrain || !formData.email} className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 py-3 rounded-full text-zinc-950 font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Break It</button>
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] rounded-full text-zinc-300 font-medium transition-colors cursor-pointer">Cancel</button>
              </div>
            </div>
          </div>
        )}

      {/* Success Notification */}

        {showSuccessNotification && (
          <div
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 px-6 py-4 rounded-full shadow-2xl border border-white/[0.05] font-semibold">
              <p>Sent. We'll get back fast—with an action plan, not a form.</p>
            </div>
          </div>
        )}

    </div>
  );
};

export default Contact;
