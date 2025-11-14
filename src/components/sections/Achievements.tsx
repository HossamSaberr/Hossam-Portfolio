'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, ExternalLink, Star, Medal, Crown, Code } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PlatformBadge, AchievementBadge } from '@/components/ui/Badge';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation } from '@/utils/animation';

export default function Achievements() {
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
        staggerChildren: 0.15
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

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const getAchievementIcon = (achievement: any) => {
    switch (achievement.title) {
      case 'ACPC Finalist':
        return <Crown size={24} className="text-yellow-400" />;
      case 'Problem Setter':
        return <Target size={24} className="text-purple-400" />;
      case 'Codeforces Expert':
        return <Code size={24} className="text-red-400" />;
      case 'AtCoder Cyan':
        return <Award size={24} className="text-blue-400" />;
      case '4000+ Problems Solved':
        return <Star size={24} className="text-green-400" />;
      default:
        return <Trophy size={24} className="text-zinc-400" />;
    }
  };

  const getAchievementColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'acpc':
        return 'from-yellow-600/20 to-yellow-500/20 border-yellow-600/30 hover:border-yellow-500/50';
      case 'codeforces':
        return 'from-red-600/20 to-red-500/20 border-red-600/30 hover:border-red-500/50';
      case 'atcoder':
        return 'from-blue-600/20 to-blue-500/20 border-blue-600/30 hover:border-blue-500/50';
      case 'tcpc & scpc':
        return 'from-purple-600/20 to-purple-500/20 border-purple-600/30 hover:border-purple-500/50';
      default:
        return 'from-green-600/20 to-green-500/20 border-green-600/30 hover:border-green-500/50';
    }
  };

  const getRatingDisplay = (achievement: any) => {
    if (achievement.platform === 'Codeforces') {
      return '1600+';
    }
    if (achievement.platform === 'AtCoder') {
      return '1200+';
    }
    return null;
  };

  return (
    <Section
      id="achievements"
      title="Achievements"
      subtitle="Competitive Programming Milestones"
      description="Recognition and accomplishments in competitive programming contests and technical communities."
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
        {/* Achievement Stats Overview */}
        <motion.div
          className="mb-16 text-center"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold gradient-text"
                variants={starVariants}
                custom={0}
              >
                5+
              </motion.div>
              <p className="text-sm text-zinc-400 mt-1">Major Platforms</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold gradient-text"
                variants={starVariants}
                custom={1}
              >
                4000+
              </motion.div>
              <p className="text-sm text-zinc-400 mt-1">Problems Solved</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold gradient-text"
                variants={starVariants}
                custom={2}
              >
                Expert
              </motion.div>
              <p className="text-sm text-zinc-400 mt-1">CF Rating</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold gradient-text"
                variants={starVariants}
                custom={3}
              >
                2025
              </motion.div>
              <p className="text-sm text-zinc-400 mt-1">ACPC Finalist</p>
            </div>
          </div>
        </motion.div>

        {/* Achievement Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={badgeVariants}
              whileHover="hover"
              custom={index}
            >
              <div
                className={`
                  relative group bg-gradient-to-br ${getAchievementColor(achievement.platform)}
                  backdrop-blur-sm border rounded-2xl p-8 text-center
                  transition-all duration-300 hover:shadow-2xl
                  hover:shadow-${achievement.platform.toLowerCase() === 'codeforces' ? 'red' : 'blue'}-500/20
                `}
              >
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                      style={{
                        left: `${25 + i * 25}%`,
                        top: `${25 + (i % 2) * 25}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Achievement Icon */}
                <motion.div
                  className="relative z-10 mb-4 inline-flex items-center justify-center w-16 h-16 bg-zinc-900/50 rounded-xl group-hover:bg-zinc-900/70 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {getAchievementIcon(achievement)}
                </motion.div>

                {/* Achievement Title */}
                <h3 className="relative z-10 text-xl font-bold text-zinc-100 mb-2">
                  {achievement.title}
                </h3>

                {/* Platform Badge */}
                <div className="relative z-10 mb-3">
                  <PlatformBadge
                    platform={achievement.platform}
                    className="mx-auto"
                  />
                </div>

                {/* Rating Display (if applicable) */}
                {getRatingDisplay(achievement) && (
                  <div className="relative z-10 mb-3">
                    <span className="text-sm font-mono text-zinc-400">
                      Rating: {getRatingDisplay(achievement)}
                    </span>
                  </div>
                )}

                {/* Achievement Description */}
                <p className="relative z-10 text-sm text-zinc-400 mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Date */}
                <div className="relative z-10 flex items-center justify-center space-x-2 text-xs text-zinc-500">
                  <Trophy size={12} />
                  <span>{achievement.date}</span>
                </div>

                {/* Link to Platform (if available) */}
                {achievement.url && (
                  <motion.a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 bg-zinc-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`View ${achievement.title} on ${achievement.platform}`}
                  >
                    <ExternalLink size={16} className="text-zinc-400" />
                  </motion.a>
                )}

                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      achievement.platform.toLowerCase() === 'codeforces' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'
                    }, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Recognition Section */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-zinc-100 mb-2">
              Additional Recognition
            </h3>
            <p className="text-zinc-400">
              Community recognition and technical contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors">
                <Medal className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-zinc-100 mb-2">
                  Problem Setting Excellence
                </h4>
                <p className="text-sm text-zinc-400">
                  Created original problems for major regional contests including TCPC and SCPC
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-colors">
                <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-zinc-100 mb-2">
                  Community Leadership
                </h4>
                <p className="text-sm text-zinc-400">
                  Recognized for outstanding contributions to competitive programming communities
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 text-center hover:border-yellow-500/30 transition-colors">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-zinc-100 mb-2">
                  Consistent Performance
                </h4>
                <p className="text-sm text-zinc-400">
                  Maintained expert-level ratings across multiple competitive programming platforms
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}