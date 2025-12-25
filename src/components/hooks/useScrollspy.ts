import { useState, useEffect } from 'react';

interface ScrollspyOptions {
  threshold?: number;
  rootMargin?: string;
  activeClass?: string;
}

export function useScrollspy(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.35, 
      }
    );

    sections.forEach((section) => observer.observe(section!));

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}