import directorPortrait from "../assets/images/leadership/director-anshul-jaiswal.webp";
import principalPortrait from "../assets/images/leadership/principal-ashok-kumar-gupta.webp";

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
