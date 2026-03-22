"use client";

import { forwardRef, useMemo } from "react";
import DraggableCard from "./DraggableCard";
import { StampVariation } from "../tools/Stamp";
import { calculateRandomTilt } from "../animationUtils";

interface PostcardCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  to?: string;
  message: string;
  from?: string;
  email?: string;
  stampVariation?: StampVariation;
}

const PostcardCard = forwardRef<HTMLDivElement, PostcardCardProps>(({
  initialX,
  initialY,
  initialRotation = 0,
  to,
  message,
  from,
  email,
  stampVariation,
}, ref) => {
  const stampOffset = useMemo(() => {
    if (stampVariation === StampVariation.MICHIGAN) {
      return {
        x: 0,
        y: 30,
      }
    } else {
      return {
        x: 50,
        y: 16,
      }
    }
  }, [stampVariation]);


  return (
    <DraggableCard
      initialX={initialX}
      initialY={initialY}
      initialRotation={initialRotation}
    >
      <div
        ref={ref}
        style={{
          width: 1000,
          background: "#f2e9d5",
          borderRadius: "2px",
          display: "flex",
          overflow: "hidden",
          backgroundImage: "url('/canvas-elements/umich_postcard.png')",
          backgroundSize: "cover",
          aspectRatio: "16 / 10",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Left: message area */}
        <div
          style={{
            flex: 1,
            padding: "124px 82px 50px 92px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 8
          }}
        >
          <p
            className="body"
            style={{ whiteSpace: "pre-line" }}
          >
            {message}
          </p>
          {from && (
            <p className="subheader">
              — {from}
            </p>
          )}
        </div>

        {/* Right: address / stamp area */}
        <div
          style={{
            width: 100,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Address lines */}
          {/* <div>
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
          </div> */}

          {/* Horizontal divider lines (address field style) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ height: 1, background: "var(--card-border)" }}
              />
            ))}
          </div>

          {/* Stamp slot */}
          {stampVariation && (
            <div
              style={{
                position: "absolute",
                top: stampOffset.y,
                right: stampOffset.x,
                pointerEvents: "none",
                rotate: `${calculateRandomTilt()}deg`,
              }}
            >
              <img
              src={`/canvas-elements/stamps/${stampVariation}.jpg`}
              alt=""
              draggable={false}
              style={{ display: "block", width: "auto", height: "auto", maxWidth: "210px", maxHeight: "200px"}}
            />
            </div>
          )}
        </div>
      </div>
    </DraggableCard>
  );
});

PostcardCard.displayName = "PostcardCard";

export default PostcardCard;
