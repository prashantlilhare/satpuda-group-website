import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { GrowthTimeline } from "./GrowthTimeline";
import { stagger } from "../ui/stagger";

export function FactsSection() {
  return (
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* ---------- the journey, in brief ---------- */}
            <div className="lg:sticky-aside">
              <Reveal>
                <Eyebrow>Our journey</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-md text-white">
                  From one ITI to twelve locations.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
                  Maharana Pratap Shikshan Samiti was founded on 15 December 1998 by
                  educationists and experienced industrialists, to bring quality vocational and
                  technical training to students from rural and urban Madhya Pradesh. Its first
                  ITI opened the next year.
                </p>
              </Reveal>
              <Reveal delay={stagger(3)}>
                <p className="mt-6 text-[0.8125rem] text-white/45">
                  Society with all-India jurisdiction · Reg. No. JBP-4033
                </p>
              </Reveal>
            </div>

            {/* ---------- milestones ---------- */}
            <div className="lg:border-l lg:border-white/12 lg:pl-10">
              <GrowthTimeline />
            </div>
          </div>
        </div>
      </section>
  );
}
