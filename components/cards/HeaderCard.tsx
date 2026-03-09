"use client";

import DraggableCard from "./DraggableCard";

interface HeaderCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  logoSrc?: string;
  wordmark?: string;
}

export default function HeaderCard({
  initialX,
  initialY,
  initialRotation = 0,
  logoSrc,
  wordmark = "The Midnight Collective",
}: HeaderCardProps) {
  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
      zIndexBase={5}
    >
      <div
        style={{
          width: 420,
          background: "var(--card-surface)",
          borderRadius: "2px",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Wordmark / logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt={wordmark}
              style={{ height: 28, objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {wordmark}
            </span>
          )}
        </div>

        {/* Navigation hints */}
        <div style={{ display: "flex", gap: 20 }}>
          {["About", "Camp Midnight", "Contact"].map((item) => (
            <span
              key={item}
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </DraggableCard>
  );
}
