
import React, { useRef, useEffect, useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Email Automation",
    description: "Smart email sequences that nurture leads and close deals while you sleep.",
    icon: "📧"
  },
  {
    id: 2,
    title: "CRM & Sales Funnel Integration",
    description: "Seamless integration of your customer journey across platforms for maximum conversion.",
    icon: "🔄"
  },
  {
    id: 3,
    title: "AI-Powered Sales Pitching",
    description: "Let AI craft personalized pitches based on customer data and preferences.",
    icon: "💼"
  },
  {
    id: 4,
    title: "Website Generation",
    description: "Dynamic websites that evolve with your business needs and customer interactions.",
    icon: "🌐"
  },
  {
    id: 5,
    title: "Social Media Management",
    description: "Intelligent content creation and posting at optimal times for maximum engagement.",
    icon: "📱"
  },
  {
    id: 6,
    title: "Custom Workflows",
    description: "Tailor-made automation solutions based on your unique business requirements.",
    icon: "⚙️"
  }
];

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(1);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll('.service-animate');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleServiceClick = (id: number) => {
    setActiveService(id);
    scrollToCenter(id);
  };

  const scrollToCenter = (id: number) => {
    if (!cardsRef.current) return;
    
    const cardElement = document.getElementById(`service-${id}`);
    if (!cardElement) return;
    
    const container = cardsRef.current;
    const scrollLeft = cardElement.offsetLeft - (container.clientWidth / 2) + (cardElement.clientWidth / 2);
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-onima-dark to-onima-space-blue">
      {/* Ambient Orbs */}
      <div className="floating-orb from-onima-electric-blue to-onima-neon-purple w-96 h-96 -top-48 -right-48 opacity-10"></div>
      <div className="floating-orb from-onima-vivid-purple to-onima-magenta w-80 h-80 bottom-20 -left-40 opacity-10"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="service-animate opacity-0 text-3xl md:text-4xl font-bold mb-4">
            What We <span className="gradient-text">Automate</span>
          </h2>
          <p className="service-animate opacity-0 text-white/70 max-w-2xl mx-auto">
            Our AI solutions transform manual processes into efficient automated workflows, 
            saving you time and increasing productivity across your business.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className={`service-animate opacity-0 glass-card min-w-[280px] sm:min-w-[320px] flex-shrink-0 transition-all duration-300 cursor-pointer snap-center ${
                activeService === service.id 
                  ? 'border-transparent shadow-lg shadow-onima-electric-blue/30 scale-105 before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-button-gradient before:-z-10 isolate' 
                  : 'border-white/10 hover:border-white/30'
              }`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${activeService === service.id ? 'gradient-text' : ''}`}>
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeService === service.id 
                  ? 'bg-gradient-to-r from-onima-electric-blue to-onima-neon-purple w-8' 
                  : 'bg-white/20'
              }`}
              aria-label={`Go to service ${service.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
