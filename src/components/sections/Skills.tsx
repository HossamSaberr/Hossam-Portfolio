'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';

const Skills = () => {
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

  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'C++': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.39 12L3 7.38V21h18V7.38L14.61 12H9.39zm6.62-2L22 5.92 19.08 3l-6.07 4.68 3 2zm-8.02 0l3-2L5.08 3 2.14 5.93 7.99 10z"/>
        </svg>
      ),
      'Java': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2zM16 19H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 8H13z"/>
        </svg>
      ),
      'Data Structures & Algorithms': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      ),
      'Object-Oriented Programming': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="5" r="3"/>
          <path d="M12 8v8M5 21v-7a7 7 0 0114 0v7M9 21h6"/>
        </svg>
      ),
      'Problem Solving': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      ),
      'GUI Development': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
      'Web Design': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      ),
      'Team Leadership': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      'Mentoring & Teaching': (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    };
    return iconMap[skillName] || (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-400';
      case 'Advanced':
        return 'text-blue-400';
      case 'Intermediate':
        return 'text-yellow-400';
      case 'Beginner':
        return 'text-gray-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'languages':
        return 'from-blue-500 to-blue-600';
      case 'concepts':
        return 'from-cyan-500 to-cyan-600';
      case 'other':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-zinc-500 to-zinc-600';
    }
  };

  const getProgressWidth = (level: string) => {
    switch (level) {
      case 'Expert':
        return '100%';
      case 'Advanced':
        return '80%';
      case 'Intermediate':
        return '60%';
      case 'Beginner':
        return '40%';
      default:
        return '50%';
    }
  };

  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: typeof portfolioData.skills });

  const categoryTitles = {
    languages: 'Programming Languages',
    concepts: 'Core Concepts',
    other: 'Professional Skills'
  };

  return (
    <Section
      ref={sectionRef}
      id="skills"
      title="Skills & Expertise"
      subtitle="Comprehensive skill set built through competitive programming and software development experience"
      className="bg-zinc-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
          <div
            key={category}
            className={`transition-all duration-800 ${
              isVisible
                ? 'animate-fadeInUp opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${categoryIndex * 200}ms` }}
          >
            <Card variant="elevated" hover className="h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(category)} rounded-lg flex items-center justify-center text-white`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    {category === 'languages' && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>}
                    {category === 'concepts' && <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>}
                    {category === 'other' && <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h3>
              </div>

              <div className="space-y-4">
                {skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="space-y-2"
                    style={{ animationDelay: `${categoryIndex * 200 + skillIndex * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-zinc-400">
                          {getSkillIcon(skill.name)}
                        </div>
                        <span className="text-zinc-200 font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <Badge
                        variant="primary"
                        size="sm"
                        className={getLevelColor(skill.level)}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)} transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? getProgressWidth(skill.level) : '0%',
                            transitionDelay: `${categoryIndex * 200 + skillIndex * 100 + 500}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div
        className={`mt-16 transition-all duration-800 delay-1000 ${
          isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
        }`}
      >
        <Card variant="glass" className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Skills Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {skillsByCategory.languages?.length || 0}
              </div>
              <div className="text-sm text-zinc-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {skillsByCategory.concepts?.length || 0}
              </div>
              <div className="text-sm text-zinc-400">Core Concepts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {skillsByCategory.other?.length || 0}
              </div>
              <div className="text-sm text-zinc-400">Professional Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {portfolioData.skills.filter(s => s.level === 'Expert').length}
              </div>
              <div className="text-sm text-zinc-400">Expert Level</div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Skills;