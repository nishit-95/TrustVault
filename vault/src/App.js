import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import CarousalSection from "./Components/CarousalSection";
import AboutSection from "./Components/AboutSection";
import ClientsSection from "./Components/ClientsSection";
import Footer from "./Components/Footer";
import RegisterPage from "./Components/RegisterPage"; 
import LoginPage from "./Components/LoginPage";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import MyData from "./Components/MyData";
import GrantConsent from "./Components/GrantConsent";
import AccessLog from "./Components/AccessLog";
import UpdateProfilePage from "./Components/UpdateProfilePage";

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
      <CarousalSection />
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
          <Route element={<Layout />}>
            <Route path="/homepage" element={<HomePage />} /> 
            <Route path="/mydata" element={<MyData />} />
            <Route path="/grant-consent" element={<GrantConsent />} />
            <Route path="/access-log" element={<AccessLog />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
