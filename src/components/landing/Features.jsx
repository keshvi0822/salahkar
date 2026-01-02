import { BookOpen, Users, Search } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Database",
      description: "Access thousands of legal documents, statutes, and case law at your fingertips"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get guidance from qualified legal professionals with years of experience"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find information instantly with our powerful and intuitive search engine"
    }
  ];

  return (
    <div className="bg-legal-card py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-legal-heading mb-4">Powerful Features for Legal Professionals</h2>
          <p className="text-legal-text text-lg max-w-2xl mx-auto">Everything you need to excel in your legal practice</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card-premium p-8">
                <div className="w-14 h-14 bg-legal-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="text-legal-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-legal-heading mb-3">{feature.title}</h3>
                <p className="text-legal-text leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
