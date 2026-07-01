"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageCircle, Phone, Zap, Globe, Layers,
  ArrowRight, CheckCircle, TrendingUp, Clock, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Zap, title: "AI Automation", subtitle: "Our flagship offering",
      description: "Eliminate inefficiency. Eliminate error. Scale with confidence. We design and build custom end-to-end automations of backend workflows.",
      features: [
        "End-to-end automation of backend workflows (data entry, invoicing)",
        "Drastically reduces human error in critical processes",
        "Frees your team from low-value repetitive tasks for strategy",
        "Scalable pipelines adapt in real time to fluctuating demands",
        "Custom business logic and cross-platform integrations"
      ],
      scenario: { title: "SaaS Onboarding Revolution", problem: "Manual customer onboarding taking 3 days, 89% drop-off rate", solution: "Intelligent automation with personalized touchpoints", roi: "$2.3M saved annually, 97% completion rate" },
      metrics: { efficiency: "+400%", cost: "-85%", accuracy: "99.2%", time: "24/7" }
    },
    {
      icon: Phone, title: "AI Voice Agents", subtitle: "Hyper-realistic conversations",
      description: "Always-on, human-like conversations — zero hold time, zero missed calls. Voice agents that talk, persuade, and book appointments 24/7.",
      features: [
        "24/7 availability handles every customer query instantly",
        "Natural Language Processing enables fluid conversations",
        "Automates appointment scheduling, support tickets, lead qualification",
        "Dramatically cuts operational costs by replacing repetitive tasks",
        "Feeds real-time interaction data into your CRM/analytics"
      ],
      scenario: { title: "Real Estate Appointment Booking", problem: "6-hour callback delays, $50K monthly in missed opportunities", solution: "Instant voice response with natural conversation", roi: "+180% appointment bookings, $300K revenue recovered" },
      metrics: { availability: "24/7", satisfaction: "97%", bookings: "+180%", response: "Instant" }
    },
    {
      icon: MessageCircle, title: "AI Chatbots", subtitle: "WhatsApp · Facebook · Instagram",
      description: "Meet your customers where they already are, with intelligence they will notice. Deploy unified AI brains across WhatsApp, Messenger, and Instagram.",
      features: [
        "Unified AI brain deployed across WhatsApp, Messenger, and Instagram",
        "Instantly handles product enquiries, order processing, and FAQs",
        "Personalised messaging at scale tailored to customer history",
        "Multilingual support breaks language barriers for diverse audiences",
        "Native integration with e-commerce, payment gateways, and CRMs"
      ],
      scenario: { title: "E-commerce Lead Qualification", problem: "24-hour response times, 60% lead loss", solution: "Instant qualification with emotional intelligence", roi: "+340% conversion rate, $1.2M additional revenue" },
      metrics: { response: "30 sec", conversion: "+340%", satisfaction: "94%", availability: "24/7" }
    },
    {
      icon: Globe, title: "Website Development", subtitle: "Your digital storefront",
      description: "Built to convert, whether you sell products, services, or ideas. Blazing fast, mobile-first, and search-engine-optimised.",
      features: [
        "E-commerce websites with robust catalogues and secure payment gateways",
        "Portfolio and corporate sites built for authority, trust, and lead generation",
        "Mobile-first, SEO-optimised, and blazing-fast site performance",
        "Interactive frontend animations and user journeys",
        "Continuous support and modern tech stack"
      ],
      scenario: { title: "Brand Presence & Speed", problem: "Slow loading legacy site, 65% mobile bounce rate, low trust", solution: "Next-gen Next.js site with custom interaction paths", roi: "Bounce rate reduced to 15%, +120% conversion" },
      metrics: { speed: "99/100 Mobile", bounce: "-50%", leads: "+120%", availability: "100%" }
    },
    {
      icon: Layers, title: "SaaS Development", subtitle: "Built to scale",
      description: "Turn your vision into a revenue-generating software product — built for any industry, any scale. Custom systems with multi-tenant architecture.",
      features: [
        "Custom SaaS platforms built precisely to your business model",
        "Multi-tenant architecture with role-based access and subscription billing",
        "Rapid iterative delivery gets you to market faster without quality compromise",
        "Scale-ready cloud infrastructure and database modeling",
        "Integrations with payment systems (Stripe) and notifications"
      ],
      scenario: { title: "SaaS Platform Launch", problem: "Building SaaS MVP takes 9 months, high risk of feature creep", solution: "Modular architecture, rapid prototyping, scale-ready launch", roi: "MVP launched in 6 weeks, $150K dev costs saved" },
      metrics: { launch: "6 weeks", savings: "$150,000", scale: "Ready", support: "24/7" }
    }
  ];

  const ActiveIcon = services[activeService].icon;
  const metrics = services[activeService].metrics as unknown as Record<string, string>;

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden">

      {/* Hero */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight">
              Solutions That<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Actually Work</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Five core services. One mission: eliminate the busywork crushing your team's potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 border-b border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.button
                  key={index}
                  variants={scaleIn}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-500 cursor-pointer ${
                    activeService === index
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 shadow-lg shadow-indigo-500/20'
                      : 'border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                  }`}
                >
                  <ServiceIcon className="w-5 h-5 mr-2" />
                  {service.title}
                  {index === 0 && (
                    <span className={`ml-2 px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wider font-semibold border ${
                      activeService === index 
                        ? 'bg-zinc-950/20 border-zinc-950/30 text-zinc-950' 
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                    }`}>FLAGSHIP</span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Active Service Details */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-20 relative z-10"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Service Overview */}
              <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="flex items-center mb-6">
                  <ActiveIcon className="w-12 h-12 text-indigo-400 mr-4" />
                  <div>
                    <h2 className="text-4xl font-bold font-outfit text-zinc-100">{services[activeService].title}</h2>
                    <p className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mt-1">{services[activeService].subtitle}</p>
                  </div>
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-xl text-zinc-300 leading-relaxed mb-8 font-light">
                  {services[activeService].description}
                </motion.p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100">What's Included</h3>
                  <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-3">
                    {services[activeService].features.map((feature, index) => (
                      <motion.div key={index} variants={fadeUp} transition={{ duration: 0.4 }} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-zinc-300 font-light">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Metrics */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 gap-4">
                  {Object.entries(metrics).map(([key, value], index) => (
                    <motion.div key={index} variants={scaleIn} transition={{ duration: 0.4 }} whileHover={{ y: -3 }} className="glass-card p-5 rounded-2xl animate-shimmer">
                      <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{value}</div>
                      <div className="text-sm text-zinc-400 capitalize mt-1 font-light">{key}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Scenario & ROI */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-col gap-8">
                <div className="glass-card p-8 rounded-2xl animate-shimmer">
                  <h3 className="text-2xl font-bold mb-6 font-outfit bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Real-World Scenario</h3>
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="font-semibold text-zinc-300 mb-2 font-outfit">The Challenge</h4>
                      <p className="text-zinc-400 font-light">{services[activeService].scenario.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-300 mb-2 font-outfit">Our Solution</h4>
                      <p className="text-zinc-400 font-light">{services[activeService].scenario.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-2 font-outfit">The ROI</h4>
                      <p className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl">{services[activeService].scenario.roi}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl animate-shimmer">
                  <h3 className="text-xl font-bold mb-6 font-outfit text-zinc-200">Impact Visualization</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Efficiency Gain', val: metrics.efficiency || metrics.speed || metrics.launch || 'High', w: 'w-full' },
                      { label: 'Cost Reduction / Savings', val: metrics.cost || metrics.savings || metrics.bounce || '-75%', w: 'w-3/4' },
                      { label: 'Accuracy / Quality / Leads', val: metrics.accuracy || metrics.satisfaction || metrics.leads || metrics.scale || '99%', w: 'w-full' },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-zinc-400">{bar.label}</span>
                          <span className={`${i === 0 ? 'text-indigo-400' : i === 1 ? 'text-cyan-400' : 'text-zinc-200'} font-bold`}>{bar.val}</span>
                        </div>
                        <div className="bg-zinc-950 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.4 + i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full bg-gradient-to-r ${i === 0 ? 'from-indigo-500 to-cyan-400' : i === 1 ? 'from-cyan-500 to-blue-400' : 'from-violet-500 to-indigo-400'} ${bar.w}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Why Choose Onima */}
      <section className="py-24 glass-section border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              Why Choose <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Onima</span>?
            </h2>
            <p className="text-xl text-zinc-400 font-light">We don't just automate—we transform. Here's how we're different.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Results-Driven", description: "Every solution is measured by impact, not features. We optimize for your bottom line, not our technology showcase." },
              { icon: Clock, title: "Speed to Value", description: "Most automations deployed within 48 hours. See results in days, not months. No lengthy implementation cycles." },
              { icon: DollarSign, title: "ROI Guarantee", description: "If our solution doesn't pay for itself within 90 days, we'll refund your investment. That's how confident we are." }
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div key={index} variants={scaleIn} transition={{ duration: 0.5 }} whileHover={{ y: -6 }} className="group glass-card p-8 rounded-2xl animate-shimmer">
                  <BenefitIcon className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-105 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4 font-outfit text-zinc-100 group-hover:text-indigo-300 transition-colors">{benefit.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.04] relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-outfit">
            Ready to <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">optimize</span> your business?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 font-light">
            Let's identify your biggest bottleneck and break it. No forms, no demos—just results.
          </p>
          <Link href="/contact" className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center text-zinc-950">
            Talk to Us <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-zinc-500 mt-5 text-sm font-light">Action over paperwork. Always.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
