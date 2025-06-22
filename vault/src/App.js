import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import ClientsSection from "./Components/ClientsSection";
import Footer from "./Components/Footer";
import RegisterPage from "./Components/RegisterPage"; 
import LoginPage from "./Components/LoginPage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  // ✅ Landing page component grouped
  const LandingPage = () => (
    <>
      <Navbar />
      <HeroSection />

      <AboutSection />
      <ClientsSection />
      <Footer />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
