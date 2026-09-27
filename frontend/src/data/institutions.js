import imgEngineering from "../assets/images/institutions/engineering.webp";
import imgIti from "../assets/images/institutions/iti.webp";
import imgEngineeringSmall from "../assets/images/institutions/engineering-700w.webp";
import imgItiSmall from "../assets/images/institutions/iti-700w.webp";
import { photo } from "./photos";
import { dedShots, schoolShots } from "./shots";

/**
 * The four institutions of Satpuda Group.
 * `established` is only set where a year is corroborated by an official source.
 */
export const institutions = [
  {
    id: "btech-polytechnic",
    to: "/institutes/btech-polytechnic",
    name: "Satpuda College of Engineering & Polytechnic",
    shortName: "Engineering & Polytechnic",
    kicker: "Degree & Diploma",
    image: imgEngineering,
    imageAlt:
      "The Satpuda College of Engineering & Polytechnic building seen across its front lawn",
    summary:
      "Four-year B.Tech degrees and three-year diploma programmes across five engineering disciplines, approved by AICTE and affiliated to RGPV Bhopal.",
    blurb:
      "Degree and diploma engineering across computing, mining, civil, mechanical and electrical disciplines.",
    credentials: [
      "Approved by AICTE, New Delhi",
      "Affiliated to RGPV, Bhopal",
      "Approved by DTE, Government of Madhya Pradesh",
    ],
    highlights: ["5 B.Tech branches", "5 diploma branches", "10-acre campus"],
    featured: true,
  },
  {
    id: "ded-bed",
    to: "/institutes/ded-bed",
    name: "Teacher Education — D.Ed & B.Ed",
    shortName: "D.Ed & B.Ed",
    kicker: "Teacher Education",
    image: dedShots.teaching.src,
    imageAlt: dedShots.teaching.alt,
    /* Thumbnail for the homepage list — the group's own photograph. */
    thumb: photo("0049", "A primary class presenting a science project", "50% 45%"),
    summary:
      "Preparation for a career in the classroom — pedagogy, child development, curriculum design and supervised teaching practice.",
    blurb: "Preparing teachers through pedagogy, child development and classroom practice.",
    credentials: [],
    highlights: ["Pedagogy & practice", "School internship", "Child development"],
    featured: false,
  },
  {
    id: "iti",
    to: "/institutes/iti",
    name: "Satpuda ITI, Garra",
    shortName: "ITI",
    kicker: "Vocational Training",
    image: imgIti,
    imageAlt: "Satpuda trainees on an industrial workshop floor during practical training",
    thumb: photo("0027", "An ITI trainee explaining a wiring board", "50% 45%"),
    summary:
      "Craftsman Training Scheme trades affiliated to NCVT — hands-on, job-oriented technical training for students after Class 10.",
    blurb: "NCVT trade training that puts tools in students' hands from day one.",
    established: 1999,
    credentials: [
      "Affiliated to NCVT / DGT",
      "Accredited by QCI, New Delhi",
    ],
    highlights: ["Electrician", "Fitter", "Mechanic Diesel", "COPA"],
    featured: false,
  },
  {
    id: "school",
    to: "/institutes/school",
    name: "Satpuda Valley Public School",
    shortName: "School",
    kicker: "CBSE · Co-educational",
    image: schoolShots.assemblyLines.src,
    imageAlt: schoolShots.assemblyLines.alt,
    thumb: photo("0052", "School students with a model of their campus", "50% 40%"),
    summary:
      "A CBSE-affiliated, co-educational school on the Satpuda campus, educating students in Balaghat since 2009.",
    blurb: "CBSE schooling with room for sport, culture and curiosity.",
    established: 2009,
    credentials: ["CBSE affiliated", "Co-educational"],
    highlights: ["Science & computer labs", "Sports & culture", "Library"],
    featured: false,
  },
];

export const getInstitution = (id) => institutions.find((i) => i.id === id);

/**
 * Group milestones — the steps the "How it grew" timeline scrubs through, in
 * order. `image` is reused from the same folder rather than duplicated, and
 * is only ever drawn small (the timeline token), so the 700w variant is
 * enough. Two milestones can share a year; the timeline keys them by title.
 */
/* A milestone picture from the campus photo library, carried with its
   srcset so the 64px token fetches the smaller file. */
function milestonePhoto(id, alt) {
  const p = photo(id, alt);
  return { image: p.src, imageSrcSet: p.srcSet, imageAlt: alt };
}

export const milestones = [
  {
    year: "1999",
    title: "Satpuda ITI, Garra",
    body: "Maharana Pratap Shikshan Samiti opens its first institution — an industrial training institute bringing NCVT trade certification to Balaghat.",
    image: imgItiSmall,
    imageAlt: "Trainees on the Satpuda ITI workshop floor",
  },
  {
    year: "2006",
    title: "D.Ed — teacher education begins",
    body: "The group starts preparing teachers, with a D.Ed programme for the foundational and primary years — pedagogy, child development and classroom practice.",
    image: dedShots.faculty.src,
    imageSrcSet: dedShots.faculty.srcSet,
    imageAlt: dedShots.faculty.alt,
  },
  {
    year: "2009",
    title: "B.Ed",
    body: "Teacher education extends to graduates, with a B.Ed programme preparing teachers for secondary and senior secondary classrooms.",
    image: dedShots.teaching.src,
    imageSrcSet: dedShots.teaching.srcSet,
    imageAlt: dedShots.teaching.alt,
  },
  {
    year: "2009",
    title: "Satpuda Valley Public School",
    body: "The same year, a CBSE-affiliated, co-educational school joins the group — and gives its trainee teachers real classrooms on their own campus.",
    image: schoolShots.assemblyLines.src,
    imageSrcSet: schoolShots.assemblyLines.srcSet,
    imageAlt: schoolShots.assemblyLines.alt,
  },
  {
    year: "2017",
    title: "Polytechnic",
    body: "Three-year diploma engineering arrives, approved by the Directorate of Technical Education, Madhya Pradesh — a technical route open straight after Class 10.",
    ...milestonePhoto("0037", "The electrical engineering laboratory in use"),
  },
  {
    year: "2022",
    title: "Engineering college",
    body: "The Manjhapur campus adds AICTE-approved B.Tech degrees, affiliated to RGPV Bhopal, across five engineering disciplines.",
    image: imgEngineeringSmall,
    imageAlt: "The Satpuda College of Engineering & Polytechnic building",
  },
];
