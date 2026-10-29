import axios from "axios";
import { getBaseApiUrl } from "../config/env";

/**
 * Public Clients API Service for Main RHS Website
 * Calls backend GET /api/clients?status=active without admin authorization.
 * Backend automatically filters to return only active, non-deleted clients.
 *
 * @returns {Promise<Array<{ id: number, name: string, logo_url: string, cloudinary_public_id: string|null, bg_theme: string, is_active: boolean, display_order: number }>>}
 */
export async function fetchPublicClients() {
  const base = getBaseApiUrl();
  try {
    const response = await axios.get(`${base}/clients?status=active`, {
      headers: {
        Accept: "application/json",
      },
    });

    return Array.isArray(response.data?.clients) ? response.data.clients : [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to load clients from server.";
    const err = new Error(message);
    err.response = error.response;
    throw err;
  }
}
