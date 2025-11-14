'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code, ExternalLink, Mail, Phone, ArrowUp } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { smoothScroll } from '@/utils/animation';
import { Variants } from "framer-motion";


export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    smoothScroll('home');
  };

  const socialIconMap = {
    github: Github,
    codeforces: Code,
    icpc: ExternalLink,
    linkedin: ExternalLink,
  };

  const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};


const backToTopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut", 
    },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};


  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,zinc-800_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={footerVariants}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">HS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">Hossam Saber</h3>
                  <p className="text-sm text-zinc-400">Competitive Programmer</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                ACPC Finalist, ICPC Problem Setter, and Software Developer passionate about algorithmic problem solving and mentoring.
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={footerVariants}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-zinc-100">Contact</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  className="flex items-center space-x-3 text-zinc-400 hover:text-blue-400 transition-colors group"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{portfolioData.personalInfo.email}</span>
                </a>
                <a
                  href={`tel:${portfolioData.personalInfo.phone}`}
                  className="flex items-center space-x-3 text-zinc-400 hover:text-blue-400 transition-colors group"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{portfolioData.personalInfo.phone}</span>
                </a>
              </div>
            </motion.div>

            {/* Social Links Section */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={footerVariants}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-zinc-100">Connect</h4>
              <div className="flex flex-wrap gap-3">
                {portfolioData.socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.icon as keyof typeof socialIconMap] || ExternalLink;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      aria-label={social.name}
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 group-hover:scale-110">
                        <IconComponent size={18} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-zinc-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-zinc-500 text-sm">
                © {new Date().getFullYear()} Hossam Saber. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToTop();
                  }}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToTop();
                  }}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={handleBackToTop}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            aria-label="Back to top"
          >
            <ArrowUp
              size={20}
              className="group-hover:translate-y-[-2px] transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
