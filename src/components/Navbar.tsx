import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBookAuditClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Works", href: "#works" },
    { name: "Clients", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-onima-neon">
          ONIMA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/70 hover:text-onima-neon transition-colors duration-300 text-sm"
            >
              {link.name}
            </a>
          ))}
          <Button
            className="blue-gradient text-white rounded-full px-5 py-2 hover:opacity-90"
            onClick={handleBookAuditClick}
          >
            Book Audit
          </Button>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <div className="relative w-6 h-6">
                <span className="absolute top-3 left-0 w-6 h-0.5 bg-white rotate-45"></span>
                <span className="absolute top-3 left-0 w-6 h-0.5 bg-white -rotate-45"></span>
              </div>
            ) : (
              <div className="relative w-6 h-6">
                <span className="absolute top-1 left-0 w-6 h-0.5 bg-white"></span>
                <span className="absolute top-3 left-0 w-6 h-0.5 bg-white"></span>
                <span className="absolute top-5 left-0 w-6 h-0.5 bg-white"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={cn(
          "fixed top-[60px] left-0 w-full glass transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        )}
      >
        <div className="container mx-auto py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-onima-neon transition-colors duration-300 px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="blue-gradient text-white rounded-full m-4 hover:opacity-90"
              onClick={handleBookAuditClick}
            >
              Book Audit
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
