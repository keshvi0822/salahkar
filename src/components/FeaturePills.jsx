import { motion } from 'framer-motion';

export default function FeaturePills() {
  const features = [
    'Legal Judgment',
    'Law Library',
    'Law Mapping',
    'Smart Dashboard',
    'YouTube Summarizer',
    'Legal Templates'
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Individual button animation
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center mx-auto w-full"
      style={{ 
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* First Row - 4 Pills */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {features.slice(0, 4).map((feature) => (
            <motion.button
              key={feature}
              className="whitespace-nowrap transition-all"
              style={{ 
                padding: 'clamp(8px, 1.5vw, 10px) clamp(18px, 3vw, 22px)',
                fontSize: 'clamp(13px, 1.5vw, 14.5px)', 
                fontWeight: 500,
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                color: '#1F4788',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
              }}
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#EFF6FF',
                borderColor: '#BFDBFE',
                boxShadow: '0 4px 12px rgba(31, 71, 136, 0.12)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {feature}
            </motion.button>
          ))}
        </div>

        {/* Second Row - 2 Pills */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {features.slice(4, 6).map((feature) => (
            <motion.button
              key={feature}
              className="whitespace-nowrap transition-all"
              style={{ 
                padding: 'clamp(8px, 1.5vw, 10px) clamp(18px, 3vw, 22px)',
                fontSize: 'clamp(13px, 1.5vw, 14.5px)', 
                fontWeight: 500,
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                color: '#1F4788',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
              }}
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#EFF6FF',
                borderColor: '#BFDBFE',
                boxShadow: '0 4px 12px rgba(31, 71, 136, 0.12)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {feature}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
