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
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section id="story-hero" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible['story-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
                style={{ fontFamily: 'Playfair Display, serif' }}>
              Why We <span className="text-red-400">Loathe</span><br />
              Pointless <span className="text-violet-400">Admin</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              This isn't just our story—it's a manifesto against the systematic waste of human potential.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-20 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible.problem ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                The <span className="text-red-400">Human Crisis</span>
              </h2>
              <div className="space-y-6 text-lg text-neutral-300 leading-relaxed">
                <p>
                  Burnout isn't a personal failing—it's a <strong className="text-white">system failure</strong>. 
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
            
            <div className={`transition-all duration-1000 delay-400 ${isVisible.problem ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-red-900/20 to-neutral-900 p-8 rounded-lg border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-6">The Breaking Point Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Time spent on busywork</span>
                    <span className="text-red-400 font-bold">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Employees considering quitting</span>
                    <span className="text-red-400 font-bold">73%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Innovation time lost</span>
                    <span className="text-red-400 font-bold">40 hrs/week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost of repetitive work</span>
                    <span className="text-red-400 font-bold">$2.9T globally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our <span className="text-violet-400">Journey</span>
            </h2>
            <p className="text-xl text-neutral-300">
              From frustration to revolution—how we built the future of work.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 to-red-500"></div>
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                    activeTimeline === index 
                      ? 'bg-gradient-to-r from-violet-500 to-red-500 border-white scale-110' 
                      : 'bg-neutral-900 border-violet-500'
                  }`}>
                    <event.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`bg-neutral-900 p-6 rounded-lg border transition-all duration-300 ${
                      activeTimeline === index ? 'border-violet-500 scale-105' : 'border-neutral-800'
                    }`}>
                      <div className="text-violet-400 font-bold text-lg mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                      <p className="text-neutral-300">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              What We <span className="text-violet-400">Stand For</span>
            </h2>
            <p className="text-xl text-neutral-300">
              These aren't just values—they're the principles that guide every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`group transition-all duration-700 delay-${index * 200} ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300 hover:scale-105 h-full">
                  <value.icon className="w-12 h-12 text-violet-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-violet-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section id="philosophy" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-1000 ${isVisible.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Built by humans who<br />
            <span className="text-red-400">hate boring shit</span>.
          </h2>
          
          <div className="text-xl text-neutral-300 leading-relaxed space-y-6 mb-12">
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

          <div className="bg-gradient-to-r from-violet-900/20 to-red-900/20 p-8 rounded-lg border border-violet-500/30">
            <blockquote className="text-2xl italic mb-4">
              "Repetition is a system failure. We're here to fix the system."
            </blockquote>
            <cite className="text-violet-400 font-semibold">
              — The Onima Manifesto
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;