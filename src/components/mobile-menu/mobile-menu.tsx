"use client";

import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Instagram, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '../../constants';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '#' },
];

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
  const featuredProject = PROJECTS[0];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#0A0A0A] px-8 pb-8 pt-28 md:px-16 md:pb-12 md:pt-32"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.08),transparent_26%)]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-9rem)] max-w-[1800px] flex-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex items-center justify-between border-b border-white/10 pb-5 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 md:mb-12"
            >
              <span>Navigate</span>
              <span>Est. 2026</span>
            </motion.div>

            <div className="grid flex-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <nav className="lg:col-span-7" aria-label="Main navigation">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/15"
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center gap-5 py-5 md:py-7"
                    >
                      <span className="w-8 text-[10px] font-bold tracking-[0.25em] text-white/35">0{index + 1}</span>
                      <span className="font-serif text-5xl italic leading-none tracking-tight transition-colors duration-500 group-hover:text-white/55 md:text-7xl lg:text-8xl">
                        {item.name}
                      </span>
                      <ArrowUpRight size={22} className="ml-auto text-white/45 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-h-72 overflow-hidden bg-white/5 lg:col-span-5 lg:min-h-0"
              >
                <img
                  src={featuredProject.imageUrl}
                  alt={featuredProject.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                <Link
                  href={`/project/${featuredProject.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                >
                  <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/60">Featured project</span>
                  <span className="font-serif text-3xl italic leading-none md:text-5xl">{featuredProject.title}</span>
                  <span className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                    View case study <ArrowUpRight size={15} />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-3 md:items-end"
            >
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Follow the studio</p>
                <div className="flex gap-7">
                  <Instagram size={17} className="cursor-pointer text-white/55 transition-colors hover:text-white" />
                  <Twitter size={17} className="cursor-pointer text-white/55 transition-colors hover:text-white" />
                  <Mail size={17} className="cursor-pointer text-white/55 transition-colors hover:text-white" />
                </div>
              </div>
              <p className="font-serif text-2xl italic text-white/75 md:text-center">Motion, made memorable.</p>
              <a
                href="https://www.vish.studio"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-white md:text-right transition-opacity hover:opacity-60"
              >
                © 2026 vish.studio
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
