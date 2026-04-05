import { useState, useEffect, useRef, useCallback } from "react";

export type TimerMode = "study" | "break";
export type TimerStatus = "idle" | "running" | "paused" | "finished";

const STUDY_DURATION = 50 * 60; // 50 minutes in seconds
const BREAK_DURATION = 10 * 60; // 10 minutes in seconds

export interface PomodoroState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  totalTime: number;
  cycles: number;
  progress: number; // 0 to 1
}

export interface PomodoroActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
}

export function usePomodoro(): PomodoroState & PomodoroActions {
  const [mode, setMode] = useState<TimerMode>("study");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(STUDY_DURATION);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = mode === "study" ? STUDY_DURATION : BREAK_DURATION;
  const progress = 1 - timeLeft / totalTime;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setStatus("running");
  }, []);

  const pause = useCallback(() => {
    setStatus("paused");
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    setStatus("running");
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setStatus("idle");
    setMode("study");
    setTimeLeft(STUDY_DURATION);
    setCycles(0);
  }, [clearTimer]);

  const skip = useCallback(() => {
    clearTimer();
    if (mode === "study") {
      setMode("break");
      setTimeLeft(BREAK_DURATION);
      setCycles((c) => c + 1);
    } else {
      setMode("study");
      setTimeLeft(STUDY_DURATION);
    }
    setStatus("idle");
  }, [mode, clearTimer]);

  // Tick effect
  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setStatus("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimer();
  }, [status, clearTimer]);

  // Auto-transition when finished
  useEffect(() => {
    if (status === "finished") {
      const timeout = setTimeout(() => {
        if (mode === "study") {
          setMode("break");
          setTimeLeft(BREAK_DURATION);
          setCycles((c) => c + 1);
        } else {
          setMode("study");
          setTimeLeft(STUDY_DURATION);
        }
        setStatus("idle");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status, mode]);

  return {
    mode,
    status,
    timeLeft,
    totalTime,
    cycles,
    progress,
    start,
    pause,
    resume,
    reset,
    skip,
  };
}
