import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bookmark,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  X,
  Eye,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SEO from "../Components/SEO";
import blogBannerBg from "../assets/images/blogs-banner.png";
import {
  getResolvedBlogImage,
  getBookmarkedBlogs,
  toggleBookmarkBlog,
  clearLegacyBlogsStorage,
} from "../utils/blogStorage";
import { fetchPublicBlogs, fetchBlogBySlug } from "../services/blogService";
import { saveSubscription } from "../utils/newsletterStorage";

export default function Blogs() {
  // 1. Blog posts & bookmark state
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => getBookmarkedBlogs());
  const [activeModalBlog, setActiveModalBlog] = useState(null);
  const [isLoadingModalDetails, setIsLoadingModalDetails] = useState(false);

  // 2. Carousel scroll ref & state
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  // 3. Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterRole, setNewsletterRole] = useState("Surgeon / Consultant");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");

  // 4. Toast notification state
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? "" : current));
    }, 3000);
  };

  // -------------------------------------------------------------
  // FETCH PUBLIC BLOGS FROM BACKEND
  // -------------------------------------------------------------
  const loadPublicBlogs = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const blogs = await fetchPublicBlogs();
      setBlogPosts(blogs);
    } catch (err) {
      console.error("Failed to load public blogs:", err);
      setLoadError(err.message || "Unable to load publications. Please retry.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    clearLegacyBlogsStorage();
    loadPublicBlogs();

    const handleSavedUpdate = (e) => {
      if (e?.detail) {
        setBookmarkedIds(e.detail);
      } else {
        setBookmarkedIds(getBookmarkedBlogs());
      }
    };

    window.addEventListener("rhs_blogs_saved_updated", handleSavedUpdate);
    return () => {
      window.removeEventListener("rhs_blogs_saved_updated", handleSavedUpdate);
    };
  }, [loadPublicBlogs]);

  // Update carousel scroll button availability
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Compute approximate active card index for indicators
    const firstCard = el.querySelector("[data-blog-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const idx = Math.round(scrollLeft / cardWidth);
      setScrollIndex(Math.max(0, Math.min(idx, blogPosts.length - 1)));
    }
  }, [blogPosts.length]);

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
    const firstCard = el.querySelector("[data-blog-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  // Scroll next (right) by 1 card step
  const handleScrollRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-blog-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  // Scroll directly to a specific card index
  const scrollToCardIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-blog-card]");
    if (firstCard) {
      const step = firstCard.offsetWidth + 24;
      el.scrollTo({ left: index * step, behavior: "smooth" });
    }
  };

  // Open full article reader modal and fetch full details by slug if available
  const handleOpenArticle = async (post) => {
    setActiveModalBlog(post);

    if (post.slug) {
      setIsLoadingModalDetails(true);
      try {
        const fullArticle = await fetchBlogBySlug(post.slug);
        if (fullArticle) {
          setActiveModalBlog(fullArticle);
        }
      } catch (err) {
        console.warn("Could not fetch full article by slug, using card data:", err);
      } finally {
        setIsLoadingModalDetails(false);
      }
    }
  };

  // Handle bookmark toggle
  const handleToggleBookmark = (e, blog) => {
    e.stopPropagation();
    const updated = toggleBookmarkBlog(blog.id);
    setBookmarkedIds(updated);
    if (updated.includes(blog.id)) {
      showToast(`Saved "${(blog.title || "").slice(0, 28)}..." to your reading list`);
    } else {
      showToast("Removed from reading list");
    }
  };

  // Handle share
  const handleShare = (e, blog) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blogs#${blog.slug || blog.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`Link for "${(blog.title || "").slice(0, 24)}..." copied!`);
      });
    } else {
      showToast("Link copied to clipboard!");
    }
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }

    setNewsletterStatus("loading");

    setTimeout(() => {
      const res = saveSubscription({
        email: newsletterEmail.trim(),
        role: newsletterRole,
        source: "blog_page_newsletter",
      });

      if (res.success) {
        setNewsletterStatus("success");
        showToast("Subscribed! Welcome to MedTech Intelligence.");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        showToast("Subscription could not be saved. Please retry.");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-primary/20 selection:text-primary-dark">
      <SEO
        title="Our Blog | Reinforce Healthcare Services"
        description="Insights, guides, and updates from the world of surgical equipment and hospital innovation."
        keywords="surgical equipment blog, medical lasers, hospital machinery, Reinforce Healthcare Services"
      />

      {/* =========================================================================
          HERO BANNER HEADER (ORIGINAL STRUCTURE PRESERVED)
      ========================================================================= */}
      <section className="relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[280px] lg:h-[320px]">
        <img
          src={blogBannerBg}
          alt="Our Blogs banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative z-10 flex h-full w-full items-center px-5 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-primary sm:text-xs">
              Reinforce Healthcare
            </p>
            <h1 className="text-2xl font-black uppercase tracking-[1px] text-slate-800 sm:text-3xl md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <div className="mt-2 h-[3px] w-12 rounded-full bg-primary" />
            <p className="mt-3 max-w-md text-xs leading-5 text-slate-500 md:text-sm">
              Insights, guides, and updates from the world of surgical equipment
              and hospital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HORIZONTAL SCROLLING CARDS SECTION (EXACTLY 3 CARDS PER DESKTOP VIEW)
      ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>LATEST ARTICLES & CLINICAL GUIDES</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Publications
              </span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-lg">
              Explore recent breakthroughs in surgical lasers, endourology devices, and OT operational workflows.
            </p>
          </div>

          {/* Carousel Arrows & Counter */}
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

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex gap-6 overflow-hidden pb-6 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                  w-[86%] min-w-[86%] sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)]"
              >
                <div className="aspect-[16/10] w-full rounded-xl bg-slate-200 mb-4" />
                <div className="h-4 w-24 rounded-full bg-slate-200 mb-3" />
                <div className="h-5 w-5/6 rounded bg-slate-200 mb-2" />
                <div className="h-3.5 w-full rounded bg-slate-200 mb-1" />
                <div className="h-3.5 w-2/3 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && loadError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-8 text-center my-6">
            <p className="text-sm font-semibold text-rose-700 mb-3">{loadError}</p>
            <button
              type="button"
              onClick={loadPublicBlogs}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark transition cursor-pointer shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Loading Publications</span>
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !loadError && blogPosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center my-6">
            <h3 className="text-base font-bold text-slate-800">
              No publications available at the moment
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Please check back soon for our latest clinical guides, laser technology insights, and surgical equipment updates.
            </p>
          </div>
        )}

        {/* 
            HORIZONTAL SCROLLING ROW CONTAINER
            Viewport Constraint:
            - Mobile: w-[86%] min-w-[86%] max-w-[86%] (single card peek)
            - Tablet: sm:w-[calc((100%-24px)/2)] (exactly 2 cards visible)
            - Desktop: lg:w-[calc((100%-48px)/3)] (EXACTLY 3 cards visible)
        */}
        {!isLoading && !loadError && blogPosts.length > 0 && (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {blogPosts.map((post) => {
                const isSaved = bookmarkedIds.includes(post.id);
                const authorDisplayName =
                  post.author_name || post.author?.name || "Reinforce Clinical Team";
                const authorDisplayRole =
                  post.author_role || post.author?.role || "Specialist";
                const authorInitials = authorDisplayName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "RH";

                return (
                  <div
                    key={post.id}
                    data-blog-card
                    onClick={() => handleOpenArticle(post)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2edf4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/80 cursor-pointer shrink-0 snap-start
                      w-[86%] min-w-[86%] max-w-[86%]
                      sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] sm:max-w-[calc((100%-24px)/2)]
                      lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)] lg:max-w-[calc((100%-48px)/3)]"
                  >
                    {/* Top Image Preview & Badges */}
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={getResolvedBlogImage(post)}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />

                        {/* Bookmark Icon Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(e, post)}
                          title={isSaved ? "Remove bookmark" : "Save article"}
                          className={`absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer ${
                            isSaved
                              ? "bg-primary text-white shadow-md shadow-primary/30"
                              : "bg-white/90 text-slate-700 hover:bg-white hover:text-primary shadow-sm"
                          }`}
                        >
                          <Bookmark
                            className="h-4 w-4"
                            fill={isSaved ? "currentColor" : "none"}
                            strokeWidth={2}
                          />
                        </button>

                        {/* Reading time overlay pill */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          <Clock className="h-3 w-3 text-sky-300" />
                          <span>{post.reading_time || post.readTime || "5 min read"}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6">
                        {/* Date & Views */}
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {post.published_at || post.date}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Eye className="h-3.5 w-3.5 text-slate-400" />
                            {post.read_count !== undefined
                              ? `${post.read_count}`
                              : post.views || "1.2k"}{" "}
                            reads
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Author & Read More Link */}
                    <div className="border-t border-slate-100 p-5 pt-4 sm:px-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-primary-dark">
                            {authorInitials}
                          </div>
                          <div className="truncate">
                            <p className="truncate text-xs font-bold text-slate-800">
                              {authorDisplayName}
                            </p>
                            <p className="truncate text-[10px] text-slate-500">
                              {authorDisplayRole}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-primary transition-all duration-200 group-hover:text-primary-dark shrink-0">
                          <span>Read</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Bottom Navigation Indicator Dots */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {blogPosts.map((_, idx) => (
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
          </div>
        )}
      </section>

      {/* =========================================================================
          FULL ARTICLE MODAL / QUICK READER
      ========================================================================= */}
      <AnimatePresence>
        {activeModalBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalBlog(null)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalBlog(null)}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-primary to-primary-dark px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {activeModalBlog.category || activeModalBlog.tag || "Article"}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {activeModalBlog.published_at || activeModalBlog.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {activeModalBlog.reading_time || activeModalBlog.readTime || "5 min read"}
                </span>
                {isLoadingModalDetails && (
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Loading latest article data...</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl leading-tight">
                {activeModalBlog.title}
              </h2>

              {/* Author & Header Actions */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-bold text-white shadow-sm shadow-primary/20">
                    {(
                      activeModalBlog.author_name ||
                      activeModalBlog.author?.name ||
                      "RH"
                    )
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "RH"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {activeModalBlog.author_name ||
                        activeModalBlog.author?.name ||
                        "Reinforce Clinical Team"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activeModalBlog.author_role ||
                        activeModalBlog.author?.role ||
                        "Surgical Equipment Specialist"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(e, activeModalBlog)}
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                      bookmarkedIds.includes(activeModalBlog.id)
                        ? "border-primary bg-primary text-white shadow-sm shadow-primary/25"
                        : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Bookmark
                      className="h-4 w-4"
                      fill={
                        bookmarkedIds.includes(activeModalBlog.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                    <span>
                      {bookmarkedIds.includes(activeModalBlog.id)
                        ? "Saved"
                        : "Save Article"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleShare(e, activeModalBlog)}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-all hover:border-primary hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Hero Image in Modal */}
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                <img
                  src={getResolvedBlogImage(activeModalBlog)}
                  alt={activeModalBlog.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Subtitle if available */}
              {(activeModalBlog.article_subtitle || activeModalBlog.subtitle) && (
                <p className="mt-6 text-sm sm:text-base font-medium italic text-slate-600 leading-relaxed">
                  {activeModalBlog.article_subtitle || activeModalBlog.subtitle}
                </p>
              )}

              {/* Key Takeaways Box */}
              {Array.isArray(
                activeModalBlog.key_takeaways || activeModalBlog.keyTakeaways
              ) &&
                (activeModalBlog.key_takeaways || activeModalBlog.keyTakeaways).length > 0 && (
                  <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/70 p-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                      <Sparkles className="h-4 w-4" />
                      <span>Key Clinical Takeaways</span>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {(
                        activeModalBlog.key_takeaways || activeModalBlog.keyTakeaways
                      ).map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Article Content Paragraphs & Sections */}
              <div className="mt-8 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                {Array.isArray(
                  activeModalBlog.article_sections || activeModalBlog.sections
                ) &&
                (activeModalBlog.article_sections || activeModalBlog.sections).length > 0 ? (
                  (activeModalBlog.article_sections || activeModalBlog.sections).map(
                    (sec, idx) => (
                      <div key={idx} className="space-y-3">
                        {sec.heading && (
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-primary pl-3">
                            {sec.heading}
                          </h3>
                        )}
                        {Array.isArray(sec.paragraphs) ? (
                          sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-slate-600 leading-relaxed">
                              {p}
                            </p>
                          ))
                        ) : typeof sec.paragraphs === "string" ? (
                          <p className="text-slate-600 leading-relaxed">
                            {sec.paragraphs}
                          </p>
                        ) : null}
                      </div>
                    )
                  )
                ) : activeModalBlog.article_content || activeModalBlog.content ? (
                  (activeModalBlog.article_content || activeModalBlog.content)
                    .split(/\n\s*\n/)
                    .map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-slate-600 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    {activeModalBlog.excerpt}
                  </p>
                )}
              </div>

              {/* Equipment Technical Specifications Table if available */}
              {Array.isArray(
                activeModalBlog.benchmark_specs || activeModalBlog.specs
              ) &&
                (activeModalBlog.benchmark_specs || activeModalBlog.specs).length > 0 && (
                  <div className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Technical Benchmark & Operating Parameters
                      </h4>
                    </div>
                    <div className="divide-y divide-slate-100 bg-white">
                      {(
                        activeModalBlog.benchmark_specs || activeModalBlog.specs
                      ).map((item, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-2 px-5 py-3 text-xs sm:text-sm"
                        >
                          <span className="font-semibold text-slate-600">
                            {item.label}
                          </span>
                          <span className="text-slate-900 font-medium">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          TOAST FEEDBACK NOTIFICATION
      ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-primary/30 bg-slate-900/95 px-5 py-3.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-md"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
