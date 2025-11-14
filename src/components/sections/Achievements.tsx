'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';

const Achievements = () => {
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

  const getAchievementIcon = (achievement: typeof portfolioData.achievements[0]) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'ACPC Finalist 2025': (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M5.868 2.501c.796-1.031 2.331-1.031 3.127 0l2.54 3.292A1 1 0 0011.804 6h1.392a1 1 0 00.77-.36l2.54-3.292c.796-1.031 2.331-1.031 3.127 0l1.743 2.259a2 2 0 010 2.48L19.75 9.5a1 1 0 01-.77.36H18.3a1 1 0 00-.832.445l-2.98 4.484a2 2 0 000 2.142l1.985 2.99a1 1 0 00.832.445H19a1 1 0 01.77.36l1.743 2.259a2 2 0 010 2.48l-1.743 2.259c-.796 1.031-2.331 1.031-3.127 0l-2.54-3.292a1 1 0 00-.77-.36h-1.392a1 1 0 00-.77.36l-2.54 3.292c-.796 1.031-2.331 1.031-3.127 0L4.125 19.74a2 2 0 010-2.48L6.109 14.27a2 2 0 000-2.142l-2.98-4.484A1 1 0 002.295 7H1.25a1 1 0 01-.77-.36L-1.263 4.38a2 2 0 010-2.48L.48 2.501z" clipRule="evenodd"/>
        </svg>
      ),
      'Codeforces Expert': (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm3.5 6L12 10.5 8.5 8 11 5.5 13 3.5 15.5 6 13 8.5z" clipRule="evenodd"/>
        </svg>
      ),
      'AtCoder Cyan': (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" clipRule="evenodd"/>
        </svg>
      ),
      '4000+ Algorithmic Problems Solved': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    };

    // Check for problem setter achievements
    if (achievement.title.includes('Problem Setter')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      );
    }

    return iconMap[achievement.title] || (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    );
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'competitive':
        return 'from-blue-500 to-cyan-500';
      case 'professional':
        return 'from-purple-500 to-pink-500';
      case 'academic':
        return 'from-green-500 to-emerald-500';
      case 'leadership':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-zinc-500 to-zinc-600';
    }
  };

  const getBadgeShape = (achievement: typeof portfolioData.achievements[0]) => {
    if (achievement.title.includes('Codeforces')) {
      return 'rounded-lg';
    }
    if (achievement.title.includes('AtCoder')) {
      return 'rounded-full';
    }
    return 'rounded-xl';
  };

  const groupedAchievements = portfolioData.achievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as { [key: string]: typeof portfolioData.achievements });

  const categoryTitles = {
    competitive: 'Competitive Programming',
    professional: 'Professional',
    academic: 'Academic',
    leadership: 'Leadership'
  };

  return (
    <Section
      ref={sectionRef}
      id="achievements"
      title="Achievements & Recognition"
      subtitle="Notable accomplishments in competitive programming, community leadership, and professional development"
      className="bg-zinc-950"
    >
      <div className="space-y-16">
        {Object.entries(groupedAchievements).map(([type, achievements], typeIndex) => (
          <div
            key={type}
            className={`transition-all duration-800 ${
              isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
            }`}
            style={{ animationDelay: `${typeIndex * 200}ms` }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {categoryTitles[type as keyof typeof categoryTitles]}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, achievementIndex) => (
                <div
                  key={achievement.id}
                  className={`transition-all duration-800 ${
                    isVisible
                      ? 'animate-fadeInUp opacity-100'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ animationDelay: `${typeIndex * 200 + achievementIndex * 100}ms` }}
                >
                  <Card
                    variant="glass"
                    hover
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => achievement.link && window.open(achievement.link, '_blank')}
                  >
                    {/* Achievement Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getAchievementColor(type)} ${getBadgeShape(achievement)} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {getAchievementIcon(achievement)}
                      </div>
                      {achievement.link && (
                        <div className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">
                          {achievement.date}
                        </span>
                        {achievement.organization && (
                          <Badge variant="outline" size="sm">
                            {achievement.organization}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getAchievementColor(type)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Summary */}
      <div
        className={`mt-16 transition-all duration-800 delay-1000 ${
          isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
        }`}
      >
        <Card variant="elevated" className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Achievement Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                {portfolioData.achievements.filter(a => a.type === 'competitive').length}
              </div>
              <div className="text-sm text-zinc-400">Competitive Programming</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                {portfolioData.achievements.filter(a => a.type === 'professional').length}
              </div>
              <div className="text-sm text-zinc-400">Professional</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                {portfolioData.achievements.filter(a => a.type === 'academic').length}
              </div>
              <div className="text-sm text-zinc-400">Academic</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                {portfolioData.achievements.filter(a => a.type === 'leadership').length}
              </div>
              <div className="text-sm text-zinc-400">Leadership</div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <h4 className="text-lg font-semibold text-white mb-4">Key Highlights</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="primary" className="px-4 py-2">
                🏆 ACPC Finalist 2025
              </Badge>
              <Badge variant="success" className="px-4 py-2">
                🎯 4000+ Problems Solved
              </Badge>
              <Badge variant="info" className="px-4 py-2">
                💻 Problem Setter
              </Badge>
              <Badge variant="warning" className="px-4 py-2">
                📈 Codeforces Expert
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Achievements;