import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SvgMaskHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation Timeline
      const tl = gsap.timeline();

      // 1. Initial State
      gsap.set(".hero-content", { opacity: 0, y: 50 });
      
      // 2. Reveal Content (Staggered)
      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1 // Wait for mask to open a bit
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* 1. Background Layer (Visible through Mask) - LIQUID METAL VIDEO */}
      <div className="absolute inset-0 z-10" 
           ref={(el) => {
             if (el) {
               // Use GSAP to animate this element's clip-path (Spotlight Reveal)
               gsap.fromTo(el, 
                 { clipPath: 'circle(0% at 50% 50%)' },
                 { clipPath: 'circle(150% at 50% 50%)', duration: 2.5, ease: 'power2.inOut', delay: 0.2 }
               );
             }
           }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 pointer-events-none" />
      </div>

      {/* 2. Content (On Top, z-index higher) */}
      <div className="relative z-30 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div ref={textRef} className="max-w-5xl mx-auto">
          
          <div className="hero-content overflow-hidden mb-4">
             <p className="text-white/80 font-medium tracking-[0.2em] uppercase text-sm md:text-base backdrop-blur-sm px-4 py-1 rounded-full bg-white/5 inline-block border border-white/10">
              The Future is Automated
            </p>
          </div>
          
          <div className="hero-content mb-6">
            <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tighter text-white drop-shadow-2xl">
              Rachmad
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Rofik
              </span>
            </h1>
          </div>
          
          <div className="hero-content mb-10">
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              Mastering <span className="text-white font-semibold">Artificial Intelligence</span> & 
              <span className="text-white font-semibold"> Algorithmic Trading</span>.
              <br className="hidden md:block" /> Building the digital infrastructure of tomorrow.
            </p>
          </div>
          
          <div className="hero-content flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              to="/contact" 
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                Start a Project <ArrowRight size={20} />
              </span>
            </Link>
            
            <Link 
              to="/portfolio"
              className="px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-md font-medium"
            >
              Explore Works
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hero-content opacity-0">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

    </section>
  );
};

export default SvgMaskHero;
