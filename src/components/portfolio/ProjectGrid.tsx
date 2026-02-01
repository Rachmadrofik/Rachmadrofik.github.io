import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

// Using placeholder images as per guidelines
const projects = [
  {
    id: '1',
    title: 'AI Trading Bot v5',
    category: 'AI',
    description: 'Advanced algorithmic trading bot using LSTM neural networks for price prediction and reinforcement learning for execution strategy.',
    techStack: ['Python', 'TensorFlow', 'MetaTrader 5 API', 'Docker'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=futuristic+trading+dashboard+with+charts+and+ai+brain+visualization&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Smart City Cloud Platform',
    category: 'Cloud',
    description: 'IoT data processing platform handling millions of events per second with real-time analytics and visualization.',
    techStack: ['AWS Lambda', 'Kinesis', 'React', 'Node.js'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=smart+city+dashboard+interface+with+map+and+data+widgets&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'MT5 Copy Trading System',
    category: 'MT5',
    description: 'Low-latency copy trading system for MetaTrader 5 allowing multiple masters to multiple slaves configuration.',
    techStack: ['MQL5', 'C++', 'Redis', 'WebSockets'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=financial+trading+software+interface+metatrader+style&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '4',
    title: 'E-Commerce AI Recommender',
    category: 'Web',
    description: 'Next.js e-commerce application with personalized product recommendations powered by collaborative filtering.',
    techStack: ['Next.js', 'PostgreSQL', 'Python API', 'Tailwind'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern+ecommerce+website+ui+design&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '5',
    title: 'Sentiment Analysis API',
    category: 'AI',
    description: 'REST API for real-time sentiment analysis of financial news and social media data.',
    techStack: ['FastAPI', 'BERT', 'Docker', 'Redis'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=code+editor+screen+with+api+documentation+and+json+response&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '6',
    title: 'Crypto Portfolio Tracker',
    category: 'Web',
    description: 'Real-time cryptocurrency portfolio tracking dashboard with profit/loss analysis and tax reporting.',
    techStack: ['Vue.js', 'Firebase', 'CoinGecko API', 'Chart.js'],
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cryptocurrency+portfolio+app+ui+dark+mode&image_size=landscape_16_9',
    demoUrl: '#',
    githubUrl: '#'
  }
];

const categories = ['All', 'AI', 'MT5', 'Web', 'Cloud'];

const ProjectGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 bg-dark-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Featured <span className="text-gradient">Projects</span></h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary-start to-primary-end text-white shadow-lg'
                    : 'bg-dark-100 text-gray-400 hover:bg-dark-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-accent text-dark-300 font-bold rounded-full">View Details</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-accent text-sm font-medium px-3 py-1 bg-accent/10 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs text-gray-500 bg-dark-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs text-gray-500 bg-dark-300 px-2 py-1 rounded">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-dark-100 rounded-2xl max-w-3xl w-full overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 md:h-80">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-accent text-sm font-medium px-3 py-1 bg-accent/10 rounded-full mb-2 inline-block">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href={selectedProject.githubUrl} 
                        className="p-3 bg-dark-300 rounded-full hover:bg-white hover:text-black transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href={selectedProject.demoUrl} 
                        className="px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-dark-300 border border-white/5 rounded-lg text-sm text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectGrid;
