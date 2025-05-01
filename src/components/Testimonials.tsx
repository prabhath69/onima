
import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Raj Sharma",
    company: "TechSolutions India",
    position: "CEO",
    quote: "Onima transformed our sales process by automating lead qualification and follow-ups. Our team now focuses on closing deals instead of chasing leads."
  },
  {
    id: 2,
    name: "Priya Patel",
    company: "Digital Marketing Agency",
    position: "Operations Director",
    quote: "The email automation system implemented by Onima increased our client response rate by 40% and saved us over 20 hours per week in manual tasks."
  },
  {
    id: 3,
    name: "Vikram Mehta",
    company: "Growth Solutions",
    position: "Founder",
    quote: "Working with Onima was seamless. Their AI automation solutions helped us scale our business operations without increasing our team size."
  }
];

const Testimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(1);

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

    const elements = document.querySelectorAll('.testimonial-animate');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length ? 1 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-onima-space-blue to-onima-dark relative">
      {/* Decorative Elements */}
      <div className="floating-orb from-onima-electric-blue to-onima-neon-purple w-64 h-64 top-40 left-10 opacity-20 blur-[100px] animate-spin-slow"></div>
      <div className="floating-orb from-onima-vivid-purple to-onima-magenta w-80 h-80 bottom-40 right-10 opacity-10 blur-[120px] animate-spin-slow animation-delay-2000"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="testimonial-animate opacity-0 text-3xl md:text-4xl font-bold mb-4">
            Our <span className="purple-gradient-text">Clients</span> Speak
          </h2>
          <p className="testimonial-animate opacity-0 text-white/70 max-w-2xl mx-auto">
            Don't take our word for it. Here's what our clients have to say about their experience working with Onima.
          </p>
        </div>

        <div className="relative min-h-[350px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-animate opacity-0 form-gradient-border max-w-2xl mx-auto transition-all duration-500 absolute ${
                activeTestimonial === testimonial.id 
                  ? 'opacity-100 z-20 scale-100' 
                  : 'opacity-0 z-10 scale-90'
              }`}
              style={{ 
                animationDelay: `${0.2 * (index + 1)}s`,
                transform: activeTestimonial === testimonial.id ? 'translateX(0)' : 
                  activeTestimonial > testimonial.id ? 'translateX(-100px)' : 'translateX(100px)'
              }}
            >
              <div className="glass-card h-full">
                <div className="text-center">
                  <div className="text-4xl mb-6 gradient-text">"</div>
                  <p className="text-lg mb-8 italic text-white/90">{testimonial.quote}</p>
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="purple-gradient-text font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((testimonial) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveTestimonial(testimonial.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTestimonial === testimonial.id 
                  ? 'bg-gradient-to-r from-onima-electric-blue to-onima-neon-purple w-8' 
                  : 'bg-white/20'
              }`}
              aria-label={`View testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
