import libraryStacks from "../assets/images/campus/library-stacks.webp";
import readingRoom from "../assets/images/campus/reading-room.webp";
import seminarHall from "../assets/images/campus/seminar-hall.webp";
import computerLab from "../assets/images/campus/computer-lab.webp";
import culture from "../assets/images/campus/culture.webp";
import campusAerial from "../assets/images/campus/campus-aerial.webp";
import workshop from "../assets/images/campus/workshop.webp";
import classroom from "../assets/images/campus/classroom.webp";
import campusFront from "../assets/images/campus/campus-front.webp";
import { shots } from "./shots";

export const campusImages = {
  libraryStacks,
  readingRoom,
  seminarHall,
  computerLab,
  culture,
  campusAerial,
  workshop,
  classroom,
  campusFront,
};

/* ------------------------------------------------------------------ */
/* VISION & MISSION — from the institution's published statements      */
/* ------------------------------------------------------------------ */

export const vision = {
  motto: "Innovate. Integrate. Inspire.",
  statement:
    "A future-forward campus that blends modern tools with human-centred teaching, preparing students for industry-relevant impact in a rapidly evolving world.",
};

export const mission = {
  motto: "Empower. Educate. Elevate.",
  statement:
    "To channel every learner toward their full potential through structured learning and hands-on exposure — so that they leave as confident, capable graduates who contribute with purpose.",
  points: [
    {
      title: "Empower",
      body: "Give students the technical grounding and the self-belief to act on it, whichever programme they enter through.",
    },
    {
      title: "Educate",
      body: "Teach a curriculum that stays current with industry, delivered by faculty who have practised what they teach.",
    },
    {
      title: "Elevate",
      body: "Open paths that were not previously available to students in this district — in work, in further study, and in enterprise.",
    },
  ],
};

export const values = [
  { title: "Excellence", body: "Striving for the highest standards in education and performance." },
  { title: "Innovation", body: "Encouraging creativity and new ideas that drive positive change." },
  { title: "Integrity", body: "Upholding honesty, ethical values and transparency." },
  { title: "Teamwork", body: "Believing in the power of collaboration and mutual respect." },
  { title: "Responsibility", body: "Committed to societal well-being and sustainable development." },
  { title: "Leadership", body: "Developing confident leaders ready to shape the future." },
];

/* ------------------------------------------------------------------ */
/* WHY SATPUDA                                                         */
/* ------------------------------------------------------------------ */

export const differentiators = [
  {
    title: "One group, four routes",
    body: "A student can enter at Class 1 and leave with a B.Tech — or arrive after Class 10 for a trade certificate. The group covers school, ITI, teacher education and engineering on one campus.",
  },
  {
    title: "Recognised qualifications",
    body: "Engineering programmes are approved by AICTE and affiliated to RGPV Bhopal; ITI trades are certified under NCVT; the school follows the CBSE curriculum.",
  },
  {
    title: "Practice before theory",
    body: "Laboratories, workshops and survey fieldwork are scheduled as core teaching time, not as demonstrations bolted onto a lecture course.",
  },
  {
    title: "Educating in Balaghat, since 1999",
    body: "Maharana Pratap Shikshan Samiti has run institutions in this district for over two decades — long enough for its graduates to be working across the region.",
  },
  {
    title: "A campus, not a building",
    body: "Ten acres carrying teaching blocks, laboratories, a library, sports grounds, workshop sheds and hostel facilities.",
  },
  {
    title: "Rooted in the region",
    body: "Mining engineering, electrical trades and diploma programmes reflect the industries that actually employ people around Balaghat.",
  },
];

/* ------------------------------------------------------------------ */
/* CAMPUS EXPERIENCE                                                   */
/* ------------------------------------------------------------------ */

export const campusExperience = [
  {
    title: "Libraries & reading rooms",
    body: "Open reference stacks, departmental collections and quiet reading desks.",
    image: shots.library.src,
    alt: shots.library.alt,
  },
  {
    title: "Laboratories & workshops",
    body: "Computing, electrical, civil, mechanical and mining laboratories, plus trade workshops for ITI students.",
    image: shots.mechEngineLab.src,
    alt: shots.mechEngineLab.alt,
  },
  {
    title: "Seminars & industry exposure",
    body: "Talks, technical sessions and industry visits that connect coursework to how the work is actually done.",
    image: seminarHall,
    alt: "A full seminar hall of students during a technical session",
  },
  {
    title: "Sport & campus life",
    body: "Courts, grounds and an indoor hall in regular use — kabaddi, cricket, athletics and indoor games.",
    image: shots.kabaddi.src,
    alt: shots.kabaddi.alt,
  },
];
