import directorPortrait from "../assets/images/leadership/director-anshul-jaiswal.webp";
import principalPortrait from "../assets/images/leadership/principal-ashok-kumar-gupta.webp";
import principalSchoolPortrait from "../assets/images/leadership/principal-school-sunita-sharma.jpg";
import principalItiPortrait from "../assets/images/leadership/principal-iti-rakesh-patle.jpg";
import deanEducationPortrait from "../assets/images/leadership/dean-teacher-education-meenakshi-verma.jpg";
import deanCorporatePortrait from "../assets/images/leadership/dean-corporate-neeraj-bisen.jpg";

/**
 * Leadership messages.
 * Names, qualifications and message text follow the institution's own
 * published content — they are edited only for length and flow, never invented.
 */

export const director = {
  name: "Mr. Anshul Jaiswal",
  initials: "AJ",
  role: "Director",
  org: "Satpuda Group",
  qualifications: "Ph.D., M.S. (Nanoelectronics)",
  portrait: directorPortrait,
  portraitAlt: "Portrait of Mr. Anshul Jaiswal, Director of Satpuda Group",
  pullQuote:
    "At Satpuda we believe in building more than careers — we build confident, capable and compassionate human beings.",
  standfirst:
    "A message on what a technical education in Balaghat should be, and what the group is working to make it.",
  paragraphs: [
    "Satpuda began with a simple conviction: that a student in Balaghat should not have to leave home to receive an education that opens real doors. What started as a single industrial training institute has grown into a group of institutions spanning school education, vocational trades, teacher preparation and engineering.",
    "Our focus has always been on practical learning. An industry-focused curriculum, modern laboratories and live projects give students the chance to apply what they study rather than only recite it. That emphasis carries from the ITI workshop floor to the final-year engineering project.",
    "We work to send our students into the world ready for it — trained in current technology, comfortable communicating, and willing to take initiative. Alongside that, we encourage research, creativity and problem-solving, because the problems this region faces will be solved by people who grew up understanding them.",
    "To every student and parent considering Satpuda: you are joining an institution that measures itself by what its graduates go on to do. We look forward to welcoming you.",
  ],
  pillars: [
    {
      title: "Practical learning",
      body: "An industry-focused curriculum with hands-on experience, modern laboratories and live project work.",
    },
    {
      title: "Industry readiness",
      body: "Training in current technology, communication skills and an entrepreneurial frame of mind.",
    },
    {
      title: "Innovation & research",
      body: "Encouraging creativity, enquiry and problem-solving that leads to meaningful change.",
    },
  ],
};

export const principal = {
  name: "Prof. (Dr.) Ashok Kumar Gupta",
  initials: "AKG",
  role: "Principal",
  org: "Satpuda College of Engineering & Polytechnic",
  qualifications:
    "B.E. (MACT) · M.Tech (MANIT) · PGDM (AIMA) · DMS (NIM, New Delhi) · LL.B · Ph.D. (AISECT) · FIBAKM · FCBA · FCKM",
  portrait: principalPortrait,
  portraitAlt:
    "Portrait of Prof. (Dr.) Ashok Kumar Gupta, Principal of Satpuda College of Engineering & Polytechnic",
  salutation: "Dear Students and Parents,",
  standfirst:
    "A welcome to the campus, and an account of the learning culture it tries to sustain.",
  paragraphs: [
    "It gives me great pleasure to welcome you to Satpuda College of Engineering & Polytechnic, an institution offering both diploma and B.Tech programmes. Our campus is designed to provide an environment that blends academic excellence with real-world exposure.",
    "We strive to create a nurturing environment that promotes critical thinking, creativity and innovation. Our faculty comprises experienced and well-qualified teachers dedicated to creating a conducive learning culture — one in which a student can ask a question without hesitation and follow it to an answer.",
    "We are committed to providing an education that prepares students for the challenges ahead and helps them become responsible citizens. We welcome you to Satpuda College and look forward to your journey with us.",
  ],
};

export const leaders = [director, principal];

/**
 * Governing board of Satpuda Group.
 * Portraits are placeholders — the six available images are cycled across the
 * ten members until individual photographs are supplied.
 */
export const leadershipCards = [
  {
    id: "patron-vn-tiwari",
    num: "01",
    name: "VN Tiwari",
    initials: "VNT",
    role: "Patron",
    institution: "Satpuda Group of Institutions",
    portrait: directorPortrait,
    portraitAlt: "Portrait of VN Tiwari, Patron of Satpuda Group of Institutions",
    category: "Patronage & Institutional Guidance",
    quote: "An institution earns its standing slowly — through the students it sends out, not the claims it makes.",
    description: "Serving as patron to the group, offering long-view counsel on institutional direction, academic credibility, and the responsibility Satpuda carries towards the Balaghat region.",
    tags: ["Institutional Patronage", "Advisory Counsel", "Regional Commitment"],
  },
  {
    id: "president-sanjeev-mishra",
    num: "02",
    name: "Sanjeev Mishra",
    initials: "SM",
    role: "President",
    institution: "Satpuda Group of Institutions",
    portrait: principalPortrait,
    portraitAlt: "Portrait of Sanjeev Mishra, President of Satpuda Group of Institutions",
    category: "Board Leadership & Governance",
    quote: "Our first duty is to the student who trusts us with the most important years of their life.",
    description: "Leading the governing board of the group — setting institutional priorities, chairing policy decisions, and holding every Satpuda institution accountable to the standard it promises.",
    tags: ["Board Leadership", "Policy & Governance", "Institutional Accountability"],
  },
  {
    id: "director-santosh-jaiswal",
    num: "03",
    name: "Santosh Jaiswal",
    initials: "SJ",
    role: "Director",
    institution: "Satpuda Group of Institutions",
    portrait: principalSchoolPortrait,
    portraitAlt: "Portrait of Santosh Jaiswal, Director of Satpuda Group of Institutions",
    category: "Strategic Direction & Oversight",
    quote: "Good infrastructure and good teaching have to grow together; one without the other helps no one.",
    description: "Directing institutional development across campuses — academic planning, infrastructure growth, and the resourcing that keeps classrooms, laboratories and workshops running.",
    tags: ["Academic Planning", "Campus Development", "Operations Oversight"],
  },
  {
    id: "director-sandeep-mishra",
    num: "04",
    name: "Sandeep Mishra",
    initials: "SDM",
    role: "Director",
    institution: "Satpuda Group of Institutions",
    portrait: principalItiPortrait,
    portraitAlt: "Portrait of Sandeep Mishra, Director of Satpuda Group of Institutions",
    category: "Strategy, Compliance & Expansion",
    quote: "Every decision this board takes should be one we can defend in front of a parent.",
    description: "Directing institutional strategy and compliance — overseeing regulatory approvals, financial discipline, and the expansion of programmes across school, vocational and higher education.",
    tags: ["Strategic Oversight", "Regulatory Compliance", "Programme Expansion"],
  },
  {
    id: "patron-kk-bhandari",
    num: "05",
    name: "KK Bhandari",
    initials: "KKB",
    role: "Patron",
    institution: "Satpuda Group of Institutions",
    portrait: deanEducationPortrait,
    portraitAlt: "Portrait of KK Bhandari, Patron of Satpuda Group of Institutions",
    category: "Patronage & Community Mission",
    quote: "Education in a district like ours is not charity — it is the most practical investment a community can make.",
    description: "Serving as patron to the group, lending experience and public standing to Satpuda's mission of bringing school, vocational and technical education within reach of Balaghat's students.",
    tags: ["Institutional Patronage", "Community Outreach", "Mission Guidance"],
  },
  {
    id: "vice-president-vijay-punchbuddhe",
    num: "06",
    name: "Vijay Punchbuddhe",
    initials: "VP",
    role: "Vice President",
    institution: "Satpuda Group of Institutions",
    portrait: deanCorporatePortrait,
    portraitAlt: "Portrait of Vijay Punchbuddhe, Vice President of Satpuda Group of Institutions",
    category: "Governance Support & Coordination",
    quote: "Plans are easy to write. Our job is to make sure they actually reach the classroom.",
    description: "Supporting the president in board leadership — coordinating between institutions, following through on approved decisions, and keeping governance and campus practice aligned.",
    tags: ["Governance Support", "Inter-Campus Coordination", "Execution Follow-through"],
  },
  {
    id: "secretary-muktanand-gautam",
    num: "07",
    name: "Muktanand Gautam",
    initials: "MG",
    role: "Secretary",
    institution: "Satpuda Group of Institutions",
    portrait: directorPortrait,
    portraitAlt: "Portrait of Muktanand Gautam, Secretary of Satpuda Group of Institutions",
    category: "Administration & Board Affairs",
    quote: "Clear records and honest process are what let an institution be trusted over decades.",
    description: "Managing the administrative machinery of the board — meetings and minutes, statutory records, and correspondence with the affiliating and regulatory bodies each institution answers to.",
    tags: ["Board Administration", "Statutory Records", "Affiliation Liaison"],
  },
  {
    id: "executive-lakesh-bisen",
    num: "08",
    name: "Lakesh Bisen",
    initials: "LB",
    role: "Executive Member",
    institution: "Satpuda Group of Institutions",
    portrait: principalPortrait,
    portraitAlt: "Portrait of Lakesh Bisen, Executive Member of Satpuda Group of Institutions",
    category: "Executive Committee — Student Welfare",
    quote: "Most of what a student remembers about a campus is decided by small, everyday things.",
    description: "Serving on the executive committee with a focus on student welfare and campus life — hostel and transport facilities, grievance redressal, and everyday support for students on campus.",
    tags: ["Student Welfare", "Campus Facilities", "Executive Committee"],
  },
  {
    id: "executive-chaitnya-bisen",
    num: "09",
    name: "Chaitnya Bisen",
    initials: "CB",
    role: "Executive Member",
    institution: "Satpuda Group of Institutions",
    portrait: principalSchoolPortrait,
    portraitAlt: "Portrait of Chaitnya Bisen, Executive Member of Satpuda Group of Institutions",
    category: "Executive Committee — Skills & Industry",
    quote: "A skill is only proven when it holds up outside the classroom.",
    description: "Serving on the executive committee, supporting vocational and technical training initiatives, industry engagement, and the practical exposure Satpuda's ITI and polytechnic students depend on.",
    tags: ["Vocational Training", "Industry Engagement", "Executive Committee"],
  },
  {
    id: "executive-anshul-jaiswal",
    num: "10",
    name: "Anshul Jaiswal",
    initials: "AJ",
    role: "Executive Member",
    institution: "Satpuda Group of Institutions",
    portrait: principalItiPortrait,
    portraitAlt: "Portrait of Anshul Jaiswal, Executive Member of Satpuda Group of Institutions",
    category: "Executive Committee — Academics & Careers",
    quote: "We build more than careers here — we build confident, capable and compassionate people.",
    description: "Serving on the executive committee, contributing to academic quality, admissions and placement initiatives, and the group's ongoing modernisation of teaching and laboratory practice.",
    tags: ["Academic Quality", "Placements & Admissions", "Executive Committee"],
  },
];
