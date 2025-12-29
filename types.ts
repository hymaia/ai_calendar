
export interface DayData {
  day: number;
  title: string;
  description: string;
  notionUrl: string;
  isUnlocked: boolean;
  type: 'tip' | 'video' | 'resource' | 'surprise';
}

export interface SnowParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}
