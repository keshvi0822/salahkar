import { FileText } from 'lucide-react';

export default function Notes() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-legal-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-legal-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
          <FileText className="text-legal-secondary" size={24} />
        </div>
        <h3 className="text-xl font-bold text-legal-heading">My Notes</h3>
      </div>
      <p className="text-legal-text">You don't have any notes yet. Create notes to organize your thoughts and research.</p>
    </div>
  );
}
