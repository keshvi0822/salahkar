export default function Stats() {
  const stats = [
    { number: "1000+", label: "Legal Documents" },
    { number: "500+", label: "Expert Lawyers" },
    { number: "50K+", label: "Happy Users" }
  ];

  return (
    <div className="bg-legal-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="card-base p-8 text-center">
              <div className="text-5xl font-bold text-legal-primary mb-3">{stat.number}</div>
              <p className="text-legal-text text-lg font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
