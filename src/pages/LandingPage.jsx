import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import VideoSection from "../components/landing/VideoSection";
import Testimonials from "../components/landing/Testimonials";
import BlogSection from "../components/landing/BlogSection";
import FAQ from "../components/landing/FAQ";

function LandingPage() {
  React.useEffect(() => {
    console.log('🏠 LandingPage mounted');
    
    // Debug: Check if content is in DOM after 1 second
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('🔍 DOM check after 1s:');
      console.log('  #root innerHTML length:', root?.innerHTML?.length || 0);
      console.log('  #root children count:', root?.children?.length || 0);
      console.log('  Body background:', window.getComputedStyle(document.body).backgroundColor);
      console.log('  Root background:', root ? window.getComputedStyle(root).backgroundColor : 'N/A');
    }, 1000);
  }, []);

  return (
    <div className="font-sans bg-white overflow-x-hidden" style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Stats />
      <VideoSection />
      <Testimonials />
      <div id="blogs">
        <BlogSection />
      </div>
      <FAQ />
    </div>
  );
}

export default LandingPage;


