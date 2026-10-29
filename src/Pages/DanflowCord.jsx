import React from "react";

import { motion } from "framer-motion";

import {

  ArrowRight,

  ArrowLeft,

  CheckCircle,

  Cable,

  Laptop,

  Database,

  Layers,

  FileCheck,

  ShieldCheck,

  Activity,

  Sliders,

  Sparkles,

} from "lucide-react";

import { Link } from "react-router-dom";

import SEO from "../Components/SEO";

import bannerBg from "../assets/images/smartxide_banner.png";

import machineImage from "../assets/images/chord.png";
import cord1Img from "../assets/images/Cord1.png";
import cord2Img from "../assets/images/Cord2.png";
import cord3Img from "../assets/images/Cord3.png";
import cord4Img from "../assets/images/Cord4.png";

import transducerImg from "../assets/images/danflow_transducer_funnel.jpg";

import printerImg from "../assets/images/danflow_thermal_printer.jpg";

import standImg from "../assets/images/danflow_stands_commode.jpg";

import caseImg from "../assets/images/danflow_case_portable.jpg";

import ProductInquireCTA from "../Components/Common/ProductInquireCTA";

import DanflowCordMachine from "../Components/DanflowCord/DanflowCordMachine";



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



      {/* Blue Border Accent */}

      <div className="absolute left-0 top-[42px] h-[65px] w-[1px] bg-primary"></div>



      <div className="flex h-full items-center gap-3 px-3 py-2 pl-4">

        {/* Circular Image */}

        <div className="relative ml-8 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-sky-300 bg-sky-50 shadow-sm overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full rounded-full object-contain"

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

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-sky-300 bg-sky-50 overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full rounded-full object-contain"

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



const DanflowCord = () => {

  const highlights = [

    {

      title: "Direct Plug & Play USB Connection",

      desc: "Connects directly to any Windows PC or laptop via high-speed USB interface with zero external power supply or separate charging needed.",

      icon: Cable,

    },

    {

      title: "Pocket-Size Control Unit",

      desc: "Compact, robust palm-sized module designed for seamless desktop or pole integration in urological workstations.",

      icon: Laptop,

    },

    {

      title: "Real-Time Digital Flow Curves",

      desc: "Instantaneous, high-frequency graphical curve plotting of urine flow velocity (ml/s) and voided volume over time.",

      icon: Activity,

    },

    {

      title: "Full Patient Database & Records",

      desc: "Advanced software suite organizes complete patient profiles, previous test histories, clinical comments, and automated diagnostic reports.",

      icon: Database,

    },

    {

      title: "Multiple Nomogram Diagnostics",

      desc: "Equipped with international standardized Siroky, Liverpool, and pediatric nomograms conforming directly to ICS recommendations.",

      icon: FileCheck,

    },

    {

      title: "Sterile & Autoclavable Hardware",

      desc: "Easy-to-clean weight cell base supporting 95°C heat resistant reusable funnels, disposable paper funnels, and autoclavable steel containers.",

      icon: ShieldCheck,

    },

  ];



  const featuresList = [

    "Automatic and manual uroflowmetry test start modes",

    "Real-time flow curve with instantaneous parameter display",

    "Comprehensive patient database with search & export",

    "Integrated standard nomograms (Siroky, Liverpool, etc.)",

    "Auto-calculates Qmax, Qavg, voided volume, flow time & voiding time",

    "One-click PDF test protocol generation and network printing",

    "Post-processing editing tools for clinical artifact correction",

    "Online remote technical support and software updates",

    "Methods fully compliant with ICS guidelines",

    "USB powered: no battery to recharge or separate power adapter",

  ];



  const accessories = [

    {

      name: "Weight Cell Transducer",

      desc: "Ultra-precise load cell designed for hospital uroflowmetry, transforming urine flow directly into high accuracy digital streams.",

      img: transducerImg,

    },

    {

      name: "Height-Adjustable Stand & Commode",

      desc: "DanFlow & Economy stands with smooth gliding castors that slide effortlessly underneath clinic commodes for female and pediatric patients.",

      img: standImg,

    },

    {

      name: "Office & Network Printing",

      desc: "Connects to any clinical standard laser, inkjet, or PDF virtual printer for complete patient records and file archiving.",

      img: printerImg,

    },

    {

      name: "Rugged Portable Case",

      desc: "DanFlow 'all-in-case' travel packaging allows doctors and technicians to easily carry the system between consulting rooms and wards.",

      img: caseImg,

    },

  ];



  return (

    <div className="bg-white">

      <SEO

        title="DanFlow Cord - USB Uroflowmetry System | MMT Medkonsult | Reinforce Healthcare Services"

        description="MMT DanFlow Cord (DanFlow 2000) uroflowmeter connected via USB to PC or laptop. Features real-time flow curves, patient database, nomograms, and ICS compliance."

        keywords="DanFlow Cord, Danflow 2000, Danflow 1000, MMT Danflow, USB uroflowmeter, PC uroflowmetry, urodynamic equipment rental, urology diagnostic tools"

        canonical="/danflow-cord"

      />



      {/* 1st Section: Product Banner */}

      <section className="relative min-h-[500px] overflow-hidden bg-background sm:min-h-[600px] lg:min-h-[680px]">

        {/* Background Image */}

        <div className="absolute inset-0 z-0">

          <img

            src={bannerBg}

            alt="DanFlow Cord Background"

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

                Cord

              </span>

            </h1>



            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 lg:text-base">

              Highly reliable flow meter connected to a computer or notebook using a direct USB connection.

              <br className="hidden sm:block" />

              Pocket-sized control unit, no separate charging, with advanced software and patient database.

            </p>

          </div>



          {/* Product Area */}

          <div className="relative mx-auto mt-2 max-w-[1040px] sm:mt-4">

            {/* Desktop Feature Cards */}

            <FeatureCard
              number="01"
              type="CONTROL UNIT"
              title="Pocket-Size USB Control Unit"
              description="Compact aluminum module connects directly to any PC or laptop via USB with no external charging."
              image={cord1Img}
              position="left-4 top-16"
            />

            <FeatureCard
              number="02"
              type="SIGNAL INTERFACE"
              title="Multi-Pin Transducer Port"
              description="Industrial locking multi-pin connector ensures reliable digital signal and power transfer."
              image={cord2Img}
              position="bottom-14 left-4"
            />

            <FeatureCard
              number="03"
              type="WEIGHT CELL"
              title="Precision Weight-Cell Base"
              description="High-accuracy load-cell platform measures urine weight to compute real-time flow rate and volume."
              image={cord3Img}
              position="top-16 right-4"
            />

            <FeatureCard
              number="04"
              type="STATUS INDICATOR"
              title="Optical LED Status Light"
              description="Integrated front LED indicator provides instant visual confirmation of USB power and readiness."
              image={cord4Img}
              position="bottom-14 right-4"
            />



            {/* Desktop Connective Arrows */}

            <div className="absolute left-[315px] top-[124px] hidden items-center xl:flex">

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />

            </div>

            <div className="absolute bottom-[114px] left-[315px] hidden items-center xl:flex">

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />

            </div>

            <div className="absolute top-[124px] right-[315px] hidden items-center xl:flex">

              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

            </div>

            <div className="absolute bottom-[114px] right-[315px] hidden items-center xl:flex">

              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />

              <div className="h-[1px] w-[50px] bg-primary"></div>

              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>

            </div>



            {/* Central Machine - Desktop */}

            <div className="relative mx-auto hidden h-[400px] w-full max-w-[500px] items-end justify-center sm:h-[440px] xl:flex xl:h-[490px]">

              <div className="absolute bottom-10 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>

              <motion.img

                src={machineImage}

                alt="MMT DanFlow Cord Uroflowmeter"

                className="relative z-10 h-[380px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(25,168,232,0.22)] lg:h-[360px] -translate-y-8 rounded-2xl"

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.8, ease: "easeOut" }}

              />

            </div>



            {/* Central Machine - Mobile */}

            <div className="relative mx-auto flex h-auto w-full max-w-[280px] items-end justify-center pb-4 xl:hidden">

              <div className="absolute bottom-6 left-1/2 h-24 w-44 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl"></div>

              <motion.img

                src={machineImage}

                alt="MMT DanFlow Cord Uroflowmeter"

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
                type="CONTROL UNIT"
                title="Pocket-Size USB Control Unit"
                description="Compact aluminum module connects directly to any PC or laptop via USB with no external charging."
                image={cord1Img}
              />

              <MobileFeatureCard
                number="02"
                type="SIGNAL INTERFACE"
                title="Multi-Pin Transducer Port"
                description="Industrial locking multi-pin connector ensures reliable digital signal and power transfer."
                image={cord2Img}
              />

              <MobileFeatureCard
                number="03"
                type="WEIGHT CELL"
                title="Precision Weight-Cell Base"
                description="High-accuracy load-cell platform measures urine weight to compute real-time flow rate and volume."
                image={cord3Img}
              />

              <MobileFeatureCard
                number="04"
                type="STATUS INDICATOR"
                title="Optical LED Status Light"
                description="Integrated front LED indicator provides instant visual confirmation of USB power and readiness."
                image={cord4Img}
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

              MMT DANFLOW 2000 TECHNOLOGY

            </span>

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1">

              Seamless Computer-Based Uroflowmetry

            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">

              The DanFlow Cord connects via simple USB cable to your clinic PC or notebook, unlocking comprehensive software analytics, electronic medical records integration, and instant PDF reporting.

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



      <DanflowCordMachine />



      {/* Software Capabilities Section */}

      <section className="bg-white py-16 md:py-20 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary">

                INTELLIGENT DIAGNOSTICS

              </span>

              <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1 mb-4">

                Advanced SW Functionality for Modern Workplaces

              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">

                DanFlow Cord provides a full software diagnostic platform that conforms precisely to the International Continence Society (ICS) standards. It eliminates guesswork with automatic artifact filtering, custom test protocols, and comprehensive patient archiving.

              </p>



              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {featuresList.map((feat, i) => (

                  <div key={i} className="flex items-start gap-2.5">

                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />

                    <span className="text-xs sm:text-sm text-slate-700 font-medium">

                      {feat}

                    </span>

                  </div>

                ))}

              </div>

            </div>



            <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6 sm:p-8 border border-blue-100 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">

                <FileCheck className="h-5 w-5 text-primary" />

                Parameters & Statistical Output

              </h3>



              <div className="space-y-4 text-xs sm:text-sm">

                <div className="flex justify-between border-b border-blue-100/60 pb-2">

                  <span className="text-slate-600">Maximum Flow Rate (Qmax)</span>

                  <span className="font-bold text-slate-900">ml / s</span>

                </div>

                <div className="flex justify-between border-b border-blue-100/60 pb-2">

                  <span className="text-slate-600">Average Flow Rate (Qavg)</span>

                  <span className="font-bold text-slate-900">ml / s</span>

                </div>

                <div className="flex justify-between border-b border-blue-100/60 pb-2">

                  <span className="text-slate-600">Total Voided Volume</span>

                  <span className="font-bold text-slate-900">ml</span>

                </div>

                <div className="flex justify-between border-b border-blue-100/60 pb-2">

                  <span className="text-slate-600">Flow Time & Voiding Time</span>

                  <span className="font-bold text-slate-900">seconds (s)</span>

                </div>

                <div className="flex justify-between border-b border-blue-100/60 pb-2">

                  <span className="text-slate-600">Time to Maximum Flow (TQmax)</span>

                  <span className="font-bold text-slate-900">seconds (s)</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-600">Standard Nomograms</span>

                  <span className="font-bold text-primary">Siroky, Liverpool, Pediatric</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Accessories Section */}

      <section className="bg-slate-50 py-16 md:py-20 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              HOSPITAL ACCESSORIES
            </span>

            <h2 className="text-3xl font-extrabold text-[#102A43] sm:text-4xl mt-1">
              Ergonomic Accessories for Sterile Hospital Environments
            </h2>

            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              A wide range of accessories is available to combine with DanFlow 2000 as well as custom test and protocol setups.
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



      {/* Inquiry & Rental CTA */}

      <ProductInquireCTA

        productName="DanFlow Cord USB Uroflowmetry System"

        productImage={machineImage}

        subtitle="MMT DanFlow Cord USB flow meter with real-time software, patient database, stand, and certified clinical accessories. Available for hospital rental and practice purchase."

      />

    </div>

  );

};



export default DanflowCord;
