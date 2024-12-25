"use client"

import { useCallback, useState } from "react";

interface DisplayMediaStreamOptions {
  video?:
    | boolean
    | {
        cursor?: "always" | "motion" | "never";
        displaySurface?: "browser" | "monitor" | "window";
      };
  audio?: boolean;
}

export function useScreenRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          displaySurface: "browser",
        } as DisplayMediaStreamOptions["video"],
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstart = () => {
        setIsRecording(true);
        setIsPaused(false);
      };

      recorder.onstop = () => {
        setIsRecording(false);
        setIsPaused(false);
        stream.getTracks().forEach((track) => track.stop());
      };

      setMediaRecorder(recorder);
      recorder.start(1000);
    } catch (error) {
      console.error("Error starting recording");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  }, [mediaRecorder, isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      if (isPaused) {
        mediaRecorder.resume();
        setIsPaused(false);
      } else {
        mediaRecorder.pause();
        setIsPaused(true);
      }
    }
  }, [mediaRecorder, isRecording, isPaused]);

  const getRecordingUrl = useCallback(() => {
    if (recordedChunks.length === 0) return null

    const blob = new Blob(recordedChunks, {type : 'video/webm'});
    return URL.createObjectURL(blob)
  }, [recordedChunks])

  return {
    isRecording, 
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    getRecordingUrl
  }
}
