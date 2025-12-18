
export interface GachaItem {
  id: string;
  name: string;
  weight: number;
  color: string;
  position: { x: number; y: number };
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'sparkle' | 'petal';
}
