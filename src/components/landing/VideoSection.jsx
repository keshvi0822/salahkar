import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <div className="py-20 px-4 bg-legal-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-legal-heading mb-4">See How It Works</h2>
          <p className="text-legal-text text-lg">Watch our platform in action</p>
        </div>
        
        <div className="relative bg-gradient-to-br from-legal-primary to-legal-secondary rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <div className="aspect-video bg-gradient-to-br from-legal-primary to-legal-secondary flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play className="text-legal-primary ml-1" size={40} fill="#1E3A8A" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
