export default function Logo({ size = "medium", showText = true }) {
  const sizeClasses = {
    small: "h-8",
    medium: "h-12",
    large: "h-16",
    xl: "h-20"
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/IMG_0255.PNG"
        alt="Salahkar Legal Platform Logo"
        className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-legal-primary font-bold text-xl leading-tight">Salahkar</span>
          <span className="text-legal-secondary text-xs font-semibold tracking-wide">Legal Solutions</span>
        </div>
      )}
    </div>
  );
}
