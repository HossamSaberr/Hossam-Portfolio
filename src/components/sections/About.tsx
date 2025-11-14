'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';

const About = () => {
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

  const AnimatedCounter = ({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    return (
      <div ref={counterRef} className="text-center">
        <div className="text-4xl font-bold gradient-text mb-2">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-zinc-400">{label}</div>
      </div>
    );
  };

  return (
    <Section
      ref={sectionRef}
      id="about"
      title="About Me"
      className="bg-zinc-950"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Bio Section */}
        <div className="space-y-6">
          <div
            className={`transition-all duration-800 ${
              isVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Professional Bio</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-4">
                I am a Computer Science student at the Faculty of Computer & Information, Menoufia University,
                with a strong passion for algorithms, competitive programming, and clean software development.
                My journey in programming has been driven by curiosity and a constant desire to solve complex problems.
              </p>
              <p className="text-zinc-300 leading-relaxed mb-4">
                With over 4,000 algorithmic problems solved and multiple competitive programming achievements,
                I have developed exceptional problem-solving skills and a deep understanding of data structures and algorithms.
                My expertise in C++ and Java, combined with strong Object-Oriented Programming principles,
                allows me to build efficient and scalable software solutions.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Beyond technical skills, I am passionate about teaching and mentoring. As a community leader and mentor,
                I have had the privilege of guiding over 500 students through their competitive programming journey,
                helping them unlock their potential and achieve their goals.
              </p>
            </div>
          </div>

          {/* Education Card */}
          <Card
            className={`transition-all duration-800 delay-200 hover ${
              isVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-4">Education</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold text-zinc-200">
                  {portfolioData.education.institution}
                </h4>
                <p className="text-zinc-400">{portfolioData.education.degree}</p>
                <p className="text-zinc-500 text-sm">{portfolioData.education.duration}</p>
                <p className="text-zinc-400 text-sm mt-2">
                  GPA: <span className="font-semibold">{portfolioData.education.gpa}</span>
                </p>
              </div>
              {portfolioData.education.achievements && (
                <div className="border-t border-zinc-800 pt-3">
                  <h5 className="text-sm font-medium text-zinc-300 mb-2">Key Focus Areas:</h5>
                  <ul className="text-zinc-400 text-sm space-y-1">
                    {portfolioData.education.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Statistics Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedCounter
              end={portfolioData.statistics.problemsSolved}
              label="Algorithmic Problems Solved"
              suffix="+"
            />
            <AnimatedCounter
              end={portfolioData.statistics.studentsMentored}
              label="Students Mentored"
              suffix="+"
            />
            <AnimatedCounter
              end={portfolioData.statistics.communitiesLed}
              label="Communities Led"
            />
            <AnimatedCounter
              end={portfolioData.statistics.contestsDesigned}
              label="Contests Designed"
              suffix="+"
            />
          </div>

          {/* Skills Preview */}
          <Card
            className={`transition-all duration-800 delay-400 hover ${
              isVisible ? 'animate-fadeInRight opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-4">Core Competencies</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-zinc-400 mb-2">Programming Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills
                    .filter(skill => skill.category === 'languages')
                    .map(skill => (
                      <span
                        key={skill.id || skill.name}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-zinc-400 mb-2">Key Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills
                    .filter(skill => skill.category === 'concepts')
                    .slice(0, 3)
                    .map(skill => (
                      <span
                        key={skill.id || skill.name}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-zinc-400 mb-2">Leadership & Teaching</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills
                    .filter(skill => skill.category === 'other' &&
                      ['Team Leadership', 'Mentoring & Teaching'].includes(skill.name))
                    .map(skill => (
                      <span
                        key={skill.id || skill.name}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default About;