/**
 * Public Products API Service for Main RHS Website
 * Calls backend GET /api/products without admin authorization
 * Backend automatically filters to return only active, non-deleted products.
 */

import { getBaseApiUrl } from "../config/env";

/**
 * Fetch all public active products from backend
 * Endpoint: GET /api/products
 *
 * @returns {Promise<Array<{ id: number, name: string, color_palette: string, image_url: string, cloudinary_public_id: string }>>}
 */
export async function fetchPublicProducts() {
  const base = getBaseApiUrl();
  const response = await fetch(`${base}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to fetch healthcare products (${response.status})`
    );
  }

  return Array.isArray(data.products) ? data.products : [];
}
