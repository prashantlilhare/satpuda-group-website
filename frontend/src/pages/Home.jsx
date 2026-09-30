// Old photo-wall hero, kept for now — swap back by un-commenting both lines.
// import { HeroSlider } from "../components/home/HeroSlider";
import { HomeHero } from "../components/home/HomeHero";
import { IntroSection } from "../components/home/IntroSection";
import { InstitutionsSection } from "../components/home/InstitutionsSection";
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
      <IntroSection />
      <InstitutionsSection />
      <ProgramsSection />
      <WhySection />
      <CampusSection />
      <FactsSection />
      <LeadershipSection />
      <CTASection />
    </>
  );
}
