import React from 'react';
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';
import LiveStrategies from '../components/home/LiveStrategies';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LiveStrategies />
      <Skills />
    </div>
  );
};

export default Home;
