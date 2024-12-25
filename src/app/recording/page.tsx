"use client";

import RecordControls from "@/components/recorder/RecordingControls";
import { Button } from "@/components/ui/button";
import { useRecordingSession } from "@/hooks/useRecordingSession";
import { useScreenRecorder } from "@/hooks/useScreenRecorder";
import { Camera, Download, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const ReacordingPage = () => {
  const router = useRouter();
  const {
    isRecording,
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    getRecordingUrl,
    clicks,
    clearClicks,
  } = useRecordingSession();

  const recordingUrl = getRecordingUrl();

  const handleEdit = () => {
    if (!recordingUrl) {
      console.error("Recording url is missing");
      return;
    } else {
      router.push(
        `/editor?videoUrl=${encodeURIComponent(
          recordingUrl
        )}&clicks=${encodeURIComponent(JSON.stringify(clicks))}`
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-blue-500" />
            <h1 className="ml-2 text-2xl font-bold text-white">ScreenStd</h1>
          </div>

          <RecordControls
            isRecording={isRecording}
            isPaused={isPaused}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onPauseRecording={pauseRecording}
          />
        </div>

        <div className="rounded-lg border-2 border-dashed border-gray-700 p-12">
          {!isRecording && !recordingUrl && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Ready to Record
              </h2>
              <p className="text-gray-400 mb-4">
                Click the record button to start capturing your screen
              </p>
              <Button onClick={startRecording}>Start Recording</Button>
            </div>
          )}

          {recordingUrl && !isRecording && (
            <div className="space-y-4">
              <video
                src={recordingUrl}
                controls
                className="w-full rounded-lg"
              />
              <div className="flex justify-end gap-2">
                <Button variant="default" onClick={handleEdit}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Edit Recording
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = recordingUrl;
                    a.download = "recording.webm";
                    a.click();
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Recording
                </Button>
              </div>
            </div>
          )}

          {isRecording && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Recording in Progress
              </h2>
              <p className="text-gray-400">
                {isPaused
                  ? "Recording paused"
                  : `Recording your screen ... (${clicks.length} clicks tracked)`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReacordingPage;
