
import React, { useEffect } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Discover Pain Points",
    description: "We analyze your workflows to identify processes that waste time and resources.",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Deploy Tailored AI Automation",
    description: "Our team implements custom AI solutions designed for your specific needs.",
    icon: "🤖"
  },
  {
    id: 3,
    title: "Deliver Measurable Results",
    description: "Track performance improvements and ROI with our comprehensive analytics.",
    icon: "📈"
  }
];

const Process: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('.process-animate');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="process" className="section-padding bg-gradient-to-b from-onima-dark via-onima-space-blue to-onima-grey">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="process-animate opacity-0 text-3xl md:text-4xl font-bold mb-4">
            How It <span className="purple-gradient-text">Works</span>
          </h2>
          <p className="process-animate opacity-0 text-white/70 max-w-2xl mx-auto">
            Our streamlined process takes you from identifying problems to implementing solutions with minimal disruption.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-onima-electric-blue to-onima-vivid-purple transform -translate-x-1/2"></div>
          
          <div className="space-y-16 md:space-y-28">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`process-animate opacity-0 flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-16`}
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                {/* Step Number and Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-button-gradient flex items-center justify-center text-4xl animate-float z-10 relative shadow-lg shadow-onima-neon-purple/20">
                    {step.icon}
                  </div>
                  <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-10 h-0.5 bg-gradient-to-r from-onima-electric-blue to-onima-neon-purple z-0 left-full"></div>
                </div>
                
                {/* Content */}
                <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="gradient-text font-semibold">STEP {step.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/70 max-w-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
