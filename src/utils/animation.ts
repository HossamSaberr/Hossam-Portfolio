import { useEffect, useState, useRef } from 'react';

// Scroll animation hook using Intersection Observer
export function useScrollAnimation(
  threshold: number = 0.1,
  rootMargin: string = '0px 0px -50px 0px'
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// Typewriter effect hook
export function useTypewriter(
  text: string,
  speed: number = 50,
  startDelay: number = 0
) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);

    if (!text) return;

    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}

// Animated counter hook for statistics
export function useAnimatedCounter(
  targetValue: string,
  duration: number = 2000,
  startDelay: number = 0
) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);

      // Extract numeric value from string like "4000+" -> 4000
      const numericMatch = targetValue.match(/\\d+/);
      const targetNum = numericMatch ? parseInt(numericMatch[0]) : 0;
      const hasPlus = targetValue.includes('+');

      if (targetNum === 0) {
        setCount(0);
        setIsAnimating(false);
        return;
      }

      const startTime = Date.now();
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * targetNum);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [targetValue, duration, startDelay]);

  const displayValue = targetValue.replace(/\\d+/, count.toString());

  return { displayValue, isAnimating };
}

// Spring animation helper
export const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1
};

// Animation variants for Framer Motion
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Utility to delay animation
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Smooth scroll utility
export const smoothScroll = (targetId: string, offset: number = 70) => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
