// Storage manager for Interactive Machine & Color Theme Presets
// Backend is the single source of truth for all product records.
// Obsolete product arrays and localStorage persistence have been completely removed.

export const INTERACTIVE_MACHINE_KEY = "rhs_interactive_machine_v1";

export const DEFAULT_INTERACTIVE_MACHINE = {
  machineImage: "",
  title: "Advanced Medical Machine & Healthcare Equipment Rental",
  subtitle:
    "Interactive showcase of high-performance medical machinery available for rental to hospitals and surgical clinics.",
  badgeText: "High-Performance Medical Technology",
  parts: [
    {
      id: "display",
      title: "Advanced Touch Display",
      description:
        "High-resolution touch display provides clear real-time monitoring and intuitive system control.",
      icon: "Monitor",
      top: "13%",
      left: "51%",
      cardPosition: "right",
    },
    {
      id: "control",
      title: "Control System",
      description:
        "Easy-to-use control interface designed for precise operation and quick access to essential settings.",
      icon: "Settings2",
      top: "27%",
      left: "50%",
      cardPosition: "left",
    },
    {
      id: "tray",
      title: "Integrated Storage Tray",
      description:
        "Convenient integrated tray provides additional space for essential accessories during procedures.",
      icon: "Package",
      top: "48%",
      left: "50%",
      cardPosition: "right",
    },
    {
      id: "stand",
      title: "Adjustable Stand",
      description:
        "Stable height-adjustable structure designed for comfortable positioning and efficient workflow.",
      icon: "Move",
      top: "68%",
      left: "50%",
      cardPosition: "left",
    },
    {
      id: "base",
      title: "Stable Mobile Base",
      description:
        "Strong wheeled base provides stability while allowing smooth movement of the equipment.",
      icon: "Move",
      top: "88%",
      left: "50%",
      cardPosition: "right",
    },
  ],
};

// Color theme presets for products
export const THEME_PRESETS = [
  {
    id: "royal-purple",
    label: "Royal Purple",
    bg: "bg-[#F1EDFF]",
    iconBg: "bg-[#E4DAFF]",
    iconColor: "text-[#7357E8]",
    lineColor: "bg-[#7357E8]",
    badgeBg: "#7357E8",
  },
  {
    id: "medical-teal",
    label: "Medical Teal",
    bg: "bg-[#EDF9F7]",
    iconBg: "bg-[#D5F2EC]",
    iconColor: "text-[#1EAE9B]",
    lineColor: "bg-[#1EAE9B]",
    badgeBg: "#1EAE9B",
  },
  {
    id: "rhs-sky-blue",
    label: "RHS Sky Blue",
    bg: "bg-[#EEF5FF]",
    iconBg: "bg-[#D9E8FF]",
    iconColor: "text-[#4285E8]",
    lineColor: "bg-[#4285E8]",
    badgeBg: "#4285E8",
  },
  {
    id: "surgical-rose",
    label: "Surgical Rose",
    bg: "bg-[#FFF1F5]",
    iconBg: "bg-[#FFE0E9]",
    iconColor: "text-[#F15B91]",
    lineColor: "bg-[#F15B91]",
    badgeBg: "#F15B91",
  },
];

export const COLOR_PALETTES = {
  "royal-purple": THEME_PRESETS[0],
  "medical-teal": THEME_PRESETS[1],
  "rhs-sky-blue": THEME_PRESETS[2],
  "surgical-rose": THEME_PRESETS[3],
  // Legacy aliases
  purple: THEME_PRESETS[0],
  teal: THEME_PRESETS[1],
  blue: THEME_PRESETS[2],
  pink: THEME_PRESETS[3],
};

export const normalizePalette = (palette) => {
  if (palette === "purple") return "royal-purple";
  if (palette === "teal") return "medical-teal";
  if (palette === "blue") return "rhs-sky-blue";
  if (palette === "pink") return "surgical-rose";
  if (
    ["royal-purple", "medical-teal", "rhs-sky-blue", "surgical-rose"].includes(
      palette
    )
  ) {
    return palette;
  }
  return "rhs-sky-blue";
};

export const getThemeStyles = (palette) => {
  const norm = normalizePalette(palette);
  return COLOR_PALETTES[norm] || THEME_PRESETS[2];
};

// ================= 1. INTERACTIVE SHOWCASE MACHINE METHODS =================

export const getInteractiveMachineData = () => {
  try {
    const raw = localStorage.getItem(INTERACTIVE_MACHINE_KEY);
    if (!raw) return { ...DEFAULT_INTERACTIVE_MACHINE };
    const parsed = JSON.parse(raw);
    return {
      machineImage: parsed.machineImage || DEFAULT_INTERACTIVE_MACHINE.machineImage,
      title: parsed.title || DEFAULT_INTERACTIVE_MACHINE.title,
      subtitle: parsed.subtitle || DEFAULT_INTERACTIVE_MACHINE.subtitle,
      badgeText: parsed.badgeText || DEFAULT_INTERACTIVE_MACHINE.badgeText,
      parts: Array.isArray(parsed.parts)
        ? parsed.parts
        : DEFAULT_INTERACTIVE_MACHINE.parts,
    };
  } catch (err) {
    console.error("Error loading interactive machine data:", err);
    return { ...DEFAULT_INTERACTIVE_MACHINE };
  }
};

export const saveInteractiveMachineData = (data) => {
  try {
    localStorage.setItem(INTERACTIVE_MACHINE_KEY, JSON.stringify(data));
    window.dispatchEvent(
      new CustomEvent("rhs_machines_updated", {
        detail: { type: "interactive", data },
      }),
    );
    return true;
  } catch (err) {
    console.error("Error saving interactive machine data:", err);
    return false;
  }
};

export const resetInteractiveMachineData = () => {
  try {
    localStorage.removeItem(INTERACTIVE_MACHINE_KEY);
    window.dispatchEvent(
      new CustomEvent("rhs_machines_updated", {
        detail: { type: "interactive", data: DEFAULT_INTERACTIVE_MACHINE },
      }),
    );
    return { ...DEFAULT_INTERACTIVE_MACHINE };
  } catch (err) {
    console.error("Error resetting interactive machine data:", err);
    return { ...DEFAULT_INTERACTIVE_MACHINE };
  }
};

// Safeguard: Remove obsolete product localStorage persistence key
try {
  localStorage.removeItem("rhs_machine_products_v1");
} catch {}
