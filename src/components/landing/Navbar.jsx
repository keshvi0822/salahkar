import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Professional animation variants for legal/enterprise feel
const navItemVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  hover: { 
    y: -1,
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1 }
  }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const dropdownItemVariants = {
  hover: { 
    x: 2,
    transition: { duration: 0.15, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1 }
  }
};

const mobileMenuVariants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
  },
  visible: { 
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('📱 Navbar mounted, location:', location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/law-library', hasDropdown: true },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'more', label: 'More', path: '#', hasDropdown: true },
  ];

  const servicesDropdown = [
    { id: 'legal-consultation', label: 'Legal Consultation', path: '/law-library' },
    { id: 'case-research', label: 'Case Research', path: '/legal-judgments' },
    { id: 'document-drafting', label: 'Document Drafting', path: '/legal-template' },
    { id: 'legal-education', label: 'Legal Education', path: '/blog' },
  ];

  const moreDropdown = [
    { id: 'blog-link', label: 'Blog', path: '/blog' },
    { id: 'support-link', label: 'Support', path: '/referral' },
    { id: 'referral-program', label: 'Referral Program', path: '/referral' },
  ];

  // Determine active nav based on current path
  const getCurrentActive = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.includes('about')) return 'about';
    if (path.includes('law-library') || path.includes('legal-judgments') || path.includes('law-mapping') || path.includes('legal-template')) return 'services';
    if (path.includes('blog') || path.includes('referral') || path.includes('contact')) return 'more';
    if (path.includes('pricing')) return 'pricing';
    return activeNav;
  };

  const handleNavClick = (item) => {
    setActiveNav(item.id);
    navigate(item.path);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileMoreOpen(false);
  };

  // Check if dropdown item is active
  const isDropdownItemActive = (path) => {
    return location.pathname === path || location.pathname.includes(path.split('/')[1]);
  };

  const currentActive = getCurrentActive();

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'h-15 py-2 bg-white/80 backdrop-blur-md border-b border-gray-200/50' 
          : 'h-16 py-3 bg-white border-b border-gray-200/30'
      }`}
      style={{
        boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <motion.button
            onClick={() => {
              setActiveNav('home');
              navigate('/');
            }}
            className="flex items-center"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            <img 
              src="/images/nav_logo.png" 
              alt="Salahkar Logo" 
              className="h-12 w-auto object-contain"
            />
          </motion.button>
        </div>

        {/* Desktop Navigation Items - Center */}
        <div className="hidden lg:flex items-center gap-11">
          {navItems.map((item, index) => (
            item.hasDropdown ? (
              <div key={item.id} className="relative group">
                <motion.button
                  onClick={() => item.id !== 'more' && handleNavClick(item)}
                  className="relative flex items-center gap-1"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  variants={navItemVariants}
                  custom={index}
                >
                  <span 
                    className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                      currentActive === item.id 
                        ? 'text-premium-dark-blue bg-blue-50' 
                        : 'text-gray-700'
                    }`}
                    style={{ fontSize: '14px', fontWeight: 500 }}
                  >
                    {item.label}
                  </span>
                  <motion.div
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown 
                      size={16} 
                      className={currentActive === item.id ? 'text-premium-dark-blue' : 'text-gray-700'}
                    />
                  </motion.div>
                </motion.button>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  <motion.div 
                    className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50"
                    initial="hidden"
                    whileHover="visible"
                    variants={dropdownVariants}
                  >
                    {(item.id === 'services' ? servicesDropdown : moreDropdown).map((dropdownItem, index, arr) => {
                      const isActive = isDropdownItemActive(dropdownItem.path);
                      const isFirst = index === 0;
                      const isLast = index === arr.length - 1;
                      return (
                        <motion.button
                          key={dropdownItem.id}
                          onClick={() => navigate(dropdownItem.path)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium ${
                            isLast ? '' : 'border-b border-gray-100'
                          } ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''} ${
                            isActive 
                              ? 'text-premium-dark-blue bg-blue-50' 
                              : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                          }`}
                          style={{ fontSize: '14px', fontWeight: 500 }}
                          variants={dropdownItemVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          {dropdownItem.label}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="relative"
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
                custom={index}
              >
                <span 
                  className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                    currentActive === item.id 
                      ? 'text-premium-dark-blue bg-blue-50' 
                      : 'text-gray-700'
                  }`}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {item.label}
                </span>
              </motion.button>
            )
          ))}
        </div>

        {/* Right Side: Language Selector + Login Button */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2.5 text-gray-700 hover:text-premium-dark-blue transition-colors duration-200 border border-gray-200 hover:border-premium-dark-blue rounded-md font-medium bg-white">
              <Globe size={16} />
              <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{language === 'en' ? 'EN' : 'AS'}</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-4 py-2.5 font-medium transition-colors rounded-t-lg ${
                  language === 'en' 
                    ? 'text-premium-dark-blue bg-blue-50' 
                    : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                }`}
                style={{ fontSize: '13.5px', fontWeight: 500 }}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('as')}
                className={`w-full text-left px-4 py-2.5 font-medium transition-colors rounded-b-lg ${
                  language === 'as' 
                    ? 'text-premium-dark-blue bg-blue-50' 
                    : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                }`}
                style={{ fontSize: '13.5px', fontWeight: 500 }}
              >
                অসমীয়া
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 text-premium-dark-blue bg-white border border-premium-dark-blue rounded-md font-medium"
            style={{ fontSize: '14px', fontWeight: 600 }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 text-gray-700"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="lg:hidden border-t border-gray-100 bg-premium-bg-soft overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
          <div className="px-6 py-3 space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        if (item.id === 'services') {
                          setMobileServicesOpen(!mobileServicesOpen);
                        } else if (item.id === 'more') {
                          setMobileMoreOpen(!mobileMoreOpen);
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 font-medium flex items-center justify-between ${
                        currentActive === item.id
                          ? 'text-premium-dark-blue bg-blue-50'
                          : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                      }`}
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-200 ${
                          (item.id === 'services' && mobileServicesOpen) || (item.id === 'more' && mobileMoreOpen) 
                            ? 'rotate-180' 
                            : ''
                        }`}
                      />
                    </button>
                    {/* Mobile Dropdown */}
                    {((item.id === 'services' && mobileServicesOpen) || (item.id === 'more' && mobileMoreOpen)) && (
                      <div className="ml-3 space-y-1 overflow-hidden">
                        {(item.id === 'services' ? servicesDropdown : moreDropdown).map((dropdownItem) => {
                          const isActive = isDropdownItemActive(dropdownItem.path);
                          return (
                            <button
                              key={dropdownItem.id}
                              onClick={() => {
                                navigate(dropdownItem.path);
                                setMobileOpen(false);
                                setMobileServicesOpen(false);
                                setMobileMoreOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 font-medium ${
                                isActive
                                  ? 'text-premium-dark-blue bg-blue-50'
                                  : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                              }`}
                              style={{ fontSize: '13.5px', fontWeight: 500 }}
                            >
                              {dropdownItem.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 font-medium ${
                      currentActive === item.id
                        ? 'text-premium-dark-blue bg-blue-50'
                        : 'text-gray-700 hover:text-premium-dark-blue hover:bg-gray-50'
                    }`}
                    style={{ fontSize: '14px', fontWeight: 500 }}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">
              <div className="relative">
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:border-premium-dark-blue hover:text-premium-dark-blue transition-colors font-medium bg-white" style={{ fontSize: '14px', fontWeight: 500 }}>
                  <span className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{language === 'en' ? 'English' : 'অসমীয়া'}</span>
                  </span>
                </button>
              </div>
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileOpen(false);
                }}
                className="w-full px-5 py-2.5 text-premium-dark-blue bg-white border border-premium-dark-blue rounded-md font-medium transition-all duration-200 hover:bg-blue-50 hover:border-premium-dark-blue"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                Login
              </button>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
