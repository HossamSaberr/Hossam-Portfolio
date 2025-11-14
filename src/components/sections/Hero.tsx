'use client';

import React, { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [taglineText, setTaglineText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullTagline = portfolioData.personalInfo.tagline;
  const typingSpeed = 50;

  useEffect(() => {
    setIsVisible(true);

    // Typewriter effect for tagline
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullTagline.length) {
        setTaglineText(fullTagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = (element as HTMLElement).offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getPrimaryAchievements = () => {
    return portfolioData.achievements.filter(achievement =>
      achievement.type === 'competitive' &&
      ['ACPC Finalist 2025', 'Codeforces Expert', 'AtCoder Cyan'].includes(achievement.title)
    );
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-400"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile illustration or placeholder */}
          <div className="mb-8 animate-float">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              HS
            </div>
          </div>

          {/* Name with animation */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'animate-fadeInUp opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {portfolioData.personalInfo.name}
          </h1>

          {/* Title with animation */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'animate-fadeInUp opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-zinc-300 mb-6">
              {portfolioData.personalInfo.title}
            </h2>
          </div>

          {/* Tagline with typewriter effect */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}>
            <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-3xl mx-auto min-h-[2.5rem]">
              {taglineText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>

          {/* Achievement badges */}
          <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}>
            {getPrimaryAchievements().map((achievement, index) => (
              <Badge
                key={achievement.id}
                variant={achievement.title.includes('Expert') ? 'success' : achievement.title.includes('Finalist') ? 'primary' : 'info'}
                size="sm"
                className="animate-fadeIn delay-700"
              >
                {achievement.title}
              </Badge>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-800 ${
            isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('#projects')}
              className="animate-slideInLeft delay-900"
            >
              View Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('#contact')}
              className="animate-slideInRight delay-1000"
            >
              Contact Me
            </Button>
          </div>

          {/* Quick stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-1200 ${
            isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {portfolioData.statistics.problemsSolved.toLocaleString()}+
              </div>
              <div className="text-sm text-zinc-400">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {portfolioData.statistics.studentsMentored}+
              </div>
              <div className="text-sm text-zinc-400">Students Mentored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {portfolioData.statistics.communitiesLed}
              </div>
              <div className="text-sm text-zinc-400">Communities Led</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {portfolioData.statistics.contestsDesigned}+
              </div>
              <div className="text-sm text-zinc-400">Contests Designed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;