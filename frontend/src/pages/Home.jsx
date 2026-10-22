// Old photo-wall hero, kept for now — swap back by un-commenting both lines.
// import { HeroSlider } from "../components/home/HeroSlider";
import { HomeHero } from "../components/home/HomeHero";
import { IntroSection } from "../components/home/IntroSection";
import { GroupScale } from "../components/home/GroupScale";
import { AchievementsSection } from "../components/home/AchievementsSection";
import { PlacementReach } from "../components/home/PlacementReach";
import { InstitutionsSection } from "../components/home/InstitutionsSection";
import { ItiNetworkSection } from "../components/home/ItiNetworkSection";
import { ProgramsSection } from "../components/home/ProgramsSection";
import { WhySection } from "../components/home/WhySection";
import { CampusSection } from "../components/home/CampusSection";
import { FactsSection } from "../components/home/FactsSection";
import { LeadershipSection } from "../components/home/LeadershipSection";
import { CTASection } from "../components/shared/CTASection";
import { useSeo } from "../hooks/useSeo";

export default function Home() {
  useSeo({
    title: "School, ITI, Teacher Education & Engineering in Balaghat",
    description:
      "Satpuda Group, Balaghat — four institutions spanning CBSE schooling, NCVT trade training, teacher education and AICTE-approved engineering. Run by Maharana Pratap Shikshan Samiti.",
    path: "/",
  });

  return (
    <>
      {/* <HeroSlider /> */}
      <HomeHero />
      {/* Proof first: what students go on to do, and where they are hired. */}
      <AchievementsSection />
      <PlacementReach />
      {/* Then the group in figures, and the institutions behind them. */}
      <GroupScale />
      <InstitutionsSection />
      {/* The ITIs across the state, then what to study and how to get in. */}
      <ItiNetworkSection />
      <ProgramsSection />
      {/* The story, the campus and the people. */}
      <IntroSection />
      <FactsSection />
      <CampusSection />
      <WhySection />
      <LeadershipSection />
      <CTASection />
    </>
  );
}
