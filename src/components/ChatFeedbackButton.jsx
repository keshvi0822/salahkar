import { MessageSquare } from 'lucide-react';

export default function ChatFeedbackButton() {
  return (
    <button className="flex items-center gap-2 px-6 py-3 bg-legal-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
      <MessageSquare size={20} />
      Send Feedback
    </button>
  );
}
