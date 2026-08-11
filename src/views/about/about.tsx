"use client";

import { useEffect } from 'react';
import { motion } from 'motion/react';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-40 px-8 md:px-16 w-full flex flex-col justify-center">
      <div className="max-w-7xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] font-black tracking-[0.6em] uppercase text-white/50 mb-12"
        >
          About Us
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif italic tracking-tighter leading-tight mb-12"
        >
          We are a creative studio specializing in motion and digital experiences.
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-12 text-white/70 text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Mooving Pictures is an independent digital design studio. We craft immersive, 
            interactive experiences that blur the line between art and technology. 
            Our approach is rooted in minimalism, sophisticated typography, and 
            fluid motion design.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            We believe that every project has a unique story to tell. By combining 
            strategic thinking with cutting-edge web technologies, we help forward-thinking 
            brands connect with their audiences in meaningful and memorable ways.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 pt-24 border-t border-white/10"
        >
          <h2 className="text-2xl font-serif italic mb-8">Our Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm uppercase tracking-widest text-white/50">
            <ul className="space-y-4">
              <li>Art Direction</li>
              <li>Brand Identity</li>
              <li>Web Design</li>
            </ul>
            <ul className="space-y-4">
              <li>Creative Coding</li>
              <li>3D Animation</li>
              <li>Motion Graphics</li>
            </ul>
            <ul className="space-y-4">
              <li>Photography</li>
              <li>Video Production</li>
              <li>Copywriting</li>
            </ul>
            <ul className="space-y-4">
              <li>E-Commerce</li>
              <li>UX/UI Design</li>
              <li>Strategy</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
