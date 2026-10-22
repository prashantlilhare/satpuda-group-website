/* ------------------------------------------------------------------ */
/* SATPUDA VALLEY PUBLIC SCHOOL — the 2026 prospectus, page by page    */
/* ------------------------------------------------------------------ */

/*
 * Everything on the School page, in the prospectus's own order. Copy is
 * the prospectus's, tidied for grammar; the photographs are lifted from it
 * (`assets/images/school/`) or reuse the gallery set in `shots.js`.
 */

import { schoolShots } from "./shots";

const files = import.meta.glob("../assets/images/school/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (name) => files[`../assets/images/school/${name}.webp`];

/** One prospectus photograph — the same shape as `shot()` in `shots.js`. */
const pic = (name, alt, focus = "50% 50%") => ({ id: name, src: img(name), alt, focus });

/* ---------------- p.1 — the cover ---------------- */

export const schoolCover = {
  tagline: "Shaping Futures",
  affiliation: "1030641",
  building: pic("building", "The four-storey Satpuda Valley Public School building across its green playing field", "50% 72%"),
  phones: [
    { label: "+91 62626 04114", href: "tel:+916262604114" },
    { label: "+91 62626 04115", href: "tel:+916262604115" },
  ],
  website: { label: "www.satpudavalleyschool.com", href: "https://satpudavalleyschool.com/" },
  instagram: { label: "/satpuda_valley_public_school", href: "https://www.instagram.com/satpuda_valley_public_school/" },
  address: "Satpuda Campus, Lalburra Road, Garra, Balaghat (M.P.)",
  map: "https://www.google.com/maps/search/?api=1&query=Satpuda%20Valley%20Public%20School%2C%20Garra%2C%20Balaghat",
};

/* ---------------- p.2 — words of wisdom ---------------- */

export const schoolPrincipal = {
  name: "Poornima Deshmukh",
  qualifications: "M.Sc (Biotech Honours), M.Ed",
  message:
    "A well-trained, dedicated and motivated teaching staff is the key to quality education. Their ability lets every child build sound academics and a logical approach to solving problems. We keep classes small to ensure individual attention and close supervision. The bond between teacher and pupil doesn't end with the class: besides regular parent–teacher meetings, our teachers stay in touch with parents, building a better understanding among all — and a new depth to the teacher–pupil–parent relationship.",
};

export const schoolVision = {
  vision: {
    line: "Empowering learners with knowledge, culture & confidence",
    body: "To direct and channel the energy of every aspiring individual towards exploring the potential of excellence, to the highest level of application.",
  },
  mission: {
    line: "Shaping future leaders through holistic education",
    body: "To continuously strive to provide the latest tools and techniques in a hybrid educational environment.",
  },
  /* the hexagon at the centre of the page */
  photo: pic("vision-writing", "A young student writing carefully in his notebook", "50% 40%"),
  values: [
    { title: "Respect", body: "We nurture mutual respect, empathy and kindness in every child.", photo: pic("value-team", "Girls of the school team holding up their trophy and medals", "50% 40%") },
    { title: "Curiosity", body: "We inspire young minds to question, explore and discover the world with wonder.", photo: pic("value-speaker", "A student speaking into a microphone at a school event", "50% 35%") },
    { title: "Integrity", body: "We believe in doing what is right — always, even when no one is watching.", photo: pic("value-reading", "Students reading together at the library table", "50% 50%") },
    { title: "Resilience", body: "We empower students to rise through challenges with courage and confidence.", photo: schoolShots.stateFootball },
  ],
};

/* ---------------- p.3 — the school campus ---------------- */

export const schoolAbout =
  "Founded in 2009 by Maharana Pratap Shikshan Samiti, a non-profit trust, Satpuda Valley Public School has grown into a benchmark institution in Balaghat — rooted in Indian values with a modern outlook, and defined by academic brilliance, holistic education and nation-building through youth empowerment.";

export const schoolCampus = {
  line: "A campus that feels like a second home, encouraging learning beyond classrooms.",
  /* three circles joined by a line, each with the facilities beside it */
  stops: [
    {
      photo: pic("campus-library", "Students reading at the library tables between tall bookshelves", "50% 45%"),
      items: ["5-acre pollution-free campus", "Smart & digitally enabled classrooms", "Football, athletics & cricket ground"],
    },
    {
      photo: schoolShots.chess,
      items: ["Kindergarten play area", "Basketball court", "Indoor play area", "Safe & secure school transport"],
    },
    {
      photo: pic("campus-classroom", "A senior class at their desks in a bright classroom", "50% 50%"),
      items: ["Advanced library & knowledge hub", "Indoor activity & innovation spaces", "Safe, CCTV-monitored campus"],
    },
  ],
};

/* ---------------- p.4 — academic philosophy & curriculum ---------------- */

export const schoolStages = [
  { title: "Foundation", span: "Pre-primary to Class II", line: "Laying the building blocks" },
  { title: "Development", span: "Class III to V", line: "Strengthening concepts and skills" },
  { title: "Exploration", span: "Class VI to X", line: "Expanding horizons and analytical thinking" },
  { title: "Career & choice", span: "Class XI & XII", line: "Focusing on goals and real-world readiness" },
];

/* Every class and the one thing it works on; `stage` indexes `schoolStages`. */
export const schoolClasses = [
  { cls: "Nursery", focus: "Curiosity & exploration", stage: 0 },
  { cls: "KG-I & KG-II", focus: "Imagination & play", stage: 0 },
  { cls: "Class I", focus: "Confidence & communication", stage: 0 },
  { cls: "Class III", focus: "Concept clarity", stage: 1 },
  { cls: "Class IV", focus: "Logical thinking", stage: 1 },
  { cls: "Class V", focus: "Problem solving", stage: 1 },
  { cls: "Class VI", focus: "Analytical skills", stage: 2 },
  { cls: "Class VII", focus: "Collaboration & teamwork", stage: 2 },
  { cls: "Class VIII", focus: "Self-learning & initiative", stage: 2 },
  { cls: "Class IX", focus: "Academic focus", stage: 2 },
  { cls: "Class X", focus: "Performance & revision", stage: 2 },
  { cls: "Class XI–XII", focus: "Career readiness & leadership", stage: 3 },
];

export const schoolClassPhotos = [
  { ...schoolShots.stageFoundation, caption: "Pre-primary" },
  { ...schoolShots.stageDevelopment, caption: "Road-safety day" },
  { ...schoolShots.stageSenior, caption: "Our classrooms" },
  { ...schoolShots.penchTrip, caption: "Pench National Park trip" },
  { ...schoolShots.stateFootball, caption: "State football team" },
];

/* ---------------- p.5 — right guidance, bright future ---------------- */

export const schoolGuidance = [
  {
    title: "Career Guidance",
    body: "Personalised career counselling guides students to the right path for their interests and strengths — with clarity, confidence and direction.",
    photo: pic("guide-career", "A counsellor addressing senior students at a career guidance session", "50% 40%"),
  },
  {
    title: "Panel Discussions",
    body: "Experts bring real-world perspective to students, encouraging critical thinking, open dialogue and informed decisions.",
    photo: pic("guide-panel", "A panel of experts on stage discussing future job roles at the annual function", "50% 50%"),
  },
  {
    title: "Parent Counselling",
    body: "Regular sessions strengthen the link between school and home, helping parents understand and support their child's growth.",
    photo: pic("guide-parent", "Parents seated in a classroom for a counselling session", "50% 50%"),
  },
];

/* ---------------- p.6 — robotics & coding ---------------- */

export const schoolRobotics = {
  robot: img("robot"),
  points: ["Robotics & coding programmes", "Hands-on STEM learning", "Innovation & problem solving"],
  /* The IoT & robotics exhibition, held at the school with Connect Shiksha */
  expo: "Balaghat's Future Innovators — IoT & Robotics Exhibition",
  photos: [
    { ...schoolShots.robotArm, caption: "A robotic arm, wired up" },
    pic("robo-1", "Guests watching students demonstrate their exhibition model", "50% 45%"),
    pic("robo-2", "A student explaining her smart-home model to a judge", "50% 45%"),
    pic("robo-3", "Students and guests gathered round a project at the exhibition", "50% 45%"),
  ],
};

/* ---------------- p.7 — vibrant school life ---------------- */

export const schoolLife = {
  events: ["Annual Function", "Sports Meet", "Cultural Events", "Swadeshi Mela", "Rotary Event"],
  photos: [
    { ...pic("life-annual", "Junior students performing on stage at the Rajat Jayanti annual function", "50% 40%"), caption: "Annual Function" },
    { ...pic("life-stage", "Students and teachers on stage under umbrellas at a cultural night", "50% 50%"), caption: "Cultural night" },
    { ...pic("life-parakh", "Girls performing a group song at the Parakh Sanstha event", "50% 40%"), caption: "Cultural Events" },
    { ...pic("life-welcome", "Girls in white and red lined up to welcome guests", "50% 40%"), caption: "Welcome ceremony" },
    { ...pic("life-ground", "Students and a blackboard stall out on the school ground", "50% 50%"), caption: "On the school ground" },
    { ...schoolShots.sportsDay, caption: "Sports day march-past" },
    { ...schoolShots.rotaryEvent, caption: "Rotary Event" },
    { ...schoolShots.sportsMeet, caption: "JAZBA Sports Meet" },
  ],
};

/* ---------------- p.8 — a legacy of success ---------------- */

export const schoolLegacy = {
  rimc: {
    name: "Varna Bisen",
    cls: "Class VIII",
    photo: img("rimc-varna"),
    body: "A landmark achievement at Rashtriya Indian Military College, Dehradun, 2025 — the only seat from the whole of Madhya Pradesh.",
  },
  groups: [
    {
      title: "Navodaya selections",
      names: ["Hardik Katre", "Ishaan Ganveer", "Jeet Bisen", "Samar Rahangdale", "Chinmay Soni", "Dimple Katre", "Harsh Tilase (IX)"],
    },
    {
      title: "JEE achievers",
      names: ["Sanchi Waghmare — IIT Kharagpur", "Surabhi Meshram — IIT Guwahati", "Sweta Singh — NIT Warangal"],
    },
    {
      title: "NEET selections",
      names: ["Om Pardhi — AIIMS Raipur", "Sakshi Singh — MGM Indore", "Soham Dhuware — Rewa Medical College", "Akshita Meshram — Chhindwara Medical College"],
    },
  ],
  staff: pic("rajat-jayanti", "The school's teachers together on stage at the Rajat Jayanti celebration", "50% 45%"),
};

/* ---------------- p.9 — labs, tech & innovation ---------------- */

export const schoolLabs = [
  { ...schoolShots.labComputer, caption: "Computer Lab" },
  { ...schoolShots.labChemistry, caption: "Chemistry Lab" },
  { ...schoolShots.labPhysics, caption: "Physics Lab" },
  { ...schoolShots.labBio, caption: "Bio Lab" },
  { ...schoolShots.labMath, caption: "Math Lab" },
  { ...schoolShots.artCraft, caption: "Art & Craft" },
  { ...schoolShots.labComposite, caption: "Composite Lab" },
  { ...schoolShots.labRobotics, caption: "Robotics Lab" },
  { ...schoolShots.smartLibrary, caption: "Smart Library" },
];

/* the cut-out students along the foot of the page */
export const schoolLabCutouts = [
  { src: img("cut-microscope"), alt: "A student looking through a microscope" },
  { src: img("cut-writing"), alt: "A student writing up her notes" },
  { src: img("cut-anatomy"), alt: "A human anatomy model" },
  { src: img("cut-sketch"), alt: "A student sketching on the floor" },
];

/* ---------------- p.10 — student success stories ---------------- */

const face = (slug) => img(`toppers/${slug}`);

export const schoolToppers = {
  year: "2025",
  classes: [
    {
      label: "Class X",
      toppers: [
        { name: "Abhay Gautam", score: 93, photo: face("abhay-gautam") },
        { name: "Srishti Jaiswal", score: 90, photo: face("srishti-jaiswal") },
        { name: "Ujjwal Tiwari", score: 87, photo: face("ujjwal-tiwari") },
      ],
    },
    {
      label: "Class XII",
      toppers: [
        { name: "Sagar Gurnani", score: 96, note: "Commerce · District topper", photo: face("sagar-gurnani") },
        { name: "Ayush Ghodeshwar", score: 87, note: "Biology", photo: face("ayush-ghodeshwar") },
        { name: "Om Dhuware", score: 85, note: "Maths", photo: face("om-dhuware") },
      ],
    },
  ],
  also: [
    { name: "Aadarsh Patle", score: 87, photo: face("aadarsh-patle") },
    { name: "Jeet Tembhare", score: 86, photo: face("jeet-tembhare") },
    { name: "Ashika Jain", score: 84, photo: face("ashika-jain") },
    { name: "Tamanna Bansare", score: 83, photo: face("tamanna-bansare") },
    { name: "Vipul Bagde", score: 82, photo: face("vipul-bagde") },
  ],
  /* the year before, as the school published it */
  earlier: {
    year: "2023–24",
    rows: [
      { label: "Class X", names: "Vanshika Sahare 90.2% · Trapti Thakre 88% · Zenith Singh 86%" },
      { label: "Class XII", names: "Arpita Kektekar 86% · Sweta Singh 83% · Saloni Agrawal 82.2%" },
    ],
  },
};

/* ---------------- p.11 — counselling & guidance ---------------- */

export const schoolCounselling =
  "On weekends, trained professional counsellors with expertise in parent and child counselling are available on the school grounds for pupils to discuss any personal issues. Parents may also speak with the counsellors for a complete understanding of their child's well-being.";

export const schoolAdmission = {
  steps: [
    "Registration forms and the prospectus are available at the school office, 8:00 am to 4:00 pm on all working days.",
    "Submit the duly filled form at the school.",
    "Within 7–10 working days you are told about the interaction, document verification or entrance test (for higher classes).",
    "Admission depends on seats, academic performance and the criteria — for Class XI, on the Class X result and the stream chosen (Science, Commerce or Humanities). Selected students are told by email, the school website and the notice board, and pay the fee within the given time.",
  ],
  documents: [
    "Passport-size photographs (student & parents)",
    "Previous mark sheets (last 3 years, if applicable)",
    "Student's Aadhaar card",
    "Birth certificate",
    "Address proof",
    "Caste certificate (if applicable)",
    "Transfer certificate (Class II onwards)",
  ],
  prep: [
    "IIT-JEE / NEET / Foundation",
    "Navodaya exam preparation",
    "Medical: NEET (XI & XII)",
    "Engineering: JEE & others",
    "Entrance exams (XI & XII)",
    "State & national championships in arts & crafts, performing arts, languages and sports",
  ],
  photos: [
    pic("counsel-group", "Students with guests and teachers at a school award ceremony", "50% 50%"),
    pic("counsel-reading", "A student writing notes in front of the library shelves", "50% 40%"),
    schoolShots.groundAssembly,
  ],
};

/* ---------------- p.12 — the four houses ---------------- */

export const schoolHouses = {
  line: "Four pillars of strength & spirit",
  photo: pic("houses-class", "A primary class at their desks, looking up at the camera", "50% 45%"),
  houses: [
    { name: "Galileo", tone: "bg-emerald-500", ring: "ring-emerald-500/30", text: "text-white" },
    { name: "Albert Einstein", tone: "bg-amber-400", ring: "ring-amber-400/30", text: "text-royal-950" },
    { name: "Nikola Tesla", tone: "bg-ember-500", ring: "ring-ember-500/30", text: "text-white" },
    { name: "Newton", tone: "bg-royal-600", ring: "ring-royal-600/30", text: "text-white" },
  ],
};
