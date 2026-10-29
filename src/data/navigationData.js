// Top-level navigation items
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

// Medical Specialties list
export const SPECIALTIES = [
  {
    name: "ENT, Head & Neck Oncology",
    path: "/ent",
    defaultCategory: "CO2 Surgical Laser",
  },
  // {
  //   name: "ENT Head & Neck Oncology",
  //   path: "/ent-head",
  //   defaultCategory: "",
  // },
  {
    name: "Urology",
    path: "/urology",
    defaultCategory: "Surgical Laser",
  },
  {
    name: "Gastro",
    path: "/gastro",
    defaultCategory: "Gastro Products",
  },
];

// Categories under each specialty
export const CATEGORIES = {
  "ENT, Head & Neck Oncology": ["CO2 Surgical Laser"],
  Urology: [
    "Surgical Laser",
    "Urodynamic System & Uroflowmeters",
    "ESWL Lithotripsy",
    "Endo Urology UMD Endoscopy",
    "Morcellator System",
    "Roboflex Avicenna",
    "Flexible Video Ureterorenoscope",
  ],
  Gastro: ["Gastro Products", "Gastro Endoscopy", "Gastro Laser"],
};

// Surgical Laser Subcategories (under Urology -> Surgical Laser)
export const SURGICAL_LASER_SUBCATEGORIES = [
  { name: "Holmium YAG Laser", path: "/holmium-yag-laser" },
  { name: "Thulium YAG Laser", path: "/thulium-yag-laser" },
  { name: "Thulium Fiber Laser", path: "/thulium-fiber-laser" },
];

// Surgical Laser Products grouped by subcategory
export const SURGICAL_LASER_PRODUCTS_BY_SUBCATEGORY = {
  "Holmium YAG Laser": [
    { name: "DK 30 WATT", path: "/dk30watt" },
    { name: "LITHO 35 WATT", path: "/litho35watt" },
    { name: "LITHO EVO 35 WATT", path: "/lithoevo35watt" },
    { name: "CYBER HO 100 WATT", path: "/cyberho100watt" },
    { name: "CYBER HO 150 WATT", path: "/cyberho150watt" },
    { name: "CYBER HO MAGNETO FAMILY", path: "/cyber-ho-magneto-family" },
  ],
  "Thulium YAG Laser": [
    { name: "Cyber TM 150 WATT", path: "/cyber-tm-150" },
    { name: "Cyber TM 200 WATT", path: "/cyber-tm-200" },
  ],
  "Thulium Fiber Laser": [
    { name: "Fiber Dust 60 WATT", path: "/fiber-dust-60" },
    { name: "Vikrant - 30/45/70 WATT", path: "/vikrant-tfl" },
  ],
};

export const ESWL_LITHOTRIPSY_SUBTYPES = [
  { name: "Multimed", path: "/multimed" },
  { name: "Vibrolith", path: "/vibrolith" },
  { name: "Vibrolith Ortho", path: "/vibrolith-ortho" },
  { name: "Vibrolith Plus", path: "/vibrolith-plus" },
];

// ENT Laser Subtypes
export const ENT_LASER_SUBTYPES = [
  { name: "SmartXide² Unique TRIO", path: "/smartxide" },
  { name: "SmartXide Touch SurgiCO", path: "/smartxide-touch" },
];

// Gastro Laser Subtypes
export const GASTRO_LASER_SUBTYPES = [
  { name: "LITHO 35 WATT", path: "/litho35watt" },
  { name: "LITHO EVO 35 WATT", path: "/lithoevo35watt" },
];

// ENDO Subtypes
export const ENDO_UROLOGY_UMD_ENDOSCOPY_SUBTYPES = [
  { name: "RZ Medizintechnik Cystoscopy", path: "/cystoscopy" },
  { name: "RZ Slim Laser Enucleation System", path: "/morcescope" },
];

export const MORCELLATOR_SUBTYPES = [
  { name: "Cyber BLADE™ Morcellator", path: "/cyber-blade" },
  { name: "Raykeen Morcellator System", path: "/raykeen-morcellator" },
];

// Urodynamic System & Uroflowmetry Subcategories
export const URODYNAMIC_SUBTYPES = [
  { name: "Urodynamic Systems", path: "/urodynamic-systems" },
  { name: "Uroflowmeters", path: "/uroflowmeters" },
  { name: "Patient Coach", path: "/patient-couch-details" },
  { name: "Bladder Scanner", path: "/bladder-scanner-details" },
];

// Urodynamic Products grouped by subcategory
export const URODYNAMIC_PRODUCTS_BY_SUBCATEGORY = {
  "Urodynamic Systems": [
    { name: "UROMIC Harmony", path: "/harmony" },
    { name: "UROMIC Melody", path: "/melody" },
    { name: "UROMIC Symphony", path: "/symphony" },
  ],
  Uroflowmeters: [
    { name: "Danflow Wave", path: "/danflow-wave" },
    { name: "Danflow Cord", path: "/danflow-cord" },
  ],
  "Patient Coach": [],
  "Patient Couch": [],
  "Bladder Scanner": [],
};

// Roboflex Avicenna Subtype
export const ROBOFLEX_AVICENNA_SUBTYPE = [];

// Flexible Video Ureterorenoscope Subcategories
export const URETERORENOSCOPE_SUBCATEGORIES = [
  { name: "Medical Image Processor", path: "/medical-image-processor" },
  { name: "Reusable Ureterorenoscope", path: "/reusable-ureterorenoscope" },
  { name: "Disposable Ureterorenoscope", path: "/disposable-ureterorenoscope" },
];

// Flexible Video Ureterorenoscope Products grouped by subcategory
export const URETERORENOSCOPE_PRODUCTS_BY_SUBCATEGORY = {
  "Medical Image Processor": [
    { name: "HUV01", path: "/huv01" },
    { name: "HUV02", path: "/huv02" },
  ],
  "Reusable Ureterorenoscope": [],
  "Disposable Ureterorenoscope": [
    { name: "Disposable HU30M 6.3/6 Fr", path: "/disposable-hu30m-6-3fr" },
    { name: "Disposable HU30M 7.5 Fr", path: "/disposable-hu30m-7-5fr" },
    { name: "Cystonephroscope", path: "/cystonephroscope" },
    { name: "Cystoscope", path: "/disposable-cystoscope" },
    { name: "Access sheath", path: "/access-sheath" },
    // { name: "Suction Pump", path: "/suction-pump" },
  ],
};
