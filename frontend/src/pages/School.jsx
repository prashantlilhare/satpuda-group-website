import { useState } from "react";
import { CTASection } from "../components/shared/CTASection";
import { Lightbox } from "../components/shared/Lightbox";
import { SchoolCampus, SchoolCover, SchoolWisdom } from "../components/school/SchoolIntro";
import { SchoolGuidance, SchoolLabs, SchoolPhilosophy, SchoolRobotics } from "../components/school/SchoolLearning";
import { SchoolLegacy, SchoolLife, SchoolToppers } from "../components/school/SchoolPride";
import { SchoolCounselling, SchoolHouses } from "../components/school/SchoolAdmission";
import {
  schoolAbout,
  schoolAdmission,
  schoolCampus,
  schoolClasses,
  schoolClassPhotos,
  schoolCounselling,
  schoolCover,
  schoolGuidance,
  schoolHouses,
  schoolLabCutouts,
  schoolLabs,
  schoolLegacy,
  schoolLife,
  schoolPrincipal,
  schoolRobotics,
  schoolStages,
  schoolToppers,
  schoolVision,
} from "../data/school";
import { principals } from "../data/principals";
import { schoolShots } from "../data/shots";
import { useSeo } from "../hooks/useSeo";

/* The principal's round portrait, already on file. */
const portrait = { src: principals.school.portrait, alt: principals.school.portraitAlt };

/**
 * Satpuda Valley Public School, laid out page by page after its 2026
 * prospectus — cover and words of wisdom, then the results and toppers
 * brought forward, then campus, curriculum, guidance, robotics, school
 * life, labs, admission and houses.
 */
export default function School() {
  /* The photograph that was clicked, brought forward over a grey, blurred page. */
  const [viewing, setViewing] = useState(null);
  const onView = (frame, origin) => setViewing({ frame, origin });

  useSeo({
    title: "Satpuda Valley Public School",
    description:
      "Satpuda Valley Public School, Balaghat — CBSE-affiliated (No. 1030641), co-educational, Nursery to Class XII on the Satpuda campus at Garra since 2009.",
    path: "/institutes/school",
  });

  return (
    <>
      <SchoolCover {...schoolCover} />

      <SchoolWisdom
        principal={schoolPrincipal}
        portrait={portrait}
        vision={schoolVision.vision}
        mission={schoolVision.mission}
        photo={schoolVision.photo}
        values={schoolVision.values}
      />

      <SchoolLegacy {...schoolLegacy} onView={onView} />

      <SchoolToppers {...schoolToppers} />

      <SchoolCampus about={schoolAbout} aboutPhoto={schoolShots.groundAssembly} {...schoolCampus} />

      <SchoolPhilosophy stages={schoolStages} classes={schoolClasses} photos={schoolClassPhotos} onView={onView} />

      <SchoolGuidance items={schoolGuidance} />

      <SchoolRobotics {...schoolRobotics} banner={schoolShots.roboticsExpo} onView={onView} />

      <SchoolLife {...schoolLife} onView={onView} />

      <SchoolLabs labs={schoolLabs} cutouts={schoolLabCutouts} onView={onView} />

      <SchoolCounselling counselling={schoolCounselling} {...schoolAdmission} onView={onView} />

      <SchoolHouses
        {...schoolHouses}
        phones={schoolCover.phones}
        website={schoolCover.website}
        address={schoolCover.address}
        map={schoolCover.map}
      />

      {viewing && (
        <Lightbox frame={viewing.frame} origin={viewing.origin} onClose={() => setViewing(null)} tone="gray" />
      )}

      <CTASection
        eyebrow="School enquiries"
        title="Enquire about school admission."
        body="Tell us the class you are enquiring for and we will explain the admission process, the documents required and the dates for the coming session."
      />
    </>
  );
}
