"use client";

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ProjectGalleryItem } from '../../constants';

interface LightboxProps {
  selectedMedia: ProjectGalleryItem | null;
  onClose: () => void;
}

export const Lightbox = ({ selectedMedia, onClose }: LightboxProps) => {
  return (
    <AnimatePresence>
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-10"
          >
            <X size={32} />
          </button>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.url} 
                controls 
                autoPlay 
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                alt="Full view" 
                className="max-w-full max-h-[85vh] object-contain"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
