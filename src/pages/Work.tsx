import React, { useState } from 'react';
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
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-red-400">Killed</span> Work,<br />
              <span className="text-violet-400">Proven</span> Results
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Real businesses. Real bottlenecks. Real transformations. 
              See how we've eliminated millions of hours of busywork.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Navigation */}
      <section className="py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudies.map((study, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCase === index
                    ? 'bg-gradient-to-r from-violet-600 to-red-600 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {study.industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Case Study */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Case Details */}
            <div>
              <div className="text-sm text-violet-400 mb-2">{caseStudies[activeCase].industry}</div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {caseStudies[activeCase].title}
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">The Challenge</h3>
                  <p className="text-neutral-300 leading-relaxed">{caseStudies[activeCase].challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-violet-400 mb-2">Our Solution</h3>
                  <p className="text-neutral-300 leading-relaxed">{caseStudies[activeCase].solution}</p>
                </div>
              </div>

              {/* Key Results */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(caseStudies[activeCase].results).map(([key, value], index) => (
                  <div key={index} className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                    <div className="text-2xl font-bold text-violet-400">{value}</div>
                    <div className="text-sm text-neutral-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-violet-900/20 to-red-900/20 p-6 rounded-lg border border-violet-500/30">
                <blockquote className="text-lg italic mb-4">
                  "{caseStudies[activeCase].testimonial}"
                </blockquote>
                <cite className="text-violet-400 font-semibold">
                  — {caseStudies[activeCase].clientRole}
                </cite>
              </div>
            </div>

            {/* Metrics Visualization */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Before vs After</h3>
              {caseStudies[activeCase].metrics.map((metric, index) => (
                <div key={index} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">{metric.label}</h4>
                    <div className="text-green-400 font-bold">+{metric.improvement}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-300 text-sm">Before:</span>
                      <span className="text-red-300">{metric.before}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 text-sm">After:</span>
                      <span className="text-green-400 font-semibold">{metric.after}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-green-400 transition-all duration-1000"
                      style={{ width: `${Math.min(parseInt(metric.improvement), 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Collective <span className="text-violet-400">Impact</span>
            </h2>
            <p className="text-xl text-neutral-300">
              Across all our deployments, the numbers speak for themselves.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Clock, number: "2.3M", label: "Hours Reclaimed", color: "text-violet-400" },
              { icon: DollarSign, number: "$12.8M", label: "Cost Savings", color: "text-green-400" },
              { icon: TrendingUp, number: "340%", label: "Avg Improvement", color: "text-red-400" },
              { icon: Users, number: "97%", label: "Client Satisfaction", color: "text-violet-400" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300 hover:scale-105">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-neutral-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to join the <span className="text-red-400">revolution</span>?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="group bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              Start Your Transformation
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <p className="text-neutral-400 mt-4 text-sm">No forms. No demos. Just results.</p>
        </div>
      </section>
    </div>
  );
};

export default Work;