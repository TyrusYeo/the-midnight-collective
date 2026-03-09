"use client";

import { useEffect, useState } from "react";
import InfiniteCanvas from "@/components/canvas/InfiniteCanvas";
import HeaderCard from "@/components/cards/HeaderCard";
import FooterCard from "@/components/cards/FooterCard";
import PaperCard from "@/components/cards/PaperCard";
import VideoCard from "@/components/cards/VideoCard";
import PostcardCard from "@/components/cards/PostcardCard";

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
  }, []);
  return vp;
}

export default function Home() {
  const { w, h } = useViewport();

  // Header/footer appear viewport-aligned on load
  const headerX = w / 2 - 210;
  const headerY = 28;
  const footerX = w / 2 - 210;
  const footerY = h - 56;

  // TMC cluster center
  const cx = w / 2;
  const cy = h / 2;

  // Camp Midnight cluster (to the right)
  const cmX = w + 200;

  return (
    <InfiniteCanvas>
      {() => (
        <>
          {/* ── HEADER ─────────────────────────────────────────── */}
          <HeaderCard
            initialX={headerX}
            initialY={headerY}
            wordmark="The Midnight Collective"
          />

          {/* ── FOOTER ─────────────────────────────────────────── */}
          <FooterCard
            initialX={footerX}
            initialY={footerY}
          />

          {/* ── PAPER CARD 1: Hero tagline ───────────────────────*/}
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

          {/* ── PAPER CARD 2: What it is ─────────────────────────*/}
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

          {/* ── PAPER CARD 3: Who ────────────────────────────────*/}
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

          {/* ── VIDEO CARD ───────────────────────────────────────*/}
          <VideoCard
            initialX={cx - 420}
            initialY={cy + 100}
            initialRotation={1}
            videoId="dQw4w9WgXcQ"
            label="A glimpse into TMC"
            width={340}
          />

          {/* ── POSTCARD: Contact ────────────────────────────────*/}
          <PostcardCard
            initialX={cx + 180}
            initialY={cy + 120}
            initialRotation={-2.5}
            to="Say hello"
            message="We'd love to hear from you — whether you're curious about joining, want to collaborate, or just want to say hi."
            from="TMC"
            email="hello@themidnightcollective.co"
          />

          {/* ═══ CAMP MIDNIGHT CLUSTER ═══════════════════════════ */}

          {/* CM Title paper */}
          <PaperCard
            initialX={cmX + 80}
            initialY={cy - 260}
            initialRotation={-1.5}
            width={320}
            ruled={false}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", margin: "0 0 8px" }}>
              A program by TMC
            </p>
            <p
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontSize: 32,
                margin: "0 0 10px",
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              Camp Midnight
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
              An overnight retreat for makers who need to get away, make something, and come back changed.
            </p>
          </PaperCard>

          {/* CM About */}
          <PaperCard
            initialX={cmX + 440}
            initialY={cy - 190}
            initialRotation={2}
            width={260}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", margin: "0 0 10px" }}>
              What to expect
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-primary)", margin: 0 }}>
              Three days, a handful of people, no agenda except to make. Workshops, open studio time, communal meals, and nights that stretch longer than planned.
            </p>
          </PaperCard>

          {/* CM Video */}
          <VideoCard
            initialX={cmX + 70}
            initialY={cy + 50}
            initialRotation={-1}
            videoId="dQw4w9WgXcQ"
            label="Camp Midnight — 2024"
            width={360}
          />

          {/* CM Postcard */}
          <PostcardCard
            initialX={cmX + 460}
            initialY={cy + 80}
            initialRotation={2}
            to="Interested?"
            message="Camp Midnight runs twice a year. Spots are small and fill quickly. Reach out to get on the list."
            from="Camp Midnight"
            email="camp@themidnightcollective.co"
          />
        </>
      )}
    </InfiniteCanvas>
  );
}
