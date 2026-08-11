"use client";

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '../../constants';

interface AllProjectsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AllProjects = ({ isOpen, setIsOpen }: AllProjectsProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] bg-[#0A0A0A] overflow-y-auto px-8 md:px-16 pt-32 pb-24"
        >
          <button 
            onClick={() => setIsOpen(false)} 
            className="fixed top-8 right-8 md:right-16 z-10 p-2 hover:scale-110 transition-transform text-white"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-[1800px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] font-black tracking-[0.6em] uppercase text-white/50 mb-16"
            >
              All Projects
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link 
                    href={`/project/${project.id}`} 
                    onClick={() => setIsOpen(false)} 
                    className="group block"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-white/5">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif italic group-hover:text-white/70 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mt-4">
                      {project.category}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
