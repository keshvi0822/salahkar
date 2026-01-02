import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function NavDropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-legal-heading font-medium hover:text-legal-secondary transition-colors duration-200 py-2"
      >
        {label}
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border-2 border-legal-border rounded-lg shadow-lg z-50 min-w-48 overflow-hidden">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-legal-heading hover:bg-legal-background hover:text-legal-primary transition-colors duration-200 border-b border-legal-border last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
