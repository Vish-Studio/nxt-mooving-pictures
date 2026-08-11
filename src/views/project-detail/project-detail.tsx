"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS, generateGallery, ProjectGalleryItem } from '../../constants';
import { GalleryCarousel } from '../../components/gallery-carousel/gallery-carousel';
import { Lightbox } from '../../components/lightbox/lightbox';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectIndex = PROJECTS.findIndex(p => p.id === id);
  const project = PROJECTS[projectIndex];
  const [selectedMedia, setSelectedMedia] = useState<ProjectGalleryItem | null>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const textY = useTransform(scrollY, [0, 1000], ['0%', '40%']);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif italic mb-4">Project not found</h1>
          <Link href="/" className="text-[10px] font-black tracking-[0.4em] uppercase hover:opacity-50 transition-opacity">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const gallery = project?.gallery || (project ? generateGallery(project.id) : []);

  return (
    <div className="min-h-screen w-full pb-40">
      {/* Full Width Header */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="absolute bottom-0 left-0 w-full px-8 md:px-16 pb-12 md:pb-16 z-10"
        >
          <Link href="/" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase hover:opacity-50 transition-opacity mb-6 md:mb-8 text-white">
            <ArrowLeft size={16} /> Back to Work
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white/70 mb-4">
              {project.category}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif italic tracking-tighter leading-none text-white">
              {project.title}
            </h1>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-8 md:px-16 pt-24 md:pt-32 w-full max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 mb-32 md:mb-48">
          {/* Left Column - Large Intro */}
          <div className="lg:col-span-7 lg:pr-16 flex flex-col justify-start">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-12"
            >
              A meticulous exploration of light, shadow, and digital interaction for <span className="italic">{project.title}</span>.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl"
            >
              This is a detailed view of the {project.title} project. Here we showcase the creative process, the challenges faced, and the final outcome of this stunning piece of work. The focus remains on high-quality visuals and elegant typography, ensuring every interaction feels deliberate and refined.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-6">The Approach</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                Our goal was to create a visual identity that resonates with the core values of the brand while pushing the boundaries of modern digital design. By leveraging smooth animations and a minimalist aesthetic, we crafted an experience that is both engaging and intuitive.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Metadata & Extra Info */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 border-t border-white/20 pt-8"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Client</span>
                <span className="font-serif italic text-lg">{project.title} Studio</span>
              </div>
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Services</span>
                <span className="font-serif italic text-lg text-right">Photography<br/>Videography</span>
              </div>
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Equipment</span>
                <span className="font-serif italic text-lg text-right">ARRI Alexa<br/>Leica Lenses</span>
              </div>
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Year</span>
                <span className="font-serif italic text-lg">{project.year}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-6">Photography</h3>
              <p className="text-white/60 text-base leading-relaxed">
                The visual narrative was captured using a combination of medium format photography and high-end digital cinema cameras. We focused on natural lighting and raw textures to bring an authentic, tactile feel to the digital space. Every frame was meticulously color-graded to match the brand's moody, sophisticated palette.
              </p>
            </motion.div>
          </div>
        </div>

        <GalleryCarousel gallery={gallery} onMediaSelect={setSelectedMedia} />
      </div>

      <Lightbox selectedMedia={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </div>
  );
};
