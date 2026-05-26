import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Residential from './pages/projects/Residential';
import Commercial from './pages/projects/Commercial';
import Interior from './pages/projects/Interior';
import Renovation from './pages/projects/Renovation';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/projects/residential" element={<Residential />} />
        <Route path="/projects/commercial" element={<Commercial />} />
        <Route path="/projects/interior" element={<Interior />} />
        <Route path="/projects/renovation" element={<Renovation />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
