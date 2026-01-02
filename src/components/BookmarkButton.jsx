import { Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function BookmarkButton({ itemId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={handleBookmark}
      className={`p-3 rounded-lg transition-all duration-300 ${
        isBookmarked
          ? 'bg-legal-accent bg-opacity-20 text-legal-accent'
          : 'bg-legal-background text-legal-primary hover:bg-legal-primary hover:bg-opacity-10'
      }`}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark size={22} fill={isBookmarked ? '#F59E0B' : 'none'} />
    </button>
  );
}
