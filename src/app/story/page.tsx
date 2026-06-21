"use client";

import React, { useState, useEffect } from 'react';
import { Users, Target, Lightbulb, Award, Shield, Heart } from 'lucide-react';

const Story = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});

  const timelineEvents = [
    {
      year: "2019",
      title: "The Breaking Point",
      description: "Watched brilliant humans spend 60% of their day on emails that could be templates. The system was broken.",
      icon: Target
    },
    {
      year: "2021",
      title: "First AI Agent",
      description: "Built our first emotionally intelligent chatbot. It didn't just respond—it understood context and intent.",
      icon: Lightbulb
    },
    {
      year: "2022",
      title: "Voice Revolution",
      description: "Deployed hyper-realistic voice agents that booked appointments better than human sales reps.",
      icon: Users
    },
    {
      year: "2023",
      title: "Workflow Mastery",
      description: "Created end-to-end automations that think, not just execute. From lead to invoice, automatically.",
      icon: Award
    },
    {
      year: "2024",
      title: "Scale & Impact",
      description: "Reclaimed 2.3M hours of human time. Saved $12.8M in operational costs. The revolution began.",
      icon: Shield
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Human-First AI",
      description: "Technology should amplify human brilliance, not replace it. Every solution we build serves creativity, not bureaucracy."
    },
    {
      icon: Target,
      title: "Ruthless Efficiency",
      description: "We eliminate the tedious so you can focus on the transformative. No busywork. No exceptions."
    },
    {
      icon: Shield,
      title: "Built to Last",
      description: "Our solutions don't just work—they evolve. Self-improving systems that get smarter with every interaction."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden">

      {/* Hero */}
      <section id="story-hero" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight transition-all duration-1000 ${isVisible['story-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              An Action-First Manifesto<br />
              Against <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Pointless Work</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              This isn't just our story—it's a manifesto against the systematic waste of human potential.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-24 glass-section border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible.problem ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h2 className="text-4xl font-bold mb-6 font-outfit">
                The <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Human Cost</span>
              </h2>
              <div className="flex flex-col gap-6 text-lg text-zinc-400 leading-relaxed font-light">
                <p>
                  Burnout isn't a personal failing—it's a <strong className="text-zinc-100 font-medium">system failure</strong>. 
                  When talented people quit because they're drowning in busywork, the system is broken.
                </p>
                <p>
                  When innovation dies because there's no time to think, the system is broken. 
                  When creativity is suffocated by process, the system is broken.
                </p>
                <p>
                  We watched brilliant minds reduced to data entry clerks. 
                  We saw potential crushed under the weight of repetitive tasks. 
                  We witnessed the systematic waste of human intelligence.
                </p>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${isVisible.problem ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="glass-card p-8 rounded-2xl animate-shimmer">
                <h3 className="text-2xl font-bold text-zinc-200 mb-6 font-outfit">The Breaking Point Stats</h3>
                <div className="flex flex-col gap-4 font-light text-zinc-300">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span>Time spent on busywork</span>
                    <span className="text-cyan-400 font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span>Employees considering quitting</span>
                    <span className="text-cyan-400 font-semibold">73%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span>Innovation time lost</span>
                    <span className="text-cyan-400 font-semibold">40 hrs/week</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Cost of repetitive work</span>
                    <span className="text-cyan-400 font-semibold">$2.9T globally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              Our <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light">
              From frustration to revolution—how we built the future of work.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-0.5 md:w-1 h-full timeline-glow"></div>
            
            <div className="flex flex-col gap-12 md:gap-16">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div 
                    key={index}
                    className={`relative flex items-start md:items-center flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    onMouseEnter={() => setActiveTimeline(index)}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 cursor-pointer ${
                      activeTimeline === index 
                        ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 border-zinc-50 scale-110 shadow-lg shadow-indigo-500/20' 
                        : 'bg-zinc-950 border-indigo-500/30'
                    }`}>
                      <IconComponent className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${activeTimeline === index ? 'text-zinc-950' : 'text-zinc-400'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                      <div className={`glass-card p-6 rounded-2xl ${
                        activeTimeline === index ? 'border-indigo-500/40 bg-zinc-900/60 scale-[1.02]' : 'opacity-75'
                      }`}>
                        <div className="text-cyan-400 font-semibold text-lg mb-2 font-outfit">{event.year}</div>
                        <h3 className="text-xl font-bold mb-3 font-outfit text-zinc-100">{event.title}</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 glass-section border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              What We <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Stand For</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light">
              These aren't just values—they're the principles that guide every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <div key={index} className={`group transition-all duration-700 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="glass-card p-8 rounded-2xl h-full">
                    <ValueIcon className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-105 transition-transform" />
                    <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section id="philosophy" className="py-24 border-t border-white/[0.04] relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-6xl font-bold mb-8 font-outfit transition-all duration-1000 ${isVisible.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Built by humans who<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">hate repetition</span>.
          </h2>
          
          <div className="flex flex-col gap-6 text-xl text-zinc-400 leading-relaxed mb-12 font-light">
            <p>
              We're not just another AI company. We're rebels against the status quo. 
              Enemies of inefficiency. Champions of human potential.
            </p>
            <p>
              Every automation we build, every agent we deploy, every workflow we create 
              is a small act of rebellion against the systematic waste of human intelligence.
            </p>
            <p>
              We believe technology should serve creativity, not bureaucracy. 
              Should amplify brilliance, not replace it. Should eliminate the tedious 
              so you can focus on the transformative.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl animate-shimmer">
            <blockquote className="text-2xl italic text-zinc-100 mb-4 font-light leading-relaxed">
              "Repetition is a system failure. We're here to fix the system."
            </blockquote>
            <cite className="text-indigo-400 font-medium font-outfit not-italic">
              — The Onima Manifesto
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;
