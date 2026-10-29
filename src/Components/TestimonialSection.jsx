import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchPublicTestimonials } from "../services/testimonialService";
import {
  getBgClassFromTheme,
  clearLegacyTestimonialsStorage,
} from "../utils/testimonialStorage";

/**
 * Public Testimonials / Our Trusted Clients Section
 * Fetches active testimonials from GET /api/testimonials?status=active via Axios
 */
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPublicTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load public testimonials:", err);
      setError("Unable to load client reviews at this moment.");
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Purge any legacy localStorage mock testimonials
    clearLegacyTestimonialsStorage();

    loadTestimonials();

    // Listen for in-memory updates from admin panel in same browser window
    const handleUpdate = () => {
      loadTestimonials();
    };

    window.addEventListener("rhs_testimonials_updated", handleUpdate);
    return () => {
      window.removeEventListener("rhs_testimonials_updated", handleUpdate);
    };
  }, [loadTestimonials]);

  return (
    <section className="relative overflow-hidden bg-[#F9FBFF] py-16 sm:py-20">
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#20B7AE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#20AFA7]">
              Testimonials
            </span>
            <span className="h-px w-7 bg-[#20B7AE]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Our Trusted{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Clients
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7C879C]">
            Hear from healthcare professionals and customers
            <br className="hidden sm:block" />
            who trust us for quality products
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <CircularProgress size={32} className="text-primary" />
            <p className="mt-3 text-xs font-medium text-slate-500">
              Loading client reviews...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <p className="text-xs font-medium text-slate-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && testimonials.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center">
            <p className="text-xs font-medium text-slate-500">
              No client reviews available at this moment.
            </p>
          </div>
        )}

        {/* Testimonial Cards */}
        {!isLoading && !error && testimonials.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {testimonials.map((testimonial, index) => {
              const animIdx = index % 6;
              const bgClass = getBgClassFromTheme(testimonial.bg_theme);
              const authorInitial = (testimonial.author_name || "A")
                .trim()
                .charAt(0)
                .toUpperCase();

              return (
                <motion.div
                  key={testimonial.id || index}
                  initial={{
                    opacity: 0,
                    x:
                      animIdx === 0
                        ? -180
                        : animIdx === 1
                          ? 20
                          : animIdx === 2
                            ? 180
                            : animIdx === 3
                              ? -120
                              : animIdx === 4
                                ? 100
                                : 180,
                    y:
                      animIdx === 0
                        ? 30
                        : animIdx === 1
                          ? -100
                          : animIdx === 2
                            ? 30
                            : animIdx === 3
                              ? 100
                              : animIdx === 4
                                ? -50
                                : 80,
                    rotate:
                      animIdx === 0
                        ? -8
                        : animIdx === 1
                          ? 6
                          : animIdx === 2
                            ? 10
                            : animIdx === 3
                              ? -5
                              : animIdx === 4
                                ? 8
                                : -7,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: (index % 3) * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`rounded-xl border border-slate-100 p-5 shadow-sm ${bgClass}`}
                >
                  {/* Quote Review Text */}
                  <p className="min-h-[90px] text-sm leading-5 text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author Information */}
                  <div className="mt-5 flex items-center gap-3">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.author_name}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary-dark">
                        {authorInitial}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-bold text-slate-800">
                        {testimonial.author_name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;
