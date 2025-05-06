export const dashboard = [
  {
    id: 1,
    name: "Part One",
    tagLines: [
      { title: "RECEIVED QTY", value: "25" },
      { title: "RECEIVED DATE", value: "04/20/2025" },
      { title: "EXPECTED QTY", value: "40" },
      { title: "Target Date", value: "04/20/2025" },
    ],
    onHold: 22,
    locations: [
      {
        name: "Inspection",
        value: 2,
      },
      {
        name: "Disassembly",
        value: 13,
      },
      {
        name: "Sanding",
        value: 8,
      },
      {
        name: "primer",
        value: 2,
        isHold: true,
      },
      {
        name: "base coat",
        value: 0,
      },
      {
        name: "wtp",
        value: 0,
      },
      {
        name: "clear coat",
        value: 0,
      },
      {
        name: "polishing",
        value: 0,
      },
      {
        name: "assembly",
        value: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Part Two",
    onHold: 20,
    tagLines: [
      { title: "RECEIVED QTY", value: "30" },
      { title: "RECEIVED DATE", value: "04/10/2025" },
      { title: "EXPECTED QTY", value: "50" },
      { title: "Target Date", value: "04/20/2025" },
    ],
    locations: [
      {
        name: "Inspection",
        value: 8,
      },
      {
        name: "Disassembly",
        value: 12,
      },
      {
        name: "Sanding",
        value: 8,
      },
      {
        name: "primer",
        value: 4,
        isHold: false,
      },
      {
        name: "base coat",
        value: 5,
      },
      {
        name: "wtp",
        value: 6,
        isHold: true,
      },
      {
        name: "clear coat",
        value: 2,
      },
      {
        name: "polishing",
        value: 0,
      },
      {
        name: "assembly",
        value: 0,
      },
    ],
  },
  {
    id: 3,
    name: "Part Three",
    onHold: 31,
    tagLines: [
      { title: "RECEIVED QTY", value: "60" },
      { title: "RECEIVED DATE", value: "04/01/2025" },
      { title: "EXPECTED QTY", value: "110" },
      { title: "Target Date", value: "04/28/2025" },
    ],
    locations: [
      {
        name: "Inspection",
        value: 10,
      },
      {
        name: "Disassembly",
        value: 2,
      },
      {
        name: "Sanding",
        value: 17,
      },
      {
        name: "primer",
        value: 11,
      },
      {
        name: "base coat",
        value: 20,
      },
      {
        name: "wtp",
        value: 19,
      },
      {
        name: "clear coat",
        value: 29,
      },
      {
        name: "polishing",
        value: 30,
        isHold: true,
      },
      {
        name: "assembly",
        value: 0,
      },
    ],
  },
  {
    id: 4,
    name: "Part Four",
    onHold: 38,
    tagLines: [
      { title: "RECEIVED QTY", value: "99" },
      { title: "RECEIVED DATE", value: "04/02/2025" },
      { title: "EXPECTED QTY", value: "150" },
      { title: "Target Date", value: "04/25/2025" },
    ],
    locations: [
      {
        name: "Inspection",
        value: 39,
      },
      {
        name: "Disassembly",
        value: 22,
      },
      {
        name: "Sanding",
        value: 12,
      },
      {
        name: "primer",
        value: 2,
        isHold: true,
      },
      {
        name: "base coat",
        value: 0,
      },
      {
        name: "wtp",
        value: 0,
      },
      {
        name: "clear coat",
        value: 0,
      },
      {
        name: "polishing",
        value: 0,
      },
      {
        name: "assembly",
        value: 0,
      },
    ],
  },
];

export const DashboardTile = [1, 2, 4, 8];

export const locations = [
  { name: "INSPECTION", value: "", isHold: false },
  { name: "DISASSEMBLY", value: "", isHold: false },
  { name: "SANDING", value: "", isHold: false },
  { name: "PRIMER", value: "", isHold: false },
  { name: "BASE COAT", value: "", isHold: false },
  { name: "WTP", value: "", isHold: false },
  { name: "CLEAT COAT", value: "", isHold: false },
  { name: "POLISHING", value: "", isHold: false },
  { name: "ASSEMBLY", value: "", isHold: false },
];
