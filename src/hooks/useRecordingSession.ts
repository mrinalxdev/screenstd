"use client"
import { useState, useCallback } from 'react';
import { useScreenRecorder } from './useScreenRecorder';
import { useClickTracker } from './useClickTracker';

export function useRecordingSession() {
  const {
    isRecording,
    isPaused,
    startRecording: startScreenRecording,
    stopRecording: stopScreenRecording,
    pauseRecording,
    getRecordingUrl,
  } = useScreenRecorder();

  const { clicks, clearClicks } = useClickTracker(isRecording);

  const startRecording = useCallback(async () => {
    clearClicks();
    await startScreenRecording();
  }, [startScreenRecording, clearClicks]);

  return {
    isRecording,
    isPaused,
    startRecording,
    stopRecording: stopScreenRecording,
    pauseRecording,
    getRecordingUrl,
    clicks,
    clearClicks,
  };
}