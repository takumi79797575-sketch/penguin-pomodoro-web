import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 1.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 20% 10%, oklch(0.72 0.14 195 / 60%) 0%, transparent 60%), radial-gradient(ellipse 60% 30% at 80% 15%, oklch(0.75 0.12 270 / 50%) 0%, transparent 55%)",
        }}
      />
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
      {/* Larger sparkle stars */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute text-white/60"
          style={{
            left: `${(i * 8.3 + 5) % 100}%`,
            top: `${(i * 13.7 + 8) % 80}%`,
            fontSize: `${Math.random() * 8 + 8}px`,
            animation: `twinkle ${2 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}
