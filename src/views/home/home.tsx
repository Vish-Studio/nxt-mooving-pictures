"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, type Project } from '../../constants';
import { cn } from '../../lib/utils';
import { ProjectCard } from '../../components/project-card/project-card';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const activeProjectRef = useRef(activeProject);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const NUM_SETS = 5;

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = PROJECTS.length;

    if (totalImages === 0) {
      setAssetsLoaded(true);
      return;
    }

    PROJECTS.forEach(project => {
      const img = new Image();
      img.src = project.imageUrl;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / totalImages) * 100);
        if (loadedCount === totalImages) {
          setTimeout(() => setAssetsLoaded(true), 800);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / totalImages) * 100);
        if (loadedCount === totalImages) {
          setTimeout(() => setAssetsLoaded(true), 800);
        }
      };
    });
  }, []);

  // Keep ref synced for GSAP callbacks
  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  // Initial scroll positioning to create the "infinite" illusion from the start
  useLayoutEffect(() => {
    if (!mainRef.current || !assetsLoaded) return;
    
    const timer = setTimeout(() => {
      const sets = mainRef.current?.querySelectorAll('.set-container');
      if (sets && sets.length >= 2) {
        const setHeight = (sets[1] as HTMLElement).offsetTop - (sets[0] as HTMLElement).offsetTop;
        window.scrollTo({ top: setHeight * 2, behavior: 'instant' });
        
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [assetsLoaded]);

  // Setup Parallax and ScrollTriggers
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      // 1. Staggered load-in gives each card a distinct sense of weight.
      const cardFrames = gsap.utils.toArray('.project-card-frame') as HTMLDivElement[];
      gsap.fromTo(
        cardFrames,
        { yPercent: -120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: (index) => 1.05 + (index % 5) * 0.1,
          delay: (index) => (index % PROJECTS.length) * 0.05 + Math.floor(index / PROJECTS.length) * 0.07,
          ease: 'power3.out',
          overwrite: 'auto',
        },
      );

      // 2. Internal Image Parallax
      const images = gsap.utils.toArray('.parallax-img') as HTMLImageElement[];
      images.forEach((img, i) => {
        const speed = i % 3 === 0 ? 15 : i % 3 === 1 ? -10 : 8; 
        gsap.to(img, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          }
        });
      });

      // 3. Container Parallax & Reveal Effects
      const containers = gsap.utils.toArray('.project-item') as HTMLDivElement[];
      containers.forEach((container, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 100%",
            end: "bottom 0%",
            scrub: true,
          }
        });

        tl.fromTo(container, 
          { opacity: 0, scale: 0.85 }, 
          { opacity: 1, scale: 1, duration: 0.2, ease: "power1.out" }
        )
        .to(container, 
          { opacity: 0, scale: 0.85, duration: 0.2, ease: "power1.in" }, 
          0.8
        );

        const yOffset = i % 3 === 0 ? -40 : i % 3 === 1 ? 30 : -15;
        gsap.to(container, {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          }
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => {
            const projectId = container.getAttribute('data-project-id');
            const proj = PROJECTS.find(p => p.id === projectId);
            if (proj) setActiveProject(proj);
          },
          onEnterBack: () => {
            const projectId = container.getAttribute('data-project-id');
            const proj = PROJECTS.find(p => p.id === projectId);
            if (proj) setActiveProject(proj);
          },
          onUpdate: (self) => {
            const projectId = container.getAttribute('data-project-id');
            if (activeProjectRef.current.id === projectId) {
              gsap.set('.bg-title-wrapper', { 
                y: (self.progress - 0.5) * -100,
              });
            }
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isReady]);

  // Seamless Infinite Scroll Loop
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      if (!mainRef.current) return;
      const sets = mainRef.current.querySelectorAll('.set-container');
      if (sets.length < 2) return;

      const setHeight = (sets[1] as HTMLElement).offsetTop - (sets[0] as HTMLElement).offsetTop;
      const scrollY = window.scrollY;

      let jumped = false;

      if (scrollY < setHeight * 1.5) {
        window.scrollTo({ top: scrollY + setHeight, behavior: 'instant' });
        jumped = true;
      } else if (scrollY > setHeight * 2.5) {
        window.scrollTo({ top: scrollY - setHeight, behavior: 'instant' });
        jumped = true;
      }

      if (jumped) {
        ScrollTrigger.update();
        ScrollTrigger.getAll().forEach(st => {
          const scrubTween = st.getTween ? st.getTween() : null;
          if (scrubTween) {
            scrubTween.progress(1);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  return (
    <>
      {/* Global Preloader */}
      <AnimatePresence>
        {!assetsLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center text-white"
          >
            <div className="text-[10px] font-black tracking-[0.6em] uppercase mb-8 overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                MOOVING PICTURES
              </motion.div>
            </div>
            <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-4 text-[10px] font-mono text-white/50">
              {Math.round(loadingProgress)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Fade Indicator */}
      <div className="fixed top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-40 pointer-events-none" />
      
      {/* Bottom Fade Indicator */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-40 pointer-events-none" />

      {/* Background Title (Behind Images) */}
      <div className="bg-title-wrapper fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden will-change-transform">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute text-center w-full px-4 flex flex-col items-center justify-center"
          >
            <p className="text-[10px] font-black tracking-[0.8em] text-white/20 uppercase mb-8">
              {activeProject.category}
            </p>
            <h2 className="text-[15vw] font-serif italic tracking-tighter leading-none text-white/10 whitespace-nowrap">
              {activeProject.title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrollable Image Grid */}
      <main 
        ref={mainRef} 
        className={cn(
          "relative z-10 pt-[10vh] pb-[10vh] px-8 md:px-16 transition-opacity duration-1000",
          isReady ? "opacity-100" : "opacity-0"
        )}
      >
        {[...Array(NUM_SETS)].map((_, setIndex) => (
          <div 
            key={setIndex} 
            className="set-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-16 lg:gap-x-24 gap-y-24 md:gap-y-40 w-full mb-24 md:mb-40"
          >
            {PROJECTS.map((project, localIndex) => (
              <ProjectCard 
                key={`${setIndex}-${project.id}`} 
                project={project} 
                localIndex={localIndex} 
              />
            ))}
          </div>
        ))}
      </main>
    </>
  );
};
