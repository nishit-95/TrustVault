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
import RegisterPage from "./Components/User/UserRegisterPage"; 
import LoginPage from "./Components/User/UserLoginPage";

// User Page 
import Layout from "./Components/User/Layout";
import HomePage from "./Components/HomePage";
import MyData from "./Components/User/MyData";
import GrantConsent from "./Components/User/GrantConsent";
import AccessLog from "./Components/User/AccessLog";
import UpdateProfilePage from "./Components/User/UpdateProfilePage";

// Company Pages
import CompanyLogin from "./Components/Company/CompanyLogin";
import CompanyRegister from "./Components/Company/CompanyRegister";
import CompanyLayout from "./Components/Company/CompanyLayout";
import CompanyUserData from "./Components/Company/CompanyUserData";
import CompanyRequestedData from "./Components/Company/CompanyRequestedData";
import CompanyUpdateProfile from "./Components/Company/CompanyUpdateProfile";

// Admin Page 
import AdminLogin from './Components/Admin/AdminLogin';
import AdminLayout from './Components/Admin/AdminLayout';
import UserOfAdmin from './Components/Admin/UserOfAdmin';
import CompanyUserOfAdmin from './Components/Admin/CompanyUserOfAdmin';
import SubscriberOfAdmin from './Components/Admin/SubscriberOfAdmin';


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
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* User */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<Layout />}>
            <Route path="/homepage" element={<HomePage />} /> 
            <Route path="/mydata" element={<MyData />} />
            <Route path="/grant-consent" element={<GrantConsent />} />
            <Route path="/access-log" element={<AccessLog />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
          </Route>

          {/* Company */}
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-register" element={<CompanyRegister />} />

          <Route element={<CompanyLayout />}>
            <Route path="/homepage" element={<HomePage />} /> 
            <Route path="/company-user-data" element={<CompanyUserData />} />
            <Route path="/company-requested-data" element={<CompanyRequestedData />} />
            <Route path="/access-log" element={<AccessLog />} />
            <Route path="/company-update-profile" element={<CompanyUpdateProfile />} />
          </Route>

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route element={<AdminLayout />}>
            <Route path="/user-of-admin" element={<UserOfAdmin />} /> 
            <Route path="/company-user-of-admin" element={<CompanyUserOfAdmin />} /> 
            <Route path="/subscriber-of-admin" element={<SubscriberOfAdmin />} /> 
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
