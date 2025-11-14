'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const categories = ['all', ...new Set(portfolioData.projects.map(project => project.category || 'Other'))];

  const filteredProjects = selectedCategory === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(project => project.category === selectedCategory);

  const getProjectImage = (project: typeof portfolioData.projects[0]) => {
    // Placeholder images based on project type
    const imageMap: { [key: string]: string } = {
      'library-management': '📚',
      'personal-portfolio': '🌐',
      'icpc-menofia-website': '👥'
    };
    return imageMap[project.id] || '💻';
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'desktop application':
        return 'from-blue-500 to-blue-600';
      case 'web development':
        return 'from-green-500 to-green-600';
      case 'documentation site':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-zinc-500 to-zinc-600';
    }
  };

  return (
    <Section
      ref={sectionRef}
      id="projects"
      title="Featured Projects"
      subtitle="A collection of my most impactful software development and competitive programming projects"
      className="bg-zinc-950"
    >
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`transition-all duration-300 ${
              selectedCategory === category ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            {category === 'all' ? 'All Projects' : category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`transition-all duration-800 ${
              isVisible
                ? 'animate-fadeInUp opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <Card variant="elevated" hover className="h-full group">
              {/* Project Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl">
                  {getProjectImage(project)}
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="warning" size="sm">
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-sm mb-2">Click to explore</p>
                    <div className="flex justify-center space-x-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    {project.category && (
                      <Badge variant="secondary" size="sm">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-300 hover:border-blue-500 hover:text-blue-400 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Key Features */}
                {project.features.length > 0 && (
                  <div className="border-t border-zinc-800 pt-4">
                    <h4 className="text-sm font-medium text-zinc-300 mb-2">Key Features:</h4>
                    <ul className="text-zinc-400 text-sm space-y-1">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-zinc-500 text-xs">
                          +{project.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.links.github, '_blank')}
                      className="flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>View Code</span>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(project.links.demo, '_blank')}
                      className="flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-zinc-400 text-lg">No projects found in this category.</div>
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory('all')}
            className="mt-4"
          >
            View All Projects
          </Button>
        </div>
      )}
    </Section>
  );
};

export default Projects;