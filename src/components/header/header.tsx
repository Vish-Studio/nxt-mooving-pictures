"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onAllProjectsClick: () => void;
}

export const Header = ({ isMenuOpen, setIsMenuOpen, onAllProjectsClick }: HeaderProps) => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const isProjectDetail = pathname.startsWith('/project/');

  useEffect(() => {
    const handleScroll = () => {
      if (!isProjectDetail) {
        setIsScrolledPastHero(false);
        return;
      }
      const heroHeight = window.innerWidth >= 768 ? window.innerHeight * 0.8 : window.innerHeight * 0.6;
      if (window.scrollY > heroHeight - 96) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isProjectDetail, pathname]);

  const isSolidBackground = isProjectDetail && (isMenuOpen || isScrolledPastHero);

  let headerBgClass = 'mix-blend-difference';
  if (isProjectDetail) {
    headerBgClass = isSolidBackground ? 'bg-[#0A0A0A]' : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent';
  }

  return (
    <header className={`fixed top-0 left-0 w-full h-24 flex items-center justify-between px-8 md:px-16 z-[110] pointer-events-none transition-all duration-500 ${headerBgClass}`}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group flex items-center gap-2 p-2 text-[9px] font-black uppercase tracking-[0.3em] pointer-events-auto md:gap-4 md:text-[10px] md:tracking-[0.5em]"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        {isMenuOpen ? (
          <span>Close</span>
        ) : (
          <span className="relative h-[1em] overflow-hidden leading-none" aria-hidden="true">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Menu</span>
            <span className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Open</span>
          </span>
        )}
      </button>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[0.32em] uppercase cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto md:text-[11px] md:tracking-[0.6em]">
        MOOVING PICTURES
      </Link>
      <button
        onClick={onAllProjectsClick}
        className="group flex items-center gap-2 text-[8px] font-black tracking-[0.25em] uppercase transition-opacity hover:opacity-60 pointer-events-auto md:gap-4 md:text-[10px] md:tracking-[0.5em]"
      >
        All Projects <ArrowRight size={15} className="hidden all-projects-arrow sm:block" />
      </button>
    </header>
  );
};
