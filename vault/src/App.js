import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import ClientsSection from "./Components/ClientsSection";
import Footer from "./Components/Footer";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // 👈 important: allows animation to repeat when scrolling again
    });
    AOS.refresh(); // 👈 refresh on update
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ClientsSection />
      <Footer />
    </div>
    
  );
}

export default App;
