import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import ContactUs from './pages/ContactUs';
import Residential from './pages/projects/Residential';
import Commercial from './pages/projects/Commercial';
import Interior from './pages/projects/Interior';
import Renovation from './pages/projects/Renovation';

// Admin Pages & Guards
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/projects/residential" element={<Residential />} />
        <Route path="/projects/commercial" element={<Commercial />} />
        <Route path="/projects/interior" element={<Interior />} />
        <Route path="/projects/renovation" element={<Renovation />} />
        
        {/* Admin Portal Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
