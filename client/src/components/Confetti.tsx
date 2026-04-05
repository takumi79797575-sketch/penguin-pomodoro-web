import { useMemo } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: "rect" | "circle" | "star";
}

const COLORS = [
  "oklch(0.82 0.18 85)",   // gold
  "oklch(0.75 0.18 310)",  // pink
  "oklch(0.72 0.18 195)",  // teal
  "oklch(0.78 0.18 150)",  // mint
  "oklch(0.80 0.18 50)",   // orange
  "oklch(0.85 0.10 220)",  // light blue
];

export default function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
      size: Math.random() * 8 + 6,
      shape: (["rect", "circle", "star"] as const)[i % 3],
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: piece.shape === "star" ? `${piece.size + 4}px` : `${piece.size}px`,
            height: piece.shape === "circle" ? `${piece.size}px` : piece.shape === "rect" ? `${piece.size * 0.6}px` : `${piece.size + 4}px`,
            backgroundColor: piece.shape !== "star" ? piece.color : "transparent",
            color: piece.color,
            borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "rect" ? "2px" : "0",
            fontSize: piece.shape === "star" ? `${piece.size + 4}px` : undefined,
            animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
          }}
        >
          {piece.shape === "star" ? "★" : null}
        </div>
      ))}
    </div>
  );
}
