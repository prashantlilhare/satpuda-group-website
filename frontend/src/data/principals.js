import principalEngPortrait from "../assets/images/leadership/principal-ashok-kumar-gupta.webp";
import principalSchoolPortrait from "../assets/images/institutions/valley-school-principle.webp";
import principalItiPortrait from "../assets/images/leadership/principal-iti-rakesh-patle.jpg";
import principalTeacherEdPortrait from "../assets/images/leadership/dean-teacher-education-meenakshi-verma.jpg";

/**
 * The head of each institution, introduced at the top of its page.
 *
 * Keyed by the institution `id` in `institutions.js`.
 *
 * Only the engineering entry is confirmed from the institution's published
 * content (see `principal` in `leadership.js`). The school, ITI and teacher
 * education entries are carried over from an earlier draft of the leadership
 * data and are marked `placeholder: true` — confirm the name, designation,
 * qualifications and photograph with each institution before going live.
 */
export const principals = {
  "btech-polytechnic": {
    name: "Prof. (Dr.) Ashok Kumar Gupta",
    role: "Principal",
    org: "Satpuda College of Engineering & Polytechnic",
    qualifications: "B.E. (MACT) · M.Tech (MANIT) · Ph.D. (AISECT)",
    portrait: principalEngPortrait,
    portraitAlt:
      "Portrait of Prof. (Dr.) Ashok Kumar Gupta, Principal of Satpuda College of Engineering & Polytechnic",
    quote:
      "We strive to create a nurturing environment that promotes critical thinking, creativity and innovation.",
    summary:
      "Leads the college's degree and diploma programmes, with a campus designed to blend academic rigour with real-world exposure — and a learning culture in which a student can ask a question without hesitation.",
    messageLink: "/about/principal-message",
  },

  school: {
    placeholder: true,
    name: "Dr. Sunita Sharma",
    role: "Principal",
    org: "Satpuda Valley Public School",
    qualifications: "M.Sc. · B.Ed. · M.Ed. · Ph.D. (Education)",
    portrait: principalSchoolPortrait,
    /* supplied already cut to a circle, on a transparent ground */
    portraitRound: true,
    portraitAlt: "Portrait of Dr. Sunita Sharma, Principal of Satpuda Valley Public School",
    quote:
      "Curiosity is built early — our job is to give it room, and then give it direction.",
    summary:
      "Leads foundational, middle and secondary CBSE schooling on the Satpuda campus, with a focus on understanding over recall, STEM learning, the arts and student welfare.",
  },

  iti: {
    placeholder: true,
    name: "Er. Rakesh Patle",
    role: "Principal",
    org: "Satpuda ITI, Garra",
    qualifications: "B.Tech (Mechanical)",
    portrait: principalItiPortrait,
    portraitAlt: "Portrait of Er. Rakesh Patle, Principal of Satpuda ITI",
    quote:
      "A trade is learned with your hands — so most of the week here is spent on the workshop floor.",
    summary:
      "Leads the institute's NCVT trades — Electrician, Fitter, Mechanic Diesel and COPA — with training built around practical work, trade testing and the route into apprenticeship and employment.",
  },

  "ded-bed": {
    placeholder: true,
    name: "Dr. Meenakshi Verma",
    role: "Dean & Principal",
    org: "Teacher Education — D.Ed & B.Ed",
    qualifications: "M.A. · M.Ed. · Ph.D. (Education)",
    portrait: principalTeacherEdPortrait,
    portraitAlt: "Portrait of Dr. Meenakshi Verma, Dean of Teacher Education",
    quote:
      "A good teacher is made in the classroom — theory tells you why, practice teaches you how.",
    summary:
      "Leads the D.Ed and B.Ed programmes, pairing pedagogy and child development with supervised teaching practice in real classrooms, including the group's own school.",
  },
};
