/* ------------------------------------------------------------------ */
/* SATPUDA ITIs — the fifteen campuses                                 */
/* ------------------------------------------------------------------ */

/*
 * Source: the Satpuda ITI network site (satpuda-iti.vercel.app), which
 * compiles each campus from satpudaiti.com. `established` is the year the
 * campus page gives; `null` means it is not published. `contactPerson`
 * stands in where a campus names a contact rather than a principal;
 * `itiCode` is from the Govt. of India list of MP private ITIs. `trades` pairs a
 * trade with its published intake (seats), where one is given. Manjhapur
 * is the head office campus.
 */

export const itiCampuses = [
  {
    id: "manjhapur",
    name: "Satpuda Private ITI, Manjhapur",
    shortName: "Manjhapur",
    location: "Manjhapur, Balaghat",
    principal: "Kamal Bramhe",
    dgetRef: "DGET-6/12/6/2010-TC",
    itiCode: "PR23000129",
    district: "Balaghat",
    established: 2010,
    website: "", // campus link — to be supplied
    address: "Satpuda Campus, Manjhapur, Lalburra Road, Garra, Madhya Pradesh 481001",
    phone: "+91 6262604120",
    email: "satpudamanjhapur@gmail.com",
    trades: [["Electrician", 756], ["Fitter", 63], ["Mechanic Diesel", 63]],
    head: true,
  },
  {
    id: "budhi",
    name: "New Satpuda Private ITI, Budhi",
    shortName: "Budhi",
    location: "Budhi, Balaghat",
    dgetRef: "DGET-6/12/274/2015",
    district: "Balaghat",
    established: 2015,
    website: "", // campus link — to be supplied
    address: "Ward No. 13, Budhi, Balaghat, Madhya Pradesh 481001",
    phone: "+91 6262604122",
    email: "newsatpudaitibudi@gmail.com",
    principal: "Mukesh Bahekar",
    trades: [["Electrician", 120]],
  },
  {
    id: "katangi",
    name: "New Satpuda Private ITI, Katangi",
    shortName: "Katangi",
    location: "Katangi, Balaghat",
    dgetRef: "DGET-6/12/73/2015-TC",
    district: "Balaghat",
    established: 2015,
    website: "", // campus link — to be supplied
    address: "Balaghat Road, Near State Bank, Katangi, Balaghat, Madhya Pradesh 481445",
    phone: "+91 6262604117",
    email: "newsatpudakatangi@gmail.com",
    trades: [],
  },
  {
    id: "baihar",
    name: "Maharana Pratap Private ITI, Baihar",
    shortName: "Baihar",
    location: "Baihar, Balaghat",
    itiCode: "PR23000323",
    district: "Balaghat",
    established: 2021,
    website: "", // campus link — to be supplied
    address: "Compounder Tola, Somani Mill, Baihar, Madhya Pradesh 481111",
    phone: "+91 6262604125",
    email: "maharanapratap.itibaihar@gmail.com",
    principal: "Santosh Sihore",
    trades: [["Electrician", 120], ["Fitter", 60]],
  },
  {
    id: "kundipura",
    name: "Satpuda Private ITI, Kundipura",
    shortName: "Kundipura",
    location: "Kundipura, Chhindwara",
    district: "Chhindwara",
    established: 2003,
    website: "", // campus link — to be supplied
    address: "Near Kundipura Thana, Chhindwara, Madhya Pradesh 480001",
    phone: "+91 6262604123",
    email: "satpudachindwara@gmail.com",
    principal: "Vijay Khapre",
    trades: [["Electrician", 120], ["Fitter", 60], ["Mechanic Diesel", 72]],
  },
  {
    id: "warehouse",
    name: "Satpuda Private ITI, Warehouse",
    shortName: "Warehouse",
    location: "Chhindwara",
    district: "Chhindwara",
    established: 2012,
    website: "", // campus link — to be supplied
    address: "Behind Phataka Godown, Chhindwara, Madhya Pradesh 480001",
    phone: "+91 6262604124",
    email: "satpudachhindwara@gmail.com",
    trades: [],
  },
  {
    id: "betul",
    name: "Satpuda Private ITI, Betul",
    shortName: "Betul",
    location: "Bharat Bharti, Betul",
    district: "Betul",
    established: 2009,
    website: "", // campus link — to be supplied
    address: "Bharat Bharti, Betul, Madhya Pradesh 460001",
    phone: "+91 6262604128",
    email: "satpudabetul@gmail.com",
    principal: "Niranjan More",
    trades: [["Electrician", 120], ["Fitter", 60], ["Mechanic Diesel", 72]],
  },
  {
    id: "multai",
    name: "Satpuda Private ITI, Multai",
    shortName: "Multai",
    location: "Chikhalikhurd, Multai",
    district: "Betul",
    established: 2015,
    website: "", // campus link — to be supplied
    address: "Chikhali Khurd, Chhindwara Road, Multai, Madhya Pradesh 460661",
    phone: "+91 6262604130",
    email: "satpudamultai@gmail.com",
    principal: "Saket Agnihotri",
    trades: [["Electrician", 240]],
  },
  {
    id: "sarni",
    name: "Satpuda Private ITI, Sarni",
    shortName: "Sarni",
    location: "Bagdona, Sarni",
    district: "Betul",
    established: 2016,
    website: "", // campus link — to be supplied
    address: "Salaiya, Near Geeta Mandir, Bagdona, Sarni, Madhya Pradesh 460449",
    phone: "+91 6262604127",
    email: "satpudasarni@gmail.com",
    principal: "Niranjan More",
    trades: [["Electrician", 120], ["Fitter", 120]],
  },
  {
    id: "itarsi",
    name: "Satpuda Private ITI, Itarsi",
    shortName: "Itarsi",
    location: "Itarsi, Narmadapuram",
    district: "Narmadapuram",
    established: 2016,
    website: "", // campus link — to be supplied
    address: "Near FCI, Jamani Road, Itarsi, Madhya Pradesh 461111",
    phone: "+91 6262604126",
    email: "satpudaitarsi@gmail.com",
    principal: "Raju Patle",
    trades: [["Electrician", 120], ["Fitter", 63], ["COPA", 63]],
  },
  {
    id: "seoni",
    name: "Satpuda Private ITI, Seoni",
    shortName: "Seoni",
    location: "Siladehi, Seoni",
    itiCode: "PR23000096",
    district: "Seoni",
    established: 2007,
    website: "", // campus link — to be supplied
    address: "Nagpur Road, Siladehi, Seoni, Madhya Pradesh 480661",
    phone: "+91 6262604131",
    email: "satpudaseoni@gmail.com",
    principal: "Pradeep Panchbudhe",
    trades: [["Electrician", 126], ["Fitter", 63], ["Mechanic Diesel", 63]],
  },
  {
    id: "mandla",
    name: "Satpuda Private ITI, Mandla",
    shortName: "Mandla",
    location: "Maharajpur Poundi, Mandla",
    itiCode: "PR23000099",
    district: "Mandla",
    established: 2007,
    website: "", // campus link — to be supplied
    address: "Nainpur Road, Maharajpur Poundi, Mandla, Madhya Pradesh 481661",
    phone: "+91 6262604118",
    email: "satpudamandla@gmail.com",
    principal: "Nand Kishor Kushre",
    trades: [["Electrician", 120], ["Fitter", 60], ["Mechanic Diesel", 72]],
  },
  {
    id: "rewa",
    name: "Satpuda Private ITI, Rewa",
    shortName: "Rewa",
    location: "Chorhata, Rewa",
    itiCode: "PR23000162",
    district: "Rewa",
    established: 2011,
    website: "", // campus link — to be supplied
    address: "Chorhata, Rewa, Madhya Pradesh 486001",
    phone: "+91 6262604134",
    email: "sitc.rewa.2011@gmail.com",
    principal: "Abhilash Khare",
    trades: [["Electrician", 180], ["Fitter", 120], ["Mechanic Diesel", 72]],
  },
  {
    id: "shiksha-rewa",
    name: "Shiksha Private ITI, Rewa",
    shortName: "Shiksha, Rewa",
    location: "Boda Bagh, Rewa",
    district: "Rewa",
    established: 2022,
    website: "", // campus link — to be supplied
    address: "Ward No. 8, Plot No. 849/1/1, Anand Nagar, Boda Bagh, Rewa, Madhya Pradesh 486001",
    phone: "+91 6262604134",
    email: "shikshaiti@gmail.com",
    trades: [],
  },
  {
    id: "mauganj",
    name: "Satpuda Private ITI, Mauganj",
    shortName: "Mauganj",
    location: "Mauganj",
    district: "Mauganj",
    established: 2016,
    website: "", // campus link — to be supplied
    address: "Mauganj Rewa Sidhi Road, Mauganj, Madhya Pradesh 486331",
    phone: "+91 6262604132",
    email: "satpudapvtitimauganj@gmail.com",
    principal: "Vivek Tiwari",
    trades: [["Electrician", 720], ["Fitter", 60], ["Mechanic Diesel", 72]],
  },
];

/* Where "Open in Maps" should search for a campus. */
export const campusMapUrl = (c) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name}, ${c.address}`)}`;

/* Districts in the order the network reached them. */
export const itiDistricts = [...new Set(itiCampuses.map((c) => c.district))];

/* How many campuses publish a given trade. */
export const campusesOffering = (trade) =>
  itiCampuses.filter((c) => c.trades.some(([t]) => t === trade)).length;
