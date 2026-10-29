import blogImg1 from "../assets/images/blog_3.png";
import blogImg2 from "../assets/images/blog_2.png";
import blogImg3 from "../assets/images/blog_1.png";
import blogImg4 from "../assets/images/blog_4.png";
import laserTechImg from "../assets/images/newsletter_laser_tech.jpg";
import roboticImg from "../assets/images/newsletter_robotic_surgery.jpg";

export const BLOGS_STORAGE_KEY = "rhs_blogs_v1";
export const BLOGS_SAVED_KEY = "rhs_blogs_saved_v1";

export const BLOG_PRESET_MAP = {
  blog_3: blogImg1,
  blog_2: blogImg2,
  blog_1: blogImg3,
  blog_4: blogImg4,
  laser_tech: laserTechImg,
  robotic_surgery: roboticImg,
};

/**
 * Resolve display image from backend thumbnail_url, uploaded image URL, or preset key
 */
export const getResolvedBlogImage = (blog) => {
  const img = blog?.thumbnail_url || blog?.image;
  if (img && typeof img === "string" && img.trim() !== "") {
    return img;
  }
  if (blog?.presetKey && BLOG_PRESET_MAP[blog.presetKey]) {
    return BLOG_PRESET_MAP[blog.presetKey];
  }
  return blogImg1;
};

/**
 * Clean legacy hardcoded blog records from localStorage
 */
export const clearLegacyBlogsStorage = () => {
  try {
    localStorage.removeItem(BLOGS_STORAGE_KEY);
  } catch {
    // ignore
  }
};

/**
 * Reading list saved bookmark IDs stored locally for visitor preference
 */
export const getBookmarkedBlogs = () => {
  try {
    const raw = localStorage.getItem(BLOGS_SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Error reading saved blogs:", err);
    return [];
  }
};

/**
 * Toggle bookmark state for a given blog ID
 */
export const toggleBookmarkBlog = (blogId) => {
  try {
    const current = getBookmarkedBlogs();
    let updated;
    if (current.includes(blogId)) {
      updated = current.filter((id) => id !== blogId);
    } else {
      updated = [...current, blogId];
    }
    localStorage.setItem(BLOGS_SAVED_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent("rhs_blogs_saved_updated", { detail: updated })
    );
    return updated;
  } catch (err) {
    console.warn("Error toggling blog bookmark:", err);
    return [];
  }
};
