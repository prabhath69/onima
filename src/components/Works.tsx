
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  results: string[];
  thumbnail: string; // We'll use placeholder text for now
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Sales Automation",
    category: "Sales",
    description: "Implemented complete sales funnel automation with personalized recommendations and follow-ups.",
    results: ["43% increase in conversion rate", "67% reduction in manual follow-ups", "28% growth in average order value"],
    thumbnail: "E-commerce"
  },
  {
    id: 2,
    title: "AI Recruitment Assistant",
    category: "HR",
    description: "Automated candidate screening and initial interview processes for a tech recruitment firm.",
    results: ["75% reduction in time-to-hire", "90% decrease in screening time", "35% improvement in candidate quality"],
    thumbnail: "Recruitment"
  },
  {
    id: 3,
    title: "Customer Support Chatbot",
    category: "Support",
    description: "Created an intelligent support system that resolves 80% of common customer queries without human intervention.",
    results: ["80% automated resolution rate", "24/7 customer support coverage", "3.2 min average response time vs 4 hours previously"],
    thumbnail: "Support"
  }
];

const Works: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const elements = document.querySelectorAll('.works-animate');
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
    <section id="works" className="section-padding bg-gradient-to-b from-onima-grey to-onima-dark">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="works-animate opacity-0 text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-onima-neon">Work</span>
          </h2>
          <p className="works-animate opacity-0 text-white/70 max-w-2xl mx-auto">
            Explore our successful AI automation projects and the measurable results they've delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="works-animate opacity-0 glass-card group cursor-pointer hover:border-onima-blue transition-all duration-300"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              onClick={() => {
                setActiveProject(project.id);
                setIsModalOpen(true);
              }}
            >
              <div className="h-40 flex items-center justify-center bg-gradient-to-br from-onima-blue/20 to-onima-neon/20 rounded-t-xl mb-4">
                <span className="text-4xl">{project.thumbnail[0]}</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-onima-neon uppercase font-medium">{project.category}</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-onima-neon transition-colors duration-300">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4">{project.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 hover:bg-onima-blue hover:text-white hover:border-onima-blue"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsModalOpen(false)}>
            <div 
              className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-white/70 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="relative w-6 h-6">
                    <span className="absolute top-3 left-0 w-6 h-0.5 bg-white rotate-45"></span>
                    <span className="absolute top-3 left-0 w-6 h-0.5 bg-white -rotate-45"></span>
                  </div>
                </button>

                {projects.map((project) => {
                  if (project.id === activeProject) {
                    return (
                      <div key={project.id} className="p-6">
                        <span className="inline-block px-3 py-1 bg-onima-blue/20 text-onima-neon text-xs rounded-full mb-4">{project.category}</span>
                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                        
                        <div className="h-60 flex items-center justify-center bg-gradient-to-br from-onima-blue/20 to-onima-neon/20 rounded-xl mb-6">
                          <div className="text-6xl">{project.thumbnail[0]}</div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2">Project Overview</h4>
                          <p className="text-white/70">{project.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2">Key Results</h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="text-onima-neon mr-2">•</span>
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-center mt-6">
                          <Button className="blue-gradient text-white rounded-full px-8 py-6 hover:opacity-90">
                            Get Similar Results
                          </Button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;
