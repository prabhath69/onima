
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Works from '@/components/Works';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          history.pushState(null, '', target.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-onima-dark text-white">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Works />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
