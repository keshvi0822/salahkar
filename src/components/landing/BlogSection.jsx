import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      title: "Understanding Contract Law Basics",
      excerpt: "A comprehensive guide to the fundamental principles of contract law for beginners."
    },
    {
      title: "Recent Legal Updates 2025",
      excerpt: "Stay informed about the latest changes in legal regulations and their implications."
    },
    {
      title: "Intellectual Property Rights Guide",
      excerpt: "Protect your ideas: Everything you need to know about patents, trademarks, and copyrights."
    }
  ];

  return (
    <div className="py-20 px-4 bg-legal-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-legal-heading mb-4">Latest Legal Insights</h2>
          <p className="text-legal-text text-lg">Expert articles and updates from the legal community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="card-premium p-8 flex flex-col">
              <div className="w-12 h-1 bg-legal-accent mb-5"></div>
              <h3 className="text-xl font-bold text-legal-heading mb-3">{post.title}</h3>
              <p className="text-legal-text mb-6 flex-grow">{post.excerpt}</p>
              <a href="/blog" className="inline-flex items-center gap-2 text-legal-secondary font-semibold hover:gap-3 transition-all duration-300 group">
                Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/blog" className="inline-block px-8 py-4 bg-legal-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
            View All Articles
          </a>
        </div>
      </div>
    </div>
  );
}
