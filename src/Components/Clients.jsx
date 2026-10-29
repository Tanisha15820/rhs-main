import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchPublicClients } from "../services/clientService";
import {
  getBgClassFromTheme,
  clearLegacyClientsStorage,
} from "../utils/clientStorage";

// =========================
// Client Card
// =========================
const ClientCard = ({ client }) => {
  const logo = client.logo_url;
  const accentClass = getBgClassFromTheme(client.bg_theme);
  const clientInitial = (client.name || "C").trim().charAt(0).toUpperCase();

  return (
    <div
      title={client.name}
      className={`
        group
        flex
        h-[140px]
        min-w-[260px]
        shrink-0
        items-center
        justify-center
        border-b
        border-[#E2ECF5]
        px-5
        ${accentClass}

        sm:h-[200px]
        sm:w-[250px]
        sm:min-w-[250px]

        md:h-[200px]
        md:w-[260px]
        md:min-w-[260px]
      `}
    >
      <div className="flex h-full w-full items-center justify-center">
        {logo ? (
          <img
            src={logo}
            alt={`${client.name || "Client"} logo`}
            loading="lazy"
            className="
              max-h-[100px]
              max-w-[165px]
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105

              sm:max-h-[80px]
              sm:max-w-[175px]

              md:max-h-[85px]
              md:max-w-[185px]
            "
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 shadow-xs">
            <span className="text-xl font-bold text-primary">
              {clientInitial}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================
// Clients Component
// =========================
function Clients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const isHovered = useRef(false);

  // =========================
  // Load Active Clients from API
  // =========================
  const loadClients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPublicClients();
      setClients(data);
    } catch (err) {
      console.error("Error loading public clients:", err);
      setError("Unable to load client partners at this moment.");
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Purge legacy mock clients from localStorage if present
    clearLegacyClientsStorage();

    loadClients();

    // In-browser sync with Admin Panel if modified in same browser session
    const handleUpdate = () => {
      loadClients();
    };

    window.addEventListener("rhs_clients_updated", handleUpdate);
    return () => {
      window.removeEventListener("rhs_clients_updated", handleUpdate);
    };
  }, [loadClients]);

  // =========================
  // Sort Clients by display_order
  // =========================
  const sortedClients = [...clients].sort((a, b) => {
    const orderA = typeof a.display_order === "number" ? a.display_order : 0;
    const orderB = typeof b.display_order === "number" ? b.display_order : 0;
    return orderA - orderB;
  });

  // =========================
  // Automatic Scrolling
  // =========================
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || sortedClients.length <= 1) {
      return;
    }

    let lastTime = performance.now();
    const speed = 35;

    const autoScroll = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Only autoscroll if content overflows the container
      if (slider.scrollWidth > slider.clientWidth) {
        if (!isHovered.current) {
          slider.scrollLeft += (speed * deltaTime) / 1000;
        }

        // Return to beginning after reaching the end
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 5
        ) {
          slider.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sortedClients.length]);

  // =========================
  // Manual Scroll
  // =========================
  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F9FBFF]
        py-14
        sm:py-16
        lg:py-20
      "
    >
      {/* =========================
          Main Content
      ========================== */}
      <div
        className="
          relative
          z-10
          w-full
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =========================
            Section Heading
        ========================== */}
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#20B7AE]" />

            <span className="text-xs font-bold uppercase tracking-wider text-[#20AFA7]">
              Our Clients
            </span>

            <span className="h-px w-7 bg-[#20B7AE]" />
          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Trusted by Leading{" "}
            <span
              className="
                bg-gradient-to-r
                from-primary
                to-primary-dark
                bg-clip-text
                text-transparent
              "
            >
              Healthcare Brands
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-6
              text-[#7C879C]
            "
          >
            We are proud to partner with renowned
            hospitals, clinics, and healthcare
            organizations that trust our products
            and solutions for better care and
            outcomes.
          </p>
        </div>

        {/* =========================
            Loading State
        ========================== */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <CircularProgress size={32} className="text-primary" />
            <p className="mt-3 text-xs font-medium text-slate-500">
              Loading client partners...
            </p>
          </div>
        )}

        {/* =========================
            Error State
        ========================== */}
        {!isLoading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <p className="text-xs font-medium text-slate-500">{error}</p>
          </div>
        )}

        {/* =========================
            Empty State
        ========================== */}
        {!isLoading && !error && sortedClients.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center">
            <p className="text-xs font-medium text-slate-500">
              No client partners available at this moment.
            </p>
          </div>
        )}

        {/* =========================
            Client Carousel
        ========================== */}
        {!isLoading && !error && sortedClients.length > 0 && (
          <div className="relative w-full">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous clients"
              className="
                absolute
                -left-4
                top-1/2
                z-20
                hidden
                h-11
                w-11
                -translate-y-1/2
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-[#DCE7F1]
                bg-white
                text-[#1684D8]
                shadow-md
                transition-all
                duration-200
                hover:-translate-x-1
                hover:shadow-lg
                lg:flex
                xl:-left-6
              "
            >
              <ChevronLeft
                size={21}
                strokeWidth={2}
              />
            </button>

            {/* =========================
                Client Cards
            ========================== */}
            <div
              ref={sliderRef}
              onMouseEnter={() => {
                isHovered.current = true;
              }}
              onMouseLeave={() => {
                isHovered.current = false;
              }}
              className="
                flex
                flex-nowrap
                gap-5
                overflow-x-auto
                px-2
                pb-5
                scrollbar-none
              "
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {sortedClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next clients"
              className="
                absolute
                -right-4
                top-1/2
                z-20
                hidden
                h-11
                w-11
                -translate-y-1/2
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-[#DCE7F1]
                bg-white
                text-[#1684D8]
                shadow-md
                transition-all
                duration-200
                hover:translate-x-1
                hover:shadow-lg
                lg:flex
                xl:-right-6
              "
            >
              <ChevronRight
                size={21}
                strokeWidth={2}
              />
            </button>
          </div>
        )}

        {/* =========================
            Mobile Indicator
        ========================== */}
        {!isLoading && !error && sortedClients.length > 0 && (
          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
              lg:hidden
            "
          >
            <span className="h-1.5 w-8 rounded-full bg-[#20AFA7]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8E5F0]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8E5F0]" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Clients;