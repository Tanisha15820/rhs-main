import axios from "axios";
import { getBaseApiUrl } from "../config/env";

/**
 * Public Testimonials API Service for Main RHS Website
 * Calls backend GET /api/testimonials?status=active without admin authorization.
 * Backend automatically filters to return only active, non-deleted testimonials.
 *
 * @returns {Promise<Array<{ id: number, author_name: string, quote: string, bg_theme: string, image_url: string|null, cloudinary_public_id: string|null }>>}
 */
export async function fetchPublicTestimonials() {
  const base = getBaseApiUrl();
  try {
    const response = await axios.get(`${base}/testimonials?status=active`, {
      headers: {
        Accept: "application/json",
      },
    });

    return Array.isArray(response.data?.testimonials)
      ? response.data.testimonials
      : [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to load testimonials from server.";
    const err = new Error(message);
    err.response = error.response;
    throw err;
  }
}
