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

export const leadershipCards = [
  {
    id: "director",
    num: "01",
    name: "Mr. Anshul Jaiswal",
    initials: "AJ",
    role: "Director",
    institution: "Satpuda Group of Institutions",
    qualifications: "Ph.D., M.S. (Nanoelectronics)",
    portrait: directorPortrait,
    portraitAlt: "Portrait of Mr. Anshul Jaiswal, Director of Satpuda Group",
    category: "Group Governance & Vision",
    quote: "At Satpuda we believe in building more than careers — we build confident, capable and compassionate human beings.",
    description: "Spearheading the strategic vision, regional expansion, and modern academic standard across school, vocational, teacher training and engineering colleges in Balaghat.",
    tags: ["Institutional Vision", "Industry Linkage", "Strategic Expansion"],
  },
  {
    id: "principal-eng",
    num: "02",
    name: "Prof. (Dr.) Ashok Kumar Gupta",
    initials: "AKG",
    role: "Principal",
    institution: "Satpuda College of Engineering & Polytechnic",
    qualifications: "B.E. (MACT) · M.Tech (MANIT) · Ph.D. (AISECT)",
    portrait: principalPortrait,
    portraitAlt: "Portrait of Prof. (Dr.) Ashok Kumar Gupta, Principal",
    category: "Engineering & Technical Higher Ed",
    quote: "We strive to create a nurturing environment that promotes critical thinking, creativity and hands-on technical proficiency.",
    description: "Steering degree and diploma engineering programs through advanced laboratories, AICTE benchmarks, project incubation, and university academic rigor.",
    tags: ["B.Tech & Polytechnic", "Applied Labs", "AICTE Approved"],
  },
  {
    id: "principal-school",
    num: "03",
    name: "Dr. Sunita Sharma",
    initials: "SS",
    role: "Principal",
    institution: "Satpuda Valley Public School",
    qualifications: "M.Sc., B.Ed., M.Ed., Ph.D. in Education",
    portrait: principalSchoolPortrait,
    portraitAlt: "Portrait of Dr. Sunita Sharma, Principal of Satpuda Valley Public School",
    category: "Foundational & Secondary Schooling",
    quote: "Nurturing curiosity from early childhood through holistic CBSE education, value-driven ethics, and competitive readiness.",
    description: "Directing foundational, middle and secondary CBSE schooling with smart interactive classrooms, STEM learning, creative arts, and student welfare.",
    tags: ["CBSE Curriculum", "STEM & Innovation", "Holistic Growth"],
  },
  {
    id: "principal-iti",
    num: "04",
    name: "Er. Rakesh Patle",
    initials: "RP",
    role: "Principal",
    institution: "Satpuda Industrial Training Institute (ITI)",
    qualifications: "B.Tech (Mechanical) · NCVT Certified Specialist",
    portrait: principalItiPortrait,
    portraitAlt: "Portrait of Er. Rakesh Patle, Principal of Satpuda ITI",
    category: "Vocational Excellence & Technical Trades",
    quote: "Bridging the regional skill gap through precision workshop training, NCVT trades, and direct industry shop-floor immersion.",
    description: "Empowering youth with certified technical craftsmanship in Electrician, Fitter, and modern industrial trades aligned with Skill India national standards.",
    tags: ["NCVT Recognized", "Workshop Mastery", "Skill India"],
  },
  {
    id: "dean-education",
    num: "05",
    name: "Dr. Meenakshi Verma",
    initials: "MV",
    role: "Dean & Principal",
    institution: "Satpuda College of Teacher Education",
    qualifications: "M.A. · M.Ed. · Ph.D. (Education) · UGC-NET",
    portrait: deanEducationPortrait,
    portraitAlt: "Portrait of Dr. Meenakshi Verma, Dean of Teacher Education",
    category: "Teacher Preparation & Pedagogy",
    quote: "Shaping the educators of tomorrow with contemporary pedagogical methods, psychology, and reflective classroom practices.",
    description: "Guiding NCTE-approved B.Ed and D.El.Ed teacher preparation with modern micro-teaching labs, educational psychology research, and rural school internships.",
    tags: ["NCTE Approved", "B.Ed & D.El.Ed", "Pedagogical Labs"],
  },
  {
    id: "dean-corporate",
    num: "06",
    name: "Prof. Neeraj Bisen",
    initials: "NB",
    role: "Dean — Placements & Corporate Linkages",
    institution: "Satpuda Corporate Relations & Placement Cell",
    qualifications: "M.Tech (CSE) · MBA · 18+ Yrs Industry Linkage",
    portrait: deanCorporatePortrait,
    portraitAlt: "Portrait of Prof. Neeraj Bisen, Dean Corporate Linkages",
    category: "Corporate Relations & Employability",
    quote: "Connecting our students directly with leading engineering, manufacturing, and technological enterprises across India.",
    description: "Leading campus placement drives, corporate internships, soft-skill bootcamps, and technical interview mentoring across all Satpuda technical institutions.",
    tags: ["Campus Placements", "Industry Tie-ups", "Career Bootcamps"],
  },
];
