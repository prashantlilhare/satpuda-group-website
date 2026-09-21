import { photo } from "./photos";

/* ------------------------------------------------------------------ */
/* HERO PHOTO WALL                                                     */
/* ------------------------------------------------------------------ */

/**
 * Each photograph is filed under the headline it actually illustrates, so the
 * copy on screen always matches the picture behind it. The images themselves
 * come from the shared campus library in `photos.js`.
 */

/* ------------------------------------------------------------------ */
/* HEADLINE GROUPS                                                     */
/* ------------------------------------------------------------------ */

export const heroGroups = [
  {
    id: "group",
    eyebrow: "Satpuda Group · Balaghat",
    title: ["Empowering education.", "Building futures."],
    body: "From school education to technical and professional learning, Satpuda Group creates opportunities for students to learn, grow and build meaningful careers.",
    images: [
      photo("0041", "Students filling the campus hall for a college-wide session", "50% 40%"),
      photo("0044", "Students in college blazers seated at a campus assembly", "50% 35%"),
      photo("0043", "A packed hall of students during a guest session on campus", "50% 38%"),
      photo("0042", "Faculty and students seated together at a campus gathering", "50% 40%"),
    ],
  },
  {
    id: "workshops",
    eyebrow: "Learning by doing",
    title: ["Tools in hand,", "from day one."],
    body: "Laboratories and workshops sit at the centre of the timetable — cobots, CNC, PCB fabrication, electrical machines and EV systems, run by the students themselves.",
    images: [
      photo("0046", "A collaborative robot arm being demonstrated in the robotics laboratory", "50% 45%"),
      photo("0047", "Visitors at the CNC simulator in the mechanical engineering laboratory", "50% 45%"),
      photo("0022", "The cobot training cell in the robotics laboratory", "50% 55%"),
      photo("0039", "The PCB design and electronics manufacturing laboratory", "50% 45%"),
      photo("0021", "The electric vehicle trainer and wiring demonstration bench", "50% 55%"),
      photo("0037", "A faculty member explaining the electrical engineering laboratory benches", "50% 45%"),
      photo("0023", "The robotic welding cell on the workshop floor", "50% 50%"),
      photo("0048", "The CNC machine in the workshop, with the G-code reference behind it", "50% 45%"),
    ],
  },
  {
    id: "projects",
    eyebrow: "Project exhibition",
    title: ["Built by students,", "explained by students."],
    body: "Working models, wiring boards and prototypes from the trade floor and the polytechnic, presented by the students who built them.",
    images: [
      photo("0027", "An ITI student explaining a domestic wiring board at the project exhibition", "50% 45%"),
      photo("0026", "Students presenting working models at the project exhibition", "50% 45%"),
      photo("0054", "A wind-power road model demonstrated at the student exhibition", "50% 50%"),
      photo("0028", "Transformer and circuit models on display at the exhibition", "50% 45%"),
      photo("0055", "Trade projects lined up along the exhibition hall", "50% 45%"),
    ],
  },
  {
    id: "school",
    eyebrow: "सा विद्या या विमुक्तये",
    title: ["Knowledge is what", "sets you free."],
    body: "Satpuda Valley Public School — a CBSE classroom where science is something children build, present and argue about, not only read.",
    images: [
      photo("0052", "School students with their campus model at the STEM AI robotics lab", "50% 40%"),
      photo("0051", "Senior students explaining a working model of the human heart", "50% 42%"),
      photo("0030", "A school student presenting a nutrition pyramid model to visitors", "50% 42%"),
      photo("0050", "Students presenting a township model in the school corridor", "50% 45%"),
      photo("0031", "Junior students explaining their school model to guests", "50% 40%"),
      photo("0049", "Class III students presenting their science project in the corridor", "50% 45%"),
      photo("0029", "School children demonstrating a rocket model to visiting guests", "50% 45%"),
      photo("0053", "Young students presenting a rope-way project in the school corridor", "50% 45%"),
      photo("0032", "School students explaining a water-supply model to visitors", "50% 42%"),
    ],
  },
  {
    id: "trades",
    eyebrow: "Since 1999",
    title: ["Rooted in Balaghat.", "Built for beyond."],
    body: "Satpuda ITI has trained craftsmen here since 1999 — electrician, fitter, mechanic diesel and COPA, certified under the NCVT Craftsman Training Scheme.",
    images: [
      photo("0065", "ITI trainees gathered on the workshop floor at Manjhapur", "50% 45%"),
      photo("0064", "Trainees seated together in the ITI workshop hall", "50% 42%"),
      photo("0061", "The ITI workshop hall during a group gathering", "50% 45%"),
    ],
  },
  {
    id: "labs-opened",
    eyebrow: "New this session",
    title: ["New laboratories,", "opened this year."],
    body: "Robotics, CNC and electronics manufacturing facilities inaugurated on the Manjhapur campus — equipment students work on rather than watch.",
    images: [
      photo("0033", "The ribbon being cut at the inauguration of a new campus laboratory", "50% 45%"),
      photo("0035", "Guests at the opening of a new laboratory on the Satpuda campus", "50% 45%"),
      photo("0036", "A new campus facility being formally opened", "50% 45%"),
      photo("0034", "A family opening one of the new campus laboratories", "50% 45%"),
    ],
  },
  {
    id: "campus-life",
    eyebrow: "Vishwakarma Jayanti",
    title: ["What we honour,", "what we teach."],
    body: "Vishwakarma Jayanti is marked across the group every year — the trade floor, the polytechnic, the school and the teacher-education college, together on one campus.",
    images: [
      photo("0056", "Vishwakarma Jayanti being observed in the ITI workshop hall", "50% 42%"),
      photo("0066", "The decorated Vishwakarma Jayanti shrine in the ITI workshop", "50% 45%"),
      photo("0025", "Staff and students at the havan on Vishwakarma Jayanti", "50% 42%"),
      photo("0067", "Staff and students making a rangoli for the campus celebration", "50% 45%"),
      photo("0062", "The havan being lit during the Vishwakarma Jayanti ceremony", "50% 45%"),
      photo("0057", "Offerings being made at the Vishwakarma Jayanti ceremony", "50% 45%"),
      photo("0038", "A student performing on stage at the college cultural programme", "50% 45%"),
      photo("0059", "Staff seated together for the Vishwakarma Jayanti ceremony", "50% 45%"),
      photo("0063", "The ceremony being conducted for staff and trainees", "50% 45%"),
      photo("0058", "Lamps being lit at the Vishwakarma Jayanti ceremony", "50% 45%"),
      photo("0045", "A cultural performance on the college stage", "50% 30%"),
      photo("0060", "Staff at prayer during the campus ceremony", "50% 25%"),
      photo("0024", "Staff seated for the campus ceremony", "50% 25%"),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PLAYLIST                                                            */
/* ------------------------------------------------------------------ */

/**
 * Flattens the groups into the order the hero plays them: two photographs from
 * each headline before moving to the next, then back round for the next two.
 * That way every headline is seen early in the loop and every photograph is
 * eventually seen, instead of a visitor sitting through eleven ceremony shots
 * before the next headline arrives.
 */
function buildPlaylist(groups, perTurn = 2) {
  const cursors = groups.map(() => 0);
  const total = groups.reduce((n, g) => n + g.images.length, 0);
  const out = [];

  while (out.length < total) {
    groups.forEach((group, groupIndex) => {
      for (let n = 0; n < perTurn && cursors[groupIndex] < group.images.length; n++) {
        out.push({ ...group.images[cursors[groupIndex]], groupIndex });
        cursors[groupIndex] += 1;
      }
    });
  }

  return out;
}

export const heroPlaylist = buildPlaylist(heroGroups);

/** First playlist position for each group — where the pagination jumps to. */
export const heroGroupStarts = heroGroups.map((_, gi) =>
  heroPlaylist.findIndex((slide) => slide.groupIndex === gi),
);
