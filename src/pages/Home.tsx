import React from 'react';
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
    </div>
  );
};

export default Home;
