import React from 'react';
import Profile from '../components/about/Profile';
import Experience from '../components/about/Experience';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl md:text-6xl mb-6 font-bold">About <span className="text-gradient">Me</span></h1>
      </div>
      <Profile />
      <Experience />
    </div>
  );
};

export default About;
