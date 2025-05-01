'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    description: "",
    painPoints: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const { error } = await supabase.from('contact_details').insert([
        {
          name: formData.name,
          business_name: formData.businessName,
          description: formData.description,
          pain_points: formData.painPoints,
          email: formData.email,
          phone: formData.phone,
        }
      ]);
  
      if (error) {
        throw error;
      }
  
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
  
      setFormData({
        name: "",
        businessName: "",
        description: "",
        painPoints: "",
        email: "",
        phone: ""
      });
  
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <section id="contact" className="section-padding bg-onima-dark">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="glass-card">
              <h3 className="text-2xl font-bold mb-6">Get Started</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-white/70">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-onima-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm text-white/70">Business Name</label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Your Company"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-onima-blue"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <label htmlFor="description" className="text-sm text-white/70">Short Description of Company</label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your business..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="bg-white/5 border-white/10 focus:border-onima-blue resize-none"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <label htmlFor="painPoints" className="text-sm text-white/70">Current Pain Points</label>
                <Textarea
                  id="painPoints"
                  name="painPoints"
                  placeholder="What challenges are you facing?"
                  value={formData.painPoints}
                  onChange={handleChange}
                  rows={3}
                  className="bg-white/5 border-white/10 focus:border-onima-blue resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-white/70">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-onima-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-white/70">Phone Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-onima-blue"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="blue-gradient w-full text-white py-6 rounded-full hover:opacity-90"
              >
                {isSubmitting ? "Sending..." : "Let's Talk Automation"}
              </Button>
            </form>
          </div>
          
          <div className="lg:order-2">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Automate the Grind. <br />
                <span className="text-onima-neon">Focus on Growth.</span>
              </h2>
              <p className="text-white/70 mb-8">
                Ready to transform your business operations? Our team is here to help you identify 
                automation opportunities and implement solutions that drive measurable results.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-onima-blue/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-onima-neon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <p className="text-white/70">onima.services@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-onima-blue/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-onima-neon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <p className="text-white/70">+91 80741 78789</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-onima-blue/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-onima-neon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-white/70">Kakinada, Andhra Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
