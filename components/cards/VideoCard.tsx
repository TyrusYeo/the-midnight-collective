"use client";

import DraggableCard from "./DraggableCard";

interface VideoCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  videoId: string; // YouTube video ID
  label?: string;
  width?: number;
}

export default function VideoCard({
  initialX,
  initialY,
  initialRotation = 0,
  videoId,
  label,
  width = 340,
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
          background: "var(--card-surface-warm)",
          borderRadius: "2px",
          padding: "16px 16px 20px",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Top tape strip decoration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div
            style={{
              width: 48,
              height: 14,
              background: "rgba(181, 168, 154, 0.45)",
              borderRadius: "2px",
              border: "1px solid rgba(181, 168, 154, 0.3)",
            }}
          />
        </div>

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
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
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
