/*
 * DESIGN: 南極の夜空 (Antarctic Night Sky)
 * - Deep midnight navy background with aurora and stars
 * - Study mode: warm golden glow | Break mode: cool teal/lavender glow
 * - Nunito font for kawaii roundness
 * - Penguin character changes state: studying / sleeping / celebrating
 */

import { useEffect, useState } from "react";
import { usePomodoro } from "@/hooks/usePomodoro";
import StarField from "@/components/StarField";
import TimerRing from "@/components/TimerRing";
import Confetti from "@/components/Confetti";

// Real penguin photo provided by user
const PENGUIN_PHOTO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663517184603/gBdCmjwNjFd9R7ECp95Vsr/penguin-photo-rounded_24a31865.webp";

// Export for use in button

// Use the same photo for all states (study, sleep, celebrate)
const PENGUIN_STUDY = PENGUIN_PHOTO;
const PENGUIN_SLEEP = PENGUIN_PHOTO;
const PENGUIN_CELEBRATE = PENGUIN_PHOTO;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getPenguinImage(
  mode: "study" | "break",
  status: "idle" | "running" | "paused" | "finished"
): string {
  if (status === "finished") return PENGUIN_CELEBRATE;
  if (mode === "break") return PENGUIN_SLEEP;
  return PENGUIN_STUDY;
}

function getPenguinMessage(
  mode: "study" | "break",
  status: "idle" | "running" | "paused" | "finished"
): string {
  if (status === "finished" && mode === "study") return "お疲れさま！休憩しよう！";
  if (status === "finished" && mode === "break") return "さあ、また頑張ろう！";
  if (status === "paused") return "ちょっと休憩";
  if (status === "running" && mode === "study") return "がんばり中";
  if (status === "running" && mode === "break") return "ゆっくり休んでね...";
  if (mode === "study") return "がんばろう！";
  return "休憩タイム！";
}

// Penguin photo URL for button and cycle counter
const PENGUIN_BUTTON_PHOTO = PENGUIN_PHOTO;

export default function Home() {
  const {
    mode,
    status,
    timeLeft,
    progress,
    cycles,
    start,
    pause,
    resume,
    reset,
    skip,
  } = usePomodoro();

  const [showConfetti, setShowConfetti] = useState(false);
  const [penguinAnimKey, setPenguinAnimKey] = useState(0);

  // Show confetti when finished
  useEffect(() => {
    if (status === "finished") {
      setShowConfetti(true);
      setPenguinAnimKey((k) => k + 1);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const penguinImg = getPenguinImage(mode, status);
  const message = getPenguinMessage(mode, status);

  const studyGlow =
    "0 0 40px oklch(0.82 0.14 85 / 30%), 0 0 80px oklch(0.82 0.14 85 / 15%)";
  const breakGlow =
    "0 0 40px oklch(0.72 0.14 195 / 30%), 0 0 80px oklch(0.72 0.14 195 / 15%)";
  const cardGlow = mode === "study" ? studyGlow : breakGlow;

  const modeLabel = mode === "study" ? "勉強タイム" : "休憩タイム";
  const modeColor =
    mode === "study"
      ? "text-amber-300"
      : "text-teal-300";

  const modeAccentBg =
    mode === "study"
      ? "bg-amber-400/10 border-amber-400/30"
      : "bg-teal-400/10 border-teal-400/30";

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "transparent",
      }}
    >
      {/* Star background removed */}

      {/* Confetti */}
      <Confetti active={showConfetti} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-8 w-full max-w-sm">
        {/* Header */}
        <div className="text-center">
          <h1
            className="text-3xl font-black tracking-tight"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background:
                "linear-gradient(135deg, oklch(0.90 0.08 220), oklch(0.82 0.12 85))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: '26px',
              width: '298px'
            }}
          >
            🐧 Penguin Pomodoro
          </h1>
          <p
            className="text-sm mt-1"
            style={{
              color: "oklch(0.65 0.06 240)",
              fontFamily: "'Nunito', sans-serif",
              fontSize: '23px',
              marginTop: '17px',
              width: '308px'
            }}
          >
            50分勉強 · 10分休憩
          </p>
        </div>



        {/* Timer card - パステルカラー */}
        <div
          className="relative flex flex-col items-center justify-center rounded-3xl p-8"
          style={{
            background: "oklch(0.88 0.02 120)",
            backdropFilter: "blur(20px)",
            border: "2px solid oklch(0.80 0.03 120)",
            boxShadow: "0 4px 16px oklch(0 0 0 / 15%)",
            width: "340px",
            height: "343px",
          }}
        >
          {/* SVG progress ring - どう森風カラー */}
          <TimerRing progress={progress} mode={mode} size={320} strokeWidth={10} />

          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            {/* Penguin image removed */}

            {/* Time display - パステルテキスト */}
            <div
              className="text-5xl font-black tabular-nums leading-none"
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: '#255f31',
                textShadow: "none",
                fontSize: '78px',
                height: '52px',
                marginTop: '-12px'
              }}
            >
              {formatTime(timeLeft)}
            </div>

            {/* Message - パステルテキスト */}
            <p
              className="text-xs text-center"
              style={{
                color: "oklch(0.70 0.04 120)",
                fontFamily: "'DM Sans', sans-serif",
                paddingTop: '44px',
                marginRight: '0px',
                marginBottom: '0px',
                width: '173px',
                height: '39px',
                fontSize: '24px',
                marginTop: '4px'
              }}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Control buttons - positioned at top-left */}
        <div className="fixed top-2 left-2 flex flex-col items-center gap-2 z-50">
          {/* Main action button - Penguin photo as button */}
          {status === "idle" && (
            <button
              onClick={start}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden border-2"
              style={{
                borderColor: mode === "study" ? "oklch(0.82 0.14 85)" : "oklch(0.72 0.14 195)",
                boxShadow: mode === "study"
                  ? "0 0 16px oklch(0.82 0.14 85 / 40%)"
                  : "0 0 16px oklch(0.72 0.14 195 / 40%)",
              }}
            >
              <img
                src={PENGUIN_PHOTO}
                alt="penguin-start"
                className="w-full h-full object-cover"
              />
            </button>
          )}
          {status === "running" && (
            <button
              onClick={pause}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden border-2"
              style={{
                borderColor: mode === "study" ? "oklch(0.82 0.14 85)" : "oklch(0.72 0.14 195)",
                boxShadow: mode === "study"
                  ? "0 0 16px oklch(0.82 0.14 85 / 40%)"
                  : "0 0 16px oklch(0.72 0.14 195 / 40%)",
              }}
            >
              <img
                src={PENGUIN_PHOTO}
                alt="penguin-pause"
                className="w-full h-full object-cover"
              />
            </button>
          )}
          {status === "paused" && (
            <button
              onClick={resume}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden border-2"
              style={{
                borderColor: mode === "study" ? "oklch(0.82 0.14 85)" : "oklch(0.72 0.14 195)",
                boxShadow: mode === "study"
                  ? "0 0 16px oklch(0.82 0.14 85 / 40%)"
                  : "0 0 16px oklch(0.72 0.14 195 / 40%)",
              }}
            >
              <img
                src={PENGUIN_PHOTO}
                alt="penguin-resume"
                className="w-full h-full object-cover"
              />
            </button>
          )}
          {status === "finished" && (
            <button
              onClick={skip}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden border-2 animate-pulse-glow"
              style={{
                borderColor: "oklch(0.78 0.18 310)",
                boxShadow: "0 0 16px oklch(0.78 0.18 310 / 60%)",
              }}
            >
              <img
                src={PENGUIN_PHOTO}
                alt="penguin-finished"
                className="w-full h-full object-cover"
              />
            </button>
          )}
          
          {/* Reset and Skip buttons below penguin button */}
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "oklch(0.20 0.05 260 / 80%)",
                border: "1px solid oklch(1 0 0 / 20%)",
                color: "oklch(0.70 0.06 240)",
              }}
              title="リセット"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              onClick={skip}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "oklch(0.20 0.05 260 / 80%)",
                border: "1px solid oklch(1 0 0 / 20%)",
                color: "oklch(0.70 0.06 240)",
              }}
              title="スキップ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cycle counter - Mini penguins */}
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: "oklch(0.14 0.05 260 / 60%)",
            border: "1px solid oklch(1 0 0 / 8%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span style={{ color: "oklch(0.60 0.06 240)", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
            完了
          </span>
          <div className="flex gap-1 flex-wrap justify-center max-w-xs">
            {Array.from({ length: cycles }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full overflow-hidden transition-all duration-300 flex-shrink-0"
                style={{
                  border: "1.5px solid oklch(0.82 0.14 85)",
                  boxShadow: "0 0 8px oklch(0.82 0.14 85 / 50%)",
                }}
              >
                <img
                  src={PENGUIN_PHOTO}
                  alt={`penguin-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span
            className="font-bold text-sm ml-1"
            style={{
              color: "oklch(0.82 0.12 85)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {cycles}
          </span>
        </div>


      </div>
    </div>
  );
}
