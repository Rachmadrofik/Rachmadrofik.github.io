import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroScene from '../3d/HeroScene';

const SvgMaskHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGMaskElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation Timeline
      const tl = gsap.timeline();

      // 1. Initial State
      gsap.set(".hero-content", { opacity: 0, y: 50 });
      gsap.set(circleRef.current, { attr: { r: 0 } });

      // 2. Reveal Mask (Expand Circle)
      tl.to(circleRef.current, {
        attr: { r: 2000 }, // Expand to cover screen
        duration: 2.5,
        ease: "power2.inOut",
      })
      
      // 3. Reveal Content (Staggered)
      .to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=1.5"); // Start slightly before mask finishes

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* 1. Background Layer (Visible through Mask) */}
      {/* We put the 3D Scene BEHIND everything, but we reveal it using the mask concept visually */}
      <div className="absolute inset-0 z-0">
         <HeroScene />
         {/* Overlay Gradient for better text readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/80 to-secondary z-10 pointer-events-none" />
      </div>

      {/* 2. SVG Mask Overlay (The "Curtain") */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="hero-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle ref={circleRef} cx="50%" cy="50%" r="0" fill="black" />
            </mask>
          </defs>
          {/* 
             The rect with mask="url(#hero-mask)" creates the "hole" effect.
             Fill="black" means the overlay is black initially.
             The circle in mask is "black" -> transparent hole in the white mask rect? 
             Wait, in SVG mask: White = Visible, Black = Transparent.
             So to make a "hole" that reveals the background:
             Mask: White Rect (Content Visible) + Black Circle (Content Hidden/Transparent)?
             
             Actually simpler approach for "Reveal":
             We want an overlay that COVERS the screen initially, then a HOLE expands.
             So we need a PATH that is a rectangle MINUS a circle.
             
             GSAP is easier with just scaling a clip-path.
             Let's use CSS Clip-path for better performance than SVG mask for full screen reveal.
          */}
        </svg>
      </div>
      
      {/* 
         Alternative: CSS Clip Path Reveal 
         We overlay a BLACK div on top of the 3D scene.
         Then we animate the clip-path of that black div to SHRINK a hole?
         Or animate the container of the 3D scene to GROW from a circle?
         
         Let's try the "Spotlight Reveal" effect:
         The 3D Scene is masked by a circle that grows.
      */}
      
      <div 
        className="absolute inset-0 z-0 bg-secondary"
        style={{
            // This is a fallback/base background color
        }}
      />

      {/* RE-IMPLEMENTATION: The 3D Scene Container with Clip Path */}
      <div className="absolute inset-0 z-10" 
           ref={(el) => {
             if (el) {
               // Use GSAP to animate this element's clip-path
               gsap.fromTo(el, 
                 { clipPath: 'circle(0% at 50% 50%)' },
                 { clipPath: 'circle(150% at 50% 50%)', duration: 2.5, ease: 'power2.inOut', delay: 0.2 }
               );
             }
           }}
      >
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-secondary pointer-events-none" />
      </div>

      {/* 3. Content (On Top, z-index higher) */}
      <div className="relative z-30 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div ref={textRef} className="max-w-5xl mx-auto">
          
          <div className="hero-content overflow-hidden mb-4">
             <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm md:text-base">
              The Future is Automated
            </p>
          </div>
          
          <div className="hero-content mb-6">
            <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tighter">
              <span className="block text-white mix-blend-difference">Rachmad</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">
                Rofik
              </span>
            </h1>
          </div>
          
          <div className="hero-content mb-10">
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Mastering <span className="text-white font-semibold">Artificial Intelligence</span> & 
              <span className="text-white font-semibold"> Algorithmic Trading</span>.
              <br className="hidden md:block" /> Building the digital infrastructure of tomorrow.
            </p>
          </div>
          
          <div className="hero-content flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              to="/contact" 
              className="group relative px-8 py-4 bg-white text-secondary rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                Start a Project <ArrowRight size={20} />
              </span>
              <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
          <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent"></div>
        </div>
      </div>

    </section>
  );
};

export default SvgMaskHero;
