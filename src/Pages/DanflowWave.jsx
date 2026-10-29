import React from "react";

import { motion } from "framer-motion";

import {

  ArrowRight,

  ArrowLeft,

  CheckCircle,

  Wifi,

  BatteryCharging,

  FileText,

  Layers,

  Database,

  ShieldCheck,

  Activity,

  Sliders,

  Sparkles,

} from "lucide-react";

import { Link } from "react-router-dom";

import SEO from "../Components/SEO";

import bannerBg from "../assets/images/smartxide_banner.png";

import machineImage from "../assets/images/wave.png";
import wave1 from "../assets/images/wave1.png";
import wave2 from "../assets/images/wave2.png";
import wave3 from "../assets/images/wave3.png";
import wave4 from "../assets/images/wave4.png";

import printerImg from "../assets/images/danflow_thermal_printer.jpg";

import transducerImg from "../assets/images/danflow_transducer_funnel.jpg";

import standImg from "../assets/images/danflow_stands_commode.jpg";

import caseImg from "../assets/images/danflow_case_portable.jpg";

import ProductInquireCTA from "../Components/Common/ProductInquireCTA";

import DanflowWaveMachine from "../Components/DanflowWave/DanflowWaveMachine";



/* Desktop Feature Card */

const FeatureCard = ({ number, type, title, description, image, position }) => {

  return (

    <div

      className={`absolute hidden xl:block w-[300px] h-[130px] rounded-[22px] border border-white bg-white/95 shadow-[0_12px_35px_rgba(70,130,190,0.16)] backdrop-blur-md ${position}`}

    >

      {/* Primary Blue Number Tab */}

      <div className="absolute left-0 top-0 z-20 flex h-[44px] w-[58px] items-center justify-center rounded-br-[22px] rounded-tl-[22px] bg-primary">

        <span className="text-lg font-bold text-white">{number}</span>

      </div>



      <div className="absolute left-0 top-[42px] h-[65px] w-[1px] bg-primary"></div>

      <div className="flex h-full items-center gap-3 px-3 py-2 pl-4">

        {/* Circular Image */}

        <div className="relative ml-8 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-sm overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full object-contain rounded-full"

          />

        </div>



        {/* Card Content */}

        <div className="min-w-0 flex-1 pr-2">

          {type && (

            <span className="text-[10px] font-bold uppercase tracking-wide text-primary">

              {type}

            </span>

          )}

          <h4 className="text-[13px] font-bold text-slate-800 leading-tight">

            {title}

          </h4>

          <p className="mt-1 text-[11px] leading-[15px] text-slate-500 line-clamp-2">

            {description}

          </p>

        </div>

      </div>

    </div>

  );

};



/* Mobile Feature Card */

const MobileFeatureCard = ({ number, type, title, description, image }) => {

  return (

    <div className="relative min-h-[95px] overflow-hidden rounded-2xl border border-white bg-white/95 p-3 shadow-[0_10px_30px_rgba(70,130,190,0.12)] backdrop-blur-md">

      <div className="absolute left-0 top-0 flex h-8 w-[45px] items-center justify-center rounded-br-2xl rounded-tl-2xl bg-primary">

        <span className="text-sm font-bold text-white">{number}</span>

      </div>



      <div className="flex items-center gap-3 pt-1 pl-8">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full object-contain rounded-full"

          />

        </div>



        <div className="min-w-0 flex-1">

          {type && (

            <span className="text-[9px] font-bold uppercase text-primary">

              {type}

            </span>

          )}

          <h4 className="text-xs font-bold text-slate-800">{title}</h4>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500 line-clamp-2">

            {description}

          </p>

        </div>

      </div>

    </div>

  );

};



const DanflowWave = () => {

  const highlights = [

    {

      title: "Weight Cell Transducer",

      desc: "High precision weight cell transducer transforms urine flow into clear graphical format with stats like Qmax, Qavg, voided volume, and flow time.",

      icon: Activity,

    },

    {

      title: "866 / 915 MHz Wireless Link",

      desc: "Massively improved range up to 50 meters. Walls and doors are not an obstacle, eliminating signal dropout without relying on fragile Bluetooth.",

      icon: Wifi,

    },

    {

      title: "Incredible 2-Year Battery",

      desc: "Up to 2 years between battery replacements. No regular daily charging needed, ensuring zero clinic disruptions caused by flat batteries.",

      icon: BatteryCharging,

    },

    {

      title: "Automatic SD Card Storage",

      desc: "Inbuilt SD card automatically captures all examinations. Cards can be plugged into any PC for record archiving or processing.",

      icon: Database,

    },

    {

      title: "Thermal Printer Integration",

      desc: "Ultra-compact wireless thermal printer produces instant diagnostic printouts and nomograms directly beside patient or doctor desk.",

      icon: FileText,

    },

    {

      title: "Hygienic Hospital Grade",

      desc: "Easy-to-clean design with reusable 95°C heat resistant or disposable paper funnels and autoclavable stainless steel containers.",

      icon: ShieldCheck,

    },

  ];



  const models = [

    {

      name: "DanFlow 1100 (Wireless)",

      tagline: "Urine flow rate system for the busy Urodynamic department",

      features: [

        "Weight transducer with wireless thermal printer",

        "866 / 915 MHz frequency for extended range & reliability",

        "Patient privacy: examine in adjoining rooms through walls",

        "Automatic data backup onto inbuilt SD memory card",

        "Battery life up to 2 years without daily recharging",

        "Available with height-adjustable DanFlow / Economy stands",

      ],

      badge: "Wireless Standalone",

    },

    {

      name: "DanFlow 1000 (Wired)",

      tagline: "Compact, robust cable connection for standard clinic spaces",

      features: [

        "Reliable cable connection between weight transducer & thermal printer",

        "Immediate auto-printing of flow rate & volume curves",

        "Same high-precision weight transducer technology",

        "SD card data storage for digital archive on PC",

        "Ideal for dedicated single-room urology clinics",

        "Full compatibility with all MMT stands & commodes",

      ],

      badge: "Classic Cabled",

    },

    {

      name: "DanFlow 3000 Plus (Advanced Wireless)",

      tagline: "Wireless PC, Laptop & Tablet integration with rich software",

      features: [

        "Wireless connection at 866/915 MHz or Bluetooth for Windows",

        "Tablet/portable version with rugged travel carrying case",

        "Advanced software: patient database, real-time flow curves, nomograms",

        "Auto/manual flow detection, sound and light signalization",

        "Automatic PDF protocol generation and remote service support",

        "ICS standard compliant urodynamic evaluation methods",

      ],

      badge: "Wireless PC / Tablet",

    },

  ];



  const accessories = [

    {

      name: "Height-Adjustable Stands",

      desc: "DanFlow type and Economy type stands with smooth castor wheels, designed to slide effortlessly under commodes for female and pediatric examinations.",

      img: standImg,

    },

    {

      name: "Thermal Printer & Wall Holders",

      desc: "Compact printer unit with wall-mount bracket for clean cable-free urology suites, delivering rapid graphical prints of flow velocity and volume.",

      img: printerImg,

    },

    {

      name: "Transducers & Graduated Beakers",

      desc: "Precision weight cell base with 1,000 ml single-use plastic or 1,500 ml sterilizable stainless steel measuring containers with clear graduation scales.",

      img: transducerImg,

    },

    {

      name: "Portable Travel Case",

      desc: "'All-in-case' rugged portable kit allowing uroflowmetry teams to travel effortlessly between clinics, satellite hospitals, and consultation rooms.",

      img: caseImg,

    },

  ];



  return (

    <div className="bg-white">

      <SEO

        title="DanFlow Wave - Wireless Uroflowmetry System | MMT Medkonsult | Reinforce Healthcare Services"

        description="MMT DanFlow Wave wireless urine flow meter. Features 866/915 MHz long-range wireless, up to 2-year battery life, automatic SD storage, thermal printing, and ICS compliance."

        keywords="DanFlow Wave, Danflow 1100, Danflow 3000, MMT Danflow, wireless uroflowmeter, uroflowmetry machine rental, urodynamics flow meter"

        canonical="/danflow-wave"

      />



      {/* 1st Section: Product Banner */}

      <section className="relative min-h-[500px] overflow-hidden bg-background sm:min-h-[600px] lg:min-h-[680px]">

        {/* Background Image */}

        <div className="absolute inset-0 z-0">

          <img

            src={bannerBg}

            alt="DanFlow Wave Background"

            className="h-full w-full object-cover"

          />

        </div>

        <div className="absolute inset-0 z-[1] bg-white/10 backdrop-blur-[0.5px]"></div>



        {/* Main Content */}

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Header */}

          <div className="pt-6 text-center sm:pt-8 lg:pt-12">

            <div className="mb-3 flex items-center justify-center gap-4">

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

              <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary sm:text-sm">

                URODYNAMIC SYSTEMS & UROFLOWMETERS

              </span>

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

            </div>



            <h1 className="text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl md:text-5xl">

              DanFlow{" "}

              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                Wave

              </span>

            </h1>



            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 lg:text-base">

              Wireless uroflowmetry with unique 866/915 MHz gold-standard transmission.

              <br className="hidden sm:block" />

              Feel the flow: reliable patient testing, up to 2 years battery life, and zero signal dropouts.

            </p>

          </div>



          {/* Product Area */}

          <div className="relative mx-auto mt-2 max-w-[1200px] sm:mt-4">

            {/* Desktop Feature Cards */}

            <FeatureCard

              number="01"

              type="MAIN TRANSDUCER UNIT"

              title="Weight-Cell Transducer Unit"

              description="Compact wireless weighing platform accurately records real-time Qmax, Qavg, and voided volume."

              image={wave1}

              position="left-28 top-16"

            />

            <FeatureCard

              number="02"

              type="WIRELESS CONNECTIVITY"

              title="USB Wireless Receiver Dongle"

              description="866 / 915 MHz plug-and-play USB transceiver provides up to 50m through-wall wireless range."

              image={wave2}

              position="bottom-14 left-28"

            />

            <FeatureCard

              number="03"

              type="STATUS INDICATOR"

              title="Optical LED Status Indicator"

              description="Front-mounted status LED provides instant visual confirmation of power, link, and flow recording."

              image={wave3}

              position="top-16 right-28"

            />

            <FeatureCard

              number="04"

              type="POWER & STORAGE"

              title="Battery & SD Storage Module"

              description="Water-resistant base houses a 2-year battery module and internal SD card for automatic backup."

              image={wave4}

              position="bottom-14 right-28"

            />



            {/* Desktop Connective Arrows */}

            <div className="absolute left-[414px] top-[100px] hidden items-center xl:flex">

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />

            </div>

            <div className="absolute bottom-[90px] left-[414px] hidden items-center xl:flex">

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />

            </div>

            <div className="absolute top-[100px] right-[414px] hidden items-center xl:flex">

              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

            </div>

            <div className="absolute bottom-[90px] right-[414px] hidden items-center xl:flex">

              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

            </div>



            {/* Central Machine - Desktop */}

            <div className="relative mx-auto hidden h-[400px] w-full max-w-[500px] items-end justify-center sm:h-[440px] lg:flex lg:h-[490px]">

              <div className="absolute bottom-10 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>

              <motion.img

                src={machineImage}

                alt="MMT DanFlow Wave Uroflowmeter"

                className="relative z-10 h-[380px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(25,168,232,0.22)] lg:h-[460px] rounded-2xl"

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.8, ease: "easeOut" }}

              />

            </div>



            {/* Central Machine - Mobile */}

            <div className="relative mx-auto flex h-auto w-full max-w-[280px] items-end justify-center pb-4 lg:hidden">

              <div className="absolute bottom-6 left-1/2 h-24 w-44 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl"></div>

              <motion.img

                src={machineImage}

                alt="MMT DanFlow Wave Uroflowmeter"

                className="relative z-10 h-[260px] w-auto object-contain drop-shadow-[0_15px_20px_rgba(25,168,232,0.2)] rounded-xl"

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.8, ease: "easeOut" }}

              />

            </div>



            {/* Mobile Feature Cards */}

            <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-2.5 px-2 pb-6 sm:px-4 xl:hidden">

              <MobileFeatureCard

                number="01"

                type="MAIN TRANSDUCER UNIT"

                title="Weight-Cell Transducer Unit"

                description="Compact wireless weighing platform accurately records real-time Qmax, Qavg, and voided volume."

                image={wave1}

              />

              <MobileFeatureCard

                number="02"

                type="WIRELESS CONNECTIVITY"

                title="USB Wireless Receiver Dongle"

                description="866 / 915 MHz plug-and-play USB transceiver provides up to 50m through-wall wireless range."

                image={wave2}

              />

              <MobileFeatureCard

                number="03"

                type="STATUS INDICATOR"

                title="Optical LED Status Indicator"

                description="Front-mounted status LED provides instant visual confirmation of power, link, and flow recording."

                image={wave3}

              />

              <MobileFeatureCard

                number="04"

                type="POWER & STORAGE"

                title="Battery & SD Storage Module"

                description="Water-resistant base houses a 2-year battery module and internal SD card for automatic backup."

                image={wave4}

              />

            </div>

          </div>

        </div>

      </section>



      {/* Highlights Overview */}

      <section className="bg-slate-50 py-16 md:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              MMT MEDKONSULT TECHNOLOGY

            </span>

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1">

              Feel The Flow — Urodynamics Made Easy

            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">

              Uroflowmetry is one of the simplest forms of urodynamic testing. With DanFlow, MMT has transformed testing through durable weight cell transducers and hospital-certified ergonomics.

            </p>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {highlights.map((item, idx) => {

              const IconComponent = item.icon;

              return (

                <div

                  key={idx}

                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"

                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary mb-4">

                    <IconComponent className="h-6 w-6" />

                  </div>

                  <h3 className="text-base font-bold text-slate-800 mb-2">

                    {item.title}

                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">

                    {item.desc}

                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>



      <DanflowWaveMachine />



      {/* Wireless DanFlow Configurations */}

      <section className="bg-white py-16 md:py-20 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              PORTFOLIO CONFIGURATIONS

            </span>

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1">

              DanFlow Family Solutions

            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">

              Designed to meet different workflow demands of urology clinics, private practices, and high-throughput tertiary hospitals.

            </p>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {models.map((mod, i) => (

              <div

                key={i}

                className="relative rounded-2xl bg-gradient-to-b from-[#F9FBFE] to-white p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col justify-between"

              >

                <div>

                  <div className="inline-block rounded-full bg-blue-100/70 px-3 py-1 text-[11px] font-bold text-primary mb-3">

                    {mod.badge}

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">

                    {mod.name}

                  </h3>

                  <p className="text-xs text-slate-500 mb-6 italic">

                    {mod.tagline}

                  </p>



                  <div className="space-y-3">

                    {mod.features.map((feat, fIdx) => (

                      <div key={fIdx} className="flex items-start gap-2.5">

                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />

                        <span className="text-xs sm:text-sm text-slate-700">

                          {feat}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>



                <div className="mt-8 pt-4 border-t border-slate-100">

                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">

                    <span>ICS Compliant</span>

                    <span>CE & ISO Certified</span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* Accessories Section */}

      <section className="bg-slate-50 py-16 md:py-20 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              ACCESSORIES & ERGONOMICS

            </span>

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1">

              Engineered for Clinical Sterile Environments

            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">

              MMT accessories for uroflowmetry meet the high demands of sterile hospital wards and provide comfortable handling during patient examination.

            </p>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {accessories.map((acc, index) => (

              <div

                key={index}

                className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition"

              >

                <div className="h-44 w-full bg-slate-100 overflow-hidden">

                  <img

                    src={acc.img}

                    alt={acc.name}

                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"

                  />

                </div>

                <div className="p-5">

                  <h4 className="text-base font-bold text-slate-800 mb-2">

                    {acc.name}

                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">

                    {acc.desc}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* Technical Specifications Matrix */}

      <section className="bg-white py-16 md:py-20 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl">

              Specification Matrix

            </h2>

            <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">

              Comparing DanFlow features across models according to ICS standards.

            </p>

          </div>



          <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-sm w-full">

            <table className="w-full text-left text-xs sm:text-sm">

              <thead className="bg-[#F0F7FD] text-slate-700 uppercase font-semibold text-[11px]">

                <tr>

                  <th className="py-3 px-4 border-b border-blue-100">Feature</th>

                  <th className="py-3 px-4 border-b border-blue-100 text-center">DanFlow 1000</th>

                  <th className="py-3 px-4 border-b border-blue-100 text-center">DanFlow 1100 (Wave)</th>

                  <th className="py-3 px-4 border-b border-blue-100 text-center">DanFlow 3000 Plus</th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-600">

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Connection Mode</td>

                  <td className="py-3 px-4 text-center">Wired Cable</td>

                  <td className="py-3 px-4 text-center font-semibold text-primary">Wireless 866/915 MHz</td>

                  <td className="py-3 px-4 text-center font-semibold text-primary">Wireless RF / BT</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Transducer Technology</td>

                  <td className="py-3 px-4 text-center">Weight Cell</td>

                  <td className="py-3 px-4 text-center">Weight Cell</td>

                  <td className="py-3 px-4 text-center">Weight Cell</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Thermal Printer</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Standard</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Standard (Wireless)</td>

                  <td className="py-3 px-4 text-center text-slate-400">PC Printer / Option</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">SD Card Storage</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Standard</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Standard</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Digital Storage</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Patient Database & Nomograms</td>

                  <td className="py-3 px-4 text-center text-slate-400">—</td>

                  <td className="py-3 px-4 text-center text-slate-400">—</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Standard SW</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Battery Performance</td>

                  <td className="py-3 px-4 text-center text-slate-600">Standard</td>

                  <td className="py-3 px-4 text-center font-bold text-primary">Up to 2 Years</td>

                  <td className="py-3 px-4 text-center font-bold text-primary">Up to 2 Years</td>

                </tr>

                <tr>

                  <td className="py-3 px-4 font-medium text-slate-800">Height-Adjustable Stand & Commode</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Compatible</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Compatible</td>

                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Compatible</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>



      {/* Inquiry & Rental CTA */}

      <ProductInquireCTA

        productName="DanFlow Wave Wireless Uroflowmetry System"

        productImage={machineImage}

        subtitle="MMT DanFlow Wave with 866/915 MHz wireless transducer, thermal printer, height adjustable stand and clinical disposables. Available for rental or purchase."

      />

    </div>

  );

};



export default DanflowWave;
