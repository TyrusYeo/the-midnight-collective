"use client";

import DraggableCard from "./DraggableCard";

interface PostcardCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  to?: string;
  message: string;
  from?: string;
  email?: string;
}

export default function PostcardCard({
  initialX,
  initialY,
  initialRotation = 0,
  to,
  message,
  from,
  email,
}: PostcardCardProps) {
  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
    >
      <div
        style={{
          width: 340,
          height: 220,
          background: "var(--card-surface)",
          borderRadius: "2px",
          display: "flex",
          overflow: "hidden",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Left: message area */}
        <div
          style={{
            flex: 1,
            padding: "18px 16px 18px 20px",
            borderRight: "1px solid var(--card-border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--text-primary)",
            }}
          >
            {message}
          </p>
          {from && (
            <p style={{ margin: 0, fontSize: 11, color: "var(--text-secondary)" }}>
              — {from}
            </p>
          )}
        </div>

        {/* Right: address / stamp area */}
        <div
          style={{
            width: 130,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Stamp placeholder */}
          <div
            style={{
              alignSelf: "flex-end",
              width: 36,
              height: 44,
              border: "1px solid var(--card-border)",
              borderRadius: "1px",
              background: "var(--card-surface-warm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 18 }}>✦</div>
          </div>

          {/* Address lines */}
          <div>
            {to && (
              <p style={{ margin: "0 0 4px", fontSize: 11, color: "var(--text-secondary)" }}>
                {to}
              </p>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                style={{
                  fontSize: 11,
                  color: "var(--text-primary)",
                  textDecoration: "underline",
                  textDecorationColor: "var(--accent-taupe)",
                  cursor: "pointer",
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {email}
              </a>
            )}
          </div>

          {/* Horizontal divider lines (address field style) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ height: 1, background: "var(--card-border)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </DraggableCard>
  );
}
