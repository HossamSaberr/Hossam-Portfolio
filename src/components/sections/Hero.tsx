'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Trophy, Users, ArrowDown, Github, ExternalLink, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { portfolioData } from '@/data/portfolio';
import { useTypewriter } from '@/utils/animation';
import { smoothScroll } from '@/utils/animation';
import { Variants, easeOut, easeInOut } from "framer-motion";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const { displayedText, isComplete } = useTypewriter(
    portfolioData.personalInfo.tagline,
    50,
    800
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroVariants = {
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

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const codeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut,
        staggerChildren: 0.1
      }
    }
  };

  const codeLineVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeOut }
    }
  };

  const handleScrollDown = () => {
    smoothScroll('about');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,blue_0%,transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,cyan_0%,transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,zinc_800_1px,transparent_1px)] [background-size:50px_50px] opacity-20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: easeInOut
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: easeInOut
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          variants={heroVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              variants={itemVariants}
            >
              {/* Name */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-100 leading-tight"
                variants={itemVariants}
              >
                <span className="block">{portfolioData.personalInfo.name.split(' ')[0]}</span>
                <span className="block gradient-text">{portfolioData.personalInfo.name.split(' ')[1]}</span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-medium"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                {portfolioData.personalInfo.title}
              </motion.h2>

              {/* Tagline with Typewriter Effect */}
              <motion.p
                className="text-lg sm:text-xl text-zinc-400 min-h-[2.5rem] font-mono"
                variants={itemVariants}
                transition={{ delay: 0.4 }}
              >
                <span className="text-blue-400">&gt;</span> {displayedText}
                <AnimatePresence>
                  {!isComplete && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>
              </motion.p>

              {/* Social Proof Badges */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
                variants={itemVariants}
                transition={{ delay: 0.6 }}
              >
                <Badge variant="codeforces" size="md">
                  <Trophy size={14} className="mr-1" />
                  Codeforces Expert
                </Badge>
                <Badge variant="acpc" size="md">
                  <Sparkles size={14} className="mr-1" />
                  ACPC Finalist
                </Badge>
                <Badge variant="default" size="md">
                  <Users size={14} className="mr-1" />
                  500+ Mentored
                </Badge>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => smoothScroll('projects')}
                  className="group"
                >
                  View Projects
                  <ArrowDown
                    size={18}
                    className="ml-2 group-hover:translate-y-1 transition-transform"
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => smoothScroll('contact')}
                >
                  Contact Me
                </Button>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="flex items-center justify-center lg:justify-start space-x-4 pt-4"
                variants={itemVariants}
                transition={{ delay: 1 }}
              >
                <a
                  href="https://github.com/HossamSaberr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors group"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://codeforces.com/profile/Homz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors group"
                  aria-label="Codeforces Profile"
                >
                  <Terminal size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Codeforces</span>
                </a>
                <a
                  href="https://icpc.global/ICPCID/WCMZYVG0D2Q9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-zinc-400 hover:text-blue-400 transition-colors group"
                  aria-label="ICPC Profile"
                >
                  <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">ICPC</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Visual Element - Code/Illustration */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end"
              variants={itemVariants}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="relative w-full max-w-md"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                {/* Code Window */}
                <motion.div
                  className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
                  variants={codeVariants}
                  initial="initial"
                  animate="animate"
                >
                  {/* Window Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-zinc-400 text-sm font-mono">
                      competitive_programmer.cpp
                    </div>
                    <div className="w-16" />
                  </div>

                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm space-y-2">
                    <motion.div variants={codeLineVariants} className="text-blue-400">
                      <span className="text-purple-400">#include</span> &lt;bits/stdc++.h&gt;
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="text-purple-400">
                      <span className="text-blue-400">using namespace</span> std;
                    </motion.div>
                    <div className="h-2" />
                    <motion.div variants={codeLineVariants} className="text-blue-400">
                      <span className="text-yellow-400">int</span> {` main() {`}
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="ml-4 text-green-400">
                      solve();
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="ml-4 text-cyan-400">
                      <span className="text-gray-400">// Problems solved: 4000+</span>
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="ml-4 text-cyan-400">
                      <span className="text-gray-400">// Rating: Expert</span>
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="ml-4 text-cyan-400">
                      <span className="text-gray-400">// Status: ACPC Finalist</span>
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="text-blue-400">
                      <span className="text-yellow-400">return</span> <span className="text-green-400">0</span>;
                    </motion.div>
                    <motion.div variants={codeLineVariants} className="text-blue-400">
                      `{'}'}`
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: easeInOut
                  }}
                >
                  <Code2 size={32} className="text-blue-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [360, 0, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: easeInOut
                  }}
                >
                  <Trophy size={24} className="text-cyan-400" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            variants={itemVariants}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={handleScrollDown}
              className="group flex flex-col items-center text-zinc-400 hover:text-blue-400 transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: easeInOut
                }}
              >
                <ArrowDown size={20} />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
