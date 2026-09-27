/* ------------------------------------------------------------------ */
/* CAMPUS GALLERY — the marquee under "Why Satpuda Group"              */
/*                                                                    */
/* Photographs from across the group: engineering and polytechnic     */
/* laboratories, the ITI trade floor, the school's project exhibition */
/* and the days the whole campus turns out for. Two widths each, the  */
/* same pattern the hero slides use.                                  */
/* ------------------------------------------------------------------ */

import evTrainer from "../assets/images/gallery/ev-trainer.webp";
import evTrainerSm from "../assets/images/gallery/ev-trainer-460w.webp";
import roboticsArm from "../assets/images/gallery/robotics-arm.webp";
import roboticsArmSm from "../assets/images/gallery/robotics-arm-460w.webp";
import cncMachine from "../assets/images/gallery/cnc-machine.webp";
import cncMachineSm from "../assets/images/gallery/cnc-machine-460w.webp";
import electricalRig from "../assets/images/gallery/electrical-rig.webp";
import electricalRigSm from "../assets/images/gallery/electrical-rig-460w.webp";
import roboticCell from "../assets/images/gallery/robotic-cell.webp";
import roboticCellSm from "../assets/images/gallery/robotic-cell-460w.webp";
import stemRoboticsLab from "../assets/images/gallery/stem-robotics-lab.webp";
import stemRoboticsLabSm from "../assets/images/gallery/stem-robotics-lab-460w.webp";
import anatomyModel from "../assets/images/gallery/anatomy-model.webp";
import anatomyModelSm from "../assets/images/gallery/anatomy-model-460w.webp";
import civilModel from "../assets/images/gallery/civil-model.webp";
import civilModelSm from "../assets/images/gallery/civil-model-460w.webp";
import schoolProjectDesk from "../assets/images/gallery/school-project-desk.webp";
import schoolProjectDeskSm from "../assets/images/gallery/school-project-desk-460w.webp";
import youngPresenter from "../assets/images/gallery/young-presenter.webp";
import youngPresenterSm from "../assets/images/gallery/young-presenter-460w.webp";
import juniorExhibit from "../assets/images/gallery/junior-exhibit.webp";
import juniorExhibitSm from "../assets/images/gallery/junior-exhibit-460w.webp";
import corridorExhibits from "../assets/images/gallery/corridor-exhibits.webp";
import corridorExhibitsSm from "../assets/images/gallery/corridor-exhibits-460w.webp";
import exhibitionHall from "../assets/images/gallery/exhibition-hall.webp";
import exhibitionHallSm from "../assets/images/gallery/exhibition-hall-460w.webp";
import projectDemo from "../assets/images/gallery/project-demo.webp";
import projectDemoSm from "../assets/images/gallery/project-demo-460w.webp";
import tradeBench from "../assets/images/gallery/trade-bench.webp";
import tradeBenchSm from "../assets/images/gallery/trade-bench-460w.webp";
import chartTalk from "../assets/images/gallery/chart-talk.webp";
import chartTalkSm from "../assets/images/gallery/chart-talk-460w.webp";
import inauguration from "../assets/images/gallery/inauguration.webp";
import inaugurationSm from "../assets/images/gallery/inauguration-460w.webp";
import ribbonCutting from "../assets/images/gallery/ribbon-cutting.webp";
import ribbonCuttingSm from "../assets/images/gallery/ribbon-cutting-460w.webp";
import stagePerformance from "../assets/images/gallery/stage-performance.webp";
import stagePerformanceSm from "../assets/images/gallery/stage-performance-460w.webp";
import danceSolo from "../assets/images/gallery/dance-solo.webp";
import danceSoloSm from "../assets/images/gallery/dance-solo-460w.webp";
import fullAuditorium from "../assets/images/gallery/full-auditorium.webp";
import fullAuditoriumSm from "../assets/images/gallery/full-auditorium-460w.webp";
import studentAudience from "../assets/images/gallery/student-audience.webp";
import studentAudienceSm from "../assets/images/gallery/student-audience-460w.webp";
import tradeAssembly from "../assets/images/gallery/trade-assembly.webp";
import tradeAssemblySm from "../assets/images/gallery/trade-assembly-460w.webp";
import rangoli from "../assets/images/gallery/rangoli.webp";
import rangoliSm from "../assets/images/gallery/rangoli-460w.webp";
import { shots, schoolShots, dedShots } from "./shots";

/* A photograph from `shots.js`, framed for the marquee. */
const pick = (s, shape) => frame(s.src, s.small, s.alt, shape);

/**
 * One frame in the marquee.
 *
 * `shape` is the tile's own crop, not the photograph's: every row runs at a
 * single height, so the shape is what decides the tile's width. Mixing the
 * three is what keeps a row from reading as a grid of equal boxes.
 *
 *   wide     3 / 2   the default landscape frame
 *   square   1 / 1   a tighter crop, breaking up a run of wides
 *   upright  4 / 5   a narrow portrait frame
 */
const frame = (src, small, alt, shape = "wide") => ({ src, small, alt, shape });

/* Row one — laboratories and the exhibition floor. */
const rowOne = [
  frame(evTrainer, evTrainerSm, "An electric two-wheeler cutaway on its plinth in the automobile teaching lab"),
  frame(stemRoboticsLab, stemRoboticsLabSm, "School students presenting their robotics lab project model", "square"),
  frame(exhibitionHall, exhibitionHallSm, "Visitors moving between project tables in the exhibition hall"),
  frame(ribbonCutting, ribbonCuttingSm, "A child cutting the ribbon at a campus inauguration", "square"),
  frame(tradeBench, tradeBenchSm, "ITI trainees gathered around a demonstration bench on the trade floor"),
  frame(corridorExhibits, corridorExhibitsSm, "Student project tables lining a teaching block corridor", "square"),
  frame(danceSolo, danceSoloSm, "A student performing a solo dance on the college stage", "upright"),
  frame(cncMachine, cncMachineSm, "A CNC machine being demonstrated to visitors in the workshop"),
  pick(shots.civilLevel, "square"),
  pick(shots.miningBriefing),
  pick(schoolShots.choir, "square"),
  pick(shots.cultural),
];

/* Row two — people at work. */
const rowTwo = [
  frame(roboticsArm, roboticsArmSm, "A faculty member demonstrating the robotic arm to a gathered group"),
  frame(schoolProjectDesk, schoolProjectDeskSm, "Visitors at a school project desk during the exhibition", "square"),
  frame(stagePerformance, stagePerformanceSm, "A dance performance on stage beneath the college banner"),
  frame(anatomyModel, anatomyModelSm, "Students standing behind an anatomical heart model at their stall", "square"),
  frame(tradeAssembly, tradeAssemblySm, "ITI trainees seated together in the assembly hall"),
  frame(projectDemo, projectDemoSm, "A student explaining a working project model to visitors", "square"),
  frame(inauguration, inaugurationSm, "Staff at the ribbon-cutting of a new teaching space"),
  frame(electricalRig, electricalRigSm, "An electrical training rig standing ready in the laboratory", "square"),
  pick(shots.mechGoKart),
  pick(schoolShots.flagHoisting, "upright"),
  pick(shots.elecTower),
  pick(shots.mechEngineLab, "square"),
  pick(dedShots.teaching),
];

/* Row three — the wider campus. */
const rowThree = [
  frame(roboticCell, roboticCellSm, "A caged robotic work cell installed in the engineering workshop"),
  frame(civilModel, civilModelSm, "Students presenting a road and township layout model", "square"),
  frame(fullAuditorium, fullAuditoriumSm, "A full auditorium of students at a campus gathering"),
  frame(rangoli, rangoliSm, "Students laying a rangoli together on the campus floor", "square"),
  frame(youngPresenter, youngPresenterSm, "A young student presenting his project to visiting staff"),
  frame(chartTalk, chartTalkSm, "A chart being presented to visitors on the exhibition floor", "square"),
  frame(studentAudience, studentAudienceSm, "Students in college blazers seated in the audience"),
  frame(juniorExhibit, juniorExhibitSm, "Junior students demonstrating their model to visiting guests", "square"),
  pick(shots.civilTotalStation),
  pick(shots.kabaddi, "square"),
  pick(schoolShots.prizeGiving),
  pick(shots.miningVisit, "square"),
  pick(dedShots.faculty),
];

/**
 * Three rows, alternating direction: one and three drift left → right, two
 * drifts right → left.
 *
 * `drift` is how long one full pass of a row's own content takes — long
 * enough that the gallery reads as a slow current rather than a carousel,
 * and deliberately unequal between rows so the three never lock into step.
 */
export const galleryRows = [
  { id: "one", direction: "right", drift: "68s", frames: rowOne },
  { id: "two", direction: "left", drift: "58s", frames: rowTwo },
  { id: "three", direction: "right", drift: "76s", frames: rowThree },
];
