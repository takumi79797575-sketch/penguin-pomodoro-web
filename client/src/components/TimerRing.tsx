interface TimerRingProps {
  progress: number; // 0 to 1
  mode: "study" | "break";
  size?: number;
  strokeWidth?: number;
}

export default function TimerRing({
  progress,
  mode,
  size = 320,
  strokeWidth = 12,
}: TimerRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const studyColor = "oklch(0.82 0.14 85)"; // warm gold
  const breakColor = "oklch(0.75 0.14 195)"; // cool teal
  const activeColor = mode === "study" ? studyColor : breakColor;

  const glowId = `glow-${mode}`;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0"
      style={{ filter: `drop-shadow(0 0 12px ${activeColor})` }}
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`gradient-${mode}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor={mode === "study" ? "oklch(0.88 0.16 60)" : "oklch(0.78 0.16 220)"}
          />
          <stop
            offset="100%"
            stopColor={mode === "study" ? "oklch(0.75 0.14 85)" : "oklch(0.68 0.14 195)"}
          />
        </linearGradient>
      </defs>

      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="oklch(1 0 0 / 8%)"
        strokeWidth={strokeWidth}
      />

      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#gradient-${mode})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dashoffset 1s linear",
          filter: `url(#${glowId})`,
        }}
      />

      {/* Outer decorative ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius + strokeWidth + 6}
        fill="none"
        stroke={`${activeColor}`}
        strokeWidth={1}
        strokeOpacity={0.2}
        strokeDasharray="4 8"
        style={{ animation: "spin-slow 20s linear infinite" }}
      />
    </svg>
  );
}
