import { useState, useEffect, useCallback } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  Send,
  User,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import contactBannerBg from "../assets/images/contact_banner.png";
import CallBookingSection from "../Components/Common/CallBookingSection";
import {
  submitContactWithBooking,
  isFutureDate,
  formatDateDisplay,
  fetchDateAvailability,
} from "../utils/callBookingService";

const WHATSAPP_NUMBER = "+91 8860086232";

const initialFormState = {
  title: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  institution: "",
  department: "",
  address: "",
  country: "India",
  state: "Delhi",
  city: "",
  zipCode: "",
  mobile: "",
  email: "",
  requirements: "",
  callDate: "",
};

const ContactPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [dateError, setDateError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ id: Date.now(), type, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCallDateSelect = (dateStr) => {
    setFormData((prev) => ({ ...prev, callDate: dateStr }));
    if (dateError) setDateError("");
    if (formErrors.callDate) {
      setFormErrors((prev) => ({ ...prev, callDate: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!formData.institution.trim()) errors.institution = "Hospital / Business / University is required";
    if (!formData.department.trim()) errors.department = "Department is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.country || formData.country === "Select Country") errors.country = "Country is required";
    if (!formData.state || formData.state === "Select State") errors.state = "State is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Post / Zip Code is required";
    if (!formData.mobile.trim()) errors.mobile = "Mobile number is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.requirements.trim()) errors.requirements = "Please describe your requirements";

    // Validate preferred call date
    if (!formData.callDate) {
      errors.callDate = "Please select a preferred call date.";
      setDateError("Preferred call date is required.");
    } else if (!isFutureDate(formData.callDate)) {
      errors.callDate = "Please select a valid future date.";
      setDateError("Please select a future date. Past dates and today cannot be booked.");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast(
        "warning",
        "Please fill in all required (*) fields before submitting."
      );
      return;
    }

    const fullName = [formData.title, formData.firstName, formData.lastName]
      .map((part) => (part || "").trim())
      .filter(Boolean)
      .join(" ");
    const formattedCallDate =
      formatDateDisplay(formData.callDate) || formData.callDate;
    const whatsappLines = [
      "Hello, I would like to get in touch regarding medical equipment requirements.",
      `Name: ${fullName}`,
      formData.jobTitle?.trim() ? `Job Title: ${formData.jobTitle.trim()}` : null,
      `Institution: ${formData.institution.trim()}`,
      `Department: ${formData.department.trim()}`,
      `Mobile: ${formData.mobile.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Address: ${formData.address.trim()}, ${formData.city.trim()}, ${formData.state} - ${formData.zipCode.trim()}, ${formData.country}`,
      `Preferred Call Date: ${formattedCallDate}`,
      `Requirements: ${formData.requirements.trim()}`,
    ].filter(Boolean);

    const cleanWhatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
      whatsappLines.join("\n")
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Capacity verification: confirm date is not fully booked
    if (formData.callDate) {
      const avail = await fetchDateAvailability(formData.callDate);
      if (avail.hasData && avail.isFullyBooked) {
        setDateError(
          "The selected date has reached its maximum capacity of 50 bookings. Please select another date."
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactWithBooking(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            `Thank you! Your call booking request for ${formatDateDisplay(
              formData.callDate
            )} has been submitted successfully. Our team will contact you shortly.`,
        });
        setFormData(initialFormState);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error ||
            "Unable to submit form. Backend integration is required to process and save bookings.",
          backendRequired: result.backendRequired,
        });
      }
    } catch (err) {
      if (err?.code === "DATE_FULLY_BOOKED") {
        setDateError(
          err.message ||
            "The selected date has reached its maximum capacity of 50 bookings. Please select another date."
        );
      }
      setSubmitStatus({
        type: "error",
        message: err.message || "An unexpected error occurred during submission.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toastify Notification Container */}
      <div className="Toastify fixed right-5 top-20 z-[9999] flex w-[calc(100vw-2.5rem)] max-w-[360px] flex-col gap-2.5 pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              role="alert"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`Toastify__toast pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-lg border bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.16)] ${
                toast.type === "warning"
                  ? "Toastify__toast--warning border-amber-200"
                  : toast.type === "success"
                  ? "Toastify__toast--success border-emerald-200"
                  : "Toastify__toast--error border-red-200"
              }`}
            >
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  toast.type === "warning"
                    ? "bg-amber-100 text-amber-600"
                    : toast.type === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {toast.type === "warning" ? (
                  <AlertTriangle size={15} />
                ) : toast.type === "success" ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <AlertCircle size={15} />
                )}
              </div>

              <div className="min-w-0 flex-1 pr-2">
                <p className="text-xs font-bold text-slate-900">
                  {toast.type === "warning"
                    ? "Required Fields Missing"
                    : toast.type === "success"
                    ? "Submitted Successfully"
                    : "Submission Error"}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                  {toast.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Close notification"
                className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={14} />
              </button>

              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className={`Toastify__progress-bar absolute bottom-0 left-0 h-1 ${
                  toast.type === "warning"
                    ? "bg-amber-500"
                    : toast.type === "success"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Banner */}
      <section
        className="relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[280px] lg:h-[320px]"
        style={{
          backgroundImage: `url(${contactBannerBg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex h-full w-full items-center px-5 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Contact{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>

            <motion.p
              className="mt-3 max-w-md text-xs leading-5 text-slate-600 sm:text-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Get in touch with our team for product inquiries, expert support,
              and the right healthcare solutions for your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative z-10 w-full -mt-8 px-4 pb-10 sm:-mt-10 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-4 shadow-[0_10px_40px_rgba(30,80,140,0.12)] sm:p-5 lg:grid-cols-[290px_1fr]">
          {/* Left Side */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Company Address */}
            <motion.div
              className="rounded-xl border border-blue-100 bg-white p-3.5 transition-colors hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 25px rgba(14,120,249,0.12)",
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e78f9]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin size={20} />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#0e78f9]">
                    Company Address
                  </h3>

                  <a
                    href="https://maps.app.goo.gl/muJWJRA2uwVzTG4u8?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 block text-xs leading-relaxed text-slate-600 transition-colors hover:text-[#0e78f9]"
                    title="Open office address in Google Maps"
                  >
                    <span>
                      324, 3rd Floor, Vipul Business Park, Sector-48, Sohna Road, Gurgaon - 122004
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#0e78f9]">
                      View on Google Maps
                      <ExternalLink size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Call Us */}
            <motion.div
              className="rounded-xl border border-blue-100 bg-white p-3.5 transition-colors hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 25px rgba(14,120,249,0.12)",
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e78f9]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={20} />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#0e78f9]">
                    Call Us
                  </h3>

                  <div className="mt-1 space-y-1">
                    <a
                      href="tel:8860086232"
                      className="block text-xs font-semibold text-slate-700 transition-colors hover:text-[#0e78f9]"
                      title="Call 8860086232"
                    >
                      8860086232
                    </a>
                    <a
                      href="tel:8448385864"
                      className="block text-xs font-semibold text-slate-700 transition-colors hover:text-[#0e78f9]"
                      title="Call 8448385864"
                    >
                      8448385864
                    </a>
                  </div>

                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Quick phone assistance
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="rounded-xl border border-blue-100 bg-white p-3.5 transition-colors hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 25px rgba(14,120,249,0.12)",
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e78f9]"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={20} />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#0e78f9]">
                    Email
                  </h3>

                  <a
                    href="mailto:info@rhscare.org"
                    className="mt-1 block break-all text-xs font-semibold text-slate-700 transition-colors hover:text-[#0e78f9]"
                    title="Send email to info@rhscare.org"
                  >
                    info@rhscare.org
                  </a>

                  <p className="mt-1.5 text-[11px] text-slate-500">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              className="rounded-xl border border-blue-100 bg-white p-3.5 transition-colors hover:border-blue-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 25px rgba(14,120,249,0.12)",
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0e78f9]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock size={20} />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#0e78f9]">
                    Business Hours
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    MON–FRI, 9 AM – 6 PM
                  </p>

                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Closed on weekends & holidays
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Office Map */}
            <motion.div
              className="relative h-[115px] overflow-hidden rounded-xl border border-blue-100 bg-slate-100 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <iframe
                title="RHS Office Location - Vipul Business Park Gurgaon"
                src="https://www.google.com/maps?q=Vipul+Business+Park,+Sector-48,+Gurgaon&z=15&output=embed"
                className="absolute inset-0 h-full w-full border-0 grayscale contrast-[0.9] opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="pointer-events-none absolute inset-0 bg-blue-50/10" />

              <a
                href="https://maps.app.goo.gl/muJWJRA2uwVzTG4u8?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto absolute inset-0 z-10 flex items-end justify-end p-2.5 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent group"
                title="Open office location in Google Maps"
              >
                <div className="flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#0e78f9] shadow-sm backdrop-blur-xs transition-transform group-hover:scale-105">
                  <span>Get Directions</span>
                  <Navigation size={12} />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {/* Form Heading */}
            <motion.div
              className="mb-5 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#0e78f9]"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <User size={18} />
                </motion.div>

                <h2 className="text-base font-bold text-[#102d68] sm:text-lg">
                  Please provide your complete contact details.
                </h2>
              </div>

              <p className="hidden text-[12px] text-[#0e78f9] sm:block">
                * Required field
              </p>
            </motion.div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title / First Name / Last Name */}
              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Title<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.title ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.title && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.title}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    First Name<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.firstName ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.firstName && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.firstName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Last Name<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.lastName ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.lastName && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.lastName}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Job Title */}
              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Job Title<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.jobTitle ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.jobTitle && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.jobTitle}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Hospital / Business / University
                    <span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="Hospital / Business / University"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.institution ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.institution && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.institution}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Department*/}
              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Department<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Department"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.department ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.department && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.department}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Address<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.address ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.address && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.address}
                    </span>
                  )}
                </div>
              </motion.div>

              {/*Country*/}
              <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Country<span className="text-red-500">*</span>
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.country ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } bg-white px-3 text-xs text-slate-700 outline-none focus:border-[#0e78f9]`}
                  >
                    <option>Select Country</option>
                    <option>India</option>
                    <option>Italy</option>
                  </select>
                  {formErrors.country && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.country}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    State<span className="text-red-500">*</span>
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.state ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } bg-white px-3 text-xs text-slate-700 outline-none focus:border-[#0e78f9]`}
                  >
                    <option>Select State</option>
                    <option>Delhi</option>
                    <option>Gurugram</option>
                  </select>
                  {formErrors.state && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.state}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    City<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.city ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.city && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.city}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Post / Zip Code<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Post / Zip Code"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.zipCode ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.zipCode && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.zipCode}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Mobile*/}
              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Mobile<span className="text-red-500">*</span>
                  </label>

                  <motion.div
                    className={`flex h-10 overflow-hidden rounded-md border ${
                      formErrors.mobile ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    }`}
                    whileFocus={{ borderColor: "#0e78f9" }}
                  >
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile Number"
                      className="min-w-0 flex-1 px-3 text-xs outline-none placeholder:text-slate-400"
                    />
                  </motion.div>
                  {formErrors.mobile && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.mobile}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Email<span className="text-red-500">*</span>
                  </label>

                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "#0e78f9",
                    }}
                    className={`h-10 w-full rounded-md border ${
                      formErrors.email ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                    } px-3 text-xs outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.email && (
                    <span className="mt-1 block text-[10px] text-red-500">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Medical Equipment (Please briefly describe your requirements)
                  <span className="text-red-500">*</span>
                </label>

                <motion.textarea
                  rows="4"
                  maxLength="2000"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Type your requirements here..."
                  whileFocus={{
                    scale: 1.005,
                    borderColor: "#0e78f9",
                  }}
                  className={`w-full resize-none rounded-md border ${
                    formErrors.requirements ? "border-red-400 ring-1 ring-red-100" : "border-slate-200"
                  } px-3 py-3 text-xs outline-none placeholder:text-slate-400`}
                />
                {formErrors.requirements && (
                  <span className="mt-1 block text-[10px] text-red-500">
                    {formErrors.requirements}
                  </span>
                )}
              </motion.div>

              {/* Schedule a Call Section */}
              <CallBookingSection
                selectedDate={formData.callDate}
                onDateSelect={handleCallDateSelect}
                error={dateError || formErrors.callDate}
                setError={setDateError}
              />

              {/* Submission Status Feedback Alert */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg border p-3.5 text-xs ${
                    submitStatus.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-amber-200 bg-amber-50 text-amber-900"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {submitStatus.type === "success" ? (
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                    )}
                    <div>
                      <p className="font-semibold">{submitStatus.message}</p>
                      {submitStatus.backendRequired && (
                        <p className="mt-1 text-[11px] text-amber-700">
                          Notice: Backend API endpoint is not yet connected. Frontend validation and date payload are fully integrated.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="text-[11px] text-slate-500">
                  {formData.callDate && (
                    <span>
                      Preferred Call Date:{" "}
                      <strong className="text-[#0e78f9]">
                        {formatDateDisplay(formData.callDate)}
                      </strong>
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={
                    !isSubmitting
                      ? {
                          scale: 1.04,
                          boxShadow: "0 8px 20px rgba(14,120,249,0.25)",
                        }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.96 } : {}}
                  className={`flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark px-7 py-3 text-sm font-semibold text-white shadow-md transition-opacity ${
                    isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
