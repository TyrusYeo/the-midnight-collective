"use client";

import { useEffect, useState } from "react";
import DraggableCard from "./DraggableCard";

interface HeaderCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  logoSrc?: string;
  wordmark?: string;
  onNavClick?: (section: string) => void;
}

export default function HeaderCard({
  initialX,
  initialY,
  initialRotation = 0,
  logoSrc,
  wordmark = "The Midnight Collective",
  onNavClick,
}: HeaderCardProps) {
  const [viewportWidth, setViewportWidth] = useState(1440);
  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
      zIndexBase={5}
    >
      <div
        style={{
          width: viewportWidth,
          background: "var(--header-base)",
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
              style={{ height: 58, objectFit: "contain" }}
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

        {/* Navigation */}
        <div style={{ display: "flex", gap: 20 }}>
          {["Camp Midnight", "say hi!"].map((item) => (
            <span
              key={item}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onNavClick?.(item)}
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
                cursor: "pointer",
                userSelect: "none",
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
