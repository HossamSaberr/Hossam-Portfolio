'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, ExternalLink, SparklesIcon , Code2 , Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { navigationItems } from '@/data/portfolio';
import { useScrollspy } from '@/components/hooks/useScrollspy';
import { smoothScroll } from '@/utils/animation';
import { Variants, easeOut, easeInOut } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeSection = useScrollspy(
    navigationItems.map(item => item.href.replace('#', ''))
  );

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight * 0.8);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    smoothScroll(targetId);
    setIsMenuOpen(false);
  };

const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/50 shadow-lg'
            : 'bg-transparent'
          }
        `}
        initial="hidden"
        animate={isScrolled ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('#home')}
                className="group flex items-center space-x-2 text-zinc-100 hover:text-blue-400 transition-colors"
                aria-label="Home"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">HS</span>
                </div>
                <span className="font-semibold text-lg hidden sm:block">Hossam Saber</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeSection === item.href.replace('#', '')
                      ? 'text-blue-400 bg-blue-600/10'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                    }
                  `}
                  aria-label={item.name}
                >
                  {item.name}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600/10 rounded-lg border border-blue-600/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Social Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://github.com/HossamSaberr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/hossam-saberr/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                aria-label="Linkedin Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-zinc-900/95 backdrop-blur-md border-l border-zinc-800"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col h-full p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">HS</span>
                    </div>
                    <span className="font-semibold text-lg text-zinc-100">Hossam Saber</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={navItemVariants}
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={`
                            w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                            ${activeSection === item.href.replace('#', '')
                              ? 'text-blue-400 bg-blue-600/10 border border-blue-600/20'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                            }
                          `}
                          aria-label={item.name}
                        >
                          {item.name}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Social Links */}
                <div className="flex items-center justify-center space-x-4 py-6 border-t border-zinc-800">
                  <a
                    href="https://github.com/HossamSaberr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://codeforces.com/profile/Homz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                    aria-label="Codeforces Profile"
                  >
                    <Code2 size={20} />
                  </a>
                  <a
                    href="https://icpc.global/ICPCID/WCMZYVG0D2Q9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                    aria-label="ICPC Profile"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
