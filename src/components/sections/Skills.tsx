'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Brain, Zap, Database, Monitor, Users, MessageSquare } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation } from '@/utils/animation';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isVisible: isSectionVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    'C++': <Code size={24} />,
    'Java': <Cpu size={24} />,
    'Data Structures & Algorithms': <Brain size={24} />,
    'Object-Oriented Programming': <Database size={24} />,
    'Problem Solving': <Zap size={24} />,
    'GUI Development': <Monitor size={24} />,
    'Web Design': <Code size={24} />,
    'Team Leadership': <Users size={24} />,
    'Technical Communication': <MessageSquare size={24} />,
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-600/20 text-green-400 border-green-600/30';
      case 'Advanced':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      case 'Intermediate':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
      case 'Beginner':
        return 'bg-zinc-600/20 text-zinc-400 border-zinc-600/30';
      default:
        return 'bg-zinc-600/20 text-zinc-400 border-zinc-600/30';
    }
  };

  const getProgressWidth = (level: string) => {
    switch (level) {
      case 'Expert':
        return '100%';
      case 'Advanced':
        return '85%';
      case 'Intermediate':
        return '65%';
      case 'Beginner':
        return '40%';
      default:
        return '50%';
    }
  };

  const categoryIcons = {
    languages: <Code size={28} className="text-blue-400" />,
    concepts: <Brain size={28} className="text-purple-400" />,
    other: <Zap size={28} className="text-yellow-400" />,
  };

  const categoryTitles = {
    languages: 'Programming Languages',
    concepts: 'Core Concepts',
    other: 'Additional Skills',
  };

  const categoryDescriptions = {
    languages: 'Programming languages I master for competitive programming and software development',
    concepts: 'Fundamental concepts and advanced topics I specialize in',
    other: 'Additional skills that complement my technical expertise',
  };

  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="Expertise & Competencies"
      description="A comprehensive overview of my technical skills and proficiency levels across different domains."
      padding="lg"
      background="gradient"
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
      >
        <div className="space-y-16">
          {/* Languages */}
          <motion.div
            variants={categoryVariants}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  {categoryIcons.languages}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100">
                {categoryTitles.languages}
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {categoryDescriptions.languages}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.skills.languages.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card variant="skill" className="p-6 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-zinc-700/50 transition-colors">
                          {iconMap[skill.name]}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </h4>
                          <Badge
                            variant="skill"
                            className={getLevelColor(skill.level)}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-zinc-400">
                        <span>Proficiency</span>
                        <span>{skill.level}</span>
                      </div>
                      <div className="w-full bg-zinc-800/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: isSectionVisible ? getProgressWidth(skill.level) : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.2,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Concepts */}
          <motion.div
            variants={categoryVariants}
            className="space-y-8"
            transition={{ delay: 0.2 }}
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-600/20 rounded-xl">
                  {categoryIcons.concepts}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100">
                {categoryTitles.concepts}
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {categoryDescriptions.concepts}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioData.skills.concepts.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card variant="skill" className="p-6 text-center group">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-purple-600/20 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                        {iconMap[skill.name]}
                      </div>
                      <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors">
                        {skill.name}
                      </h4>
                      <Badge
                        variant="skill"
                        className={getLevelColor(skill.level)}
                      >
                        {skill.level}
                      </Badge>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative w-20 h-20 mx-auto mt-4">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-zinc-800/50"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: 226, strokeDashoffset: 226 }}
                          animate={{
                            strokeDashoffset: isSectionVisible
                              ? 226 - (226 * (skill.level === 'Expert' ? 1 : skill.level === 'Advanced' ? 0.85 : 0.7))
                              : 226,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.2,
                            ease: "easeOut"
                          }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-zinc-300">
                          {skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '85%' : '70%'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Skills */}
          <motion.div
            variants={categoryVariants}
            className="space-y-8"
            transition={{ delay: 0.4 }}
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-yellow-600/20 rounded-xl">
                  {categoryIcons.other}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100">
                {categoryTitles.other}
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {categoryDescriptions.other}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioData.skills.other.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card variant="glass" className="p-6 text-center group hover:border-yellow-500/30 transition-all duration-300">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-yellow-600/20 rounded-xl group-hover:bg-yellow-600/30 transition-colors">
                        {iconMap[skill.name]}
                      </div>
                      <h4 className="text-base font-semibold text-zinc-100 group-hover:text-yellow-400 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        {skill.level}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}