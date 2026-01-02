import { Trash2 } from 'lucide-react';

export default function RecentlyDeleted() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-legal-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <Trash2 className="text-red-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-legal-heading">Recently Deleted</h3>
      </div>
      <p className="text-legal-text">Your deleted items will appear here temporarily.</p>
    </div>
  );
}
