"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Timeline } from '@/components/timeline/Timeline';
import { ZoomPointEditor } from '@/components/editor/ZoomPointEditor';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ZoomPoint, ClickEvent } from '@/types';

interface EditorPageProps {
  videoUrl: string;
  clicks: ClickEvent[];
  onSave: (zoomPoints: ZoomPoint[]) => void;
}

export default function EditorPage({
  videoUrl,
  clicks,
  onSave,
}: EditorPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoomPoints, setZoomPoints] = useState<ZoomPoint[]>([]);
  
  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration * 1000); // Convert to milliseconds
    }
  }, [videoRef.current?.duration]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time / 1000; // Convert to seconds
    }
  };

  const addZoomPoint = () => {
    const newZoomPoint: ZoomPoint = {
      timestamp: currentTime,
      scale: 1.5,
      duration: 1000,
      easing: 'easeInOut',
    };
    setZoomPoints([...zoomPoints, newZoomPoint]);
  };

  const updateZoomPoint = (index: number, updatedPoint: ZoomPoint) => {
    const newZoomPoints = [...zoomPoints];
    newZoomPoints[index] = updatedPoint;
    setZoomPoints(newZoomPoints);
  };

  const deleteZoomPoint = (index: number) => {
    setZoomPoints(zoomPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            controls
          />
        </div>

        <Timeline
          duration={duration}
          currentTime={currentTime}
          clicks={clicks}
          zoomPoints={zoomPoints}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Zoom Points</h2>
          <Button onClick={addZoomPoint}>
            <Plus className="mr-2 h-4 w-4" />
            Add Zoom Point
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zoomPoints.map((point, index) => (
            <ZoomPointEditor
              key={index}
              zoomPoint={point}
              onChange={(updatedPoint) => updateZoomPoint(index, updatedPoint)}
              onDelete={() => deleteZoomPoint(index)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onSave(zoomPoints)}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}