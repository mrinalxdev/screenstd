import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Disc, Pause, Square } from "lucide-react";

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPauseRecording: () => void;
}

const RecordControls = ({
  isRecording,
  isPaused,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
}: RecordingControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      {!isRecording ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size="icon" onClick={onStartRecording}>
                <Disc className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start Recording</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onPauseRecording}>
                <Pause className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isPaused ? "Resume Recording" : "Pause Recording"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                onClick={onStopRecording}
              >
                <Square className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default RecordControls;
