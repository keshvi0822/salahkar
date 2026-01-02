import { X } from 'lucide-react';

export default function SummaryPopup({ onClose, title, content }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto border border-legal-border">
        {/* Header */}
        <div className="sticky top-0 bg-legal-primary text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title || 'Summary'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-legal-secondary rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-legal-text leading-relaxed">
            {content || 'Summary content goes here...'}
          </p>
        </div>
      </div>
    </div>
  );
}
