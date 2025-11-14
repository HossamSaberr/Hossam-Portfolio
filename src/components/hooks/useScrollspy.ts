import { useState, useEffect } from 'react';

interface ScrollspyOptions {
  threshold?: number;
  rootMargin?: string;
  activeClass?: string;
}

export function useScrollspy(
  sectionIds: string[],
  options: ScrollspyOptions = {}
) {
  const {
    threshold = 0.5,
    rootMargin = '-70px 0px -30% 0px',
    activeClass = 'active'
  } = options;

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    // Set initial active section based on scroll position
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      for (const element of elements) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
          setActiveSection(element.id);
          break;
        }
      }
    };

    updateActiveSection();

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
}