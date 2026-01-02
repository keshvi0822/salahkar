import { Mic, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

const errorMessageVariant = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = globalThis.webkitSpeechRecognition || globalThis.SpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setQuery(transcript);
        setError('');
      };
      recognition.start();
    }
  };

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    setError('');
    // Perform search logic here
    console.log('Searching for:', query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        className={`flex items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-2 ${
          error ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
        }`} 
        style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
        animate={isShaking ? 'shake' : 'initial'}
        variants={shakeVariant}
      >
        <Search className={`transition-all duration-300 ml-4 sm:ml-5 ${
          error ? 'text-red-400' : 'text-gray-400'
        }`} size={20} />
        <input
          type="text"
          placeholder="Search legal documents, acts, judgments..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-3 sm:px-5 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent text-sm sm:text-base"
          style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 400 }}
        />
        <button
          onClick={handleVoiceSearch}
          className={`p-2 sm:p-2.5 transition-all mr-2 sm:mr-3 rounded-md text-white hover:opacity-80 duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
            isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          title="Voice search"
          aria-label="Voice search"
        >
          <Mic size={18} />
        </button>
      </motion.div>
      
      {/* Error Message with smooth fade animation */}
      {error && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={errorMessageVariant}
          className="mt-2 ml-1"
        >
          <p className="text-red-500 text-sm font-medium" style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            {error}
          </p>
        </motion.div>
      )}
    </div>
  );
}
