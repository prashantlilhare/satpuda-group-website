/**
 * Group-level facts, navigation and contact details.
 *
 * SOURCING RULE: every factual claim in this file is traceable to an official
 * Satpuda source (see `sources` below) or to a national standard (AICTE / NCVT).
 * Anything unverified is deliberately expressed as "contact the institution".
 */

export const site = {
  name: "Satpuda Group",
  shortName: "Satpuda",
  trust: "Maharana Pratap Shikshan Samiti",
  location: "Balaghat, Madhya Pradesh",
  motto: "सा विद्या या विमुक्तये",
  mottoTranslit: "Sā vidyā yā vimuktaye",
  mottoMeaning: "Knowledge is that which liberates",
  tagline: "Empowering Education. Building Futures.",
  intro:
    "From school education to technical and professional learning, Satpuda Group creates opportunities for students to learn, grow and build meaningful careers.",
};

export const contact = {
  addressLines: [
    "Satpuda Campus, Lalbarra – Balaghat Road",
    "Manjhapur (Garra), Balaghat",
    "Madhya Pradesh 481001",
  ],
  addressInline:
    "Satpuda Campus, Lalbarra – Balaghat Road, Manjhapur (Garra), Balaghat, Madhya Pradesh 481001",
  phones: [
    { label: "+91 94258 36824", href: "tel:+919425836824" },
    { label: "+91 6262 604 111", href: "tel:+916262604111" },
  ],
  email: "satpudaengineeringcollege@gmail.com",
  mapsQuery:
    "Satpuda College of Engineering and Polytechnic, Manjhapur Garra, Lalbarra Road, Balaghat, Madhya Pradesh 481001",
  officeHours: "Monday – Saturday, 10:00 AM – 5:00 PM",
};

/** Only verified, officially-linked profiles. No invented handles. */
export const socials = [
  {
    label: "Instagram — Satpuda Engineering",
    short: "Instagram",
    href: "https://www.instagram.com/satpuda_engineering/",
    icon: "instagram",
  },
  {
    label: "Facebook — Satpuda Valley Public School",
    short: "Facebook",
    href: "https://www.facebook.com/SatpudaValleyPublicSchoolBalaghat/",
    icon: "facebook",
  },
];

/** Public, citable sources used to build this site. */
export const sources = [
  { label: "Satpuda College of Engineering & Polytechnic", href: "https://satpudaengineeringcollege.com/" },
  { label: "Satpuda Polytechnic", href: "https://www.satpudapolytechnic.com/" },
  { label: "Satpuda ITI", href: "https://satpudaiti.com/" },
  { label: "Satpuda Valley Public School", href: "https://satpudavalleyschool.com/" },
];

/* ------------------------------------------------------------------ */
/* NAVIGATION                                                          */
/* ------------------------------------------------------------------ */

export const nav = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      {
        label: "About Satpuda Group",
        to: "/about",
        blurb: "The trust, the campus and the people behind four institutions.",
      },
      {
        label: "Vision & Mission",
        to: "/about/vision-mission",
        blurb: "What we are working towards, and how we get there.",
      },
      {
        label: "Director's Message",
        to: "/about/director-message",
        blurb: "Mr. Anshul Jaiswal on building capable, confident graduates.",
      },
      {
        label: "Principal's Message",
        to: "/about/principal-message",
        blurb: "Prof. (Dr.) Ashok Kumar Gupta welcomes students and parents.",
      },
    ],
  },
  {
    label: "Institute",
    to: "/institutes/btech-polytechnic",
    children: [
      {
        label: "B.Tech & Polytechnic",
        to: "/institutes/btech-polytechnic",
        blurb: "AICTE-approved degree and diploma engineering, affiliated to RGPV Bhopal.",
      },
      {
        label: "D.Ed & B.Ed",
        to: "/institutes/ded-bed",
        blurb: "Teacher education — pedagogy, child development and classroom practice.",
      },
      {
        label: "ITI",
        to: "/institutes/iti",
        blurb: "NCVT trades: Electrician, Fitter, Mechanic Diesel and COPA.",
      },
      {
        label: "School",
        to: "/institutes/school",
        blurb: "Satpuda Valley Public School — CBSE, co-educational, since 2009.",
      },
    ],
  },
  { label: "Contact", to: "/contact" },
];

/** Flat list of every institute route, for the footer and sitemaps. */
export const instituteLinks = nav.find((n) => n.label === "Institute").children;
export const aboutLinks = nav.find((n) => n.label === "About Us").children;
