"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

const Work = () => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      title: "E-commerce Lead Qualification Revolution",
      industry: "E-commerce",
      challenge: "Manual lead follow-up taking 24+ hours, losing 60% of hot prospects",
      solution: "AI chatbot with emotional intelligence and instant qualification",
      results: {
        conversion: "+340%",
        responseTime: "30 seconds",
        revenue: "$1.2M additional",
        satisfaction: "94%"
      },
      metrics: [
        { label: "Response Time", before: "24 hours", after: "30 seconds", improvement: "99.9%" },
        { label: "Conversion Rate", before: "2.1%", after: "9.2%", improvement: "340%" },
        { label: "Lead Quality", before: "Mixed", after: "Pre-qualified", improvement: "100%" }
      ],
      testimonial: "Our AI agent doesn't just respond—it understands intent and converts like our best sales rep.",
      clientRole: "VP of Sales"
    },
    {
      title: "SaaS Customer Onboarding Automation",
      industry: "SaaS",
      challenge: "127 daily support tickets, 45-minute average resolution time",
      solution: "Intelligent workflow automation with predictive issue resolution",
      results: {
        automation: "89%",
        savings: "$2.3M",
        satisfaction: "97%",
        efficiency: "+400%"
      },
      metrics: [
        { label: "Ticket Volume", before: "127/day", after: "14/day", improvement: "89%" },
        { label: "Resolution Time", before: "45 minutes", after: "5 minutes", improvement: "89%" },
        { label: "Customer Satisfaction", before: "78%", after: "97%", improvement: "24%" }
      ],
      testimonial: "The AI doesn't just automate—it anticipates problems before they become tickets.",
      clientRole: "Head of Customer Success"
    },
    {
      title: "Real Estate Appointment Booking",
      industry: "Real Estate",
      challenge: "6-hour average callback time, missed opportunities costing $50K monthly",
      solution: "Voice AI agent with natural conversation and calendar integration",
      results: {
        bookings: "+180%",
        responseTime: "Instant",
        revenue: "$300K recovered",
        availability: "24/7"
      },
      metrics: [
        { label: "Callback Time", before: "6 hours", after: "Instant", improvement: "100%" },
        { label: "Appointment Rate", before: "23%", after: "64%", improvement: "180%" },
        { label: "Revenue Recovery", before: "$0", after: "$300K", improvement: "∞" }
      ],
      testimonial: "Prospects can't tell it's AI. It books appointments better than our human team.",
      clientRole: "Brokerage Owner"
    },
    {
      title: "Healthcare Patient Screening",
      industry: "Healthcare",
      challenge: "45-minute manual intake process, scheduling bottlenecks",
      solution: "HIPAA-compliant AI screening with intelligent triage",
      results: {
        efficiency: "+400%",
        accuracy: "99.2%",
        satisfaction: "96%",
        capacity: "+200%"
      },
      metrics: [
        { label: "Intake Time", before: "45 minutes", after: "5 minutes", improvement: "89%" },
        { label: "Scheduling Capacity", before: "20/day", after: "60/day", improvement: "200%" },
        { label: "Accuracy Rate", before: "87%", after: "99.2%", improvement: "14%" }
      ],
      testimonial: "The AI screening is more thorough and consistent than our manual process.",
      clientRole: "Practice Manager"
    }
  ];

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden">

      {/* Hero */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight">
              Automated Pipelines,<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Proven Results</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Real businesses. Real bottlenecks. Real transformations. 
              See how we've eliminated millions of hours of busywork.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Navigation */}
      <section className="py-12 border-b border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudies.map((study, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 cursor-pointer ${
                  activeCase === index
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 shadow-lg shadow-indigo-500/20'
                    : 'border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                }`}
              >
                {study.industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Case Study */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Case Details */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">{caseStudies[activeCase].industry}</div>
              <h2 className="text-4xl font-bold mb-6 font-outfit text-zinc-100">
                {caseStudies[activeCase].title}
              </h2>
              
              <div className="flex flex-col gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-300 mb-2 font-outfit">The Challenge</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{caseStudies[activeCase].challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-300 mb-2 font-outfit">Our Solution</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{caseStudies[activeCase].solution}</p>
                </div>
              </div>

              {/* Key Results */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(caseStudies[activeCase].results).map(([key, value], index) => (
                  <div key={index} className="glass-card p-5 rounded-2xl animate-shimmer">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{value}</div>
                    <div className="text-sm text-zinc-400 capitalize mt-1 font-light">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="glass-card p-6 rounded-2xl animate-shimmer">
                <blockquote className="text-lg italic text-zinc-200 mb-4 font-light leading-relaxed">
                  "{caseStudies[activeCase].testimonial}"
                </blockquote>
                <cite className="text-cyan-400 font-medium font-outfit not-italic">
                  — {caseStudies[activeCase].clientRole}
                </cite>
              </div>
            </div>

            {/* Metrics Visualization */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold mb-6 font-outfit text-zinc-200">Before vs After</h3>
              {caseStudies[activeCase].metrics.map((metric, index) => {
                const improvementVal = parseFloat(metric.improvement) || 0;
                return (
                  <div key={index} className="glass-card p-6 rounded-2xl animate-shimmer">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-zinc-200 font-outfit">{metric.label}</h4>
                      <div className="text-cyan-400 font-bold">+{metric.improvement}</div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-sm">Before:</span>
                        <span className="text-zinc-400 line-through">{metric.before}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 text-sm font-medium">After:</span>
                        <span className="text-cyan-400 font-semibold">{metric.after}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 bg-zinc-950 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000"
                        style={{ width: `${Math.min(improvementVal, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-24 glass-section border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              Collective <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light">
              Across all our deployments, the numbers speak for themselves.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="group glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-center items-center text-center animate-shimmer">
              <Clock className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-105 transition-transform" />
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-outfit">2.3M</div>
              <div className="text-zinc-400 font-light text-lg">Hours Reclaimed</div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-center items-center text-center animate-shimmer">
              <DollarSign className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-105 transition-transform" />
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-outfit">$12.8M</div>
              <div className="text-zinc-400 font-light text-lg">Cost Savings</div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-1 flex flex-col justify-center items-center text-center animate-shimmer">
              <TrendingUp className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-105 transition-transform" />
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-outfit">340%</div>
              <div className="text-zinc-400 font-light">Avg Improvement</div>
            </div>

            <div className="group glass-card p-8 rounded-2xl md:col-span-3 flex flex-col md:flex-row justify-between items-center gap-6 px-12 animate-shimmer">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-indigo-400 group-hover:scale-105 transition-transform" />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-zinc-100 font-outfit">Client Satisfaction</h4>
                  <p className="text-sm text-zinc-400 font-light max-w-md">Our focus is on creating real partnerships, delivering long-term reliability.</p>
                </div>
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-outfit">97%</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.04] relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight font-outfit">
            Ready to scale your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">operations</span>?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-102 inline-flex items-center justify-center text-zinc-950"
            >
              Start Your Transformation
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <p className="text-zinc-500 mt-5 text-sm font-light">No forms. No demos. Just results.</p>
        </div>
      </section>
    </div>
  );
};

export default Work;
