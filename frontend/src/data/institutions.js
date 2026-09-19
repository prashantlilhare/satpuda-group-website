import imgEngineering from "../assets/images/institutions/engineering.webp";
import imgTeacherEd from "../assets/images/institutions/teacher-education.webp";
import imgIti from "../assets/images/institutions/iti.webp";
import imgSchool from "../assets/images/institutions/school.webp";
import imgEngineeringSmall from "../assets/images/institutions/engineering-700w.webp";
import imgTeacherEdSmall from "../assets/images/institutions/teacher-education-700w.webp";
import imgItiSmall from "../assets/images/institutions/iti-700w.webp";
import imgSchoolSmall from "../assets/images/institutions/school-700w.webp";

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
    highlights: ["5 B.Tech branches", "4 diploma branches", "10-acre campus"],
    featured: true,
  },
  {
    id: "ded-bed",
    to: "/institutes/ded-bed",
    name: "Teacher Education — D.Ed & B.Ed",
    shortName: "D.Ed & B.Ed",
    kicker: "Teacher Education",
    image: imgTeacherEd,
    imageAlt: "Students seated in a Satpuda classroom during a teaching session",
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
    image: imgSchool,
    imageAlt: "Satpuda students playing basketball on the campus sports court",
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
 * Group milestones — the four steps the "How it grew" timeline scrubs
 * through, in order. Copy is drawn from the institution entries above;
 * `image` is reused from the same folder rather than duplicated, and is
 * only ever drawn small (the timeline token), so the 700w variant is
 * enough.
 */
export const milestones = [
  {
    year: "1999",
    title: "Satpuda ITI, Garra",
    body: "Maharana Pratap Shikshan Samiti opens its first institution — an industrial training institute bringing NCVT trade certification to Balaghat.",
    image: imgItiSmall,
    imageAlt: "Trainees on the Satpuda ITI workshop floor",
  },
  {
    year: "2009",
    title: "Satpuda Valley Public School",
    body: "A CBSE-affiliated, co-educational school joins the group, extending its work from vocational training into foundational schooling.",
    image: imgSchoolSmall,
    imageAlt: "Satpuda Valley Public School students on the campus sports court",
  },
  {
    year: "2016",
    title: "D.Ed & B.Ed",
    body: "Teacher education joins the group — pedagogy, child development, curriculum design and supervised classroom practice.",
    image: imgTeacherEdSmall,
    imageAlt: "A teacher education session in a Satpuda classroom",
  },
  {
    year: "2022",
    title: "Engineering & Polytechnic",
    body: "The Manjhapur campus adds AICTE-approved degree and diploma engineering, affiliated to RGPV Bhopal, across five disciplines.",
    image: imgEngineeringSmall,
    imageAlt: "The Satpuda College of Engineering & Polytechnic building",
  },
];
