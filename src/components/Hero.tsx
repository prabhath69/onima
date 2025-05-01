import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import ThreeScene from './ThreeScene';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const parallaxElementsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => {
      observer.observe(el);
    });

    // Get parallax elements for scroll effect
    parallaxElementsRef.current = document.querySelectorAll('.parallax');

    // Parallax effect on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxElementsRef.current) return;
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElementsRef.current.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        el.setAttribute('style', `transform: translate(${x}px, ${y}px);`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      elements?.forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleBookAuditClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Animated Gradient Orbs */}
      <div className="floating-orb from-onima-electric-blue to-onima-neon-purple w-64 h-64 -top-20 left-1/4" data-speed="0.03"></div>
      <div className="floating-orb from-onima-vivid-purple to-onima-magenta w-80 h-80 bottom-10 -right-20" data-speed="0.02"></div>
      <div className="floating-orb from-onima-lime-green to-onima-ocean-blue w-48 h-48 bottom-40 left-10" data-speed="0.04"></div>
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h5 
          className="animate-on-scroll opacity-0 gradient-text font-medium mb-3 tracking-wider"
          style={{ animationDelay: '0.2s' }}
        >
          ONIMA - AI AUTOMATION AGENCY
        </h5>
        <h1 
          ref={headingRef}
          className="animate-on-scroll opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
          style={{ animationDelay: '0.4s' }}
        >
          We don&apos;t sell AI.<br/>
          <span className="neon-glow">We sell results.</span>
        </h1>
        <p 
          className="animate-on-scroll opacity-0 text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 parallax"
          style={{ animationDelay: '0.6s' }}
          data-speed="0.01"
        >
          AI-powered workflow automation that drives growth, performance, and freedom.
        </p>
        <Button 
          className="animate-on-scroll opacity-0 button-gradient text-white rounded-full px-8 py-6 text-lg"
          style={{ animationDelay: '0.8s' }}
          onClick={handleBookAuditClick} // Attach the scroll handler here
        >
          Book a Free Automation Audit
        </Button>

        {/* Scroll Indicator */}
        <div 
          className="animate-on-scroll opacity-0 absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{ animationDelay: '1s' }}
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-gradient-to-b from-onima-electric-blue to-onima-neon-purple rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
