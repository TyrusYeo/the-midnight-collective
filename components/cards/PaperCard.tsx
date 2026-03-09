"use client";

import DraggableCard from "./DraggableCard";

interface PaperCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  width?: number;
  children: React.ReactNode;
  ruled?: boolean;
}

export default function PaperCard({
  initialX,
  initialY,
  initialRotation = 0,
  width = 280,
  children,
  ruled = true,
}: PaperCardProps) {
  const lineCount = 14;

  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
    >
      <div
        style={{
          width,
          background: "var(--card-surface)",
          borderRadius: "2px",
          padding: "20px 22px 24px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Ruled lines */}
        {ruled && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #ddd8d0 27px, #ddd8d0 28px)",
              backgroundPosition: "0 48px",
              opacity: 0.55,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Red margin line */}
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(220, 160, 150, 0.35)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </div>
    </DraggableCard>
  );
}
