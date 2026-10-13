/**
 * Engineering & polytechnic placements.
 *
 * Copied from the college's own placements page: each placed student with
 * their branch, company, package and year, portraits in
 * `assets/images/placement/` at 600w and 320w. One student there holds two
 * offers (Zenus Group and GR Infraprojects); he appears once, with the
 * higher of the two.
 */
const files = import.meta.glob("../assets/images/placement/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const url = (name) => files[`../assets/images/placement/${name}.webp`];

function student(file, name, branch, company, lpa, year) {
  return {
    id: file,
    name,
    branch,
    company,
    lpa,
    year,
    src: url(file),
    srcSet: `${url(`${file}-320w`)} 320w, ${url(file)} 600w`,
  };
}

/* Highest package first. */
export const placedStudents = [
  student("mithlesh-kherwar", "Mithlesh Kherwar", "Diploma, Mining & Mine Survey", "Group R Mining & Exploration", 16.3, 2017),
  student("ashish-kolte", "Ashish Kolte", "Diploma, Mechanical", "WMW SRL Bacău, Europe", 15.3, 2022),
  student("sanjeet-pancheswar", "Sanjeet Pancheswar", "Diploma, Mining & Mine Survey", "Group R Mining & Exploration", 14.3, 2017),
  student("yojna-pardhi", "Yojna Pardhi", "B.Tech, CSE", "Zenus Group", 7, 2026),
  student("preksha-dwivedi", "Preksha Dwivedi", "B.Tech, CSE", "Zenus Group", 7, 2026),
  student("himanshu-patle", "Himanshu Patle", "B.Tech, CSE", "Zenus Group", 7, 2026),
  student("dewang-malewar", "Dewang Malewar", "B.Tech, CSE", "First Step Innovation", 4, 2026),
  student("vishakha-baghele", "Vishakha Baghele", "B.Tech, CSE", "First Step Innovation", 4, 2026),
  student("ankush-nandagouli", "Ankush Nandagouli", "B.Tech, CSE", "First Step Innovation", 4, 2026),
  student("rajneesh-ashwale", "Rajneesh Ashwale", "B.Tech, CSE", "First Step Innovation", 4, 2026),
  student("gagan-patle", "Gagan Patle", "Diploma, Electrical", "Zenus Group", 4, 2026),
  student("tarun-bisen", "Tarun Bisen", "Diploma, Mechanical", "Zenus Group", 4, 2026),
  student("praful-bithle", "Praful Bithle", "Diploma, Mechanical", "Zenus Group", 4, 2026),
  student("abhay-rahangdale", "Abhay Rahangdale", "Diploma, Civil", "Zenus Group", 4, 2026),
  student("vinendra-pagarwar", "Vinendra Pagarwar", "Diploma, Civil", "Zenus Group", 4, 2026),
  student("yash-shrivastava", "Yash Shrivastava", "Diploma, Civil", "Zenus Group", 4, 2026),
  student("ranveer-sharma", "Ranveer Sharma", "B.Tech, Mining", "Lloyds Metals & Energy", 3.7, 2026),
  student("ankit-bandhe", "Ankit Bandhe", "Diploma, Mechanical", "Lloyds Metals & Energy", 3.7, 2026),
  student("dishant-thakre", "Dishant Thakre", "Diploma, Mechanical", "Lloyds Metals & Energy", 3.7, 2026),
  student("dipanshu", "Dipanshu", "Diploma, Mechanical", "Lloyds Metals & Energy", 3.7, 2026),
  student("vijesh-kumar", "Vijesh Kumar", "Diploma, Electrical", "Lloyds Metals & Energy", 3.7, 2026),
  student("adnan-khan", "Adnan Khan", "Diploma, Mining", "Lloyds Metals & Energy", 3.7, 2026),
  student("abhishek-maneshwar", "Abhishek Maneshwar", "B.Tech, Civil", "GR Infraprojects", 3.25, 2026),
  student("harshit-selokar", "Harshit Selokar", "Diploma, Electrical", "GR Infraprojects", 3.25, 2026),
  student("himanshu-doras", "Himanshu Doras", "Diploma, Civil", "GR Infraprojects", 3.25, 2026),
  student("om-dubey", "Om Dubey", "Diploma, Civil", "GR Infraprojects", 3.25, 2026),
  student("naveen-gajbhiye", "Naveen Gajbhiye", "Diploma, Civil", "GR Infraprojects", 3.25, 2026),
];

/* The figures above the marquee, all read off the list above. */
export const placementHighlights = [
  { value: "16.3", unit: "LPA", label: "Highest package", note: "Group R Mining & Exploration" },
  { value: "15.3", unit: "LPA", label: "International offer", note: "WMW SRL Bacău, Europe" },
  { value: "7.0", unit: "LPA", label: "Top offer, 2026 batch", note: "Zenus Group" },
  { value: "28", unit: "", label: "Offers made", note: "across six recruiters" },
];
