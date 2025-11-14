'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus('loading');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mailto link as fallback
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoLink = `mailto:${portfolioData.personalInfo.email}?subject=${subject}&body=${body}`;

      window.open(mailtoLink);

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getSocialIcon = (platform: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'GitHub': (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      'Codeforces': (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M4.5 7.81C4.5 6.76 5.26 6 6.31 6h11.38c1.05 0 1.81.76 1.81 1.81v8.38c0 1.05-.76 1.81-1.81 1.81H6.31C5.26 18 4.5 17.24 4.5 16.19V7.81zM6 7v10h12V7H6zm2.5 2.5h3v3h-3v-3zm5 0h3v3h-3v-3zm-5 5h3v3h-3v-3zm5 0h3v3h-3v-3z" clipRule="evenodd" />
        </svg>
      ),
      'ICPC Profile': (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.54-3.28 8.57-8 9.64-4.72-1.07-8-5.1-8-9.64V8.18l8-4z" clipRule="evenodd" />
        </svg>
      ),
      'Email': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Phone': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    };
    return iconMap[platform] || (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  };

  return (
    <Section
      ref={sectionRef}
      id="contact"
      title="Get In Touch"
      subtitle="Feel free to reach out for collaborations, opportunities, or just a friendly conversation"
      className="bg-zinc-900"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <div
            className={`transition-all duration-800 ${
              isVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card variant="glass" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-zinc-400 leading-relaxed">
                  I'm always interested in hearing about new opportunities, exciting projects,
                  or just having a conversation about competitive programming and software development.
                  Feel free to reach out through any of the platforms below or send me a message directly.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioData.socialLinks
                    .filter(link => ['Email', 'Phone'].includes(link.platform))
                    .map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors group"
                      >
                        <div className="text-zinc-400 group-hover:text-blue-400 transition-colors">
                          {getSocialIcon(link.platform)}
                        </div>
                        <div>
                          <div className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                            {link.platform}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {link.platform === 'Email' ? portfolioData.personalInfo.email : portfolioData.personalInfo.phone}
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Professional Profiles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {portfolioData.socialLinks
                    .filter(link => !['Email', 'Phone'].includes(link.platform))
                    .map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-all duration-300 group hover:scale-105"
                        style={{ color: link.color }}
                      >
                        <span className="group-hover:scale-110 transition-transform">
                          {getSocialIcon(link.platform)}
                        </span>
                        <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                          {link.platform}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Response Time Info */}
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card variant="outline" className="border-zinc-700">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Response Time</h4>
                  <p className="text-zinc-400 text-sm">
                    I typically respond to messages within 24-48 hours. For urgent matters,
                    please mention "Urgent" in your subject line.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className={`transition-all duration-800 delay-400 ${
            isVisible ? 'animate-fadeInRight opacity-100' : 'opacity-0 translate-x-10'
          }`}
        >
          <Card variant="glass">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-zinc-700'
                  }`}
                  placeholder="Your name"
                  disabled={formStatus === 'loading'}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-zinc-700'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={formStatus === 'loading'}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-zinc-700'
                  }`}
                  placeholder="What's this about?"
                  disabled={formStatus === 'loading'}
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-zinc-700'
                  }`}
                  placeholder="Your message here..."
                  disabled={formStatus === 'loading'}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">
                    ❌ Failed to send message. Please try again or contact me directly.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={formStatus === 'loading'}
                disabled={formStatus === 'loading'}
                className="hover:scale-105 transition-transform"
              >
                {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Contact;