import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicProducts } from "../services/productService";
import { getThemeStyles } from "../utils/machineStorage";

const PRODUCT_LINK_MAP = {
  // SmartXide Trio
  "smartxide² unique trio": "/smartxide",
  "smartxide unique trio": "/smartxide",
  "smartxide2 unique trio": "/smartxide",
  "smartxide": "/smartxide",

  // SmartXide Touch SurgiCO
  "smartxide touch surgico": "/smartxide-touch",
  "smartxide touch": "/smartxide-touch",

  // Raykeen
  "raykeen": "/raykeen-morcellator",
  "raykeen morcellator": "/raykeen-morcellator",
  "raykeen morcellator system": "/raykeen-morcellator",

  // Multimed
  "multimed": "/multimed",

  // RZ Slim Laser / Morcescope
  "rz slim laser enucleation system": "/morcescope",
  "morcescope": "/morcescope",
  "rz morcescope": "/morcescope",

  // Bladder Scanner
  "bladder scanner": "/bladder-scanner-details",
  "scanner bladder": "/bladder-scanner-details",
  "mmt bladder scanner": "/bladder-scanner-details",

  // Lasers
  "dk 30 watt": "/dk30watt",
  "dk 30": "/dk30watt",
  "litho 35 watt": "/litho35watt",
  "litho evo 35 watt": "/lithoevo35watt",
  "litho evo": "/lithoevo35watt",
  "cyber ho 100 watt": "/cyberho100watt",
  "cyber ho 150 watt": "/cyberho150watt",
  "cyber ho magneto family": "/cyber-ho-magneto-family",
  "cyber tm 150 watt": "/cyber-tm-150",
  "cyber tm 200 watt": "/cyber-tm-200",
  "fiber dust 60 watt": "/fiber-dust-60",
  "vikrant - 30/45/70 watt": "/vikrant-tfl",
  "vikrant": "/vikrant-tfl",

  // Lithotripsy / ESWL
  "vibrolith": "/vibrolith",
  "vibrolith plus": "/vibrolith-plus",
  "vibrolith ortho": "/vibrolith-ortho",

  // Endoscopy / Morcellator / Robotic
  "cystoscopy": "/cystoscopy",
  "rz medizintechnik cystoscopy": "/cystoscopy",
  "cyber blade": "/cyber-blade",
  "cyber blade™ morcellator": "/cyber-blade",
  "roboflex avicenna": "/avicenna",
  "avicenna": "/avicenna",

  // Urodynamics
  "uromic harmony": "/harmony",
  "harmony": "/harmony",
  "uromic melody": "/melody",
  "melody": "/melody",
  "uromic symphony": "/symphony",
  "symphony": "/symphony",
  "danflow wave": "/danflow-wave",
  "danflow cord": "/danflow-cord",
  "trytable patient couch": "/patient-couch-details",
  "patient couch": "/patient-couch-details",

  // Scopes & Sheaths
  "huv01": "/huv01",
  "huv02": "/huv02",
  "reusable ureterorenoscope": "/reusable-ureterorenoscope",
  "disposable hu30m 6.3/6 fr": "/disposable-hu30m-6-3fr",
  "disposable hu30m 7.5 fr": "/disposable-hu30m-7-5fr",
  "disposable cystoscope": "/disposable-cystoscope",
  "cystoscope": "/disposable-cystoscope",
  "access sheath": "/access-sheath",
};

const getProductLink = (product) => {
  if (product.link) return product.link;
  if (product.path) return product.path;

  const normalized = (product.name || "").toLowerCase().trim();
  if (normalized && PRODUCT_LINK_MAP[normalized]) {
    return PRODUCT_LINK_MAP[normalized];
  }

  for (const [key, link] of Object.entries(PRODUCT_LINK_MAP)) {
    if (normalized && (normalized.includes(key) || key.includes(normalized))) {
      return link;
    }
  }

  return "/products";
};

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend GET /api/products
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchPublicProducts()
      .then((data) => {
        if (isMounted) {
          setProductsData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to fetch public products:", err);
          setError(err.message || "Unable to load healthcare products");
          setProductsData([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const products = productsData.map((item) => {
    const theme = getThemeStyles(item.color_palette);
    return {
      ...item,
      link: getProductLink(item),
      image: item.image_url || item.image || "",
      bg: theme.bg || "bg-[#EEF5FF]",
      iconBg: theme.iconBg || "bg-[#D9E8FF]",
      iconColor: theme.iconColor || "text-[#4285E8]",
      lineColor: theme.lineColor || "bg-[#4285E8]",
    };
  });

  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3);
      } else {
        setItemsToShow(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = Math.max(0, products.length - itemsToShow);

  const nextSlide = () => {
    if (products.length <= itemsToShow) return;
    setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (products.length <= itemsToShow) return;
    setStartIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  };

  useEffect(() => {
    if (products.length <= itemsToShow) {
      setStartIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [products.length, maxStartIndex, itemsToShow]);

  const visibleProducts =
    products.length <= itemsToShow
      ? products
      : products.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="relative overflow-hidden bg-[#F9FBFF] py-16 sm:py-20">
      {/* Background Decorations */}
      <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#E9E6FF]/70 blur-2xl" />
      <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#E7F5FF]/80 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#E8F8F5] blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#20B7AE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#20AFA7]">
              Our Products
            </span>
            <span className="h-px w-7 bg-[#20B7AE]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Healthcare{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Products
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7C879C]">
            High quality medical products and equipment for
            <br className="hidden sm:block" />
            better care, safety and reliability.
          </p>
        </div>

        {/* Loading state skeleton */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full py-4">
            {[...Array(itemsToShow)].map((_, i) => (
              <div
                key={i}
                className={`shrink-0 rounded-2xl border border-white/90 bg-white/60 animate-pulse ${
                  i === Math.floor(itemsToShow / 2)
                    ? "w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] min-w-[205px] h-[330px]"
                    : "hidden sm:block sm:w-[25%] md:w-[20%] lg:w-[18.5%] min-w-[160px] h-[285px]"
                }`}
              >
                <div className="flex h-full flex-col items-center justify-center p-6 space-y-4">
                  <div className="h-28 w-28 rounded-full bg-slate-200/60" />
                  <div className="h-4 w-3/4 rounded-md bg-slate-200/60" />
                  <div className="h-3 w-1/2 rounded-md bg-slate-200/40" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xs p-6 text-center shadow-xs">
            <p className="text-sm font-semibold text-slate-700">
              Unable to load healthcare products
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Please check back shortly or explore our specialty categories.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && products.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xs p-6 text-center shadow-xs">
            <p className="text-sm font-semibold text-slate-700">
              No healthcare products currently available
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Our catalog is being updated with the latest clinical equipment.
            </p>
          </div>
        )}

        {/* Carousel */}
        {!isLoading && !error && products.length > 0 && (
          <div className="relative">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={products.length <= itemsToShow || startIndex === 0}
              className="absolute -left-2 top-1/2 z-30 flex h-9 w-9
                -translate-y-1/2 items-center justify-center rounded-full
                border border-[#E3EAF5] bg-white text-[#16A7B0]
                shadow-sm transition-all duration-300
                hover:-translate-x-1 hover:shadow-md
                disabled:cursor-not-allowed disabled:opacity-40
                sm:-left-5 cursor-pointer"
            >
              <span className="text-xl leading-none">‹</span>
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={
                products.length <= itemsToShow || startIndex >= maxStartIndex
              }
              className="absolute -right-2 top-1/2 z-30 flex h-9 w-9
                -translate-y-1/2 items-center justify-center rounded-full
                border border-[#E3EAF5] bg-white text-[#16A7B0]
                shadow-sm transition-all duration-300
                hover:translate-x-1 hover:shadow-md
                disabled:cursor-not-allowed disabled:opacity-40
                sm:-right-5 cursor-pointer"
            >
              <span className="text-xl leading-none">›</span>
            </button>

            {/* Cards */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full">
              {visibleProducts.map((product, index) => {
                const isCenter =
                  itemsToShow === 1
                    ? true
                    : itemsToShow === 3
                    ? index === 1
                    : index === 2;
                const link = getProductLink(product);

                return (
                  <Link
                    key={`${product.id || product.name}-${startIndex}-${index}`}
                    to={link}
                    onClick={() =>
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                    }
                    className={`
                      group relative shrink-0 overflow-hidden rounded-2xl
                      border border-white/90 block cursor-pointer
                      ${product.bg}

                      ${
                        isCenter
                          ? "w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] min-w-[205px] h-[330px] -translate-y-2 shadow-[0_18px_45px_rgba(55,75,110,0.15)]"
                          : "hidden sm:block sm:w-[25%] md:w-[20%] lg:w-[18.5%] min-w-[160px] h-[285px] shadow-[0_8px_30px_rgba(55,75,110,0.07)]"
                      }

                      transition-all duration-500 ease-out
                      hover:-translate-y-2.5
                      hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]
                    `}
                  >
                    {/* Soft Decorative Circle */}
                    <div
                      className={`
                        absolute left-1/2 top-8 -translate-x-1/2
                        rounded-full opacity-50 blur-[1px]
                        ${product.iconBg}
                        ${isCenter ? "h-40 w-40" : "h-32 w-32"}
                      `}
                    />

                    {/* Image */}
                    <div
                      className={`
                        relative flex items-center justify-center
                        ${isCenter ? "h-[220px]" : "h-[185px]"}
                      `}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`
                            relative z-10 object-contain
                            transition-transform duration-500
                            group-hover:scale-105
                            ${
                              isCenter
                                ? "max-h-[190px] max-w-[88%]"
                                : "max-h-[160px] max-w-[85%]"
                            }
                          `}
                        />
                      ) : (
                        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white/40 text-slate-400">
                          <span className="text-xs font-semibold">RHS</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-10 px-3 pb-3 text-center">
                      <h3
                        className={`
                          mt-1 font-semibold text-[#253653] transition-colors duration-200 group-hover:text-primary
                          ${isCenter ? "text-sm" : "text-[11px] sm:text-xs"}
                        `}
                      >
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span>View Details</span>
                        <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Carousel Indicators */}
        {!isLoading && !error && products.length > itemsToShow && (
          <div className="mt-7 flex justify-center gap-2">
            {products
              .slice(0, products.length - (itemsToShow - 1))
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStartIndex(index)}
                  className={`
                  h-1.5 rounded-full transition-all duration-300 cursor-pointer
                  ${
                    startIndex === index
                      ? "w-5 bg-[#20B7AE]"
                      : "w-1.5 bg-[#CBD5E1]"
                  }
                `}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
