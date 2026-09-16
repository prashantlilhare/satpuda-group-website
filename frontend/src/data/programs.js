/**
 * Programme catalogue.
 *
 * Branch lists come from the college's own published material. Durations and
 * eligibility follow AICTE / RGPV / NCVT norms, which are national standards
 * rather than institution-specific claims. Fees, intake and seat matrices are
 * deliberately absent — those change every session and are not published here.
 */

/* ------------------------------------------------------------------ */
/* ENGINEERING — DEGREE                                                */
/* ------------------------------------------------------------------ */

export const btechBranches = [
  {
    code: "CSE",
    name: "Computer Science Engineering",
    body: "Programming, data structures, databases, networks and software engineering, taught alongside project work in the college's computer laboratories.",
    topics: ["Software engineering", "Data structures", "Databases", "Networks"],
  },
  {
    code: "MIN",
    name: "Mining Engineering",
    body: "Mine planning, surveying, rock mechanics and mine safety — a discipline with direct relevance to the mineral belt around Balaghat.",
    topics: ["Mine surveying", "Rock mechanics", "Mine safety", "Mine planning"],
  },
  {
    code: "CIV",
    name: "Civil Engineering",
    body: "Structural analysis, surveying, geotechnical and transportation engineering, supported by materials testing and survey fieldwork.",
    topics: ["Structures", "Surveying", "Geotechnical", "Transportation"],
  },
  {
    code: "MECH",
    name: "Mechanical Engineering",
    body: "Thermodynamics, machine design, manufacturing processes and CAD, with workshop and thermal laboratory practice.",
    topics: ["Thermodynamics", "Machine design", "Manufacturing", "CAD"],
  },
  {
    code: "EE",
    name: "Electrical Engineering",
    body: "Circuits, machines, power systems, control and renewable energy, practised in the electrical machines and measurement laboratories.",
    topics: ["Power systems", "Electrical machines", "Control systems", "Renewables"],
  },
];

/* ------------------------------------------------------------------ */
/* ENGINEERING — DIPLOMA                                               */
/* ------------------------------------------------------------------ */

export const diplomaBranches = [
  { name: "Civil Engineering", body: "Construction practice, surveying, estimating and site supervision." },
  { name: "Electrical Engineering", body: "Installation, machines, power distribution and electrical maintenance." },
  { name: "Mechanical Engineering", body: "Workshop technology, machine drawing, manufacturing and maintenance." },
  { name: "Mining & Mine Survey", body: "Mine operations, survey practice and statutory mine safety procedure." },
];

export const engineeringAdmission = [
  {
    label: "B.Tech (Degree)",
    duration: "4 years · 8 semesters",
    eligibility:
      "Pass in 10+2 with Physics and Mathematics, plus one of Chemistry, Computer Science, Biology or an approved vocational subject, per AICTE norms.",
    note: "Admission is through the Madhya Pradesh counselling process conducted by DTE.",
  },
  {
    label: "Diploma (Polytechnic)",
    duration: "3 years · 6 semesters",
    eligibility: "Pass in Class 10 (High School) from a recognised board.",
    note: "Lateral entry to the second year may be available for ITI and 10+2 candidates.",
  },
];

/* ------------------------------------------------------------------ */
/* ITI — CRAFTSMAN TRAINING SCHEME                                     */
/* ------------------------------------------------------------------ */

export const itiTrades = [
  {
    name: "Electrician",
    type: "Engineering trade",
    duration: "2 years",
    eligibility: "Class 10 passed with Science and Mathematics",
    body: "Wiring practice, electrical machines, motor control, and installation and maintenance of domestic and industrial systems.",
  },
  {
    name: "Fitter",
    type: "Engineering trade",
    duration: "2 years",
    eligibility: "Class 10 passed with Science and Mathematics",
    body: "Precision fitting, machining, assembly and maintenance of mechanical components and industrial equipment.",
  },
  {
    name: "Mechanic Diesel",
    type: "Engineering trade",
    duration: "1 year",
    eligibility: "Class 10 passed with Science and Mathematics",
    body: "Diesel engine systems, fuel injection, overhaul practice and the servicing of vehicles and stationary engines.",
  },
  {
    name: "COPA",
    type: "Non-engineering trade",
    duration: "1 year",
    eligibility: "Class 10 passed",
    body: "Computer Operator & Programming Assistant — office productivity, accounting packages, web basics and database operation.",
  },
];

/* ------------------------------------------------------------------ */
/* TEACHER EDUCATION — general programme information                   */
/* ------------------------------------------------------------------ */

export const teacherEducation = [
  {
    id: "ded",
    code: "D.Ed",
    name: "Diploma in Education",
    stage: "Foundation & primary years",
    summary:
      "A practice-led diploma that prepares teachers for the foundational and primary years, where habits of reading, number sense and curiosity are formed.",
    modules: [
      { title: "Child development", body: "How children grow cognitively, socially and emotionally, and what that means for a classroom." },
      { title: "Teaching methodology", body: "Lesson planning, questioning, classroom management and differentiated instruction." },
      { title: "Foundational literacy & numeracy", body: "Building early reading, writing and number skills with age-appropriate method." },
      { title: "Practical training", body: "Supervised teaching practice in real classrooms, with structured observation and feedback." },
    ],
  },
  {
    id: "bed",
    code: "B.Ed",
    name: "Bachelor of Education",
    stage: "Secondary & senior secondary",
    summary:
      "A professional degree for graduates entering secondary teaching, combining educational theory with an extended school internship.",
    modules: [
      { title: "Educational psychology", body: "Learning theory, motivation, assessment and the diversity of learners in one room." },
      { title: "Curriculum development", body: "How syllabus becomes a teaching sequence, and how to evaluate what it achieves." },
      { title: "Pedagogy of school subjects", body: "Subject-specific method for teaching the content of secondary school." },
      { title: "Teaching internship", body: "An extended placement in a school, carrying real teaching responsibility under mentorship." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SCHOOL                                                              */
/* ------------------------------------------------------------------ */

export const schoolPillars = [
  {
    title: "Academic foundation",
    body: "A CBSE curriculum delivered with attention to conceptual understanding rather than rote recall, supported by subject laboratories.",
  },
  {
    title: "Student development",
    body: "Reading, public speaking, discussion and project work that build the confidence to stand up and explain an idea.",
  },
  {
    title: "Sport & activity",
    body: "Regular games and athletics on the campus grounds and courts, treated as part of the school week rather than an add-on.",
  },
  {
    title: "Culture & celebration",
    body: "Annual functions, cultural programmes and competitions that give every student a stage at some point in the year.",
  },
];
