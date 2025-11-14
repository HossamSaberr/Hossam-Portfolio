'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const getOrganizationIcon = (organization: string) => {
    if (organization.toLowerCase().includes('compiler')) {
      return (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
      );
    } else if (organization.toLowerCase().includes('icpc')) {
      return (
        <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.54-3.28 8.57-8 9.64-4.72-1.07-8-5.1-8-9.64V8.18l8-4z" clipRule="evenodd"/>
        </svg>
      );
    }
    return (
      <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    );
  };

  const getExperienceTypeColor = (type: string) => {
    switch (type) {
      case 'community':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'leadership':
        return 'border-green-500/30 bg-green-500/10';
      case 'professional':
        return 'border-purple-500/30 bg-purple-500/10';
      default:
        return 'border-zinc-700/30 bg-zinc-700/10';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'community':
        return 'primary';
      case 'leadership':
        return 'success';
      case 'professional':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const sortedExperience = [...portfolioData.experience].sort((a, b) => {
    // Sort by start date (most recent first)
    const getYear = (duration: string) => {
      const match = duration.match(/(\d{4})/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.duration) - getYear(a.duration);
  });

  return (
    <Section
      ref={sectionRef}
      id="experience"
      title="Experience & Leadership"
      subtitle="Professional journey through competitive programming communities and technical leadership roles"
      className="bg-zinc-900"
    >
      <div className="max-w-4xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />

          {sortedExperience.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-zinc-900 z-10" />

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} transition-all duration-800 ${
                isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}>
                <Card
                  variant="elevated"
                  hover
                  className={`border-l-4 ${getExperienceTypeColor(exp.type)} ${
                    index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                  } md:max-w-md`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className={`flex items-start space-x-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                      <div className="flex-shrink-0 p-3 bg-zinc-800 rounded-lg">
                        {getOrganizationIcon(exp.organization)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-zinc-300 font-medium">
                          {exp.organization}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-zinc-400">
                            {exp.duration}
                          </span>
                          <Badge
                            variant={getBadgeVariant(exp.type)}
                            size="sm"
                          >
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div className="border-t border-zinc-800 pt-4">
                        <h4 className="text-sm font-medium text-zinc-300 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className={`flex items-start space-x-2 text-zinc-400 text-sm ${
                                index % 2 === 0 ? 'md:flex-row-reverse md:space-x-reverse' : ''
                              }`}
                            >
                              <span className="text-blue-400 flex-shrink-0 mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div
          className={`mt-16 transition-all duration-800 delay-1000 ${
            isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}
        >
          <Card variant="glass" className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Leadership Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {portfolioData.statistics.studentsMentored}+
                </div>
                <div className="text-sm text-zinc-400">Students Mentored</div>
                <p className="text-xs text-zinc-500 mt-2">Guided through competitive programming journey</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {portfolioData.statistics.contestsDesigned}+
                </div>
                <div className="text-sm text-zinc-400">Contests Designed</div>
                <p className="text-xs text-zinc-500 mt-2">Created competitive programming problems</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {portfolioData.statistics.communitiesLed}
                </div>
                <div className="text-sm text-zinc-400">Communities Led</div>
                <p className="text-xs text-zinc-500 mt-2">Technical leadership in programming communities</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Experience;