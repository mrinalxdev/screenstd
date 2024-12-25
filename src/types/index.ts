export interface Recording {
  id: string;
  videoUrl: string;
  timestamp: number;
  duration: number;
  clicks: ClickEvent[];
}

export interface ClickEvent {
  timestamp: number;
  x: number;
  y: number;
}

export interface ZoomPoint {
  timestamp: number;
  scale: number;
  duration: number;
  easing : 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}
