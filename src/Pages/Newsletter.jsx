import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  Bookmark,
  Share2,
  Download,
  Search,
  Sparkles,
  Mail,
  User,
  Building,
  Stethoscope,
  ChevronRight,
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  FileText,
  Zap,
  GraduationCap,
  Headset,
  Calendar,
  Layers,
  Award,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import SEO from "../Components/SEO";
import newsletterBannerBg from "../assets/images/newsletter_banner.png";

import {
  NEWSLETTER_EDITIONS,
} from "../data/newsletterData";

import {
  saveSubscription,
  getBookmarkedEditions,
  toggleBookmarkEdition,
} from "../utils/newsletterStorage";

const MEDICAL_ROLES = [
  "Hospital Medical Director / CEO",
  "Medical Procurement / Purchase Head",
  "Biomedical Engineer / OT In-charge",
  "Consultant Surgeon / Department Head",
  "Clinic Owner / Managing Partner",
  "Hospital Operations Manager",
  "OT & Surgical Facility Administrator",
];

const SPECIALTY_OPTIONS = [
  "Surgical Lasers on Rent (Holmium & Thulium)",
  "Flexible Video Endoscopy & Laparoscopy Towers",
  "Robotic Tele-Surgery Consoles & Per-Case Leases",
  "Diagnostic Urodynamics & 3D Bladder Scanners",
  "Zero-CAPEX Equipment Leases & Hospital ROI",
];

export default function Newsletter() {
  // Search & bookmark states
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState(() => getBookmarkedEditions());

  // Carousel scroll ref & state (matching blogs page carousel)
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Subscription Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Hospital Medical Director / CEO",
    institution: "",
    specialties: ["Surgical Lasers on Rent (Holmium & Thulium)"],
    frequency: "Monthly Equipment Rental Digest",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Reader Modal State
  const [selectedEdition, setSelectedEdition] = useState(null);

  // Sync bookmarks with localStorage
  useEffect(() => {
    const handleBookmarkUpdate = (e) => {
      if (e?.detail) setBookmarkedIds(e.detail);
    };
    window.addEventListener("rhs_newsletter_bookmarks_updated", handleBookmarkUpdate);
    return () => {
      window.removeEventListener("rhs_newsletter_bookmarks_updated", handleBookmarkUpdate);
    };
  }, []);

  // Filtered editions based on search
  const filteredEditions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return NEWSLETTER_EDITIONS;
    return NEWSLETTER_EDITIONS.filter((edition) => {
      return (
        edition.title.toLowerCase().includes(query) ||
        edition.subtitle.toLowerCase().includes(query) ||
        edition.summary.toLowerCase().includes(query) ||
        edition.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  // Update carousel scroll button availability
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Compute approximate active card index for indicators
    const firstCard = el.querySelector("[data-edition-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const idx = Math.round(scrollLeft / cardWidth);
      setScrollIndex(Math.max(0, Math.min(idx, filteredEditions.length - 1)));
    }
  }, [filteredEditions.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds]);

  // Scroll prev (left) by 1 card step
  const handleScrollLeft = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-edition-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  // Scroll next (right) by 1 card step
  const handleScrollRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-edition-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  // Scroll directly to a specific card index
  const scrollToCardIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-edition-card]");
    if (firstCard) {
      const step = firstCard.offsetWidth + 24;
      el.scrollTo({ left: index * step, behavior: "smooth" });
    }
  };

  const featuredEdition = NEWSLETTER_EDITIONS.find((ed) => ed.featured) || NEWSLETTER_EDITIONS[0];

  const handleBookmarkClick = (editionId, e) => {
    e.stopPropagation();
    const updated = toggleBookmarkEdition(editionId);
    setBookmarkedIds(updated);
    showToast(updated.includes(editionId) ? "Edition bookmarked!" : "Bookmark removed");
  };

  const handleShareClick = (edition, e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/newsletter#${edition.id}`);
      showToast("Link copied to clipboard!");
    } else {
      showToast("Sharing edition: " + edition.title);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSpecialtyToggle = (specialty) => {
    setFormData((prev) => {
      const exists = prev.specialties.includes(specialty);
      if (exists) {
        if (prev.specialties.length === 1) return prev; // Keep at least one
        return { ...prev, specialties: prev.specialties.filter((s) => s !== specialty) };
      } else {
        return { ...prev, specialties: [...prev.specialties, specialty] };
      }
    });
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@") || !formData.email.includes(".")) {
      setFormError("Please enter a valid professional email address.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      saveSubscription(formData);
      setSubmitting(false);
      setIsSubscribed(true);
      showToast("Successfully subscribed to RHS Equipment Rental Updates!");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-primary/20 selection:text-primary-dark">
      <SEO
        title="RHS Newsletter | Medical Equipment & Machinery Rentals for Hospitals"
        description="Subscribe to Reinforce Healthcare Services (RHS) Equipment Rental Newsletter. Monthly catalogs and updates on surgical lasers, endoscopy towers, biomedical maintenance SLAs, and zero-CAPEX machine rentals for hospitals and medical facilities across India."
        keywords="medical equipment rental newsletter, hospital machinery rentals, surgical laser on rent, endoscopy tower rental, Reinforce Healthcare Services, RHS medical equipment leases"
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl ring-1 ring-white/10"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          HERO BANNER SECTION (MATCHES BLOGS, CONTACT & PRODUCT ENQUIRY)
      ========================================================================= */}
      <section className="relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[280px] lg:h-[320px]">
        <img
          src={newsletterBannerBg}
          alt="Our Newsletter banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative z-10 flex h-full w-full items-center px-5 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-primary sm:text-xs">
              Reinforce Healthcare
            </p>

            <motion.h1
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Newsletter
              </span>
            </motion.h1>

            <div className="mt-2 h-[3px] w-12 rounded-full bg-primary" />

            <motion.p
              className="mt-3 max-w-md text-xs leading-5 text-slate-600 sm:text-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Insights, clinical equipment benchmarks, biomedical leasing protocols,
              and surgical innovation updates from Reinforce Healthcare Services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED EDITION SPOTLIGHT SECTION
      ========================================================================= */}
      <section className="relative z-10 mt-8 sm:mt-12 lg:mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_20px_50px_rgba(25,168,232,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Cover Side */}
            <div className="relative min-h-[300px] overflow-hidden bg-slate-900 lg:col-span-5 lg:min-h-full">
              <img
                src={featuredEdition.image}
                alt={featuredEdition.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold tracking-wider text-sky-300 uppercase">
                  Published: {featuredEdition.date}
                </p>
              </div>
            </div>

            {/* Detailed Content Side */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Hospital Equipment Rental Intelligence</span>
                </div>

                <h2 className="mt-3 text-2xl font-black leading-snug text-slate-900 sm:text-3xl">
                  {featuredEdition.title}
                </h2>

                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                  {featuredEdition.subtitle}
                </p>

                {/* Bulleted Highlights */}
                <div className="mt-6 rounded-2xl bg-sky-50/60 p-5 ring-1 ring-sky-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Key Rental & Equipment Advantages for Hospitals:
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {featuredEdition.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 sm:text-sm">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => setSelectedEdition(featuredEdition)}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <BookOpen className="h-4 w-4" />
                  Read Rental Bulletin Online
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  {featuredEdition.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SUBSCRIPTION BOX SECTION
      ========================================================================= */}
      <section id="subscribe-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle Background Elements */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 -mb-10 -ml-10 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                <Mail className="h-3.5 w-3.5" />
                <span>RHS Equipment Rental Network</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Equip Your Facility with Flexible Medical Machinery Rentals
              </h2>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Join hospital directors, medical superintendents, OT in-charges, and procurement heads
                receiving our monthly medical machinery rental catalogs, zero-CAPEX leasing updates,
                and certified standby equipment availability from Reinforce Healthcare Services.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>100% B2B Focus • Tailored strictly for hospitals, surgical centers & medical facilities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Immediate updates on surgical laser rentals, endoscopy towers & OT equipment packages</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Flexible per-procedure, monthly, and annual rental contracts with full biomedical SLA support</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/30">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white">
                      Welcome to RHS Equipment Rental Network!
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for subscribing, <strong>{formData.fullName}</strong>. Our latest
                      hospital equipment rental catalog and October 2026 bulletin have been sent to{" "}
                      <span className="text-sky-300 font-semibold">{formData.email}</span>.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedEdition(featuredEdition)}
                        className="cursor-pointer rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110"
                      >
                        Read Rental Bulletin Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSubscribed(false)}
                        className="cursor-pointer rounded-xl border border-white/20 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                      >
                        Register Another Facility Email
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Facility Contact Person Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Dr. / Mr. Rajesh Sharma"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                          />
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Hospital / Official Work Email *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="procurement@hospital.org"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Designation / Role */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Hospital Role / Designation
                        </label>
                        <div className="relative">
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-2.5 pl-10 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                          >
                            {MEDICAL_ROLES.map((role) => (
                              <option key={role} value={role} className="bg-slate-900 text-white">
                                {role}
                              </option>
                            ))}
                          </select>
                          <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      {/* Hospital / Clinic */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Hospital / Medical Facility Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Apex Super Specialty Hospital & Research Centre"
                            value={formData.institution}
                            onChange={(e) =>
                              setFormData({ ...formData, institution: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                          />
                          <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Specialty Interests Checkboxes */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Equipment Categories Required on Rent (Select All That Apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SPECIALTY_OPTIONS.map((spec) => {
                          const isSelected = formData.specialties.includes(spec);
                          return (
                            <button
                              type="button"
                              key={spec}
                              onClick={() => handleSpecialtyToggle(spec)}
                              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition ${isSelected
                                ? "bg-sky-400 text-slate-950 font-bold shadow-sm"
                                : "bg-white/10 text-slate-300 hover:bg-white/15"
                                }`}
                            >
                              {isSelected ? "✓ " : "+ "}
                              {spec}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cadence Selection */}
                    <div className="flex items-center gap-6 pt-1 text-xs text-slate-300">
                      <span className="font-semibold text-slate-200">Cadence:</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          value="Monthly Equipment Rental Digest"
                          checked={formData.frequency === "Monthly Equipment Rental Digest"}
                          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                          className="accent-primary"
                        />
                        <span>Monthly Rental Digest</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          value="Immediate Machine Availability Alerts"
                          checked={formData.frequency === "Immediate Machine Availability Alerts"}
                          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                          className="accent-primary"
                        />
                        <span>Immediate Availability Alerts</span>
                      </label>
                    </div>

                    {formError && (
                      <p className="text-xs font-semibold text-rose-400">{formError}</p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-sky-400 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:brightness-110 hover:shadow-sky-500/30 disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Processing Subscription...</span>
                        ) : (
                          <>
                            <span>Subscribe to Equipment Rental Updates</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400">
                      By subscribing, you agree to receive medical machinery rental updates, leasing rate notifications,
                      and equipment availability bulletins for healthcare facilities. You may unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NEWSLETTER ARCHIVE & ISSUES DIRECTORY (CAROUSEL)
      ========================================================================= */}
      <section id="archive-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Layers className="h-4 w-4" />
              <span>Explore The Rental Repository</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Past Rental Bulletins & Equipment Archives
            </h2>
            <p className="mt-1 text-sm text-slate-500 max-w-xl">
              Explore previous medical equipment rental guides, laser leasing benchmarks, and
              hospital OT deployment reviews from Reinforce Healthcare Services.
            </p>
          </div>

          {/* Carousel Arrows & Controls matching Blogs.jsx */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">
              Swipe or use controls
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "border-slate-300 bg-white text-slate-700 hover:border-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white shadow-sm hover:shadow-md hover:shadow-primary/25"
                    : "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "border-slate-300 bg-white text-slate-700 hover:border-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white shadow-sm hover:shadow-md hover:shadow-primary/25"
                    : "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 
            HORIZONTAL SCROLLING ROW CONTAINER (CAROUSEL)
            Viewport Constraint matching Blogs.jsx:
            - Mobile: w-[86%] min-w-[86%] max-w-[86%] (single card peek)
            - Tablet: sm:w-[calc((100%-24px)/2)] (exactly 2 cards visible)
            - Desktop: lg:w-[calc((100%-48px)/3)] (EXACTLY 3 cards visible)
        */}
        <div className="relative mt-8">
          {filteredEditions.length > 0 ? (
            <>
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {filteredEditions.map((edition) => {
                  return (
                    <article
                      key={edition.id}
                      data-edition-card
                      onClick={() => setSelectedEdition(edition)}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl cursor-pointer shrink-0 snap-start
                        w-[86%] min-w-[86%] max-w-[86%]
                        sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] sm:max-w-[calc((100%-24px)/2)]
                        lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)] lg:max-w-[calc((100%-48px)/3)]"
                    >
                      <div>
                        {/* Cover Image Container */}
                        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                          <img
                            src={edition.image}
                            alt={edition.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                          {/* Date Overlay */}
                          <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                            <span>{edition.date}</span>
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {edition.readTime}
                            </span>
                            <span>•</span>
                            <span>{edition.pages}</span>
                          </div>

                          <h3 className="mt-2.5 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary line-clamp-2">
                            {edition.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                            {edition.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          <span>Read Rental Bulletin</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Dots Pagination Indicator matching Blogs.jsx */}
              {filteredEditions.length > 3 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {filteredEditions.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToCardIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        scrollIndex === idx
                          ? "w-8 bg-gradient-to-r from-primary to-primary-dark shadow-sm shadow-primary/30"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full py-16 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-base font-bold text-slate-700">No matching rental bulletins found</h3>
              <p className="mt-1 text-xs text-slate-500">
                Try searching for lasers, endoscopy towers, urodynamics, or rental plans.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FULL READER MODAL
      ========================================================================= */}
      <AnimatePresence>
        {selectedEdition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEdition(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-extrabold uppercase text-primary">
                    {selectedEdition.vol}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Published: {selectedEdition.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleBookmarkClick(selectedEdition.id, e)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${bookmarkedIds.includes(selectedEdition.id)
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    title="Bookmark Edition"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleShareClick(selectedEdition, e)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    title="Share Link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEdition(null)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Reader Body */}
              <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
                {/* Article Header */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
                    <span>{selectedEdition.category}</span>
                    <span>•</span>
                    <span>{selectedEdition.readTime}</span>
                  </div>

                  <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                    {selectedEdition.title}
                  </h1>

                  <p className="mt-3 text-base text-slate-600 font-medium leading-relaxed">
                    {selectedEdition.subtitle}
                  </p>
                </div>

                {/* Hero Edition Graphic */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={selectedEdition.image}
                    alt={selectedEdition.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Editor's Note Card */}
                {selectedEdition.fullContent?.editorNote && (
                  <div className="rounded-2xl border-l-4 border-primary bg-sky-50/60 p-5 text-sm italic leading-relaxed text-slate-700">
                    <p className="font-bold text-slate-900 not-italic mb-1 text-xs uppercase tracking-wider">
                      RHS Rental & Biomedical Advisory Note:
                    </p>
                    "{selectedEdition.fullContent.editorNote}"
                  </div>
                )}

                {/* Structured Article Sections */}
                {selectedEdition.fullContent?.sections?.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{sec.heading}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{sec.body}</p>
                  </div>
                ))}

                {/* Comparative Specs Table */}
                {selectedEdition.fullContent?.specsTable && (
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                      Equipment Specifications & Rental Performance Metrics
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-3">Technical / Financial Parameter</th>
                            <th className="px-4 py-3">Standard Procurement (CAPEX)</th>
                            <th className="px-4 py-3 text-primary">RHS Rental Solution (OPEX)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedEdition.fullContent.specsTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-semibold text-slate-900">
                                {row.parameter}
                              </td>
                              <td className="px-4 py-3 text-slate-600">{row.holmium}</td>
                              <td className="px-4 py-3 font-bold text-primary">{row.tfl}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Key Surgeon Quote Card */}
                {selectedEdition.fullContent?.keyQuote && (
                  <div className="rounded-2xl bg-slate-900 p-6 text-white text-center">
                    <p className="text-sm font-semibold italic text-sky-200 sm:text-base">
                      {selectedEdition.fullContent.keyQuote}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Footer Actions in Modal */}
              <div className="flex flex-wrap items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
                <span className="text-xs text-slate-500">
                  Reinforce Healthcare Services (RHS) • Medical Equipment & Machinery Rental Division
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Downloading PDF for ${selectedEdition.title.substring(0, 24)}...`);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-110"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Rental Bulletin PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedEdition(null)}
                    className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Close Reader
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
