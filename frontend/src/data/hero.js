import campus1920 from "../assets/images/hero/hero-01-campus.webp";
import campus1280 from "../assets/images/hero/hero-01-campus-1280w.webp";
import campus800 from "../assets/images/hero/hero-01-campus-800w.webp";

import convo1920 from "../assets/images/hero/hero-02-convocation.webp";
import convo1280 from "../assets/images/hero/hero-02-convocation-1280w.webp";
import convo800 from "../assets/images/hero/hero-02-convocation-800w.webp";

import lab1920 from "../assets/images/hero/hero-03-laboratory.webp";
import lab1280 from "../assets/images/hero/hero-03-laboratory-1280w.webp";
import lab800 from "../assets/images/hero/hero-03-laboratory-800w.webp";

import students1920 from "../assets/images/hero/hero-04-students.webp";
import students1280 from "../assets/images/hero/hero-04-students-1280w.webp";
import students800 from "../assets/images/hero/hero-04-students-800w.webp";

import library1920 from "../assets/images/hero/hero-05-library.webp";
import library1280 from "../assets/images/hero/hero-05-library-1280w.webp";
import library800 from "../assets/images/hero/hero-05-library-800w.webp";

const srcSet = (w800, w1280, w1920) =>
  `${w800} 800w, ${w1280} 1280w, ${w1920} 1920w`;

export const heroSlides = [
  {
    id: "campus",
    src: campus1920,
    srcSet: srcSet(campus800, campus1280, campus1920),
    alt: "The Satpuda College of Engineering & Polytechnic building, viewed from its front approach",
    eyebrow: "Satpuda Group · Balaghat",
    title: ["Empowering education.", "Building futures."],
    body: "From school education to technical and professional learning, Satpuda Group creates opportunities for students to learn, grow and build meaningful careers.",
    focus: "50% 62%",
  },
  {
    id: "convocation",
    src: convo1920,
    srcSet: srcSet(convo800, convo1280, convo1920),
    alt: "Satpuda graduates throwing their caps in the air on the campus lawn",
    eyebrow: "Four institutions · One campus",
    title: ["A degree that", "travels with them."],
    body: "Degree and diploma engineering approved by AICTE and affiliated to RGPV Bhopal, taught on a campus built for practice as much as theory.",
    focus: "50% 45%",
  },
  {
    id: "laboratory",
    src: lab1920,
    srcSet: srcSet(lab800, lab1280, lab1920),
    alt: "Students gathered around an electrical measurement bench during a laboratory session",
    eyebrow: "Learning by doing",
    title: ["Tools in hand,", "from day one."],
    body: "Laboratories and workshops sit at the centre of the timetable — in engineering, in the polytechnic, and on the ITI trade floor.",
    focus: "55% 45%",
  },
  {
    id: "students",
    src: students1920,
    srcSet: srcSet(students800, students1280, students1920),
    alt: "Satpuda students walking through campus past the college bus",
    eyebrow: "Since 1999",
    title: ["Rooted in Balaghat.", "Built for beyond."],
    body: "Maharana Pratap Shikshan Samiti has been educating students in this district for more than two decades, across school, trade and technical education.",
    focus: "50% 50%",
  },
  {
    id: "library",
    src: library1920,
    srcSet: srcSet(library800, library1280, library1920),
    alt: "The Satpuda smart library, with reading desks, catalogue terminals and open shelving",
    eyebrow: "सा विद्या या विमुक्तये",
    title: ["Knowledge is what", "sets you free."],
    body: "The words on our emblem are the standard we hold ourselves to: an education that genuinely widens what a student is able to choose.",
    focus: "50% 50%",
  },
];
