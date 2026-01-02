import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      question: "How do I get started with Salahkar?",
      answer: "Sign up for a free account, verify your email, and start exploring our comprehensive legal database. No credit card required for the trial period."
    },
    {
      question: "Is support available 24/7?",
      answer: "Yes, our dedicated support team is available around the clock to assist you with any questions or technical issues."
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer: "Absolutely! Salahkar is fully responsive and optimized for use on smartphones, tablets, and desktop computers."
    },
    {
      question: "What payment plans are available?",
      answer: "We offer flexible plans for individuals, law firms, and enterprises. Choose the plan that best fits your needs."
    }
  ];

  return (
    <div className="py-20 px-4 bg-legal-card">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-legal-heading mb-4">Frequently Asked Questions</h2>
          <p className="text-legal-text text-lg">Find answers to common questions about Salahkar</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-base overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full p-6 flex justify-between items-center hover:bg-legal-background transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-legal-heading text-left">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-legal-secondary flex-shrink-0 transition-transform duration-300 ${
                    expanded === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {expanded === index && (
                <div className="px-6 pb-6 border-t border-legal-border">
                  <p className="text-legal-text leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
