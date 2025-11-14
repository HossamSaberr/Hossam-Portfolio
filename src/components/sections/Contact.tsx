'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Send, Github, Code, ExternalLink, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { portfolioData } from '@/data/portfolio';
import { useScrollAnimation } from '@/utils/animation';
import { ContactForm } from '@/types/portfolio';
import { Variants, easeOut } from "framer-motion";


// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { ref, isVisible: isSectionVisible } = useScrollAnimation(0.2);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

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

  const socialIconMap = {
    github: Github,
    codeforces: Code,
    icpc: ExternalLink,
    linkedin: ExternalLink,
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Contact Information"
      description="Feel free to reach out for collaborations, mentoring opportunities, or just to say hello!"
      padding="lg"
      background="gradient"
    >
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionVisible ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">
                Let's Connect
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                I'm always interested in hearing about new opportunities, collaborations, or just discussing
                competitive programming and software development. Whether you're a fellow programmer, a potential
                collaborator, or someone interested in mentoring, I'd love to hear from you!
              </p>
            </div>

            {/* Direct Contact */}
            <Card variant="glass" className="p-6 space-y-4">
              <h4 className="text-lg font-semibold text-zinc-100 flex items-center">
                <MessageSquare size={20} className="mr-2 text-blue-400" />
                Direct Contact
              </h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  className="flex items-center space-x-3 text-zinc-300 hover:text-blue-400 transition-colors group"
                >
                  <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{portfolioData.personalInfo.email}</div>
                    <div className="text-sm text-zinc-500">Click to send email</div>
                  </div>
                </a>
                <a
                  href={`tel:${portfolioData.personalInfo.phone}`}
                  className="flex items-center space-x-3 text-zinc-300 hover:text-blue-400 transition-colors group"
                >
                  <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{portfolioData.personalInfo.phone}</div>
                    <div className="text-sm text-zinc-500">Available for calls</div>
                  </div>
                </a>
              </div>
            </Card>

            {/* Professional Profiles */}
            <Card variant="glass" className="p-6">
              <h4 className="text-lg font-semibold text-zinc-100 mb-4">
                Professional Profiles
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {portfolioData.socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.icon as keyof typeof socialIconMap] || ExternalLink;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="flex items-center space-x-2 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 hover:border-blue-500/30 border border-transparent transition-all duration-200">
                        <IconComponent size={18} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
                          {social.name}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Response Time */}
            <Card variant="elevated" className="p-6">
              <h4 className="text-lg font-semibold text-zinc-100 mb-3">
                Response Time
              </h4>
              <div className="space-y-2 text-zinc-400 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Email: Usually within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Phone: Available during business hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Social: Regularly active</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated" className="p-8">
              <h3 className="text-2xl font-bold text-zinc-100 mb-6">
                Send Me a Message
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle size={20} />
                    <span>Failed to send message. Please try again later.</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Project Collaboration"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                  icon={<Send size={18} />}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
