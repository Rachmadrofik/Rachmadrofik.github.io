import React from 'react';
import ProjectGrid from '../components/portfolio/ProjectGrid';

const Portfolio: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h1 className="text-4xl md:text-6xl mb-6 font-bold">My <span className="text-gradient">Portfolio</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A collection of my work in AI, Algorithmic Trading, Web Development, and Cloud Solutions.
        </p>
      </div>
      <ProjectGrid />
    </div>
  );
};

export default Portfolio;
