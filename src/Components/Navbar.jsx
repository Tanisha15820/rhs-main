import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Material Icons
import HomeIcon from "@mui/icons-material/Home";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ArticleIcon from "@mui/icons-material/Article";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AirIcon from "@mui/icons-material/Air";
import SpaIcon from "@mui/icons-material/Spa";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// Logo image
import logo from "../assets/images/compressed_rhs_logo.png";

// Navigation Data
import {
  SPECIALTIES,
  CATEGORIES,
  SURGICAL_LASER_SUBCATEGORIES,
SURGICAL_LASER_PRODUCTS_BY_SUBCATEGORY,
  URODYNAMIC_SUBTYPES,
  URODYNAMIC_PRODUCTS_BY_SUBCATEGORY,
  ESWL_LITHOTRIPSY_SUBTYPES,
  ENDO_UROLOGY_UMD_ENDOSCOPY_SUBTYPES,
  ENT_LASER_SUBTYPES,
  GASTRO_LASER_SUBTYPES,
  MORCELLATOR_SUBTYPES,
  URETERORENOSCOPE_SUBCATEGORIES,
  URETERORENOSCOPE_PRODUCTS_BY_SUBCATEGORY,
} from "../data/navigationData";

// Icon mapping for specialties
const SPECIALTY_ICONS = {
  "ENT, Head & Neck Oncology": <PsychologyIcon sx={{ fontSize: 19 }} />,
  Urology: <AirIcon sx={{ fontSize: 19 }} />,
  Gastro: <SpaIcon sx={{ fontSize: 19 }} />,
};

// Categories that have a subcategory layer in the dropdown
const SUBCATEGORY_DATA = {
  "Surgical Laser": {
    header: "Laser Type",
    subcategories: SURGICAL_LASER_SUBCATEGORIES,
    productsBySubcategory: SURGICAL_LASER_PRODUCTS_BY_SUBCATEGORY,
  },
  "Urodynamic System & Uroflowmeters": {
    header: "Product Type",
    subcategories: URODYNAMIC_SUBTYPES,
    productsBySubcategory: URODYNAMIC_PRODUCTS_BY_SUBCATEGORY,
  },
  "Flexible Video Ureterorenoscope": {
    header: "Product Type",
    subcategories: URETERORENOSCOPE_SUBCATEGORIES,
    productsBySubcategory: URETERORENOSCOPE_PRODUCTS_BY_SUBCATEGORY,
  },
};

// Styling helper classes
const ACTIVE_LINK = "bg-primary/10 text-primary-dark";

const INACTIVE_LINK =
  "text-gray-700 hover:bg-primary/5 hover:text-primary-dark";

const MOBILE_INACTIVE = "text-gray-700 hover:bg-primary/5";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    "ENT, Head & Neck Oncology",
  );
  const [selectedCategory, setSelectedCategory] = useState("CO2 Surgical Laser");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Mobile accordion state
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileOpenSpecialty, setMobileOpenSpecialty] = useState(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const [mobileOpenSubcategory, setMobileOpenSubcategory] = useState(null);

  // Products dropdown reference
  const productsMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target)
      ) {
        setProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isProductsActive =
    pathname === "/urology" ||
    pathname === "/urology-surgical-laser" ||
    pathname === "/surgical-laser" ||
    pathname === "/surgical-lasers" ||
    pathname === "/urology-urodynamic" ||
    pathname === "/urology-eswl" ||
    pathname === "/ent" ||
    pathname === "/gastro" ||
    pathname === "/ent-laser" ||
    pathname === "/elmed" ||
    pathname === "/rz" ||
    pathname === "/morcellator" ||
    pathname === "/cystoscopy" ||
    pathname === "/morcescope" ||
    pathname === "/multimed" ||
    pathname === "/vibrolith" ||
    pathname === "/vibrolith-ortho" ||
    pathname === "/vibrolith-plus" ||
    pathname === "/gastro-laser" ||
    pathname === "/melody" ||
    pathname === "/symphony" ||
    pathname === "/harmony" ||
    pathname === "/danflow-wave" ||
    pathname === "/danflow-cord" ||
    pathname === "/avicenna" ||
    pathname === "/huv02" ||
    pathname === "/huv-02" ||
    pathname === "/huv01" ||
    pathname === "/huv-01" ||
    pathname === "/reusable-ureterorenoscope" ||
    pathname === "/disposable-hu30m-6-3fr" ||
    pathname === "/disposable-hu30m-6.3-fr" ||
    pathname === "/hu30m-6-3fr" ||
    pathname === "/disposable-hu30m-7-5fr" ||
    pathname === "/disposable-hu30m-7.5-fr" ||
    pathname === "/disposable-hu30m-7.5fr" ||
    pathname === "/disposable-hu30m-7.5" ||
    pathname === "/hu30m-7-5fr" ||
    pathname === "/hu30m-7.5" ||
    pathname === "/hu30s-7-5fr" ||
    pathname === "/hu30s" ||
    pathname === "/disposable-cystoscope" ||
    pathname === "/cystoscope" ||
    pathname === "/access-sheath" ||
    pathname === "/ureteral-access-sheath" ||
    pathname === "/urology-endo" ||
    pathname === "/endo-urology" ||
    pathname === "/flexible-video-ureterorenoscope" ||
    pathname === "/urology-ureterorenoscope" ||
    pathname === "/holmium-yag-laser" ||
    pathname === "/holmium-laser" ||
    pathname === "/thulium-yag-laser" ||
    pathname === "/thulium-laser" ||
    pathname === "/thulium-fiber-laser" ||
    pathname === "/thulium-fiber" ||
    pathname === "/urodynamic-systems" ||
    pathname === "/uroflowmeters" ||
    pathname === "/bladder-scanner-details" ||
    pathname === "/bladder-scanner" ||
    pathname === "/mmt-bladder-scanner" ||
    pathname === "/patient-couch-details" ||
    pathname === "/patient-couch" ||
    pathname === "/trytable-patient-coach" ||
    pathname.startsWith("/products");

  // Get category page path
  const getCategoryPath = (category) => {
    if (category === "CO2 Surgical Laser") return "/ent-laser";
    if (category === "RZ") return "/rz";
    if (category === "Morcellator System") return "/morcellator";
    if (category === "Surgical Laser") return "/urology-surgical-laser";
    if (category === "Gastro Laser") return "/gastro-laser";
    if (
      category === "Urodynamic System & Uroflowmeters" ||
      category === "Urodynamic Systems & Uroflowmeters"
    )
      return "/urology-urodynamic";
    if (category === "ESWL Lithotripsy") return "/urology-eswl";
    if (category === "Endo Urology UMD Endoscopy") return "/urology-endo";
    if (category === "Roboflex Avicenna") return "/avicenna";
    if (category === "Flexible Video Ureterorenoscope") return "/flexible-video-ureterorenoscope";

    return null;
  };

  // Get default category for each specialty
  const getDefaultCategory = (specialty) => {
    if (specialty.name === "Gastro") {
      return "Gastro Laser";
    }

    return specialty.defaultCategory;
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileOpenSpecialty(null);
    setMobileOpenCategory(null);
    setMobileOpenSubcategory(null);
  };

  // Get subcategories for selected category (for 3rd column)
  const getCategorySubcategories = (category) => {
    return SUBCATEGORY_DATA[category]?.subcategories || [];
  };

  // Get header label for the subcategory column
  const getSubcategoryHeader = (category) => {
    return SUBCATEGORY_DATA[category]?.header || "Type";
  };

  // Check if category has subcategories
  const hasSubcategories = getCategorySubcategories(selectedCategory).length > 0;

  // Get products for selected category (respects subcategory if present)
  const getCategoryProducts = (category) => {
    const subcategoryMeta = SUBCATEGORY_DATA[category];

    if (subcategoryMeta) {
      if (selectedSubcategory) {
        return (
          subcategoryMeta.productsBySubcategory[selectedSubcategory] || []
        );
      }

      return [];
    }

    if (category === "ESWL Lithotripsy") {
      return ESWL_LITHOTRIPSY_SUBTYPES;
    }

    if (category === "Endo Urology UMD Endoscopy") {
      return ENDO_UROLOGY_UMD_ENDOSCOPY_SUBTYPES;
    }

    if (category === "CO2 Surgical Laser") {
      return ENT_LASER_SUBTYPES;
    }

    if (category === "Gastro Laser") {
      return GASTRO_LASER_SUBTYPES;
    }

    if (category === "Morcellator System") {
      return MORCELLATOR_SUBTYPES;
    }

    if (category === "Roboflex Avicenna") {
      return [];
    }

    return [];
  };

  // Hide unwanted Gastro categories
  const getVisibleCategories = (specialty) => {
    const categories = CATEGORIES[specialty] || [];

    if (specialty === "Gastro") {
      return categories.filter(
        (cat) =>
          cat !== "Gastro Products" &&
          cat !== "Gastro Enscopy" &&
          cat !== "Gastro Endoscopy",
      );
    }

    return categories;
  };

  const currentProducts = getCategoryProducts(selectedCategory);

  // Mobile specialty accordion
  const handleMobileSpecialtyClick = (spec) => {
    const isAlreadyOpen = mobileOpenSpecialty === spec.name;

    if (isAlreadyOpen) {
      setMobileOpenSpecialty(null);
      setMobileOpenCategory(null);
      setMobileOpenSubcategory(null);
      return;
    }

    setMobileOpenSpecialty(spec.name);
    setMobileOpenCategory(null);
    setMobileOpenSubcategory(null);
  };

  // Mobile category accordion
  const handleMobileCategoryClick = (category) => {
    const isAlreadyOpen = mobileOpenCategory === category;

    if (isAlreadyOpen) {
      setMobileOpenCategory(null);
      setMobileOpenSubcategory(null);
      return;
    }

    setMobileOpenCategory(category);
    setMobileOpenSubcategory(null);
  };

  // Mobile subcategory click handler
  const handleMobileSubcategoryClick = (subcatName) => {
    setMobileOpenSubcategory((prev) => (prev === subcatName ? null : subcatName));
  };

  return (
    <header className="relative z-50 w-full bg-background px-3 py-4 md:px-5">
      <div className="relative flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-[0_6px_30px_rgba(37,37,184,0.1)] ring-1 ring-primary/10 md:px-6">
        {/* Website Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Reinforce Healthcare Services"
            className="h-14 w-auto object-contain md:h-16"
          />

          <div className="leading-tight">
            <h1 className="text-[13px] font-extrabold tracking-tight text-primary-dark sm:text-[16px]">
              REINFORCE
            </h1>

            <p className="text-[8px] font-bold tracking-widest text-primary sm:text-[10px]">
              HEALTHCARE SERVICES
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden items-center gap-1.5 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
              pathname === "/" ? ACTIVE_LINK : INACTIVE_LINK
            }`}
          >
            Home
          </Link>

          {/* Products Mega Menu */}
          <div
            ref={productsMenuRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((prev) => !prev)}
              className={`flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
                isProductsActive ? ACTIVE_LINK : INACTIVE_LINK
              }`}
            >
              <span>Products</span>

              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className={`transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Desktop Mega Menu */}
            {productsOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[1100px] -translate-x-1/2">
                <div className="rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.13)] ring-1 ring-gray-100">
                  <div className={`grid ${hasSubcategories ? "grid-cols-[1fr_1.15fr_1.3fr_1.5fr]" : "grid-cols-[1fr_1.15fr_1.7fr]"}`}>
                    {/* Specialties */}
                    <div className="space-y-1 border-r border-gray-100 pr-5">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                          <MedicalServicesIcon sx={{ fontSize: 18 }} />
                        </div>

                        <h3 className="text-sm font-bold text-gray-800">
                          Specialties
                        </h3>
                      </div>

                      {SPECIALTIES.map((spec) => {
                        const isSelected = selectedSpecialty === spec.name;

                        return (
                          <button
                            key={spec.name}
                            type="button"
                            onMouseEnter={() => {
                              setSelectedSpecialty(spec.name);
                              setSelectedCategory(getDefaultCategory(spec));
                              setSelectedSubcategory(null);
                            }}
                            onClick={() => {
                              setSelectedSpecialty(spec.name);
                              setSelectedCategory(getDefaultCategory(spec));
                              setSelectedSubcategory(null);
                              navigate(spec.path);
                              setProductsOpen(false);
                            }}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] transition-all ${
                              isSelected
                                ? "bg-blue-50 font-semibold text-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              {SPECIALTY_ICONS[spec.name]}
                              {spec.name}
                            </span>

                            <ChevronRightIcon sx={{ fontSize: 16 }} />
                          </button>
                        );
                      })}
                    </div>

                    {/* Categories */}
                    <div className="space-y-1 border-r border-gray-100 px-5">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                          <AirIcon sx={{ fontSize: 18 }} />
                        </div>

                        <h3 className="text-sm font-bold text-gray-800">
                          {selectedSpecialty}
                        </h3>
                      </div>

                      {getVisibleCategories(selectedSpecialty).map((cat) => {
                        const isSelected = selectedCategory === cat;
                        const hasSubs = (SUBCATEGORY_DATA[cat]?.subcategories || []).length > 0;
                        const catProducts = getCategoryProducts(cat);
                        const hasChildren = hasSubs || catProducts.length > 0;

                        return (
                          <button
                            key={cat}
                            type="button"
                            onMouseEnter={() => {
                              setSelectedCategory(cat);
                              setSelectedSubcategory(null);
                            }}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setSelectedSubcategory(null);

                              const path = getCategoryPath(cat);
                              if (path) {
                                navigate(path);
                                setProductsOpen(false);
                              }
                            }}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-all ${
                              isSelected
                                ? "bg-blue-50 font-semibold text-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="truncate">{cat}</span>

                            {hasChildren ? (
                              <ChevronRightIcon sx={{ fontSize: 15 }} />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>

                    {/* Subcategories (Laser Type / Product Type) */}
                    {hasSubcategories && (
                      <div className="space-y-1 border-r border-gray-100 px-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                              <AirIcon sx={{ fontSize: 18 }} />
                            </div>

                            <h3 className="truncate text-sm font-bold text-gray-800">
                              {getSubcategoryHeader(selectedCategory)}
                            </h3>
                          </div>
                        </div>

                        {getCategorySubcategories(selectedCategory).map(
                          (sub) => {
                            const isSelected =
                              selectedSubcategory === sub.name;
                            const subProducts =
                              SUBCATEGORY_DATA[selectedCategory]
                                ?.productsBySubcategory[sub.name] || [];
                            const hasProducts = subProducts.length > 0;

                            return (
                              <button
                                key={sub.name}
                                type="button"
                                onMouseEnter={() =>
                                  setSelectedSubcategory(sub.name)
                                }
                                onClick={() => {
                                  setSelectedSubcategory(sub.name);
                                  if (sub.path && sub.path !== "/urology") {
                                    navigate(sub.path);
                                    setProductsOpen(false);
                                  }
                                }}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-all ${
                                  isSelected
                                    ? "bg-blue-50 font-semibold text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                <span className="truncate">{sub.name}</span>

                                {hasProducts ? (
                                  <ChevronRightIcon sx={{ fontSize: 15 }} />
                                ) : null}
                              </button>
                            );
                          },
                        )}
                      </div>
                    )}

                    {/* Products */}
                    <div className="max-h-[360px] space-y-1 overflow-y-auto pl-5">
                      {currentProducts && currentProducts.length > 0 ? (
                        <>
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-base text-sky-600">✦</span>

                            <h3 className="truncate text-sm font-bold text-gray-800">
                              {selectedSubcategory || selectedCategory}
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 gap-1">
                            {currentProducts.map((prod) => (
                              <Link
                                key={prod.name}
                                to={prod.path}
                                onClick={() => setProductsOpen(false)}
                                className="group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-600 transition hover:bg-sky-50 hover:text-blue-600"
                              >
                                <ChevronRightIcon
                                  sx={{ fontSize: 14 }}
                                  className="shrink-0 text-blue-500"
                                />

                                <span className="truncate">{prod.name}</span>
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blogs */}
          <Link
            to="/blogs"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
              pathname === "/blogs" ? ACTIVE_LINK : INACTIVE_LINK
            }`}
          >
            Blogs
          </Link>

          {/* Newsletter - Temporarily commented out
          <Link
            to="/newsletter"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
              pathname === "/newsletter" ? ACTIVE_LINK : INACTIVE_LINK
            }`}
          >
            Newsletter
          </Link>
          */}

          {/* Contact */}
          <Link
            to="/contact"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-200 ${
              pathname === "/contact" ? ACTIVE_LINK : INACTIVE_LINK
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Get in Touch - Desktop */}
        <Link
          to="/contact"
          className="ml-4 hidden flex-shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:flex"
        >
          Get in Touch
          <ArrowForwardIcon style={{ fontSize: 18 }} />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary/5 text-primary-dark transition hover:bg-primary/10 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <CloseIcon sx={{ fontSize: 22 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 22 }} />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-3 w-full animate-fade-in rounded-2xl bg-white p-3.5 sm:p-4 shadow-xl ring-1 ring-primary/10 lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {/* Home */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${
                pathname === "/" ? ACTIVE_LINK : MOBILE_INACTIVE
              }`}
            >
              <HomeIcon sx={{ fontSize: 18 }} />
              <span>Home</span>
            </Link>

            {/* Products & Specialties */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  const isClosing = mobileProductsOpen;
                  setMobileProductsOpen((prev) => !prev);
                  if (isClosing) {
                    setMobileOpenSpecialty(null);
                    setMobileOpenCategory(null);
                    setMobileOpenSubcategory(null);
                  }
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isProductsActive || mobileProductsOpen
                    ? ACTIVE_LINK
                    : MOBILE_INACTIVE
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MedicalServicesIcon sx={{ fontSize: 18 }} />
                  <span>Products & Specialties</span>
                </span>

                <KeyboardArrowDownIcon
                  sx={{ fontSize: 18 }}
                  className={`transition-transform duration-200 ${
                    mobileProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileProductsOpen && (
                <div className="mt-2 space-y-2 pl-1 sm:pl-2">
                  {SPECIALTIES.map((spec) => {
                    const isSpecOpen = mobileOpenSpecialty === spec.name;

                    return (
                      <div
                        key={spec.name}
                        className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50"
                      >
                        {/* Specialty Header Toggle */}
                        <button
                          type="button"
                          onClick={() => handleMobileSpecialtyClick(spec)}
                          className={`flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-xs font-bold transition-colors ${
                            isSpecOpen
                              ? "bg-primary/10 text-primary"
                              : "text-slate-800 hover:bg-slate-100/70"
                          }`}
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                                isSpecOpen
                                  ? "bg-primary text-white"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              {SPECIALTY_ICONS[spec.name]}
                            </span>
                            <span className="truncate">{spec.name}</span>
                          </span>

                          <ChevronRightIcon
                            sx={{ fontSize: 16 }}
                            className={`shrink-0 transition-transform duration-200 ${
                              isSpecOpen ? "rotate-90 text-primary" : "text-slate-400"
                            }`}
                          />
                        </button>

                        {/* Categories under Specialty */}
                        {isSpecOpen && (
                          <div className="space-y-1.5 p-2 bg-white/80 border-t border-slate-100">
                            {/* Specialty Overview Link */}
                            {spec.path && (
                              <Link
                                to={spec.path}
                                onClick={closeMobileMenu}
                                className="flex items-center justify-between rounded-lg bg-primary/5 px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary/10 transition-colors"
                              >
                                <span>Explore All {spec.name}</span>
                                <ArrowForwardIcon sx={{ fontSize: 13 }} />
                              </Link>
                            )}

                            {getVisibleCategories(spec.name).map((cat) => {
                              const catProducts = getCategoryProducts(cat);
                              const isCatOpen = mobileOpenCategory === cat;
                              const subcategories = getCategorySubcategories(cat);
                              const hasSubs = subcategories.length > 0;
                              const hasChildren = hasSubs || catProducts.length > 0;
                              const categoryPath = getCategoryPath(cat);

                              if (!hasChildren && categoryPath) {
                                return (
                                  <Link
                                    key={cat}
                                    to={categoryPath}
                                    onClick={closeMobileMenu}
                                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                  >
                                    <span className="truncate">{cat}</span>
                                    <ChevronRightIcon
                                      sx={{ fontSize: 14 }}
                                      className="text-gray-400 shrink-0"
                                    />
                                  </Link>
                                );
                              }

                              return (
                                <div
                                  key={cat}
                                  className="rounded-lg border border-slate-100 bg-white overflow-hidden"
                                >
                                  {/* Category Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleMobileCategoryClick(cat)}
                                    className={`flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                                      isCatOpen
                                        ? "bg-slate-100/70 font-semibold text-primary"
                                        : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    <span className="truncate pr-1">{cat}</span>
                                    <ChevronRightIcon
                                      sx={{ fontSize: 14 }}
                                      className={`shrink-0 transition-transform duration-200 ${
                                        isCatOpen
                                          ? "rotate-90 text-primary"
                                          : "text-gray-400"
                                      }`}
                                    />
                                  </button>

                                  {/* Category Content: Subcategories or Direct Products */}
                                  {isCatOpen && (
                                    <div className="space-y-1 p-2 bg-slate-50/50 border-t border-slate-100">
                                      {/* View All Category Overview Link */}
                                      {categoryPath && (
                                        <Link
                                          to={categoryPath}
                                          onClick={closeMobileMenu}
                                          className="flex items-center justify-between rounded-md bg-primary/10 px-2.5 py-1.5 text-[11px] font-bold text-primary hover:bg-primary/15 transition-colors mb-1"
                                        >
                                          <span>View All {cat}</span>
                                          <ChevronRightIcon sx={{ fontSize: 13 }} />
                                        </Link>
                                      )}

                                      {/* If Category has Subcategories */}
                                      {hasSubs ? (
                                        subcategories.map((sub) => {
                                          const isSubOpen =
                                            mobileOpenSubcategory === sub.name;
                                          const subProducts =
                                            SUBCATEGORY_DATA[cat]
                                              ?.productsBySubcategory[sub.name] || [];
                                          const hasProducts = subProducts.length > 0;

                                          if (!hasProducts && sub.path) {
                                            return (
                                              <Link
                                                key={sub.name}
                                                to={sub.path}
                                                onClick={closeMobileMenu}
                                                className="flex items-center justify-between rounded-md px-2.5 py-2 text-[11px] font-medium text-slate-600 hover:bg-white hover:text-primary transition-colors"
                                              >
                                                <span className="truncate">
                                                  {sub.name}
                                                </span>
                                                <ChevronRightIcon
                                                  sx={{ fontSize: 13 }}
                                                  className="text-gray-400 shrink-0"
                                                />
                                              </Link>
                                            );
                                          }

                                          return (
                                            <div
                                              key={sub.name}
                                              className="rounded-md border border-slate-200/60 bg-white overflow-hidden"
                                            >
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleMobileSubcategoryClick(
                                                    sub.name
                                                  )
                                                }
                                                className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left text-[11px] font-semibold transition-colors ${
                                                  isSubOpen
                                                    ? "text-primary bg-primary/5"
                                                    : "text-slate-700 hover:bg-slate-50"
                                                }`}
                                              >
                                                <span className="truncate pr-1">
                                                  {sub.name}
                                                </span>
                                                <ChevronRightIcon
                                                  sx={{ fontSize: 13 }}
                                                  className={`shrink-0 transition-transform duration-200 ${
                                                    isSubOpen
                                                      ? "rotate-90 text-primary"
                                                      : "text-gray-400"
                                                  }`}
                                                />
                                              </button>

                                              {isSubOpen && subProducts.length > 0 && (
                                                <div className="space-y-0.5 p-1.5 bg-slate-50/70 border-t border-slate-100">
                                                  {subProducts.map((prod) => (
                                                    <Link
                                                      key={prod.name}
                                                      to={prod.path}
                                                      onClick={closeMobileMenu}
                                                      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] text-slate-600 hover:bg-white hover:text-primary hover:shadow-2xs transition-all"
                                                    >
                                                      <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
                                                      <span className="truncate">
                                                        {prod.name}
                                                      </span>
                                                    </Link>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })
                                      ) : catProducts.length > 0 ? (
                                        /* If Category has Direct Products */
                                        <div className="space-y-0.5">
                                          {catProducts.map((prod) => (
                                            <Link
                                              key={prod.name}
                                              to={prod.path}
                                              onClick={closeMobileMenu}
                                              className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] text-slate-600 hover:bg-white hover:text-primary hover:shadow-2xs transition-all"
                                            >
                                              <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                                              <span className="truncate">
                                                {prod.name}
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="px-2.5 py-1.5 text-[11px] text-slate-400 italic">
                                          No products listed
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Blogs */}
            <Link
              to="/blogs"
              onClick={closeMobileMenu}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${
                pathname === "/blogs" ? ACTIVE_LINK : MOBILE_INACTIVE
              }`}
            >
              <ArticleIcon sx={{ fontSize: 18 }} />
              <span>Blogs</span>
            </Link>

            {/* Newsletter - Temporarily commented out
            <Link
              to="/newsletter"
              onClick={closeMobileMenu}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${
                pathname === "/newsletter" ? ACTIVE_LINK : MOBILE_INACTIVE
              }`}
            >
              <EmailOutlinedIcon sx={{ fontSize: 18 }} />
              <span>Newsletter</span>
            </Link>
            */}

            {/* Contact */}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${
                pathname === "/contact" ? ACTIVE_LINK : MOBILE_INACTIVE
              }`}
            >
              <ContactPhoneIcon sx={{ fontSize: 18 }} />
              <span>Contact Us</span>
            </Link>

            {/* Get in Touch - Mobile */}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get in Touch
              <ArrowForwardIcon style={{ fontSize: 18 }} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
