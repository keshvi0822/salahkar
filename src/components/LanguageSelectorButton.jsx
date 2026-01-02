import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSelectorButton() {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border-2 border-legal-primary text-legal-primary rounded-lg hover:bg-legal-primary hover:text-white transition-all duration-300 font-semibold"
      >
        <Globe size={18} />
        Language
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white border-2 border-legal-primary rounded-lg shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-legal-heading hover:bg-legal-background transition-colors duration-200 border-b border-legal-border last:border-b-0"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
