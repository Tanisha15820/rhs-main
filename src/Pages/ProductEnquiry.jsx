import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle2, X } from "lucide-react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

import productEnquiryBanner from "../assets/images/product_enquiry_banner.png";
import { submitProductEnquiry } from "../services/productEnquiryService";
import { ENQUIRY_CART_KEY } from "../utils/enquiryStorage";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "918860086232";

const ProductEnquiry = ({
  machineId: propMachineId,
  machineName: propMachineName,
  productImage: propProductImage,
}) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const contextMachine = useMemo(() => {
    const stateMachineId =
      location.state?.machine_id || location.state?.id || "";
    const stateMachineName =
      location.state?.machine_name ||
      location.state?.name ||
      location.state?.productName ||
      location.state?.productTitle ||
      "";
    const stateImage =
      location.state?.image || location.state?.productImage || "";

    const routeMachineId =
      params.machineId ||
      searchParams.get("machine_id") ||
      searchParams.get("id") ||
      "";
    const routeMachineName =
      (params.machineName ? decodeURIComponent(params.machineName) : "") ||
      searchParams.get("machine_name") ||
      searchParams.get("name") ||
      searchParams.get("machine") ||
      "";

    const finalId = propMachineId || stateMachineId || routeMachineId || "";
    const finalName =
      propMachineName || stateMachineName || routeMachineName || "";
    const finalImage = propProductImage || stateImage || "";

    if (finalName || finalId) {
      const slugId =
        finalId || finalName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return {
        id: slugId,
        machine_id: String(slugId),
        name: finalName || finalId,
        machine_name: finalName || finalId,
        image: finalImage,
        quantity: 1,
      };
    }
    return null;
  }, [
    propMachineId,
    propMachineName,
    propProductImage,
    params.machineId,
    params.machineName,
    searchParams,
    location.state,
  ]);

  const [products, setProducts] = useState(() => {
    if (contextMachine) {
      try {
        const savedRaw = localStorage.getItem(ENQUIRY_CART_KEY);
        const savedList = savedRaw ? JSON.parse(savedRaw) : [];
        const existingMatch = Array.isArray(savedList)
          ? savedList.find(
              (item) =>
                item.name === contextMachine.name ||
                item.machine_name === contextMachine.machine_name
            )
          : null;
        const merged = {
          ...contextMachine,
          image: contextMachine.image || existingMatch?.image || "",
        };
        localStorage.setItem(ENQUIRY_CART_KEY, JSON.stringify([merged]));
        return [merged];
      } catch {
        return [contextMachine];
      }
    }

    try {
      const savedProducts = localStorage.getItem(ENQUIRY_CART_KEY);

      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => ({
            ...item,
            machine_id: String(item.machine_id || item.id || "1"),
            name:
              item.machine_name ||
              item.name ||
              item.productTitle ||
              "Medical Equipment",
            machine_name:
              item.machine_name ||
              item.name ||
              item.productTitle ||
              "Medical Equipment",
          }));
        }
      }
    } catch {
      // Fallback below
    }

    return [
      {
        id: 1,
        machine_id: "1",
        name: "Diode Laser",
        machine_name: "Diode Laser",
        image: "",
        quantity: 1,
      },
    ];
  });

  useEffect(() => {
    if (contextMachine) {
      try {
        localStorage.setItem(
          ENQUIRY_CART_KEY,
          JSON.stringify([contextMachine])
        );
      } catch {
        // Ignore storage write errors
      }
    }
  }, [contextMachine]);

  const currentMachineInfo = useMemo(() => {
    if (products.length > 0) {
      const names = products
        .map((p) => {
          const pName = (p.machine_name || p.name || "").trim();
          const qty = Number(p.quantity) || 1;
          return qty > 1 ? `${pName} (Qty: ${qty})` : pName;
        })
        .filter(Boolean)
        .join(", ");
      const ids = products
        .map((p) => p.machine_id || p.id)
        .filter(Boolean)
        .join(", ");
      return {
        machine_id: ids || contextMachine?.machine_id || "1",
        machine_name: names || contextMachine?.machine_name || "",
      };
    }
    return {
      machine_id: contextMachine?.machine_id || "",
      machine_name: contextMachine?.machine_name || "",
    };
  }, [products, contextMachine]);

  const [formData, setFormData] = useState({
    hospital: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    country: "INDIA",
    state: "",
    city: "",
    pinCode: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
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

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);

    setProducts(updatedProducts);

    localStorage.setItem(ENQUIRY_CART_KEY, JSON.stringify(updatedProducts));
  };

  const emptyCart = () => {
    setProducts([]);
    localStorage.removeItem(ENQUIRY_CART_KEY);
  };

  const changeQuantity = (id, value) => {
    const safeQuantity = Number.isFinite(value) && value >= 1 ? value : 1;
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: safeQuantity,
        };
      }

      return product;
    });

    setProducts(updatedProducts);

    localStorage.setItem(ENQUIRY_CART_KEY, JSON.stringify(updatedProducts));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleReset = () => {
    setFormData({
      hospital: "",
      name: "",
      email: "",
      contact: "",
      address: "",
      country: "INDIA",
      state: "",
      city: "",
      pinCode: "",
      details: "",
    });
    setFormErrors({});
    setSubmitStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while a request is in progress
    if (isSubmitting) return;

    setSubmitStatus({ type: "", message: "" });

    const machineId = String(currentMachineInfo.machine_id || "").trim();
    const machineName = String(currentMachineInfo.machine_name || "").trim();
    const userName = formData.name.trim();
    const userEmail = formData.email.trim();
    const userPhone = formData.contact.trim();
    const hospital = formData.hospital.trim();
    const address = formData.address.trim();
    const country = (formData.country || "").trim();
    const state = formData.state.trim();
    const city = formData.city.trim();
    const pinCode = formData.pinCode.trim();
    const details = formData.details.trim();

    if (!machineName || products.length === 0) {
      const msg =
        "Please select at least one product before submitting your enquiry.";
      setSubmitStatus({
        type: "error",
        message: msg,
      });
      showToast("warning", msg);
      return;
    }

    const errors = {};
    if (!hospital)
      errors.hospital = "Hospital/Clinic/Company name is required";
    if (!userName) errors.name = "Name is required";
    if (!userEmail) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(userEmail)) {
      errors.email = "Please enter a valid Email address";
    }
    if (!userPhone) errors.contact = "Contact No. is required";
    if (!address) errors.address = "Address is required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    if (!city) errors.city = "City is required";
    if (!pinCode) errors.pinCode = "Pin Code is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const warningMessage =
        "Please fill in all required (*) fields before submitting.";
      setSubmitStatus({
        type: "error",
        message: warningMessage,
      });
      showToast("warning", warningMessage);
      return;
    }

    const queryReason =
      details ||
      (hospital
        ? `Product enquiry for ${machineName} from ${hospital}`
        : `Product enquiry for ${machineName}`);

    // Immediately open WhatsApp in a new tab during the synchronous user click
    // gesture so browsers do not block the popup and the current tab stays open
    // to complete saving the enquiry to the database.
    const whatsappText = `Hello, I have an inquiry for ${machineName}. Reason: ${queryReason}. Name: ${userName}, Phone: ${userPhone}, Email: ${userEmail}, Hospital/Clinic/Company: ${hospital || "N/A"}`;
    const cleanWhatsappNumber = String(DEFAULT_WHATSAPP_NUMBER).replace(
      /\D/g,
      ""
    );
    const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
      whatsappText
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(true);

    try {
      const result = await submitProductEnquiry({
        machine_id: machineId || "1",
        machine_name: machineName,
        products: products.map((p) => ({
          id: p.id,
          machine_id: String(p.machine_id || p.id || "1"),
          name: p.machine_name || p.name,
          quantity: Number(p.quantity) > 0 ? Number(p.quantity) : 1,
          image: typeof p.image === "string" ? p.image : "",
        })),
        hospital,
        name: userName,
        user_name: userName,
        email: userEmail,
        user_email: userEmail,
        contact: userPhone,
        user_phone: userPhone,
        address,
        country,
        state,
        city,
        pinCode,
        details,
        query_reason: queryReason,
        message: queryReason,
      });

      setSubmitStatus({
        type: "success",
        message:
          result?.message ||
          "Your product enquiry has been submitted and saved successfully.",
      });

      setFormData({
        hospital: "",
        name: "",
        email: "",
        contact: "",
        address: "",
        country: "INDIA",
        state: "",
        city: "",
        pinCode: "",
        details: "",
      });
    } catch (error) {
      console.error("Failed to submit product enquiry:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your product enquiry at this time. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff]">
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

      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <img
          src={productEnquiryBanner}
          alt="Product Enquiry"
          className="
            h-[200px]
            w-full
            object-cover
            sm:h-[240px]
            md:h-[280px]
            lg:h-[320px]
          "
        />

        <div className="absolute inset-0 flex w-full items-center px-5 md:px-8 lg:px-12 xl:px-16">
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
              Product{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Enquiry
              </span>
            </motion.h1>

            <motion.p
              className="mt-3 max-w-md text-xs leading-5 text-slate-600 sm:text-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Share your product requirements with our team and get the right
              healthcare solutions for your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 py-8 sm:px-6 lg:px-12 xl:px-16">
        <div className="space-y-6">
          {/* Selected Products */}
          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-[#dce9f5]
              bg-white
              shadow-[0_4px_20px_rgba(15,23,42,0.05)]
            "
          >
            {/* Section Header */}
            <div
              className="
                flex
                items-center
                gap-3
                border-b
                border-[#e6eef6]
                bg-[#f7fbff]
                px-5
                py-3
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  bg-primary/10
                  text-primary
                "
              >
                <ShoppingCartOutlinedIcon fontSize="small" />
              </div>

              <div>
                <h2 className="text-[18px] font-semibold text-primary-dark">
                  Selected Products
                </h2>

                <p className="text-[12px] text-gray-400">
                  Review your selected products before submitting your enquiry.
                </p>
              </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <div className="min-w-[650px]">
                {/* Table Header */}
                <div
                  className="
                    grid
                    grid-cols-[80px_1fr_120px_90px]
                    border-b
                    border-[#e6eef6]
                    bg-[#f9fcff]
                    px-4
                    py-2
                    text-[12px]
                    font-semibold
                    text-[#51657d]
                  "
                >
                  <div>Image</div>
                  <div>Product Name</div>
                  <div>Quantity</div>
                  <div className="text-center">Remove</div>
                </div>

                {/* Products */}
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="
                        grid
                        grid-cols-[80px_1fr_120px_90px]
                        items-center
                        border-b
                        border-[#edf2f7]
                        px-4
                        py-3
                      "
                    >
                      {/* Product Image */}
                      <div
                        className="
                          flex
                          h-[48px]
                          w-[58px]
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-md
                          bg-[#f5f9fd]
                        "
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <ShoppingCartOutlinedIcon
                            className="text-[#b8c9da]"
                            fontSize="small"
                          />
                        )}
                      </div>

                      {/* Product Name */}
                      <div>
                        <h3 className="text-[14px] font-semibold text-slate-700">
                          {product.machine_name || product.name}
                        </h3>
                      </div>

                      {/* Quantity */}
                      <div>
                        <input
                          type="number"
                          min="1"
                          value={product.quantity || 1}
                          onChange={(e) =>
                            changeQuantity(product.id, Number(e.target.value))
                          }
                          className="
                            w-[70px]
                            rounded-md
                            border
                            border-[#dce7f1]
                            bg-white
                            px-2
                            py-1.5
                            text-[13px]
                            text-gray-600
                            outline-none
                            focus:border-primary
                          "
                        />
                      </div>

                      {/* Remove */}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-md
                            text-red-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <ShoppingCartOutlinedIcon
                      className="text-[#c8d7e6]"
                      fontSize="large"
                    />

                    <p className="mt-2 text-[14px] text-gray-400">
                      No products selected.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Empty Cart Button */}
            {products.length > 0 && (
              <div className="flex justify-end px-4 py-3">
                <button
                  type="button"
                  onClick={emptyCart}
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    border-red-200
                    bg-white
                    px-3
                    py-1.5
                    text-[12px]
                    font-medium
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: 14 }} />
                  Empty Cart
                </button>
              </div>
            )}
          </div>

          {/* Enquiry Form */}
          <form onSubmit={handleSubmit}>
            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-[#dce9f5]
                bg-white
                shadow-[0_4px_20px_rgba(15,23,42,0.05)]
              "
            >
              {/* Form Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-[#e6eef6]
                  bg-[#f7fbff]
                  px-5
                  py-3
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-md
                      bg-primary/10
                      text-primary
                    "
                  >
                    <DescriptionOutlinedIcon fontSize="small" />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold text-primary-dark">
                      Enquiry Details
                    </h2>

                    <p className="text-[12px] text-gray-400">
                      Please fill in your details and we will get back to you
                      soon.
                    </p>
                  </div>
                </div>

                <p className="hidden text-[12px] text-[#0e78f9] sm:block">
                  * Required field
                </p>
              </div>

              {/* Form Content */}
              <div className="p-5">
                {submitStatus.message && (
                  <div
                    role="alert"
                    className={`mb-4 rounded-md border px-4 py-2.5 text-[13px] font-medium ${
                      submitStatus.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* First Row */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <FormInput
                    label="Hospital/Clinic/Company"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Hospital/Clinic/Company"
                    icon={<LocationOnOutlinedIcon />}
                    required
                    error={formErrors.hospital}
                  />

                  <FormInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    icon={<PersonOutlineOutlinedIcon />}
                    required
                    error={formErrors.name}
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    icon={<EmailOutlinedIcon />}
                    required
                    error={formErrors.email}
                  />

                  <FormInput
                    label="Contact No."
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact No."
                    icon={<PhoneOutlinedIcon />}
                    required
                    error={formErrors.contact}
                  />
                </div>

                {/* Second Row */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <FormInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    icon={<LocationOnOutlinedIcon />}
                    required
                    error={formErrors.address}
                  />

                  <FormSelect
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={["INDIA", "Canada", "USA", "UK"]}
                    icon={<PublicOutlinedIcon />}
                    required
                    error={formErrors.country}
                  />

                  <FormInput
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    icon={<LocationOnOutlinedIcon />}
                    required
                    error={formErrors.state}
                  />

                  <FormInput
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    icon={<LocationOnOutlinedIcon />}
                    required
                    error={formErrors.city}
                  />
                </div>

                {/* Third Row */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <FormInput
                    label="Pin Code"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    icon={<PinDropOutlinedIcon />}
                    required
                    error={formErrors.pinCode}
                  />
                </div>

                {/* Details */}
                <div className="mt-4">
                  <label className="mb-1.5 block text-[13px] font-medium text-[#51657d]">
                    Details
                  </label>

                  <div className="relative">
                    <DescriptionOutlinedIcon
                      sx={{
                        fontSize: 15,
                        color: "#9fb0c2",
                      }}
                      className="absolute left-3 top-3"
                    />

                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Details"
                      rows="3"
                      className="
                        w-full
                        resize-none
                        rounded-md
                        border
                        border-[#dce7f1]
                        bg-white
                        py-2.5
                        pl-10
                        pr-3
                        text-[13px]
                        text-gray-600
                        outline-none
                        placeholder:text-[#aebdcb]
                        focus:border-primary
                      "
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-md
                      bg-gradient-to-r
                      from-primary
                      to-primary-dark
                      px-6
                      py-2.5
                      text-[13px]
                      font-medium
                      text-white
                      shadow-sm
                      transition
                      hover:opacity-90
                      disabled:opacity-60
                      cursor-pointer
                    "
                  >
                    <SendOutlinedIcon sx={{ fontSize: 14 }} />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleReset}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-md
                      border
                      border-primary/40
                      bg-white
                      px-6
                      py-2.5
                      text-[13px]
                      font-medium
                      text-primary
                      transition
                      hover:bg-primary/5
                      disabled:opacity-60
                      cursor-pointer
                    "
                  >
                    <RestartAltOutlinedIcon sx={{ fontSize: 14 }} />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

// Input Component
const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  required = false,
  error = "",
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#51657d]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 flex -translate-y-1/2 text-[#9fb0c2]">
          {React.cloneElement(icon, {
            sx: {
              fontSize: 16,
            },
          })}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            h-[38px]
            w-full
            rounded-md
            border
            ${
              error
                ? "border-red-400 ring-1 ring-red-100"
                : "border-[#dce7f1]"
            }
            bg-white
            pl-9
            pr-3
            text-[13px]
            text-gray-600
            outline-none
            placeholder:text-[#aebdcb]
            focus:border-primary
          `}
        />
      </div>
      {error && (
        <span className="mt-1 block text-[11px] text-red-500">{error}</span>
      )}
    </div>
  );
};

// Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  icon,
  required = false,
  error = "",
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#51657d]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 text-[#9fb0c2]">
          {React.cloneElement(icon, {
            sx: {
              fontSize: 16,
            },
          })}
        </span>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            h-[38px]
            w-full
            appearance-none
            rounded-md
            border
            ${
              error
                ? "border-red-400 ring-1 ring-red-100"
                : "border-[#dce7f1]"
            }
            bg-white
            pl-9
            pr-3
            text-[13px]
            text-gray-600
            outline-none
            focus:border-primary
          `}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="mt-1 block text-[11px] text-red-500">{error}</span>
      )}
    </div>
  );
};

export default ProductEnquiry;
