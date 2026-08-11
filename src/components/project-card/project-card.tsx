"use client";

import { useRouter } from 'next/navigation';
import { Project } from '../../constants';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  localIndex: number;
  key?: string;
}

export const ProjectCard = ({ project, localIndex }: ProjectCardProps) => {
  const router = useRouter();
  const layouts = [
    "md:mt-0",
    "md:mt-32",
    "md:mt-12",
    "md:mt-56",
    "md:mt-8",
    "md:mt-64",
  ];
  const layoutClass = layouts[localIndex % layouts.length];

  return (
    <div 
      data-project-id={project.id}
      onClick={() => router.push(`/project/${project.id}`)}
      className={cn(
        "project-item relative w-full overflow-hidden cursor-pointer group will-change-transform",
        layoutClass
      )}
    >
      <div className="project-card-frame relative w-full overflow-hidden opacity-0 will-change-transform">
        <img 
          src={project.imageUrl} 
          alt="" 
          className="w-full h-auto opacity-0 pointer-events-none block" 
        />
        
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0A0A]">
          <img 
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="parallax-img w-full h-full object-cover scale-[1.3] opacity-100 transition-all duration-1000 group-hover:scale-[1.2] group-hover:opacity-70 will-change-transform origin-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10" />
      </div>
    </div>
  );
};
