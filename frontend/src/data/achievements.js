/**
 * Achievements across the group.
 *
 * ITI figures are copied from the placement table on satpudaiti.com
 * ("Placement Details"), recruiters from the logo panel on the same page.
 * `pkg` is that table's "Salary Package" column, in rupees a year.
 */

export const itiPlacements = [
  { year: 2016, drives: 2, placed: 103, rate: 83, pkg: 240000 },
  { year: 2017, drives: 11, placed: 587, rate: 91, pkg: 150000 },
  { year: 2018, drives: 23, placed: 1044, rate: 97, pkg: 222000 },
  { year: 2019, drives: 15, placed: 533, rate: 85, pkg: 210000 },
  { year: 2020, drives: 9, placed: 368, rate: 89, pkg: 174000 },
  { year: 2021, drives: 10, placed: 632, rate: 94, pkg: 240000 },
];

export const itiRecruiters = [
  "Tata Motors",
  "BHEL",
  "Indian Railways",
  "IndianOil",
  "SAIL",
  "GAIL",
  "HAL",
  "MOIL",
  "BSNL",
  "Hyundai",
  "Toyota",
  "Honda",
  "Maruti Suzuki",
  "Mahindra",
  "Bajaj",
  "Hero",
  "Yamaha",
  "Eicher",
  "Volvo",
  "Bridgestone",
  "Samsung",
  "Wipro",
  "L&T Infotech",
  "Jindal Steel & Power",
  "Raymond",
  "Yazaki",
];

/* The headline of each institution, for the homepage. Every figure is one
   already shown, with its source, on that institution's own page. */
export const groupAchievements = [
  {
    value: "16.3",
    unit: "LPA",
    label: "Highest package",
    who: "Mithlesh Kherwar, Group R Mining & Exploration",
    institution: "Engineering & Polytechnic",
    to: "/institutes/btech-polytechnic",
  },
  {
    value: "3,267",
    unit: "",
    label: "ITI trainees placed, 2016–21",
    who: "97% placed in 2018 alone",
    institution: "Satpuda ITIs",
    to: "/institutes/iti",
  },
  {
    value: "90.2",
    unit: "%",
    label: "CBSE Class X topper, 2023–24",
    who: "Vanshika Sahare",
    institution: "Valley Public School",
    to: "/institutes/school",
  },
  {
    value: "AIIMS",
    unit: "",
    label: "Selection, score 678",
    who: "Om Pardhi",
    institution: "Valley Public School",
    to: "/institutes/school",
  },
];
