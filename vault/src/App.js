import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Landing Page
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import CarousalSection from "./Components/CarousalSection";
import AboutSection from "./Components/AboutSection";
import ClientsSection from "./Components/ClientsSection";
import Footer from "./Components/Footer";

// Login and Registration 
import RegisterPage from "./Components/RegisterPage"; 
import LoginPage from "./Components/LoginPage";

// User Page 
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import MyData from "./Components/MyData";
import GrantConsent from "./Components/GrantConsent";
import AccessLog from "./Components/AccessLog";
import UpdateProfilePage from "./Components/UpdateProfilePage";

// Company Pages
import CompanyLogin from "./Components/Company/CompanyLogin";
import CompanyRegister from "./Components/Company/CompanyRegister";
import CompanyLayout from "./Components/Company/CompanyLayout";
import CompanyUserData from "./Components/Company/CompanyUserData";
import CompanyRequestedData from "./Components/Company/CompanyRequestedData";

// Admin Page 
import AdminLogin from './Components/Admin/AdmingLogin';


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
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-register" element={<CompanyRegister />} />
          
          <Route element={<Layout />}>
            <Route path="/homepage" element={<HomePage />} /> 
            <Route path="/mydata" element={<MyData />} />
            <Route path="/grant-consent" element={<GrantConsent />} />
            <Route path="/access-log" element={<AccessLog />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
          </Route>
          <Route element={<CompanyLayout />}>
            <Route path="/homepage" element={<HomePage />} /> 
            <Route path="/company-user-data" element={<CompanyUserData />} />
            <Route path="/company-requested-data" element={<CompanyRequestedData />} />
            <Route path="/access-log" element={<AccessLog />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
          </Route>
          <Route path="/AdminLogin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
