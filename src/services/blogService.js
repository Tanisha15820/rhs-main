import axios from "axios";
import { getBaseApiUrl } from "../config/env";

/**
 * Public Blogs API Service for Main RHS Website
 * Calls backend GET /api/blogs without admin authorization.
 * Backend automatically filters to return only active, non-deleted blogs.
 *
 * @returns {Promise<Array>}
 */
export async function fetchPublicBlogs() {
  const base = getBaseApiUrl();
  try {
    const response = await axios.get(`${base}/blogs`, {
      headers: {
        Accept: "application/json",
      },
    });

    return Array.isArray(response.data?.blogs) ? response.data.blogs : [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to load blogs from server.";
    const err = new Error(message);
    err.response = error.response;
    throw err;
  }
}

/**
 * Public Article Reader API Service
 * Fetches full article content for an active blog by its unique slug.
 * Endpoint: GET /api/blogs/slug/:slug
 *
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export async function fetchBlogBySlug(slug) {
  if (!slug) {
    throw new Error("Blog slug is required to fetch article.");
  }

  const base = getBaseApiUrl();
  try {
    const response = await axios.get(`${base}/blogs/slug/${encodeURIComponent(slug)}`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data?.blog || null;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to load blog article.";
    const err = new Error(message);
    err.response = error.response;
    throw err;
  }
}
