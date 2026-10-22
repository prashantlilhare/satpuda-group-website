/* ------------------------------------------------------------------ */
/* SATPUDA ITI NETWORK — the homepage card row                         */
/* ------------------------------------------------------------------ */

/*
 * Copied from the "Satpuda ITI network" section of the Satpuda ITI site
 * (satpuda-iti.vercel.app), in its order and with its years. Every card
 * opens that institute's own page there — we don't rebuild them here.
 * Only three campuses have a published building photo; the rest show a
 * branded panel instead.
 */

import manjhapur from "../assets/images/iti-network/manjhapur.webp";
import budhi from "../assets/images/iti-network/budhi.webp";
import katangi from "../assets/images/iti-network/katangi.webp";
import { getInstitution } from "./institutions";

export const ITI_SITE = "https://satpuda-iti.vercel.app";

/** The year the group began — the Samiti's first ITI. */
export const ITI_GROUP_SINCE = 1999;

const E = "Electrician";
const F = "Fitter";
const MD = "Mechanic Diesel";

const list = [
  { id: "manjhapur", name: "Satpuda Private ITI, Manjhapur", location: "Manjhapur, Balaghat", district: "Balaghat", established: 2010, courses: [E, F, MD], image: { src: manjhapur, alt: "Satpuda (Pvt) I.T.I. Manjhapur building with the institute's name on it" } },
  { id: "budhi", name: "New Satpuda Private ITI, Budhi", location: "Budhi, Balaghat", district: "Balaghat", established: 2015, courses: [E], image: { src: budhi, alt: "New Satpuda Private I.T.I. Budhi, Balaghat — the building with the institute's board" } },
  { id: "katangi", name: "New Satpuda Private ITI, Katangi", location: "Katangi, Balaghat", district: "Balaghat", established: 2015, courses: [E], image: { src: katangi, alt: "New Satpuda Private I.T.I. Katangi, Balaghat — the building with the institute's name on its wall" } },
  { id: "baihar", name: "Maharana Pratap Private ITI, Baihar", location: "Baihar, Balaghat", district: "Balaghat", established: 2021, courses: [E, F] },
  { id: "chhindwara-kundipura", name: "Satpuda Private ITI, Kundipura", location: "Kundipura, Chhindwara", district: "Chhindwara", established: 2003, courses: [E, F, MD] },
  { id: "chhindwara-warehouse", name: "Satpuda Private ITI, Warehouse", location: "Chhindwara", district: "Chhindwara", established: 2012, courses: [E, F] },
  { id: "rewa", name: "Satpuda Private ITI, Rewa", location: "Chorhata, Rewa", district: "Rewa", established: 2011, courses: [E, F, MD] },
  { id: "seoni", name: "Satpuda Private ITI, Seoni", location: "Siladehi, Seoni", district: "Seoni", established: 2007, courses: [E, F, MD] },
  { id: "multai", name: "Satpuda Private ITI, Multai", location: "Chikhalikhurd, Multai", district: "Betul", established: 2015, courses: [E] },
  { id: "mandla", name: "Satpuda Private ITI, Mandla", location: "Maharajpur Poundi, Mandla", district: "Mandla", established: 2007, courses: [E, F, MD] },
  { id: "itarsi", name: "Satpuda Private ITI, Itarsi", location: "Itarsi, Narmadapuram", district: "Narmadapuram", established: 2016, courses: [E, F, "COPA"] },
  { id: "betul", name: "Satpuda Private ITI, Betul", location: "Bharat Bharti, Betul", district: "Betul", established: 2009, courses: [E, F, MD] },
  { id: "sarni", name: "Satpuda Private ITI, Sarni", location: "Bagdona, Sarni", district: "Betul", established: 2016, courses: [E, F] },
  { id: "mauganj", name: "Satpuda Private ITI, Mauganj", location: "Mauganj", district: "Mauganj", established: 2016, courses: [E, F, MD] },
  { id: "shiksha-rewa", name: "Shiksha Private ITI, Rewa", location: "Boda Bagh, Rewa", district: "Rewa", established: 2022, courses: [E] },
];

export const itiNetwork = list.map((inst) => ({
  ...inst,
  /* "Satpuda Private ITI, Manjhapur" → "Manjhapur", for the photo-less panel */
  place: inst.name.slice(inst.name.lastIndexOf(", ") + 2),
  href: `${ITI_SITE}/iti/${inst.id}`,
}));

export const itiNetworkDistricts = [...new Set(list.map((i) => i.district))];

/*
 * The group's other institutions, as cards in the same row. `href` is each
 * one's own website; D.Ed & B.Ed has no live site of its own, so it opens
 * its page here. Years: D.Ed began in 2006, the school in 2009, the
 * polytechnic (the first of the engineering campus) in 2017.
 */
const institutionCard = (id, card) => {
  const inst = getInstitution(id);
  return {
    id,
    name: inst.name,
    location: "Manjhapur, Balaghat",
    district: inst.kicker,
    image: { src: inst.image, alt: inst.imageAlt },
    ...card,
  };
};

const groupInstitutions = [
  institutionCard("ded-bed", { place: "D.Ed & B.Ed", established: 2006, courses: ["D.Ed", "B.Ed"], to: "/institutes/ded-bed" }),
  institutionCard("school", { place: "School", established: 2009, courses: ["CBSE", "Co-educational"], href: "https://satpudavalleyschool.com/" }),
  institutionCard("btech-polytechnic", { place: "Engineering", established: 2017, courses: ["B.Tech", "Diploma"], href: "https://satpudaengineeringcollege.com/" }),
];

/** The homepage row: every ITI and institution, oldest first. */
export const networkRow = [...itiNetwork, ...groupInstitutions].sort(
  (a, b) => a.established - b.established,
);
