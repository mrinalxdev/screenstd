import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZoomPoint } from '@/types';

interface ZoomPointEditorProps {
  zoomPoint: ZoomPoint;
  onChange: (updatedPoint: ZoomPoint) => void;
  onDelete: () => void;
}

export function ZoomPointEditor({
  zoomPoint,
  onChange,
  onDelete,
}: ZoomPointEditorProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Scale</label>
          <Input
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={zoomPoint.scale}
            onChange={(e) => onChange({ ...zoomPoint, scale: parseFloat(e.target.value) })}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Duration (ms)</label>
          <Input
            type="number"
            min={100}
            step={100}
            value={zoomPoint.duration}
            onChange={(e) => onChange({ ...zoomPoint, duration: parseInt(e.target.value) })}
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-200">Easing</label>
        <select
          value={zoomPoint.easing}
          onChange={(e) => onChange({ ...zoomPoint, easing: e.target.value as ZoomPoint['easing'] })}
          className="mt-1 w-full rounded-md bg-gray-700 border-gray-600"
        >
          <option value="linear">Linear</option>
          <option value="easeIn">Ease In</option>
          <option value="easeOut">Ease Out</option>
          <option value="easeInOut">Ease In Out</option>
        </select>
      </div>
      
      <Button variant="destructive" onClick={onDelete}>
        Delete Zoom Point
      </Button>
    </div>
  );
}