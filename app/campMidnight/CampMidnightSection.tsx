import PaperCard from "@/components/cards/PaperCard";
import PostcardCard from "@/components/cards/PostcardCard";
import VideoCard from "@/components/cards/VideoCard";

const postCardMessage = `Oftentimes, our lives get too noisy for us to dive deeply into exploring our hobbies. 
There's always too much noise with school, and work is always pilling up, and here is your opportunity to start fresh.
Our ultimate goal is to carve out uninterrupted time for people like you and I. This time will allow us to unapologetically
pursue our passions, dive deeply to satisfy our curiosity, and collaborate with others too.

With this retreat, we’re creating a safe environment where you can explore freely, untethered from distractions and everyday worries. Here are a few, but not all of the themes we'll explore:

Analog rituals in a digital world
What role should social media play in society
The beauty of constraint
How much space should politics take up in our lives
The place of automation in the future
Beauty of the mundane
Besides working on things that addresses these themes, you will engage in activities to grow deeper connections with other creators. Jam out with the people in your car. Give a presentation why you'd be a great presidential candidate. Show people how to make french-styled scrambled eggs. These are just a few things that we will do, the rest will await you. `;

export default function CampMidnightSection({ cmX, cy }: { cmX: number, cy: number } ) {
  return (
    <div>
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
            srcUrl={undefined}
            width={360}
          />

          {/* CM Postcard */}
          <PostcardCard
            initialX={cmX + 460}
            initialY={cy + 80}
            initialRotation={2}
            to="Interested?"
            message={postCardMessage}
            from="Camp Midnight"
            email="camp@themidnightcollective.co"
          />
    </div>
  );
}