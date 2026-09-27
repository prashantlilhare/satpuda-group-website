import imgEngineering from "../assets/images/institutions/engineering.webp";
import imgIti from "../assets/images/institutions/iti.webp";
import { photo } from "./photos";
import { dedShots, schoolShots } from "./shots";

/**
 * The About page's story, told as chapters.
 *
 * Built from the same facts as `milestones` in `institutions.js` — the two
 * 2009 steps are one chapter here, because they happened together and one
 * explains the other. `adds` is the qualification the chapter opened up; the
 * story's range of hills grows by one peak for each.
 */
export const storyChapters = [
  {
    year: "1999",
    place: "Garra, Balaghat",
    title: "It begins on a workshop floor.",
    before: "A recognised trade meant leaving home for it.",
    after: "NCVT trade certification, in Balaghat.",
    body: "Maharana Pratap Shikshan Samiti opens Satpuda ITI at Garra. Balaghat sits in a mineral belt with real industrial demand, and the trades it certified — electrician, fitter, diesel mechanic — were the ones local employers were actually hiring for.",
    adds: "Trade certificate",
    image: imgIti,
    imageAlt: "Satpuda trainees on an industrial workshop floor during practical training",
  },
  {
    year: "2006",
    place: "Teacher education",
    title: "Then the group starts training teachers.",
    before: "An institute that taught trades.",
    after: "An institute that also prepares the people who teach.",
    body: "A D.Ed programme opens for the foundational and primary years — pedagogy, child development and classroom practice. It is the first time the trust's work reaches beyond the workshop, and into the classroom.",
    adds: "D.Ed",
    image: dedShots.faculty.src,
    imageSrcSet: dedShots.faculty.srcSet,
    imageAlt: dedShots.faculty.alt,
    imageFocus: dedShots.faculty.focus,
  },
  {
    year: "2009",
    place: "School & B.Ed",
    title: "A school, and teachers to go with it.",
    before: "Teachers trained here had to find classrooms elsewhere.",
    after: "Real classrooms on their own campus, from Class 1.",
    body: "In the same year, B.Ed extends teacher education to graduates, and Satpuda Valley Public School — CBSE-affiliated and co-educational — joins the group. The trust's work now reaches back to the very start of a student's education.",
    adds: "B.Ed · CBSE school",
    image: schoolShots.assemblyLines.src,
    imageSrcSet: schoolShots.assemblyLines.srcSet,
    imageAlt: schoolShots.assemblyLines.alt,
    imageFocus: schoolShots.assemblyLines.focus,
  },
  {
    year: "2017",
    place: "Polytechnic",
    title: "Engineering arrives — straight after Class 10.",
    before: "After Class 10, a trade was the only technical route here.",
    after: "A three-year engineering diploma, on the same campus.",
    body: "Diploma engineering opens, approved by the Directorate of Technical Education, Madhya Pradesh. Laboratories go up alongside the workshops, and a Class 10 leaver now has a second technical road to choose from.",
    adds: "Diploma engineering",
    ...pic(photo("0037", "The electrical engineering laboratory in use")),
  },
  {
    year: "2022",
    place: "Manjhapur campus",
    title: "And finally, a degree.",
    before: "An engineering degree meant another city.",
    after: "An AICTE-approved B.Tech, at home in Balaghat.",
    body: "The Manjhapur campus adds B.Tech degrees across five engineering disciplines, approved by AICTE and affiliated to RGPV Bhopal. The ladder is complete: a student can walk in at Class 1 and walk out an engineer.",
    adds: "B.Tech degree",
    image: imgEngineering,
    imageAlt: "The Satpuda College of Engineering & Polytechnic building",
  },
];

function pic(p) {
  return { image: p.src, imageSrcSet: p.srcSet, imageAlt: p.alt, imageFocus: p.focus };
}

/** The prologue's photo grid — the campus as it is used now (one tall frame, two small). */
export const prologuePhotos = [
  photo("0064", "Trainees seated together in the ITI workshop hall", "50% 45%"),
  photo("0049", "Class III students presenting their science project"),
  photo("0046", "A collaborative robot arm being demonstrated in the robotics laboratory"),
];

/**
 * Then and now — only counts that can be checked against the chapters.
 * Each row reads left to right: where we started in 1999 → where we are today.
 * `then` may be a word (e.g. "Day one") when a number would read as zero.
 */
export const thenNow = [
  {
    label: "Institutions",
    then: "1",
    thenUnit: "institute",
    now: "4",
    nowUnit: "institutions",
    change: "+3 added",
    sub: "Began as a single ITI. Today: ITI, teacher-education college, CBSE school and engineering college.",
  },
  {
    label: "Courses offered",
    then: "1",
    thenUnit: "course",
    now: "6",
    nowUnit: "courses",
    change: "+5 added",
    sub: "ITI trades, D.Ed, B.Ed, CBSE schooling, diploma and B.Tech.",
  },
  {
    label: "Years of service",
    then: "Day one",
    thenUnit: "opened in 1999",
    now: String(new Date().getFullYear() - 1999),
    nowUnit: "years",
    change: "and counting",
    sub: "Teaching students in Balaghat without a break since 1999.",
  },
];
