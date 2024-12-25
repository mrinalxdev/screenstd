import { ClickEvent, ZoomPoint } from "@/types";
import React from "react";
import { Slider } from "../ui/slider";

interface TimelineProps {
  duration: number;
  currentTime: number;
  clicks: ClickEvent[];
  zoomPoints: ZoomPoint[];
  onTimeUpdate: (time: number) => void;
}

export function Timeline({
  duration,
  currentTime,
  clicks,
  zoomPoints,
  onTimeUpdate,
}: TimelineProps) {
  return (
    <div className="w-full space-y-4">
      <div className="relative w-full h-24 bg-gray-800 rounded-lg overflow-hidden">
        {clicks?.map((click, index) => (
          <div
            key={index}
            className="absolute w-1 h-2 bg-blue-500"
            style={{
              left: `${(click.timestamp / duration) * 100}%`,
              bottom: 0,
            }}
          />
        ))}

        {zoomPoints?.map((point, index) => (
          <div
            key={index}
            className="absolute h-full bg-green-500 opacity-20"
            style={{
              left: `${(point.timestamp / duration) * 100}%`,
              width: `${(point.duration / duration) * 100}%`,
            }}
          />
        ))}

        <div
          className="absolute w-0.5 h-full bg-red-500"
          style={{
            left: `${(currentTime / duration) * 100}%`,
          }}
        />
      </div>

      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={([value]) => onTimeUpdate(value)}
      />
    </div>
  );
}
