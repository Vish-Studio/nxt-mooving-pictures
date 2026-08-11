"use client";

import { type ReactNode, useState } from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { AllProjects } from '../all-projects/all-projects';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] text-white font-sans selection:bg-white selection:text-black min-h-screen overflow-x-hidden">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onAllProjectsClick={() => setIsAllProjectsOpen(true)}
      />
      {children}
      <Footer />
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <AllProjects isOpen={isAllProjectsOpen} setIsOpen={setIsAllProjectsOpen} />
    </div>
  );
};
