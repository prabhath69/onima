import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-violet-500/30 rotate-45 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-red-500/30 rotate-12 animate-float delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-violet-500/30 rotate-45 animate-float delay-2000"></div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/2 left-1/6 w-4 h-4 bg-violet-500 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-1/3 right-1/6 w-3 h-3 bg-red-500 rounded-full blur-sm animate-pulse delay-1500"></div>
        </div>
        
        <div className="text-center z-10 px-6 max-w-5xl">
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Intelligence That<br />
            <span className="bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h1>
          
          <div className="h-16 mb-12">
            <p className="text-xl md:text-2xl text-neutral-300 font-light">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/work"
              className="group bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              See Our Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="group border border-violet-500 hover:bg-violet-500/10 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Explore Services
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              What We <span className="text-violet-400">Deploy</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Three core solutions that eliminate the repetitive work crushing your team's potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "AI Chatbots",
                description: "Emotionally intelligent conversations that convert leads and handle support 24/7.",
                metric: "+340% conversion rate"
              },
              {
                icon: Phone,
                title: "Voice Agents",
                description: "Hyper-realistic AI that books appointments and handles calls like your best sales rep.",
                metric: "97% satisfaction rate"
              },
              {
                icon: Zap,
                title: "Custom Automations",
                description: "End-to-end workflows that think, not just execute. From lead to invoice, automatically.",
                metric: "$95K saved annually"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300 hover:scale-105">
                <service.icon className="w-12 h-12 text-violet-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-violet-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-300 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-red-400 font-bold text-lg">
                  {service.metric}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/services"
              className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Work Preview */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-red-400">Killed</span> Work
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Real results from real businesses who chose to break their bottlenecks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "E-commerce Lead Qualification",
                before: "Manual follow-up: 24hrs",
                after: "AI response: 30 seconds",
                impact: "+340% conversion rate",
                industry: "E-commerce"
              },
              {
                title: "SaaS Customer Onboarding",
                before: "Support tickets: 127/day",
                after: "Auto-resolved: 89%",
                impact: "$2.3M cost savings",
                industry: "SaaS"
              }
            ].map((project, index) => (
              <div key={index} className="group bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-violet-500 transition-all duration-300">
                <div className="text-sm text-violet-400 mb-2">{project.industry}</div>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-red-300 text-sm line-through">{project.before}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                    <span className="text-green-400 text-sm">{project.after}</span>
                  </div>
                </div>
                <div className="text-violet-400 font-bold text-xl">
                  {project.impact}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/work"
              className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              View All Case Studies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Show us your worst <span className="text-red-400">bottleneck</span>.
          </h2>
          
          <Link 
            to="/contact"
            className="group bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 inline-flex items-center"
          >
            Let's Break It
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-neutral-400 mt-4 text-sm">Action over paperwork.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;