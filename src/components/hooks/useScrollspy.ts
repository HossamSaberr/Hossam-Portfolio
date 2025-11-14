import { useState, useEffect } from 'react';

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollspy = (
  sectionIds: string[],
  options: ScrollSpyOptions = {}
) => {
  const {
    offset = 0,
    rootMargin = `-${offset}px 0px -50% 0px`,
    threshold = 0.1
  } = options;

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const firstIntersectingEntry = entries.find(
          (entry) => entry.isIntersecting
        );

        if (firstIntersectingEntry) {
          setActiveId(firstIntersectingEntry.target.id);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Start observing all elements
    elements.forEach((element) => observer.observe(element));

    // Cleanup
    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
};

export default useScrollspy;