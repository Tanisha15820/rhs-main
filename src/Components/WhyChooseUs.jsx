import React from "react";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import healthcareImage from "../assets/images/why1.jpeg";
import familyImage from "../assets/images/why2.jpeg";
import doctorImage from "../assets/images/choose3.png";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Premium Quality",
      description:
        "We provide high-quality, durable, and clinically proven healthcare products.",
      icon: VerifiedUserOutlinedIcon,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Trusted & Reliable",
      description:
        "Our products are trusted by healthcare professionals and thousands of customers.",
      icon: WorkspacePremiumOutlinedIcon,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      title: "Care You Can Count On",
      description:
        "We are dedicated to your health and satisfaction at every step.",
      icon: VolunteerActivismOutlinedIcon,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Expert Support",
      description:
        "Our team is always ready to assist you with the best solutions.",
      icon: SupportAgentOutlinedIcon,
      iconBg: "bg-pink-50",
      iconColor: "text-pink-500",
    },
    {
      title: "Fast & Safe Delivery",
      description:
        "Timely and secure delivery ensuring your products reach you safely.",
      icon: LocalShippingOutlinedIcon,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Affordable Pricing",
      description:
        "Quality healthcare products at competitive and transparent prices.",
      icon: LocalOfferOutlinedIcon,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-20">
      {/* =========================
          Background Decorations
      ========================== */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-50/40 blur-3xl" />

      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-50/50 blur-3xl" />

      {/* =========================
          Main Content
      ========================== */}
      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Main Layout */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* =========================
              LEFT SIDE
          ========================== */}
          <div>
            {/* Small Heading */}
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-7 bg-primary" />

              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why Choose Us
              </span>

              <span className="h-px w-7 bg-primary" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Reinforce Healthcare
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#7C879C]">
              We are committed to delivering exceptional healthcare products
              that enhance well-being and improve lives. Here's what sets us
              apart.
            </p>

            {/* =========================
                FEATURE CARDS
            ========================== */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      rounded-xl
                      border
                      border-gray-100
                      bg-white
                      px-4
                      py-5
                      text-center
                      shadow-[0_5px_25px_rgba(20,40,80,0.06)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_10px_30px_rgba(20,40,80,0.10)]
                    "
                  >
                    {/* Icon */}
                    <div
                      className={`
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        ${feature.iconBg}
                      `}
                    >
                      <Icon
                        className={feature.iconColor}
                        sx={{ fontSize: 25 }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-sm font-bold text-gray-700">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-5 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div className="relative mx-auto h-[420px] w-full max-w-[540px] sm:h-[500px]">
            {/* =========================
                TOP IMAGE
            ========================== */}
            <div
              className="
                absolute
                -top-5
                right-0
                z-20
                h-[200px]
                w-[175px]
                animate-float-y
                overflow-hidden
                rounded-[25px]
                shadow-lg
                sm:h-[250px]
                sm:w-[230px]
              "
            >
              <img
                src={healthcareImage}
                alt="Healthcare"
                className="h-full w-full object-cover"
              />
            </div>

            {/* =========================
                CENTER IMAGE
            ========================== */}
            <div
              className="
                absolute
                left-4
                top-[135px]
                z-30
                h-[200px]
                w-[175px]
                overflow-hidden
                rounded-[25px]
                shadow-xl
                sm:top-[175px]
                sm:h-[250px]
                sm:w-[230px]
              "
            >
              <img
                src={familyImage}
                alt="Family healthcare"
                className="h-full w-full animate-zoom-slow object-cover"
              />
            </div>

            {/* =========================
                BOTTOM IMAGE
            ========================== */}
            <div
              className="
                absolute
                bottom-0
                right-0
                z-20
                h-[200px]
                w-[175px]
                animate-sway-x
                overflow-hidden
                rounded-[25px]
                shadow-lg
                sm:h-[250px]
                sm:w-[230px]
              "
            >
              <img
                src={doctorImage}
                alt="Doctor helping patient"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;