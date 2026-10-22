/**
 * Figures from the group's own 2026 information brochure (SCEP-2026.pdf,
 * "Satpuda College of Engineering and Polytechnic — Information Brochure").
 *
 * Page 2 carries the group totals, page 7 the placement count by campus,
 * the recruiter panel, JobSahi and lateral entry, page 8 the counselling
 * numbers. Copied as printed; nothing here is rounded or estimated.
 */

import jobSahiLogo from "../assets/jobsahi/jobsahi-logo.webp";
import googlePlayBadge from "../assets/jobsahi/google-play.webp";
import appStoreBadge from "../assets/jobsahi/app-store.webp";
import aicteLogo from "../assets/accreditation/aicte.webp";
import rgpvLogo from "../assets/accreditation/rgpv.webp";
import { ITI_SITE } from "./itiNetwork";

/* The twelve circles on brochure p.2, in two rows: what the group runs,
   then what it adds up to. `value` is what the odometer rolls; `suffix`
   sits after it, still. */
export const groupInstitutions = [
  { value: "01", label: "Engineering College" },
  { value: "01", label: "Polytechnic College" },
  { value: "01", label: "CBSE School" },
  { value: "15", label: "NCVT ITIs" },
  { value: "02", label: "B.Ed / D.Ed Colleges" },
  { value: "12", label: "Locations in MP" },
];

export const groupOutcomes = [
  { value: "87", suffix: "%", label: "Result" },
  { value: "85", suffix: "%", label: "Placements" },
  { value: "25,000", suffix: "+", label: "Alumni" },
  { value: "6,570", label: "Students" },
  { value: "478", label: "Staff" },
  { value: "19", label: "Courses" },
];

/* Campus placements, brochure p.7: "25725 Campus Placements in Last Four
   Years", by the campus that hosted the drive. */
export const placementDrives = {
  total: 25725,
  rate: 85,
  period: "Last four years",
  byCampus: [
    { place: "Rewa", count: 11861 },
    { place: "Manjhapur, Balaghat", count: 9838 },
    { place: "Warehouse, Chhindwara", count: 2366 },
    { place: "Betul", count: 1660 },
  ],
};

/* The recruiter panel on p.7, in its order, each logo cropped from it. */
const logos = import.meta.glob("../assets/recruiters/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const logo = (file) => logos[`../assets/recruiters/${file}.webp`];

export const groupRecruiters = [
  ["adani-solar", "Adani Solar"],
  ["afcons", "AFCONS Infrastructure"],
  ["bhel", "BHEL"],
  ["cummins", "Cummins"],
  ["eicher", "Eicher"],
  ["ccl", "Hindustan Copper"],
  ["volvo-eicher", "Volvo Eicher"],
  ["honda", "Honda"],
  ["indian-railways", "Indian Railways"],
  ["isro", "ISRO"],
  ["lt", "L&T"],
  ["moil", "MOIL"],
  ["motherson", "Motherson"],
  ["vidyut", "MP Poorv Kshetra Vidyut Vitaran"],
  ["wipro", "Wipro"],
  ["welspun", "Welspun"],
  ["suzuki", "Suzuki"],
  ["suzlon", "Suzlon"],
  ["yazaki", "Yazaki"],
  ["adani", "Adani"],
  ["tata-motors", "Tata Motors"],
  ["haier", "Haier"],
].map(([file, name]) => ({ id: file, name, src: logo(file) }));

/* Lateral entry, p.7 — a year saved on each route. */
export const lateralEntry = {
  routes: [
    {
      from: "ITI pass",
      fromNote: "2-year engineering trades — Electrician, Fitter, Draftsman Civil, Turner, Motor Mechanic",
      to: "Polytechnic Diploma",
      toNote: "Direct to the 2nd year, all branches",
      saving: "3-year course in 2 years",
    },
    {
      from: "Diploma or B.Sc pass",
      fromNote: "Any polytechnic branch, or a B.Sc",
      to: "B.Tech Engineering",
      toNote: "Direct to the 2nd year, all branches",
      saving: "4-year course in 3 years",
    },
  ],
  phones: [
    { label: "+91 62626 04112", href: "tel:+916262604112" },
    { label: "+91 62626 04113", href: "tel:+916262604113" },
  ],
};

/* JobSahi — the group's own job portal and app (p.7, p.8). The store pages
   aren't printed in the brochure; set the two URLs here once known and the
   badges become links. */
export const jobSahi = {
  name: "JobSahi",
  tagline: "जॉब आपकी जेब में !",
  href: "https://www.jobsahi.com",
  display: "www.JobSahi.com",
  registered: "25,000+",
  logo: jobSahiLogo,
  stores: [
    { label: "Get it on Google Play", badge: googlePlayBadge, width: 564, height: 168, href: null },
    { label: "Download on the App Store", badge: appStoreBadge, width: 498, height: 167, href: null },
  ],
  counselling: [
    { label: "+91 62626 04121", href: "tel:+916262604121" },
    { label: "+91 62626 04112", href: "tel:+916262604112" },
  ],
};

/* The badges on the cover, p.1. Approval and affiliation belong to the
   engineering & polytechnic college. */
export const credentials = [
  { id: "aicte", logo: aicteLogo, width: 205, height: 200, title: "AICTE Approved", note: "Engineering & Polytechnic" },
  { id: "rgpv", logo: rgpvLogo, width: 193, height: 200, title: "RGPV Affiliated", note: "B.Tech, Bhopal" },
  { id: "jobsahi", logo: jobSahiLogo, width: 273, height: 231, title: "Our Job Portal", note: "JobSahi", href: "https://www.jobsahi.com" },
];

/* The institute list on p.8, in its order: each with its own cell number
   and, where it has one, its page. */
const iti = (id) => `${ITI_SITE}/iti/${id}`;
const cell = (n) => ({ label: `${n.slice(0, 5)} ${n.slice(5)}`, href: `tel:+91${n}` });

export const instituteDirectory = [
  {
    group: "College & school",
    items: [
      { name: "Satpuda College of Engineering & Polytechnic", place: "Balaghat", phone: cell("6262604111"), to: "/institutes/btech-polytechnic" },
      { name: "Satpuda Valley Public School", place: "Balaghat · CBSE, Nursery–XII", phone: cell("6262604114"), to: "/institutes/school" },
      { name: "Satpuda B.Ed & D.Ed College", place: "Balaghat · D.Ed, B.Ed, D.El.Ed", phone: cell("6262604116"), to: "/institutes/ded-bed" },
    ],
  },
  {
    group: "Satpuda ITIs",
    items: [
      { name: "Satpuda ITI", place: "Seoni", phone: cell("6262604131"), href: iti("seoni") },
      { name: "Satpuda ITI", place: "Manjhapur, Balaghat", phone: cell("6262604120"), href: iti("manjhapur") },
      { name: "Satpuda ITI", place: "Pondi, Mandla", phone: cell("6262604118"), href: iti("mandla") },
      { name: "Satpuda ITI", place: "Bharat Bharti, Betul", phone: cell("6262604128"), href: iti("betul") },
      { name: "Satpuda ITI", place: "Rewa", phone: cell("6262604134"), href: iti("rewa") },
      { name: "Satpuda ITI", place: "Warehouse, Chhindwara", phone: cell("6262604124"), href: iti("chhindwara-warehouse") },
      { name: "Satpuda ITI", place: "Kundipura, Chhindwara", phone: cell("6262604123"), href: iti("chhindwara-kundipura") },
      { name: "Satpuda ITI", place: "Itarsi", phone: cell("6262604126"), href: iti("itarsi") },
      { name: "Satpuda ITI", place: "Bagdona, Sarni", phone: cell("6262604127"), href: iti("sarni") },
      { name: "Satpuda ITI", place: "Mauganj, Rewa", phone: cell("6262604132"), href: iti("mauganj") },
      { name: "Satpuda ITI", place: "Chikhalikhurd, Multai", phone: cell("6262604130"), href: iti("multai") },
      { name: "Maharana Pratap ITI", place: "Baihar", phone: cell("6262604125"), href: iti("baihar") },
      { name: "New Satpuda ITI", place: "Katangi", phone: cell("6262604117"), href: iti("katangi") },
      { name: "New Satpuda ITI", place: "Budhi, Balaghat", phone: cell("6262604122"), href: iti("budhi") },
      { name: "Shiksha ITI", place: "Boda Bag, Rewa", phone: cell("8827117778"), href: iti("shiksha-rewa") },
    ],
  },
];
