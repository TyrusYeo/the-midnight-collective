"use client";

import { useEffect, useState } from "react";
import DraggableCard from "./DraggableCard";

interface HeaderCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  wordmark?: string;
  onNavClick?: (section: string) => void;
}

export default function HeaderCard({
  initialX,
  initialY,
  initialRotation = 0,
  wordmark = "The Midnight Collective",
  onNavClick,
}: HeaderCardProps) {
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [logoSrc, setLogoSrc] = useState("/logos/variant_0.png");
  const [shouldCycleLogo, setShouldCycleLogo] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  const onHoverLogo = () => {
    setShouldCycleLogo(true);
  };

  const onLeaveLogo = () => {
    setShouldCycleLogo(false);
  };

  useEffect(() => {
    if (shouldCycleLogo) {
      const cycleLogo = () => {
        setVariantIndex((prev) => (prev + 1) % 5);
        setLogoSrc(`/logos/variant_${variantIndex}.png`);
      };
      const interval = setInterval(cycleLogo, 450); // 300ms between variants
      return () => clearInterval(interval);
    }
  }, [shouldCycleLogo, variantIndex]);

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
        onMouseEnter={onHoverLogo}
        onMouseLeave={onLeaveLogo}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={wordmark}
              style={{ height: 88, width: 250, objectFit: "contain", marginLeft: -20 }}
            />
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 20 }}>
          {["Camp Midnight", "say hi!"].map((item) => (
            <span
              key={item}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onNavClick?.(item)}
              className="body"
              style={{ cursor: "pointer" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </DraggableCard>
  );
}
