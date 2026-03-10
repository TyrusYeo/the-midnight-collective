"use client";

import { useEffect, useRef, useState } from "react";
import InfiniteCanvas, { CanvasHandle } from "@/components/canvas/InfiniteCanvas";
import HeaderCard from "@/components/cards/HeaderCard";
import FooterCard from "@/components/cards/FooterCard";
import PaperCard from "@/components/cards/PaperCard";
import VideoCard from "@/components/cards/VideoCard";
import PostcardCard from "@/components/cards/PostcardCard";
import CampMidnightSection from "@/app/campMidnight/CampMidnightSection";

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
  }, []);
  return vp;
}

export default function CampMidnightPage() {
  const canvasRef = useRef<CanvasHandle>(null);
  const { w, h } = useViewport();

  const cx = w / 2;
  const cy = h / 2;
  const cmX = w + 200;
  const cmCenterX = cmX + 350;

  // On mount, instantly snap the canvas so the CM cluster is centered —
  // no animation so there's no flash of the TMC origin.
  useEffect(() => {
    canvasRef.current?.panTo(w / 2 - cmCenterX, 0, false);
  // Only run once real viewport dimensions are available
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w]);

  const handleNavClick = (section: string) => {
    if (section === "Camp Midnight") {
      canvasRef.current?.panTo(w / 2 - cmCenterX, 0);
    }
    if (section === "say hi!") {
      // Navigate back to the TMC home cluster
      canvasRef.current?.panTo(0, 0);
    }
  };

  return (
    <InfiniteCanvas ref={canvasRef}>
      {() => (
        <>
          {/* ── HEADER ─────────────────────────────────────────── */}
          <HeaderCard
            initialX={0}
            initialY={0}
            wordmark="The Midnight Collective"
            logoSrc="/TMC_logo.png"
            onNavClick={handleNavClick}
          />

          {/* ── TMC CLUSTER (discoverable by panning left) ───────*/}
          <PaperCard
            initialX={cx - 460}
            initialY={cy - 200}
            initialRotation={-2}
            width={300}
          >
            <p
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontSize: 28,
                lineHeight: 1.3,
                margin: "0 0 14px",
                color: "var(--text-primary)",
              }}
            >
              A place to make things, together.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
              The Midnight Collective is a third space for curious makers, thinkers, and builders in the US — a community that gathers around craft, creativity, and conversation.
            </p>
          </PaperCard>

          <PaperCard
            initialX={cx - 120}
            initialY={cy - 160}
            initialRotation={1.5}
            width={260}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", margin: "0 0 10px" }}>
              What we do
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-primary)", margin: 0 }}>
              We host low-key, high-quality gatherings where people can slow down, pick up a project, and be around others who care about making things well.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-primary)", margin: "12px 0 0" }}>
              Think: working sessions, skill shares, and the occasional dinner where the table becomes a studio.
            </p>
          </PaperCard>

          <PaperCard
            initialX={cx + 180}
            initialY={cy - 80}
            initialRotation={-1}
            width={240}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", margin: "0 0 10px" }}>
              Who it&apos;s for
            </p>
            <ul style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-primary)", margin: 0, padding: "0 0 0 16px" }}>
              <li>Makers between projects</li>
              <li>Builders who want community</li>
              <li>Creatives seeking a real third space</li>
              <li>Anyone who thinks better with their hands</li>
            </ul>
          </PaperCard>

          <VideoCard
            initialX={cx - 420}
            initialY={cy + 100}
            initialRotation={1}
            width={340}
          />

          <PostcardCard
            initialX={cx + 180}
            initialY={cy + 120}
            initialRotation={-2.5}
            to="Say hello"
            message="We'd love to hear from you — whether you're curious about joining, want to collaborate, or just want to say hi."
            from="TMC"
            email="hello@themidnightcollective.co"
          />

          {/* ═══ CAMP MIDNIGHT CLUSTER (default view) ════════════ */}
          <CampMidnightSection cmX={cmX} cy={cy} />
        </>
      )}
    </InfiniteCanvas>
  );
}
