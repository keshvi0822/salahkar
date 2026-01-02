import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../SearchBar';
import FeaturePills from '../FeaturePills';

// Professional animation variants for hero section
const headlineVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.1 
    }
  }
};

const editorialHeadlineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.15 
    }
  }
};

const subtextVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.35
    }
  }
};

const searchBarVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.45
    }
  }
};

const pillsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.55
    }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.55
    }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.25,
      ease: 'easeOut'
    }
  }
};

// CTA button visibility animation (for scroll-based hide/show)
const ctaButtonVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  hidden: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.25,
      ease: 'easeOut'
    }
  }
};

export default function Hero() {
  const [showCTAs, setShowCTAs] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    console.log('🦸 Hero mounted');

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use Intersection Observer for performance-friendly scroll detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 20% of hero is visible
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Show CTAs when hero is in view, hide when scrolled out
        if (prefersReducedMotion) {
          // Instant toggle for reduced motion users
          setShowCTAs(entry.isIntersecting);
        } else {
          // Smooth transition for regular users
          setShowCTAs(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={heroRef}
      className="bg-white text-gray-900 relative overflow-hidden" 
      style={{ 
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        paddingTop: 'clamp(4rem, 12vw, 7.5rem)',
        paddingBottom: 'clamp(1.25rem, 4vw, 2.5rem)',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Editorial Headline - Premium Serif, Authoritative Presence */}
        <motion.h1
          className="text-center"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: '#0A0E27',
            maxWidth: '100%',
            marginBottom: 'clamp(1rem, 4vw, 2rem)'
          }}
          variants={editorialHeadlineVariants}
        >
          AI-powered legal research workspace for lawyers & law students
        </motion.h1>

        {/* Supporting Subheadline - Clear Visual Hierarchy */}
        <motion.p 
          className="max-w-2xl mx-auto text-center" 
          style={{ 
            fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 
            fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)', 
            fontWeight: 400, 
            lineHeight: 1.6, 
            color: '#64748B',
            letterSpacing: '-0.005em',
            marginBottom: 'clamp(1.25rem, 4vw, 2.5rem)'
          }}
          variants={subtextVariants}
        >
          Fast, multilingual legal search with intelligent insights. Search acts, judgments, case laws, and legal templates instantly.
        </motion.p>

        {/* Search Bar - Primary Action */}
        <motion.div 
          className="flex justify-center"
          style={{
            marginBottom: 'clamp(1.75rem, 5vw, 3rem)'
          }}
          variants={searchBarVariants}
        >
          <SearchBar />
        </motion.div>

        {/* Feature Pills - 4+2 Layout */}
        <motion.div 
          style={{
            marginBottom: 'clamp(2rem, 5vw, 2.5rem)'
          }}
          variants={pillsVariants}
        >
          <FeaturePills />
        </motion.div>

        {/* CTA Buttons - Hero Section Only (Scroll-Based Visibility) */}
        <AnimatePresence mode="wait">
          {showCTAs && (
            <motion.div
              key="cta-buttons"
              className="flex flex-col sm:flex-row justify-center items-center"
              style={{
                gap: 'clamp(12px, 2vw, 18px)'
              }}
              variants={ctaButtonVariants}
              initial="visible"
              animate="visible"
              exit="hidden"
            >
              <motion.button 
                className="w-full sm:w-auto font-semibold" 
                style={{ 
                  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 
                  fontSize: '15px', 
                  fontWeight: 600, 
                  letterSpacing: '-0.005em',
                  padding: '13px 32px',
                  borderRadius: '10px',
                  backgroundColor: '#1F4788',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(31, 71, 136, 0.15)',
                  minHeight: '50px',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: '0 8px 24px rgba(31, 71, 136, 0.28)',
                  backgroundColor: '#1A3D73',
                  transition: { duration: 0.22, ease: 'easeOut' }
                }}
                whileTap={{ 
                  scale: 0.98,
                  y: 0,
                  transition: { duration: 0.1 }
                }}
              >
                Get Started Free
              </motion.button>
              <motion.button 
                className="w-full sm:w-auto font-semibold" 
                style={{ 
                  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 
                  fontSize: '15px', 
                  fontWeight: 600, 
                  letterSpacing: '-0.005em',
                  padding: '13px 32px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#1F4788',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                  minHeight: '50px',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  borderColor: '#1F4788',
                  backgroundColor: '#F8FAFC',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  transition: { duration: 0.22, ease: 'easeOut' }
                }}
                whileTap={{ 
                  scale: 0.98,
                  y: 0,
                  transition: { duration: 0.1 }
                }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
