/**
 * Department and school photographs.
 *
 * The group's own pictures of each branch at work — surveying, the engine
 * lab, mine visits — and of the school's Independence Day. Each is encoded
 * at 1600w, 960w and 460w in `assets/images/gallery/` and pulled in by glob,
 * the same way `photos.js` reads the hero wall.
 */
const files = import.meta.glob("../assets/images/gallery/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const url = (name) => files[`../assets/images/gallery/${name}.webp`];

/** One photograph, by file name. Same shape as `photo()` in `photos.js`. */
export function shot(name, alt, focus = "50% 50%") {
  return {
    id: name,
    src: url(name),
    small: url(`${name}-460w`),
    srcSet: `${url(`${name}-460w`)} 460w, ${url(`${name}-960w`)} 960w, ${url(name)} 1600w`,
    alt,
    focus,
  };
}

/* Engineering & polytechnic, by branch. */
export const shots = {
  civilLevel: shot("civil-survey-level", "Civil engineering students taking readings with a dumpy level", "45% 40%"),
  civilTotalStation: shot("civil-total-station", "Students surveying with a total station and prism on campus", "45% 45%"),
  civilSiteVisit: shot("civil-site-visit", "Civil engineering students on a bridge construction site visit", "50% 45%"),
  civilExpo: shot("civil-project-expo", "Civil students presenting truss bridge and structure models at the project expo", "50% 55%"),
  mechGoKart: shot("mech-go-kart", "Mechanical engineering students with the go-kart they built", "50% 55%"),
  mechEngineLab: shot("mech-engine-lab", "Students working on an engine trainer in the automobile lab", "50% 45%"),
  elecBench: shot("elec-lab-bench", "Electrical students wiring an experiment board with their lab instructor", "40% 45%"),
  elecTower: shot("elec-tower-practical", "Electrical students stringing a model transmission line outside the college", "40% 50%"),
  miningBriefing: shot("mining-site-briefing", "Engineering students in hard hats being briefed on a mine site visit", "40% 45%"),
  miningVisit: shot("mining-industrial-visit", "Students in safety gear with the college bus before an industrial visit", "50% 55%"),
  miningPlant: shot("mining-plant-visit", "Students in safety vests at a mining plant during an industrial visit", "55% 50%"),
  library: shot("library-entrance", "The college library seen through its entrance", "55% 50%"),
  kabaddi: shot("sports-kabaddi", "The college kabaddi team celebrating with faculty in the indoor hall", "50% 45%"),
  cultural: shot("cultural-evening", "Students gathered on stage at the college cultural evening", "50% 50%"),
};

/* Satpuda Valley Public School — Independence Day, sport and the school year. */
export const schoolShots = {
  flagHoisting: shot("school-flag-hoisting", "The national flag being hoisted at the school on Independence Day", "40% 65%"),
  assemblyLines: shot("school-assembly-lines", "School students standing in lines at the Independence Day assembly", "50% 55%"),
  assemblySeated: shot("school-assembly-seated", "Students seated with tricolour flags at the Independence Day programme", "50% 50%"),
  choir: shot("school-choir", "Young students singing on stage for Independence Day", "50% 40%"),
  prizeGiving: shot("school-prize-giving", "Prize winners on stage with guests and teachers on Independence Day", "50% 40%"),
  principalSpeech: shot("school-principal-speech", "The principal addressing students from the podium", "35% 45%"),
  address: shot("school-independence-address", "A guest addressing the school on Independence Day", "35% 45%"),
  lampLighting: shot("school-lamp-lighting", "Guests lighting the lamp to open a school programme", "55% 50%"),
  /* Sport, festivals and the school week. */
  footballTrophy: shot("school-football-trophy", "A school footballer receiving the trophy at the Inter School Football Tournament 2024", "55% 40%"),
  footballBoys: shot("school-football-boys", "The school's boys' football team in kit on the ground", "50% 45%"),
  girlsTeam: shot("school-girls-team", "The girls' team with their teachers and coaches on the school ground", "50% 50%"),
  kabaddi: shot("school-kabaddi", "Students playing kabaddi on mats in the school courtyard", "40% 50%"),
  yoga: shot("school-yoga", "A student holding a wheel pose during a yoga session", "45% 50%"),
  turfAssembly: shot("school-turf-assembly", "Students seated in rows on the hockey turf for a mass yoga session", "50% 50%"),
  sportsDay: shot("school-sports-day", "Students in house colours lined up for the sports day march-past", "50% 65%"),
  housePyramid: shot("school-human-pyramid", "Students forming a human pyramid on the sports ground", "50% 40%"),
  houseCaptains: shot("school-house-captains", "House captains with their flags and sashes at the investiture ceremony", "50% 50%"),
  basantPanchami: shot("school-basant-panchami", "Pre-primary children in yellow celebrating Basant Panchami with their teachers", "50% 55%"),
  orangeDay: shot("school-orange-day", "A young pupil dressed as an orange for Orange Colour Day", "50% 55%"),
  fancyDress: shot("school-fancy-dress", "Little ones in costume for the fancy dress competition", "50% 55%"),
  plantation: shot("school-plantation", "Young students with saplings at a plantation drive", "50% 50%"),
  natureTrip: shot("school-nature-trip", "Students and teachers seated together in the forest on a nature trip", "50% 45%"),
  computerLab: shot("school-computer-lab", "Students working at computers in the school lab", "50% 45%"),
  library: shot("school-library", "Junior students reading at the library tables", "45% 55%"),
  careerGuidance: shot("school-career-guidance", "Senior students listening at a career guidance session", "50% 50%"),
  /* From the 2026 prospectus — the labs, robotics, classrooms by stage,
     trips and the school's events. */
  labComputer: shot("school-lab-computer", "Students at their computers in the school computer lab", "50% 50%"),
  labChemistry: shot("school-lab-chemistry", "The chemistry lab with its work benches and reagent shelves", "50% 55%"),
  labPhysics: shot("school-lab-physics", "Students and their teacher gathered round a physics experiment", "50% 45%"),
  labBio: shot("school-lab-bio", "Students studying a human anatomy model in the biology lab", "50% 45%"),
  labMath: shot("school-lab-math", "Students working with geoboards at a round table in the math lab", "50% 50%"),
  labComposite: shot("school-lab-composite", "The composite science lab with its benches and charts", "50% 50%"),
  labRobotics: shot("school-lab-robotics", "Students building a circuit together in the robotics lab", "50% 45%"),
  artCraft: shot("school-art-craft", "A student drawing on the floor of the art and craft room", "50% 50%"),
  smartLibrary: shot("school-smart-library", "Students reading at the long tables of the school library", "40% 55%"),
  roboticsExpo: shot("school-robotics-expo", "The IoT and robotics exhibition board in front of the school building", "50% 55%"),
  robotArm: shot("school-robot-arm", "A student-built robotic arm wired to its controller on a desk", "50% 50%"),
  stemModel: shot("school-stem-model", "Young students presenting a model house at the science exhibition", "50% 45%"),
  stageFoundation: shot("school-stage-foundation", "A pre-primary pupil writing at a small yellow desk", "50% 45%"),
  stageDevelopment: shot("school-stage-development", "Junior students lined up for a traffic-light road safety activity", "50% 50%"),
  stageExploration: shot("school-stage-exploration", "A middle-school class at their desks in a bright classroom", "50% 55%"),
  stageSenior: shot("school-stage-senior", "Senior students at their desks during class", "50% 50%"),
  penchTrip: shot("school-pench-trip", "Students and teachers gathered together on the Pench National Park trip", "50% 50%"),
  stateFootball: shot("school-state-football", "The school's state-level football team posing on the ground", "50% 45%"),
  groundAssembly: shot("school-ground-assembly", "The whole school assembled in house colours on the ground", "50% 60%"),
  chess: shot("school-chess", "Two students concentrating over a game of chess", "50% 50%"),
  annualFunction: shot("school-annual-function", "Students performing on stage at the Rajat Jayanti annual function", "50% 45%"),
  sportsMeet: shot("school-sports-meet", "Guests releasing balloons to open the JAZBA sports meet", "50% 55%"),
  cultural: shot("school-cultural", "Students performing on stage at a cultural programme", "50% 45%"),
  rotaryEvent: shot("school-rotary-event", "Students in a group performance at the Rotary Club event", "50% 50%"),
};

/* D.Ed & B.Ed — faculty, classroom teaching and trainees. 6 and 7 are
   cropped clear of a phone watermark and screenshot bars; the faculty
   photograph clear of a GPS-camera stamp. */
export const dedShots = {
  faculty: shot("ded-bed-faculty", "The faculty of Satpuda B.Ed College, Balaghat, beneath the college board", "50% 55%"),
  teaching: shot("ded-bed-teaching", "A faculty member teaching a D.Ed and B.Ed class from the lectern", "40% 50%"),
  1: shot("ded-bed-1", "D.Ed and B.Ed trainees with staff on stage at the Teachers' Day celebration", "50% 62%"),
  2: shot("ded-bed-2", "Teacher trainees with faculty members in the campus hall", "50% 45%"),
  3: shot("ded-bed-3", "Trainees and faculty seated together on stage on Teachers' Day", "50% 45%"),
  4: shot("ded-bed-4", "The full teacher-education batch with staff on the campus auditorium stage", "50% 60%"),
  5: shot("ded-bed-5", "Trainees, students and faculty gathered for the Teachers' Day group photograph", "50% 55%"),
  6: shot("ded-bed-6", "Trainee teachers with pupils at Government Middle School, Kosmi, Balaghat, during teaching practice", "50% 60%"),
  7: shot("ded-bed-7", "Guests from Annapurna Pawar Mahila Mandal being welcomed with a bouquet on campus", "50% 45%"),
};
