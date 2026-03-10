"use client";

import { useEffect, useState } from "react";
import DraggableCard from "./DraggableCard";

interface FooterCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
}

export default function FooterCard({
  initialX,
  initialY,
  initialRotation = 0,
}: FooterCardProps) {
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
          background: "var(--card-surface)",
          borderRadius: "2px",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
          © {new Date().getFullYear()} The Midnight Collective
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "var(--text-secondary)", textDecoration: "none" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Instagram
          </a>
          <span style={{ color: "var(--card-border)" }}>·</span>
          <a
            href="mailto:hello@themidnightcollective.co"
            style={{ fontSize: 11, color: "var(--text-secondary)", textDecoration: "none" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            hello@themidnightcollective.co
          </a>
        </div>
      </div>
    </DraggableCard>
  );
}
