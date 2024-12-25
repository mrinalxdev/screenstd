"use client"

import { useState, useCallback, useEffect } from 'react';
import { ClickEvent } from '@/types';

export function useClickTracker(isRecording: boolean) {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (isRecording) {
      setStartTime(Date.now());
    } else {
      setStartTime(0);
    }
  }, [isRecording]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isRecording || !startTime) return;
    
    const clickEvent: ClickEvent = {
      timestamp: Date.now() - startTime,
      x: e.clientX,
      y: e.clientY,
    };
    
    setClicks(prev => [...prev, clickEvent]);
  }, [isRecording, startTime]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return { clicks, clearClicks: () => setClicks([]) };
}