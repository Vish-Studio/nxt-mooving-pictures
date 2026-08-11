"use client";

import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ProjectGalleryItem } from '../../constants';

interface GalleryCarouselProps {
  gallery: ProjectGalleryItem[];
  onMediaSelect: (item: ProjectGalleryItem) => void;
}

export const GalleryCarousel = ({ gallery, onMediaSelect }: GalleryCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative group">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-12 md:mb-16 border-t border-white/20 pt-8"
      >
        <h2 className="text-[10px] font-black tracking-[0.6em] uppercase text-white/50">Project Gallery</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => scrollCarousel('left')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scrollCarousel('right')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        ref={carouselRef}
        className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 md:gap-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {gallery.map((item) => (
          <button 
            key={item.id} 
            onClick={() => onMediaSelect(item)}
            className="snap-start shrink-0 w-full md:w-[calc(33.333%-1.33rem)] lg:w-[calc(25%-1.5rem)] aspect-[3/4] relative overflow-hidden group/item block text-left"
          >
            <img 
              src={item.thumbnail || item.url} 
              alt="Gallery item"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              {item.type === 'video' ? (
                <Play size={32} className="text-white" fill="white" />
              ) : (
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white text-center px-4">
                  View Image
                </p>
              )}
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
};
