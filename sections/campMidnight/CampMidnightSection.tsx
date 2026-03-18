"use client";

import { useEffect, useRef, useState } from "react";
import HeaderCard from "@/components/cards/HeaderCard";
import PaperCard from "@/components/cards/PaperCard";
import PostcardCard from "@/components/cards/PostcardCard";
import VideoCard from "@/components/cards/VideoCard";
import Stamp, { StampVariation } from "@/components/tools/Stamp";

const postCardMessage = `Oftentimes, our lives get too noisy for us to dive deeply into exploring our hobbies. There's always too much noise with school, and work is always pilling up, and here is your opportunity to start fresh. Our ultimate goal is to carve out uninterrupted time for people like you and I. This time will allow us to unapologetically pursue our passions, dive deeply to satisfy our curiosity, and collaborate with others too.

With this retreat, we’re creating a safe environment where you can explore freely, untethered from distractions and everyday worries. Here are a few, but not all of the themes we'll explore:
- The value of play in an optimized world
- The beauty of constraint
- The commodification of human capability
- The role of social media in [politics/art/relationships/identity]
- Analog rituals in a digital world
- Erosion of nature by human progress

You can engage with these themes in any way you see fit, whether working on a project, demonstrating action, reflecting on lifestyle, or anything in between. We'll also participate in activities to grow deeper connections with new friends. These are just a few things that we will do, the rest will await you. 
`;

const returnWithScale = (value: number, scale: number) => {
  return value * scale;
}

export default function CampMidnightSection({ cmX, cy, headerX, headerY, showHeader = false, handleNavClick, scale }: { cmX: number, cy: number, headerX: number, headerY: number, showHeader?: boolean, handleNavClick: (section: string) => void, scale: number } ) {

  const [detailsTrigger, setDetailsTrigger] = useState(0);
  const [applyTrigger, setApplyTrigger] = useState(0);
  const hasAnimated = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cancelIdle = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    const scheduleIdle = () => {
      cancelIdle();
      timerRef.current = setTimeout(async () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        // Remove listeners — animation fires once, user interaction won't re-cancel
        window.removeEventListener("pointermove", cancelIdle);
        window.removeEventListener("pointerdown", cancelIdle);
        setDetailsTrigger(t => t + 1);
        await new Promise<void>(r => setTimeout(r, 1400));
        setApplyTrigger(t => t + 1);
      }, 3000);
    };
    window.addEventListener("pointermove", cancelIdle);
    window.addEventListener("pointerdown", cancelIdle);
    scheduleIdle();

    return () => {
      cancelIdle();
      window.removeEventListener("pointermove", cancelIdle);
      window.removeEventListener("pointerdown", cancelIdle);
    };
  }, []);

  const onClickApply = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSe-Udpf6Mb8JOM2mKKGya9LussRHR1cwCWBijuNzUdY4h24XQ/viewform?usp=sharing&ouid=107657121064593991167", "_blank");
  };

  return (
    <div>
      {/* CM Postcard */}
      <PostcardCard
        initialX={cmX}
        initialY={cy}
        initialRotation={2}
        to="Interested?"
        message={postCardMessage}
        from="Camp Midnight"
        email="camp@themidnightcollective.co"
      />

      {showHeader && (
          <HeaderCard
          initialX={headerX}
          initialY={headerY}
          wordmark="The Midnight Collective"
          onNavClick={handleNavClick}
          />
      )}

      {/* CM About */}
      <PaperCard
        initialX={cmX + 300 * scale}
        initialY={returnWithScale(cy, scale)}
        initialRotation={2}
        width={390}
      >
        <p className="subheader mb-2">
          What to expect
        </p>
        <p className="body mb-2">
          Feel like you are getting overwhelmed with school, life, the political and economic state of the world?
        </p>
        <p className="body">
        Give yourself a weekend getaway on at Camp Midnight to divulge in your interests and discover new passions, all while getting to meet new friends that think the same way too.
        </p>
      </PaperCard>

      <Stamp
        initialX={cmX + 1000}
        initialY={cy + 200}
        initialRotation={2}
        variation={StampVariation.BRITISH}
      />

      {/* CM Video */}
      {/* <VideoCard
        initialX={cmX + 70}
        initialY={cy + 50}
        initialRotation={-1}
        srcUrl={undefined}
        width={360}
      /> */}

      {/* CM Details */}
      <PaperCard
        initialX={cmX + 550}
        initialY={returnWithScale(cy, scale) - 270}
        initialRotation={2}
        width={390}
        idleTrigger={detailsTrigger}
      >
        <p className="subheader mb-2">
          Details:
        </p>
        <p className="body">
          - Dates: April 3-5th
        </p>
        <p className="body">
          - Location: 2hr drive from Ann Arbor, MI
        </p>
        <p className="body">
          - Price: $60-80, all inclusive
        </p>
      </PaperCard>

      <PaperCard
        initialX={cmX + 100}
        initialY={returnWithScale(cy, scale) - 300}
        initialRotation={-1.5}
        width={320}
        ruled={true}
      >
        <p className="header mb-2">
          Camp Midnight
        </p>
      </PaperCard>

      {/* Apply Card */}
      <PaperCard
        initialX={cmX + 360 * scale}
        initialY={returnWithScale(cy, scale) - 200}
        initialRotation={-1.5}
        width={320}
        ruled={true}
        idleTrigger={applyTrigger}
      >
        <div onClick={onClickApply}>
          <p className="header mb-2 cursor-pointer" style={{ textDecoration: "underline", textDecorationColor: "var(--accent-sage)" }}>
            Come along for the ride. Apply here.
          </p>
        </div>
      </PaperCard>
    </div>
  );
}