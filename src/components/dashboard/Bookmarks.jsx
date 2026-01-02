import { Bookmark } from 'lucide-react';

export default function DashboardBookmarks() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-legal-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-legal-accent bg-opacity-10 rounded-lg flex items-center justify-center">
          <Bookmark className="text-legal-accent" size={24} />
        </div>
        <h3 className="text-xl font-bold text-legal-heading">My Bookmarks</h3>
      </div>
      <p className="text-legal-text">You don't have any bookmarks yet. Start saving your favorite documents!</p>
    </div>
  );
}
