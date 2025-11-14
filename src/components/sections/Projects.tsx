'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Book, Globe, Code, Users, Eye } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation } from '@/utils/animation';
import { Variants, easeOut, easeInOut } from "framer-motion";

export default function Projects() {
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
        staggerChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeOut }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: easeOut }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { opacity: 1 }
  };

  const iconMap: Record<string, React.ReactNode> = {
    'Java': <Code size={20} />,
    'OOP': <Book size={20} />,
    'GUI (Java Swing)': <Code size={20} />,
    'HTML': <Globe size={20} />,
    'CSS': <Book size={20} />,
    'Responsive Design': <Eye size={20} />,
    'JavaScript': <Code size={20} />,
    'Material for MkDocs': <Book size={20} />,
    'Markdown': <Book size={20} />,
    'Git': <Code size={20} />,
  };

  const projectColors = {
    'Library Management System': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Personal Portfolio Website': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'ICPC Menofia Community Website': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  };

  const getProjectIcon = (title: string) => {
    switch (title) {
      case 'Library Management System':
        return <Book size={24} className="text-blue-400" />;
      case 'Personal Portfolio Website':
        return <Globe size={24} className="text-purple-400" />;
      case 'ICPC Menofia Community Website':
        return <Users size={24} className="text-green-400" />;
      default:
        return <Code size={24} className="text-zinc-400" />;
    }
  };

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Portfolio Showcase"
      description="Explore my recent projects featuring diverse technologies and innovative solutions to real-world problems."
      padding="lg"
      background="primary"
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <Card
                variant="project"
                className="group overflow-hidden"
                interactive
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  {/* SVG Project Image */}
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay with project icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent flex items-center justify-center">
                    <motion.div
                      className={`p-6 rounded-2xl bg-gradient-to-br ${projectColors[project.title as keyof typeof projectColors]} backdrop-blur-sm border`}
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: easeInOut
                      }}
                    >
                      {getProjectIcon(project.title)}
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-60"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: easeInOut
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-500 rounded-full opacity-40"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: easeInOut,
                        delay: 0.5
                      }}
                    />
                  </div>

                  {/* Overlay with gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
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
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="skill"
                        size="sm"
                        className="bg-zinc-800/50 text-zinc-400 border-zinc-700"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-300">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="text-xs text-zinc-400 flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: isSectionVisible ? 1 : 0,
                            x: isSectionVisible ? 0 : -10,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + idx * 0.1,
                          }}
                        >
                          <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                      {project.features.length > 2 && (
                        <li className="text-xs text-zinc-500 italic">
                          +{project.features.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    {project.githubUrl && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 group"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Github size={16} className="mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}

                    {project.liveUrl ? (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 group"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled
                      >
                        <Eye size={16} className="mr-2" />
                        Private
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  variants={overlayVariants}
                  animate="hidden"
                  whileHover="visible"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            <div className="flex items-center space-x-3">
              <Github size={24} className="text-blue-400" />
              <span className="text-zinc-300">
                Interested in seeing more projects?
              </span>
            </div>
            <Button
              variant="outline"
              size="md"
              asChild
              className="group"
            >
              <a
                href="https://github.com/HossamSaberr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit My GitHub
                <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
