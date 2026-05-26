import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Projects from '../components/Projects';
import ContactCards from '../components/ContactCards';
import CTABanner from '../components/CTABanner';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Projects />
      <ContactCards />
      <CTABanner />
    </main>
  );
};

export default Home;
