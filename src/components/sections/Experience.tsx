'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, Target, BookOpen, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation } from '@/utils/animation';
import { Variants, easeInOut, easeOut } from "framer-motion";

export default function Experience() {
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
        ease: easeOut,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0, transformOrigin: 'top' },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: easeOut }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeOut }
    },
    hover: {
      x: 10,
      transition: { duration: 0.2, ease: easeOut }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  const iconMap: Record<string, React.ReactNode> = {
    'Community Management': <Users size={18} />,
    'Teaching': <BookOpen size={18} />,
    'Event Planning': <Target size={18} />,
    'Social Media Strategy': <Calendar size={18} />,
    'Competitive Programming': <Award size={18} />,
    'Problem Setting': <Target size={18} />,
    'Mentoring': <Users size={18} />,
    'Technical Leadership': <BookOpen size={18} />,
  };

  const getOrganizationColor = (organization: string) => {
    switch (organization) {
      case 'Compiler Community':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'ICPC Menofia Community':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      default:
        return 'from-zinc-500/20 to-zinc-600/20 border-zinc-500/30';
    }
  };

  const getOrganizationIcon = (organization: string) => {
    switch (organization) {
      case 'Compiler Community':
        return <Users size={24} className="text-blue-400" />;
      case 'ICPC Menofia Community':
        return <Award size={24} className="text-green-400" />;
      default:
        return <BookOpen size={24} className="text-zinc-400" />;
    }
  };

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional Journey"
      description="My leadership roles and contributions to competitive programming communities and technical organizations."
      padding="lg"
      background="secondary"
    >
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
      >
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-zinc-600 transform -translate-x-1/2"
            variants={timelineVariants}
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
          />

          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:w-1/2'
              }`}
              variants={itemVariants}
              custom={index}
            >
              {/* Timeline Dot */}
              <div
                className={`
                  absolute top-8 w-4 h-4 rounded-full border-4 border-zinc-900 z-10
                  ${index % 2 === 0
                    ? 'md:left-1/2 md:transform md:-translate-x-1/2'
                    : 'md:right-1/2 md:transform md:translate-x-1/2'
                  }
                `}
              >
                <motion.div
                  className="w-full h-full bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Experience Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card
                  variant="elevated"
                  className={`relative bg-gradient-to-br ${getOrganizationColor(exp.organization)} backdrop-blur-sm group`}
                >
                  {/* Date Badge */}
                  <div className="absolute -top-3 left-6 md:left-6">
                    <Badge
                      variant="achievement"
                      className="bg-zinc-900 text-zinc-300 border-zinc-700 text-xs font-mono"
                    >
                      {exp.duration}
                    </Badge>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Organization Header */}
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-zinc-900/50 rounded-lg group-hover:bg-zinc-900/70 transition-colors">
                        {getOrganizationIcon(exp.organization)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                          {exp.organization}
                        </h3>
                        <p className="text-zinc-300 font-medium">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-zinc-300 flex items-center">
                        <Award size={16} className="mr-2 text-yellow-400" />
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            className="flex items-start space-x-2"
                            variants={achievementVariants}
                            custom={achIndex}
                          >
                            <ChevronRight
                              size={16}
                              className="text-blue-400 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-sm text-zinc-400 leading-relaxed">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-zinc-300">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="skill"
                            size="sm"
                            className="bg-zinc-800/50 text-zinc-300 border-zinc-700"
                          >
                            {iconMap[tech]}
                            <span className="ml-1">{tech}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Impact Metrics */}
                    <div className="pt-2 border-t border-zinc-700/50">
                      <div className="flex items-center space-x-2 text-xs text-zinc-500">
                        <Target size={12} />
                        <span>Community impact • Technical leadership • Mentorship excellence</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Timeline Date (Mobile) */}
              <div className="block md:hidden text-center mt-4">
                <Badge variant="secondary" size="sm">
                  {exp.duration}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <Card variant="glass" className="p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Award size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100">
                Community Leadership Impact
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Through my roles in various programming communities, I've had the privilege of mentoring
                hundreds of students, organizing educational events, and contributing to the growth of
                competitive programming in Egypt. My journey combines technical expertise with a passion
                for community building and knowledge sharing.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">500+</div>
                  <div className="text-sm text-zinc-500">Students Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-zinc-500">Problems Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-zinc-500">Events Organized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">300%</div>
                  <div className="text-sm text-zinc-500">Growth Rate</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
