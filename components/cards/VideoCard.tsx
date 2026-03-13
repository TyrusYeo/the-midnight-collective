"use client";

import DraggableCard from "./DraggableCard";

interface VideoCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  srcUrl?: string;
  label?: string;
  width?: number;
}

export default function VideoCard({
  initialX,
  initialY,
  initialRotation = 0,
  srcUrl = "https://www.youtube.com/embed/DUYmSt8qCas?controls=0&showinfo=0&modestbranding=1&rel=0", // TOOD add &autoplay=1 tmr
  label,
  width = 600,
}: VideoCardProps) {
  const aspectHeight = Math.round((width - 32) * (9 / 16));

  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
    >
      <div
        style={{
          width,
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >

        {/* Video frame */}
        <div
          style={{
            width: "100%",
            height: aspectHeight,
            background: "#1a1a18",
            borderRadius: "1px",
            overflow: "hidden",
            position: "relative",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <iframe
            src={srcUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={label ?? "Video"}
          />
        </div>

        {/* Label */}
        {label && (
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 11,
              color: "var(--text-secondary)",
              textAlign: "center",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </p>
        )}
      </div>
    </DraggableCard>
  );
}
