import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Phone, 
  Zap, 
  Users, 
  Video,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Zap,
      title: "Customized Automation Solutions",
      subtitle: "Our flagship offering",
      description: "End-to-end workflow automations that think, not just execute. From first lead touch to final invoice, we eliminate every repetitive task crushing your team's potential.",
      features: [
        "Intelligent workflow design",
        "Cross-platform integrations",
        "Self-improving algorithms",
        "Real-time optimization",
        "Custom business logic"
      ],
      scenario: {
        title: "SaaS Onboarding Revolution",
        problem: "Manual customer onboarding taking 3 days, 89% drop-off rate",
        solution: "Intelligent automation with personalized touchpoints",
        roi: "$2.3M saved annually, 97% completion rate"
      },
      metrics: {
        efficiency: "+400%",
        cost: "-85%",
        accuracy: "99.2%",
        time: "24/7"
      }
    },
    {
      icon: Phone,
      title: "AI Voice Agents",
      subtitle: "Hyper-realistic conversations",
      description: "Voice agents that talk, persuade, and book appointments like your best sales reps. Indistinguishable from humans, available 24/7, never have a bad day.",
      features: [
        "Natural conversation flow",
        "Emotional intelligence",
        "Real-time calendar booking",
        "Multi-language support",
        "Custom voice training"
      ],
      scenario: {
        title: "Real Estate Appointment Booking",
        problem: "6-hour callback delays, $50K monthly in missed opportunities",
        solution: "Instant voice response with natural conversation",
        roi: "+180% appointment bookings, $300K revenue recovered"
      },
      metrics: {
        availability: "24/7",
        satisfaction: "97%",
        bookings: "+180%",
        response: "Instant"
      }
    },
    {
      icon: MessageCircle,
      title: "AI Chatbots",
      subtitle: "Emotionally intelligent conversations",
      description: "Chatbots that understand context, emotion, and intent. They don't just respond—they convert leads, solve problems, and learn from every interaction.",
      features: [
        "Contextual understanding",
        "Lead qualification",
        "Multi-channel deployment",
        "Sentiment analysis",
        "Continuous learning"
      ],
      scenario: {
        title: "E-commerce Lead Qualification",
        problem: "24-hour response times, 60% lead loss",
        solution: "Instant qualification with emotional intelligence",
        roi: "+340% conversion rate, $1.2M additional revenue"
      },
      metrics: {
        response: "30 sec",
        conversion: "+340%",
        satisfaction: "94%",
        availability: "24/7"
      }
    },
    {
      icon: Users,
      title: "Lead Generation",
      subtitle: "Intelligent prospect identification",
      description: "AI-powered lead generation that identifies, qualifies, and nurtures prospects automatically. No more cold outreach—warm conversations from day one.",
      features: [
        "Predictive lead scoring",
        "Automated outreach sequences",
        "Behavioral tracking",
        "CRM integration",
        "Performance analytics"
      ],
      scenario: {
        title: "B2B Pipeline Acceleration",
        problem: "Manual prospecting taking 20 hours/week, low conversion",
        solution: "AI identifies and nurtures qualified prospects automatically",
        roi: "+250% qualified leads, 15 hours/week reclaimed"
      },
      metrics: {
        leads: "+250%",
        quality: "95%",
        time: "-75%",
        cost: "-60%"
      }
    },
    {
      icon: Video,
      title: "Video/Content Generation",
      subtitle: "Scalable content creation",
      description: "AI-generated video content and written materials that maintain your brand voice while scaling your content production infinitely.",
      features: [
        "Brand voice consistency",
        "Multi-format output",
        "Automated scheduling",
        "Performance optimization",
        "Custom templates"
      ],
      scenario: {
        title: "Marketing Content Scale",
        problem: "Content creation bottleneck, 2 videos/month capacity",
        solution: "AI generates personalized video content at scale",
        roi: "50 videos/month, 80% cost reduction"
      },
      metrics: {
        output: "+2400%",
        cost: "-80%",
        consistency: "100%",
        speed: "10x faster"
      }
    }
  ];
const ActiveIcon = services[activeService].icon;
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Solutions That<br />
              <span className="text-violet-400">Actually</span> <span className="text-red-400">Work</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Five core services. One mission: eliminate the busywork crushing your team's potential.
            </p>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeService === index
                    ? 'bg-gradient-to-r from-violet-600 to-red-600 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <service.icon className="w-5 h-5 mr-2" />
                {service.title}
                {index === 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-500 text-xs rounded-full">FLAGSHIP</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Service Overview */}
            <div>
              <div className="flex items-center mb-4">
                <ActiveIcon className="w-12 h-12 text-violet-400 mr-4" />
                <div>
                  <h2 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {services[activeService].title}
                  </h2>
                  <p className="text-violet-400 font-semibold">{services[activeService].subtitle}</p>
                </div>
              </div>
              
              <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                {services[activeService].description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                <div className="space-y-3">
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(services[activeService].metrics).map(([key, value], index) => (
                  <div key={index} className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                    <div className="text-2xl font-bold text-violet-400">{value}</div>
                    <div className="text-sm text-neutral-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenario & ROI */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-violet-900/20 to-red-900/20 p-8 rounded-lg border border-violet-500/30">
                <h3 className="text-2xl font-bold mb-6 text-violet-400">Real-World Scenario</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">The Challenge</h4>
                    <p className="text-neutral-300">{services[activeService].scenario.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-violet-400 mb-2">Our Solution</h4>
                    <p className="text-neutral-300">{services[activeService].scenario.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">The ROI</h4>
                    <p className="text-green-400 font-bold text-lg">{services[activeService].scenario.roi}</p>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
                <h3 className="text-xl font-bold mb-6">Impact Visualization</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Efficiency Gain</span>
                      <span className="text-violet-400 font-bold">
                        {services[activeService].metrics.efficiency || services[activeService].metrics.output}
                      </span>
                    </div>
                    <div className="bg-neutral-800 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-green-400 w-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Cost Reduction</span>
                      <span className="text-green-400 font-bold">
                        {services[activeService].metrics.cost || '-75%'}
                      </span>
                    </div>
                    <div className="bg-neutral-800 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-blue-400 w-3/4 animate-pulse delay-300"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Accuracy/Quality</span>
                      <span className="text-red-400 font-bold">
                        {services[activeService].metrics.accuracy || services[activeService].metrics.satisfaction}
                      </span>
                    </div>
                    <div className="bg-neutral-800 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-violet-400 w-full animate-pulse delay-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-20 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose <span className="text-violet-400">Onima</span>?
            </h2>
            <p className="text-xl text-neutral-300">
              We don't just automate—we transform. Here's how we're different.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Results-Driven",
                description: "Every solution is measured by impact, not features. We optimize for your bottom line, not our technology showcase."
              },
              {
                icon: Clock,
                title: "Speed to Value",
                description: "Most automations deployed within 48 hours. See results in days, not months. No lengthy implementation cycles."
              },
              {
                icon: DollarSign,
                title: "ROI Guarantee",
                description: "If our solution doesn't pay for itself within 90 days, we'll refund your investment. That's how confident we are."
              }
            ].map((benefit, index) => (
              <div key={index} className="group bg-neutral-900 p-8 rounded-lg border border-neutral-800 hover:border-violet-500 transition-all duration-300 hover:scale-105">
                <benefit.icon className="w-12 h-12 text-violet-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-violet-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to <span className="text-red-400">kill</span> your busywork?
          </h2>
          
          <p className="text-xl text-neutral-300 mb-12">
            Let's identify your biggest bottleneck and break it. No forms, no demos—just results.
          </p>
          
          <Link 
            to="/contact"
            className="group bg-gradient-to-r from-violet-600 to-red-600 hover:from-violet-500 hover:to-red-500 px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 inline-flex items-center"
          >
            Talk to Us
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-neutral-400 mt-4 text-sm">Action over paperwork. Always.</p>
        </div>
      </section>
    </div>
  );
};

export default Services;