export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-legal-border overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-legal-border to-gray-200 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-legal-border rounded animate-pulse"></div>
            <div className="h-4 bg-legal-border rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SmoothTransitionWrapper({ children }) {
  return <div className="transition-all duration-300 ease-in-out">{children}</div>;
}

export function EnhancedJudgmentSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-legal-border p-4 mb-4">
      <div className="space-y-3">
        <div className="h-5 bg-gradient-to-r from-legal-border to-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-legal-border rounded animate-pulse"></div>
        <div className="h-4 bg-legal-border rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-legal-border rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
}

export function EnhancedInfiniteScrollLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-legal-primary to-legal-secondary rounded-full animate-spin"></div>
        <div className="absolute inset-1 bg-legal-background rounded-full"></div>
      </div>
      <p className="text-legal-text font-semibold">Loading more results...</p>
    </div>
  );
}
