import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className="bg-legal-primary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Logo size="small" showText={false} />
            <h3 className="text-2xl font-bold mb-3 mt-4">Salahkar</h3>
            <p className="text-blue-100">Empowering legal professionals with innovative solutions and comprehensive resources.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/law-library" className="hover:text-white transition-colors duration-200">Law Library</a></li>
              <li><a href="/legal-chatbot" className="hover:text-white transition-colors duration-200">Legal Chatbot</a></li>
              <li><a href="/legal-template" className="hover:text-white transition-colors duration-200">Templates</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="/our-team" className="hover:text-white transition-colors duration-200">Team</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:support@salahkar.com" className="hover:text-white transition-colors duration-200">support@salahkar.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+1234567890" className="hover:text-white transition-colors duration-200">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 my-8"></div>

        {/* Bottom */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-blue-100">&copy; 2025 Salahkar Legal Platform. All rights reserved.</p>
          
          <div className="flex gap-4">
            <a href="/privacy" className="text-blue-100 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="/terms" className="text-blue-100 hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-300 rounded-lg flex items-center justify-center transition-colors duration-200">
              <Linkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-300 rounded-lg flex items-center justify-center transition-colors duration-200">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
