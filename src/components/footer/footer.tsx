"use client";

import { Instagram, Twitter, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const isProjectDetail = pathname.startsWith('/project/');

  return (
    <footer className={`fixed bottom-0 left-0 w-full h-24 flex items-center justify-between px-8 md:px-16 z-50 pointer-events-none transition-colors duration-500 ${isProjectDetail ? 'bg-[#0A0A0A]' : 'mix-blend-difference'}`}>
      <div className="flex items-center gap-5 md:gap-10 pointer-events-auto">
        <Instagram size={16} className="text-white/50 hover:text-white cursor-pointer transition-colors" />
        <Twitter size={16} className="text-white/50 hover:text-white cursor-pointer transition-colors" />
        <Mail size={16} className="text-white/50 hover:text-white cursor-pointer transition-colors" />
      </div>

      <a
        href="https://www.vish.studio"
        target="_blank"
        rel="noreferrer"
        className="text-[9px] font-bold uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-60 pointer-events-auto md:text-[10px] md:tracking-[0.5em]"
      >
        © 2026 vish.studio
      </a>
    </footer>
  );
};
