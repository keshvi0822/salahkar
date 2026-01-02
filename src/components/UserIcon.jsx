import { User } from 'lucide-react';

export default function UserIcon({ initials = "U", size = "large" }) {
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-base",
    large: "w-14 h-14 text-lg"
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-legal-primary to-legal-secondary text-white rounded-lg flex items-center justify-center font-bold shadow-md`}>
      {initials && initials.length > 0 ? (
        initials.substring(0, 2).toUpperCase()
      ) : (
        <User size={size === "large" ? 24 : 16} />
      )}
    </div>
  );
}
