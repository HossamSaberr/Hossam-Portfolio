'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Code2, Award, Lightbulb } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation, useAnimatedCounter } from '@/utils/animation';
import { Variants, Transition } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as Transition["ease"],
      staggerChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as Transition["ease"],
    }
  }
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Transition["ease"],
    }
  }
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isVisible: isSectionVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const iconMap = {
    'Algorithmic Problems Solved': Code2,
    'Competitive Programming Rankings': Award,
    'Students Mentored': Users,
    'Leadership Positions': Target,
  };

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Personal Journey"
      description="Learn more about my background, education, and passion for competitive programming and software development."
      padding="lg"
      background="pattern"
    >
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Bio Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-zinc-300 leading-relaxed">
                I am a passionate competitive programmer and software developer...
              </p>

              <p className="text-zinc-300 leading-relaxed">
                As an ACPC Finalist and ICPC Problem Setter...
              </p>

              <p className="text-zinc-300 leading-relaxed">
                I believe in the power of continuous learning...
              </p>
            </div>

            {/* Education */}
            <motion.div variants={itemVariants} transition={{ delay: 0.2 }}>
              <Card variant="glass" className="p-6 space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <GraduationCap size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-100">Education</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-medium text-zinc-100">
                      {portfolioData.personalInfo.education.university}
                    </h4>
                    <p className="text-zinc-300">
                      {portfolioData.personalInfo.education.degree}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-zinc-400">
                      GPA: {portfolioData.personalInfo.education.gpa}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Philosophy */}
            <motion.div variants={itemVariants} transition={{ delay: 0.4 }}>
              <Card variant="glass" className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-600/20 rounded-lg">
                    <Lightbulb size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-100">Personal Philosophy</h3>
                </div>

                <blockquote className="text-zinc-300 italic border-l-4 border-blue-500 pl-4">
                  "If You Aim At Nothing, You Hit Nothing..."
                </blockquote>
              </Card>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div className="space-y-6" variants={itemVariants} transition={{ delay: 0.3 }}>
            <h3 className="text-2xl font-bold text-zinc-100 mb-6">Key Achievements</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioData.personalInfo.statistics.map((stat, index) => {
                const IconComponent = iconMap[stat.label as keyof typeof iconMap] || Award;

                const { displayValue } = useAnimatedCounter(
                  stat.value,
                  2000,
                  isSectionVisible ? index * 200 : 0
                );

                return (
                  <motion.div
                    key={stat.label}
                    variants={statVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Card
                      variant="glass"
                      className="p-6 text-center group hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center space-y-4">

                        <div className="p-3 bg-blue-600/20 rounded-full group-hover:bg-blue-600/30 transition-colors">
                          <IconComponent size={32} className="text-blue-400" />
                        </div>

                        <div className="space-y-2">
                          <div className="text-3xl font-bold gradient-text">{displayValue}</div>
                          <p className="text-sm text-zinc-300 leading-tight">{stat.label}</p>
                        </div>

                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Community Impact */}
            <motion.div variants={itemVariants} transition={{ delay: 0.6 }}>
              <Card variant="elevated" className="p-6">
                <h4 className="text-xl font-semibold text-zinc-100 mb-4">Community Impact</h4>

                <div className="space-y-4">
                  <p className="text-zinc-300">Mentored 2500+ students</p>
                  <p className="text-zinc-300">Created 50+ programming problems</p>
                  <p className="text-zinc-300">Organized scientific events</p>
                  <p className="text-zinc-300">Grew community engagement by 300%</p>
                </div>
              </Card>
            </motion.div>

          </motion.div>

        </div>
      </motion.div>
    </Section>
  );
}
