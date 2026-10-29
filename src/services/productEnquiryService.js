import axios from "axios";
import { getBaseApiUrl } from "../config/env";

/**
 * Build candidate API endpoints in priority order so submissions work across:
 * 1. Vite dev server proxy (`/api/...` on same origin — works on localhost, 127.0.0.1, and LAN IPs like 192.168.x.x)
 * 2. Configured `VITE_API_BASE_URL` (`getBaseApiUrl()`)
 * 3. Direct backend on the current browser hostname (`http://<hostname>:5000/api/...`)
 * 4. Direct local backend (`http://localhost:5000/api/...`)
 */
function getCandidateEnquiryUrls() {
  const base = getBaseApiUrl();
  const host =
    typeof window !== "undefined" && window.location?.hostname
      ? window.location.hostname
      : "localhost";

  const candidates = [
    "/api/product-enquiries",
    "/api/queries/machine-query",
    `${base}/product-enquiries`,
    `${base}/queries/machine-query`,
    `http://${host}:5000/api/product-enquiries`,
    "http://localhost:5000/api/product-enquiries",
    "http://127.0.0.1:5000/api/product-enquiries",
  ];

  return Array.from(new Set(candidates));
}

/**
 * Sanitize payload so large base64 data URLs on product images cannot trigger 413 errors.
 */
function sanitizeEnquiryPayload(payload = {}) {
  const rawProducts = Array.isArray(payload.products) ? payload.products : [];
  const sanitizedProducts = rawProducts.map((p) => {
    const rawImage = typeof p?.image === "string" ? p.image : "";
    const safeImage =
      rawImage.startsWith("data:") || rawImage.length > 500 ? "" : rawImage;
    return {
      id: p?.id ?? p?.machine_id ?? 1,
      machine_id: String(p?.machine_id ?? p?.id ?? "1"),
      name: String(
        p?.machine_name || p?.name || payload.machine_name || ""
      ).trim(),
      machine_name: String(
        p?.machine_name || p?.name || payload.machine_name || ""
      ).trim(),
      quantity: Number(p?.quantity) > 0 ? Number(p.quantity) : 1,
      image: safeImage,
    };
  });

  return {
    ...payload,
    products: sanitizedProducts,
  };
}

/**
 * Submit a Product Enquiry from the main RHS website to the backend database.
 * Endpoint: POST /api/product-enquiries (with automatic fallback to /api/queries/machine-query)
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function submitProductEnquiry(payload) {
  const cleanPayload = sanitizeEnquiryPayload(payload);
  const candidateUrls = getCandidateEnquiryUrls();
  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const response = await axios.post(url, cleanPayload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 15000,
      });

      if (!response.data || response.data.success === false) {
        throw new Error(
          response.data?.message ||
            "Failed to submit product enquiry. Please try again."
        );
      }

      return response.data;
    } catch (error) {
      lastError = error;

      // If the backend responded with a validation error (400), stop and surface it immediately
      if (error?.response?.status === 400) {
        break;
      }
      // If network error, 404, or 5xx on this candidate URL, try the next candidate
    }
  }

  const backendMessage = lastError?.response?.data?.message;
  const message =
    backendMessage ||
    lastError?.message ||
    "Unable to submit your product enquiry at this time. Please try again.";
  const err = new Error(message);
  err.response = lastError?.response;
  throw err;
}
