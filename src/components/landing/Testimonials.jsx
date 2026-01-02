import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Salahkar has revolutionized how I conduct legal research. The interface is intuitive and the database is comprehensive.",
      author: "Sarah Johnson",
      role: "Senior Lawyer"
    },
    {
      text: "As a law student, this platform has been invaluable for my studies. Highly recommended for anyone in the legal field.",
      author: "Ahmed Al-Mansouri",
      role: "Law Student"
    },
    {
      text: "The expert support and extensive resources make Salahkar an essential tool for any legal professional.",
      author: "Priya Sharma",
      role: "Legal Consultant"
    }
  ];

  return (
    <div className="py-20 px-4 bg-legal-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-legal-heading mb-4">What Legal Professionals Say</h2>
          <p className="text-legal-text text-lg">Trusted by thousands of lawyers and legal students worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-premium p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-legal-accent text-legal-accent" />
                ))}
              </div>
              <p className="text-legal-text text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-legal-heading">{testimonial.author}</p>
                <p className="text-legal-secondary text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
