export interface ProjectGalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  gallery?: ProjectGalleryItem[];
}

// Helper to generate some dummy gallery items for projects that don't have them explicitly defined
export const generateGallery = (seed: string): ProjectGalleryItem[] => [
  { id: `${seed}-1`, type: 'image', url: `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600&seed=${seed}1` },
  { id: `${seed}-2`, type: 'image', url: `https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600&seed=${seed}2` },
  { id: `${seed}-3`, type: 'video', url: 'https://cdn.coverr.co/videos/coverr-walking-through-the-forest-8101/1080p.mp4', thumbnail: `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800&seed=${seed}3` },
  { id: `${seed}-4`, type: 'image', url: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600&seed=${seed}4` },
  { id: `${seed}-5`, type: 'image', url: `https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600&seed=${seed}5` },
  { id: `${seed}-6`, type: 'video', url: 'https://cdn.coverr.co/videos/coverr-waves-crashing-on-the-rocks-5224/1080p.mp4', thumbnail: `https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800&seed=${seed}6` },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'THE ETERNAL VOW',
    category: 'WEDDING',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '2',
    title: 'URBAN RHYTHM',
    category: 'STREET',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '3',
    title: 'GOLDEN HOUR GALA',
    category: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '4',
    title: 'MINIMALIST MUSE',
    category: 'PORTRAIT',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '5',
    title: 'MIDNIGHT SOIRÉE',
    category: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1496337589254-7e19d01ced44?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '6',
    title: 'THE COASTAL CEREMONY',
    category: 'WEDDING',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '7',
    title: 'ETHEREAL PORTRAITS',
    category: 'PORTRAIT',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '8',
    title: 'NIGHTFALL GALA',
    category: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '9',
    title: 'CITY LIGHTS',
    category: 'STREET',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '10',
    title: 'DESERT DREAMS',
    category: 'PORTRAIT',
    imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '11',
    title: 'OCEAN BREEZE',
    category: 'WEDDING',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '12',
    title: 'MOUNTAIN MAJESTY',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '13',
    title: 'FOREST WHISPER',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '14',
    title: 'SILENT SNOW',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '15',
    title: 'AUTUMN GLOW',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1444492417251-9c839d00079e?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  },
  {
    id: '16',
    title: 'STARRY NIGHT',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=1200',
    year: '2024'
  },
  {
    id: '17',
    title: 'DESERT OASIS',
    category: 'NATURE',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    year: '2023'
  }
];
