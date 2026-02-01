import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroScene from '../3d/HeroScene';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation timeline
      const tl = gsap.timeline();

      tl.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      })
      .from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary z-0 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center">
        <div ref={textRef} className="max-w-4xl mx-auto">
          <p className="hero-text text-accent font-medium tracking-widest mb-4 uppercase">
            Future Tech & AI Solutions
          </p>
          
          <h1 ref={nameRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white">Rachmad</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">
              Rofik
            </span>
          </h1>
          
          <p className="hero-text text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Mastering <span className="text-white font-semibold">Artificial Intelligence</span>, 
            <span className="text-white font-semibold"> MetaQuotes MT5</span>, and 
            <span className="text-white font-semibold"> Cloud Technologies</span> to build the digital future.
          </p>
          
          <div className="hero-btn flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-start to-primary-end rounded-full font-bold text-white shadow-[0_0_20px_rgba(102,126,234,0.5)] hover:shadow-[0_0_30px_rgba(102,126,234,0.8)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/portfolio"
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
