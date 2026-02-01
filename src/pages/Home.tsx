import React from 'react';
import SvgMaskHero from '../components/home/SvgMaskHero';
import Skills from '../components/home/Skills';
import LiveStrategies from '../components/home/LiveStrategies';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SvgMaskHero />
      <LiveStrategies />
      <Skills />
    </div>
  );
};

export default Home;
