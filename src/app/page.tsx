"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone, Zap, ChevronRight } from 'lucide-react';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const typewriterText = "We deploy AI agents that kill busywork—permanently.";

  useEffect(() => {
    setIsVisible(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < typewriterText.length) {
        setTypedText(typewriterText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    // Enable scroll snapping only on home page
    document.documentElement.classList.add('scroll-snap-active');

    return () => {
      clearInterval(timer);
      // Disable scroll snapping when leaving home page
      document.documentElement.classList.remove('scroll-snap-active');
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-24">
        <div className="text-center z-10 px-6 max-w-5xl">
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 tracking-tight font-outfit transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Intelligence That<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h1>
          
          <div className="h-16 mb-12">
            <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide">
              {typedText}
              <span className="text-indigo-400 animate-pulse font-bold">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/work"
              className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center text-zinc-950 shadow-lg shadow-indigo-500/25"
            >
              See Our Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/services"
              className="group glass-card px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center animate-shimmer"
            >
              Explore Services
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative z-10 border-t border-white/[0.04] glass-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              What We <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Deploy</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Innovative solutions designed to automate workflows and optimize customer engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between animate-shimmer">
              <div>
                <MessageCircle className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  AI Chatbots
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed font-light">
                  Contextual conversation flows across your chat channels. Built to instantly convert visitors and resolve inquiries. We integrate cognitive intelligence to handle complex customer queries seamlessly.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold text-lg">
                +340% conversion rate
              </div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-1 flex flex-col justify-between animate-shimmer">
              <div>
                <Phone className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  Voice Agents
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed font-light">
                  Indistinguishable voice agents that call, qualify, and book clients 24/7. Zero hold times, infinite scale.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold text-lg">
                97% satisfaction rate
              </div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-3 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-shimmer">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <Zap className="w-12 h-12 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                    AI Automation
                  </h3>
                </div>
                <p className="text-zinc-400 leading-relaxed font-light">
                  Full-scale background operations configured to move data and sync systems dynamically without manual input. Connect legacy databases to generative models securely.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap md:text-right">
                $95K saved annually
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/services"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Work Preview */}
      <section className="py-24 relative z-10 border-t border-white/[0.04] glass-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              Proven <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Real metrics from live automation pipelines that cut response delays and save headcount.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group glass-card p-8 rounded-2xl animate-shimmer">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">E-commerce</div>
              <h3 className="text-2xl font-bold mb-6 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                E-commerce Lead Qualification
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center glass-panel p-4 rounded-xl">
                  <span className="text-zinc-500 text-sm line-through">Manual follow-up: 24hrs</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                  <span className="text-cyan-400 text-sm font-medium">AI response: 30 seconds</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl">
                +340% conversion rate
              </div>
            </div>

            <div className="group glass-card p-8 rounded-2xl animate-shimmer">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">SaaS</div>
              <h3 className="text-2xl font-bold mb-6 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                SaaS Customer Onboarding
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center glass-panel p-4 rounded-xl">
                  <span className="text-zinc-500 text-sm line-through">Support tickets: 127/day</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                  <span className="text-cyan-400 text-sm font-medium">Auto-resolved: 89%</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl">
                $2.3M cost savings
              </div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6 animate-shimmer">
              <div>
                <h4 className="text-lg font-semibold text-zinc-200 font-outfit mb-2">Total System Performance</h4>
                <p className="text-sm text-zinc-400 font-light max-w-xl">
                  Aggregated statistics across all production deployments since launch. Ensuring constant availability and flawless execution.
                </p>
              </div>
              <div className="flex gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-outfit">2.3M+</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Hours Reclaimed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-outfit">$12.8M</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-outfit">97%</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/work"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors group"
            >
              View All Case Studies
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-outfit">
            Show us your biggest <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">bottleneck</span>.
          </h2>
          
          <Link 
            href="/contact"
            className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center text-zinc-950 shadow-lg shadow-indigo-500/25"
          >
            Let's Break It
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-zinc-500 mt-5 text-sm font-light">Action over paperwork. Always.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
