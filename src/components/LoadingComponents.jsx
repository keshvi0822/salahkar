export function InfiniteScrollLoader() {
  return (
    <div className="flex justify-center py-8">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-legal-border border-t-legal-primary animate-spin"></div>
      </div>
    </div>
  );
}

export function JudgmentSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-legal-border p-4 mb-4">
      <div className="space-y-2">
        <div className="h-5 bg-legal-border rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-legal-border rounded animate-pulse"></div>
        <div className="h-4 bg-legal-border rounded animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}
