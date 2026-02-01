import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary text-white font-sans selection:bg-accent selection:text-secondary">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="py-12 border-t border-white/10 mt-20 bg-secondary/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-400">
              <a href="https://jayadana.my.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1">jayadana.my.id</a>
              <a href="https://sagakomputer.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1">sagakomputer.com</a>
              <a href="https://eawb.my.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1">eawb.my.id</a>
              <a href="https://wbea.my.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1">wbea.my.id</a>
              <a href="https://jda.my.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1">jda.my.id</a>
            </div>

            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Rachmad Rofik. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
