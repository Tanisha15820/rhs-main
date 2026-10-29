import React, { useState } from "react";

import { motion } from "framer-motion";

import {

  ArrowRight,

  ArrowLeft,

  CheckCircle,

  ShieldCheck,

  Activity,

  Layers,

  Cpu,

  Zap,

  Sparkles,

  Droplets,

  RotateCw,

  Compass,

  Repeat,

  Feather,

  Sliders,

  DollarSign,

  Clock,

  ShieldAlert,

  ChevronRight,

  FileText,

  PackageCheck,

  Info,

  Award,

} from "lucide-react";

import SEO from "../Components/SEO";

import bannerBg from "../assets/images/smartxide_banner.png";

import fullScopeImg from "../assets/images/7.5.png";

import surgeonHandImg from "../assets/images/hu30m_75_surgeon.jpg";

import packagingImg from "../assets/images/hu30m_75_packaging.jpg";

import dualScopesImg from "../assets/images/hu30m_dual_scopes.jpg";

import processorImg from "../assets/images/huv01_processor.jpg";

import tipImg from "../assets/images/ureterorenoscope_tip.jpg";
import keypoint1 from "../assets/images/7.51.png";
import keypoint2 from "../assets/images/7.52.png";
import keypoint3 from "../assets/images/7.53.png";
import keypoint4 from "../assets/images/7.54.png";

import ProductInquireCTA from "../Components/Common/ProductInquireCTA";

import HU30SMachine from "../Components/DisposableHU30S/HU30SMachine";



/* Desktop Floating Feature Card */

const FeatureCard = ({ number, type, title, description, image, position }) => {

  return (

    <div

      className={`absolute hidden xl:block w-[300px] h-[135px] rounded-[22px] border border-white bg-white/95 shadow-[0_12px_35px_rgba(70,130,190,0.16)] backdrop-blur-md ${position}`}

    >

      {/* Number Badge */}

      <div className="absolute left-0 top-0 z-20 flex h-[42px] w-[56px] items-center justify-center rounded-br-[22px] rounded-tl-[22px] bg-primary">

        <span className="text-lg font-bold text-white">{number}</span>

      </div>



      {/* Border Accent */}

      <div className="absolute left-0 top-[40px] h-[72px] w-[1px] bg-primary"></div>



      <div className="flex h-full items-center gap-3 px-3 py-2 pl-4">

        {/* Circular Image Container */}

        <div className="relative ml-6 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-[0_5px_15px_rgba(40,116,189,0.12)]">

          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-blue-100 bg-white/80 overflow-hidden">

            <img

              src={image}

              alt={title}

              className="h-full w-full object-contain"

            />

          </div>

        </div>



        {/* Content */}

        <div className="min-w-0 flex-1 pr-2">

          {type && (

            <div className="mb-0.5 flex items-center gap-1.5">

              <span className="text-[9px] font-bold uppercase tracking-wider text-primary">

                {type}

              </span>

            </div>

          )}

          <h4 className="text-[13px] font-bold leading-tight text-slate-900">

            {title}

          </h4>

          <p className="mt-1 text-[11px] leading-[15px] text-slate-500 line-clamp-2">

            {description}

          </p>

        </div>

      </div>



      {/* Accent Dots */}

      <div className="absolute bottom-2.5 right-4 flex items-center gap-1">

        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>

        <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>

        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>

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

            className="h-full w-full object-contain"

          />

        </div>



        <div className="min-w-0 flex-1">

          {type && (

            <span className="text-[9px] font-bold uppercase text-primary">

              {type}

            </span>

          )}

          <h4 className="mt-0.5 text-xs font-bold text-slate-900">{title}</h4>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500 line-clamp-2">

            {description}

          </p>

        </div>

      </div>

    </div>

  );

};



const DisposableHU30M75Fr = () => {

  const [activeTab, setActiveTab] = useState("specs");



  return (

    <div className="min-h-screen bg-white">

      <SEO

        title="Disposable HU30M 7.5 Fr (HU30S) Single-Use Flexible Ureterorenoscope | Reinforce Healthcare Services"

        description="Disposable HU30M 7.5 Fr (HU30S) single-use flexible video ureterorenoscope engineered for Mini-RIRS. Offers 39% higher irrigation flow, 285° deflection, and 1:1 torque ratio for superior stone lithotripsy."

        keywords="Disposable HU30M 7.5 Fr, HU30S 7.5Fr, Mini-RIRS, single-use ureterorenoscope, flexible video ureteroscope, HugeMed HU30S, kidney stone laser endoscopy rental"

        canonical="/disposable-hu30m-7-5fr"

      />



      {/* SECTION 1: Product Hero Banner */}

      <section className="relative min-h-[500px] overflow-hidden bg-background sm:min-h-[600px] lg:min-h-[720px] pb-12 xl:pb-16">

        {/* Background Image */}

        <div className="absolute inset-0 z-0">

          <img

            src={bannerBg}

            alt="Disposable HU30M 7.5 Fr Background"

            className="h-full w-full object-cover"

          />

        </div>

        <div className="absolute inset-0 z-[1] bg-white/10 backdrop-blur-[0.5px]"></div>



        {/* Main Content */}

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="pt-6 text-center sm:pt-8 lg:pt-12">

            <div className="mb-3 flex items-center justify-center gap-4">

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

              <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary sm:text-sm">

                SINGLE-USE DIGITAL URETERORENOSCOPE • MINI-RIRS ERA

              </span>

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

            </div>



            <h1 className="text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl md:text-5xl">

              Disposable HU30M{" "}

              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                7.5 Fr

              </span>{" "}

              <span className="text-xl sm:text-2xl font-semibold text-slate-500">(HU30S)</span>

            </h1>



            <p className="mx-auto mt-3 max-w-3xl text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 lg:text-base">

              Welcome to the time of Mini-RIRS: Slim for more. Delivering more safety, more expelling power, and expanded clinical applications with 39% greater irrigation flow per unit time than conventional 9.3Fr scopes to minimize intrarenal pressure complications.

            </p>

          </div>



          {/* Product Center Area with Floating Feature Cards */}


          {/* Product Center Area with Floating Feature Cards */}
          <div className="relative mx-auto mt-4 max-w-[1180px] sm:mt-6">

            {/* Desktop Feature Card 01 - Top Left */}
            <FeatureCard
              number="01"
              type="7.5FR DISTAL TIP"
              title="285° Bidirectional Deflection"
              description="Ultra-slim 7.5Fr distal shaft with 285° up/down articulation for effortless calyceal access."
              image={keypoint1}
              position="left-2 xl:left-4 top-16 xl:top-20"
            />

            {/* Desktop Feature Card 02 - Bottom Left */}
            <FeatureCard
              number="02"
              type="WORKING & IRRIGATION PORT"
              title="3.6Fr Channel (+39% Flow)"
              description="3.6Fr working channel delivers 39% higher irrigation flow per unit time to reduce intrarenal pressure."
              image={keypoint2}
              position="bottom-16 xl:bottom-20 left-2 xl:left-4"
            />

            {/* Desktop Feature Card 03 - Top Right */}
            <FeatureCard
              number="03"
              type="ERGONOMIC HANDLE"
              title="Deflection Lever & Control"
              description="Lightweight ergonomic handle with 1:1 torque ratio, thumb deflection lever, and camera button."
              image={keypoint3}
              position="right-2 xl:right-4 top-16 xl:top-20"
            />

            {/* Desktop Feature Card 04 - Bottom Right */}
            <FeatureCard
              number="04"
              type="DIGITAL VIDEO LINK"
              title="Integrated Processor Cable"
              description="Plug-and-play digital transmission cable connects directly to HugeMed image processors."
              image={keypoint4}
              position="bottom-16 xl:bottom-20 right-2 xl:right-4"
            />

            {/* Desktop Arrows - Aligned with Feature Cards */}

            {/* Top Left Arrow */}
            <div className="absolute left-[310px] xl:left-[324px] top-[calc(4rem+67.5px)] xl:top-[calc(5rem+67.5px)] hidden -translate-y-1/2 items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[24px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            {/* Bottom Left Arrow */}
            <div className="absolute bottom-[calc(4rem+67.5px)] xl:bottom-[calc(5rem+67.5px)] left-[310px] xl:left-[324px] hidden translate-y-1/2 items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[24px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            {/* Top Right Arrow */}
            <div className="absolute right-[310px] xl:right-[324px] top-[calc(4rem+67.5px)] xl:top-[calc(5rem+67.5px)] hidden -translate-y-1/2 items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[24px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            {/* Bottom Right Arrow */}
            <div className="absolute bottom-[calc(4rem+67.5px)] xl:bottom-[calc(5rem+67.5px)] right-[310px] xl:right-[324px] hidden translate-y-1/2 items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[24px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            {/* Central Scope - Desktop */}
            <div className="relative mx-auto hidden h-[460px] xl:h-[500px] w-full max-w-[460px] items-center justify-center xl:flex">
              <div className="absolute bottom-12 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>

              <motion.img
                src={fullScopeImg}
                alt="Disposable HU30M 7.5 Fr Flexible Video Ureterorenoscope"
                className="relative z-10 max-h-[320px] xl:max-h-[360px] w-auto max-w-[440px] object-contain drop-shadow-[0_20px_30px_rgba(25,168,232,0.22)] rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Central Scope - Mobile */}
            <div className="relative mx-auto flex h-auto w-full max-w-[280px] sm:max-w-[320px] items-center justify-center my-4 sm:my-6 xl:hidden">
              <div className="absolute bottom-4 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl"></div>

              <motion.img
                src={fullScopeImg}
                alt="Disposable HU30M 7.5 Fr Flexible Video Ureterorenoscope"
                className="relative z-10 max-h-[200px] sm:max-h-[230px] w-auto max-w-full object-contain drop-shadow-[0_15px_20px_rgba(25,168,232,0.2)] rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Mobile Feature Cards */}
            <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-4 px-2 pb-6 sm:px-4 xl:hidden">
              <MobileFeatureCard
                number="01"
                type="7.5FR DISTAL TIP"
                title="285° Bidirectional Deflection"
                description="Ultra-slim 7.5Fr distal shaft with 285° up/down articulation for effortless calyceal access."
                image={keypoint1}
              />

              <MobileFeatureCard
                number="02"
                type="WORKING & IRRIGATION PORT"
                title="3.6Fr Channel (+39% Flow)"
                description="3.6Fr working channel delivers 39% higher irrigation flow per unit time to reduce intrarenal pressure."
                image={keypoint2}
              />

              <MobileFeatureCard
                number="03"
                type="ERGONOMIC HANDLE"
                title="Deflection Lever & Control"
                description="Lightweight ergonomic handle with 1:1 torque ratio, thumb deflection lever, and camera button."
                image={keypoint3}
              />

              <MobileFeatureCard
                number="04"
                type="DIGITAL VIDEO LINK"
                title="Integrated Processor Cable"
                description="Plug-and-play digital transmission cable connects directly to HugeMed image processors."
                image={keypoint4}
              />
            </div>
          </div>


        </div>

      </section>







      {/* SECTION 2: Welcome to the Time of Mini-RIRS (Screenshot 1 Content) */}

      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-12">

            {/* Left Graphic Banner from SS1 */}

            <div className="lg:col-span-6">

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102A43] via-[#092B5F] to-[#19A8E8] p-8 text-white shadow-xl">

                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />



                <div className="relative z-10">

                  <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-cyan-200 backdrop-blur-sm">

                    Welcome to the time of

                  </span>



                  <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">

                    Mini-RIRS

                  </h2>



                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#38ef7d]">

                    Slim for more

                  </h3>



                  <ul className="mt-6 space-y-3">

                    <li className="flex items-center gap-3">

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-cyan-300">

                        <CheckCircle className="h-4 w-4" />

                      </div>

                      <span className="text-base sm:text-lg font-semibold text-white">

                        More safe

                      </span>

                    </li>

                    <li className="flex items-center gap-3">

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-cyan-300">

                        <CheckCircle className="h-4 w-4" />

                      </div>

                      <span className="text-base sm:text-lg font-semibold text-white">

                        More expelling

                      </span>

                    </li>

                    <li className="flex items-center gap-3">

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-cyan-300">

                        <CheckCircle className="h-4 w-4" />

                      </div>

                      <span className="text-base sm:text-lg font-semibold text-white">

                        More application

                      </span>

                    </li>

                  </ul>



                  <div className="mt-8 pt-6 border-t border-white/15">

                    <p className="text-xs leading-relaxed text-slate-200">

                      Engineered for retrograde intrarenal surgery (RIRS) where minimizing mucosal resistance and preventing renal pelvic hyperpressure are vital to procedural safety.

                    </p>

                  </div>

                </div>

              </div>

            </div>



            {/* Right: +39% Irrigation Flow & Cross Section Diagram from SS1 */}

            <div className="lg:col-span-6 space-y-6">

              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">

                    <Droplets className="h-6 w-6" />

                  </div>

                  <div>

                    <span className="text-xs font-bold uppercase tracking-wider text-primary">

                      HYDRAULIC ADVANTAGE

                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">

                      39% More Irrigation Flow

                    </h3>

                  </div>

                </div>



                <p className="mt-4 text-sm leading-relaxed text-slate-600">

                  It provides <span className="font-bold text-primary">39% more irrigation flow per unit time</span> than common 9.3Fr flexible ureterorenoscopes, which actively helps to reduce complications caused by high intrarenal pressure during laser lithotripsy.

                </p>



                {/* Cross section visual cards */}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-semibold text-slate-500">Outer Diameter</span>

                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">

                        7.5 FR (HU30S)

                      </span>

                    </div>

                    <p className="mt-2 text-2xl font-black text-slate-900">7.5 Fr</p>

                    <p className="mt-1 text-xs text-slate-500">vs 9.3Fr conventional scope</p>

                  </div>



                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-semibold text-slate-500">Working Channel</span>

                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-primary">

                        Uncompromised

                      </span>

                    </div>

                    <p className="mt-2 text-2xl font-black text-slate-900">3.6 Fr</p>

                    <p className="mt-1 text-xs text-slate-500">Compatible with 200μm - 365μm fibers</p>

                  </div>

                </div>



                {/* Compatibility sheath reference */}

                <div className="mt-6 rounded-2xl bg-blue-50/60 p-4 border border-blue-100">

                  <p className="text-xs font-semibold text-slate-700">

                    Optimal Access Sheath Pairing:

                  </p>

                  <p className="mt-1 text-xs text-slate-600">

                    Fits smoothly inside standard <span className="font-semibold text-primary">10/12 Fr</span> and <span className="font-semibold text-primary">12/14 Fr</span> ureteral access sheaths while maintaining generous outflow space around the insertion tube.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 3: Clinical Trust & Single-Use Paradigm (Screenshot 2 Content) */}

      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Quote Block from SS2 */}

          <div className="relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200/70 p-6 sm:p-10">

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">

              <div className="lg:col-span-8">

                <span className="text-4xl sm:text-5xl font-serif text-primary/40 leading-none">“</span>

                <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-slate-800 italic">

                  The FURS has become a mainstay of treatment of nephrolithiasis with increasing indications for surgical modalities.

                </blockquote>

                <div className="mt-4 pt-3 border-t border-slate-200/80">

                  <p className="text-xs font-bold text-slate-700">

                    Takaaki Inoue, corresponding author, Shinsuke Okada, Shuzo Hamamoto, and Masato Fujisawa

                  </p>

                  <p className="text-xs text-slate-500">

                    Retrograde intrarenal surgery: Past, present, and future • PMCID: PMC7940857

                  </p>

                </div>

              </div>



              <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 text-center">

                <p className="text-xs font-bold uppercase tracking-wider text-primary">

                  Clinical Paradigm

                </p>

                <h4 className="mt-1 text-base font-extrabold text-slate-900">

                  We Trust in Single-Use Endoscopy

                </h4>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">

                  Today, single-use ureterorenoscopes are becoming more popular among urologists worldwide. Extensive surgical operations prove their clinical reliability and cost efficiency across modern lithotripsy.

                </p>

              </div>

            </div>

          </div>



          {/* 3 Core Pillars: Make f-URS procedures become more Accessible */}

          <div className="mt-12">

            <div className="text-center max-w-2xl mx-auto">

              <span className="text-xs font-bold uppercase tracking-wider text-primary">

                VALUE PILLARS

              </span>

              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">

                Make f-URS Procedures Become More{" "}

                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                  Accessible

                </span>

              </h2>

            </div>



            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Pillar 1: Cost-effective */}

              <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-sm hover:shadow-md transition">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">

                  <DollarSign className="h-6 w-6" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">Cost-Effective</h3>

                <ul className="mt-3 space-y-2 text-xs text-slate-600">

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Raise hospital cash flow ratio</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Zero maintenance & repair costs</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Zero chemical disinfection expenses</span>

                  </li>

                </ul>

              </div>



              {/* Pillar 2: No Cross-Infection */}

              <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-sm hover:shadow-md transition">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">

                  <ShieldCheck className="h-6 w-6" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">No Cross-Infection</h3>

                <ul className="mt-3 space-y-2 text-xs text-slate-600">

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>100% single-use sterile packaging</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>One scope dedicated for one patient</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Zero cross-infection risks & contamination</span>

                  </li>

                </ul>

              </div>



              {/* Pillar 3: Always Ready To Go */}

              <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-sm hover:shadow-md transition">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <Clock className="h-6 w-6" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">Always Ready To Go</h3>

                <ul className="mt-3 space-y-2 text-xs text-slate-600">

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>No waiting for reprocessing or turnaround</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Immediate availability for emergency cases</span>

                  </li>

                  <li className="flex items-center gap-2">

                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />

                    <span>Pristine optics and deflection every surgery</span>

                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 1.5: Machine Explorer (click to explode parts & keypoints) */}

      <HU30SMachine />



      {/* SECTION 4: Engineering Advantages (Screenshot 2 Features) */}

      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              CLINICAL ARCHITECTURE

            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">

              5 Technical Breakthroughs of{" "}

              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                HU30S 7.5Fr

              </span>

            </h2>

          </div>



          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Feature 1 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary font-bold">

                1080P

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">Optimized Imaging</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                160K CMOS sensor chip-on-tip design combined with an optimized video algorithm delivers true-to-life 1080P surgical resolution with high contrast and zero visual noise.

              </p>

            </div>



            {/* Feature 2 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary font-bold">

                1 : 1

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">Toughened Insertion Tube</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                1:1 torque ratio guarantees instantaneous transmission of rotation to the scope tip. Crafted from medical-grade environmentally friendly materials.

              </p>

            </div>



            {/* Feature 3 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">

                <Sliders className="h-6 w-6" />

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">User-Friendly Control</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                Intuitive self-locking bending function locks the tip at the desired angle during laser lithotripsy, maintaining stable stone targeting effortlessly.

              </p>

            </div>



            {/* Feature 4 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary font-bold">

                285°

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">Intensive Bending Angle</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                Articulation section made with surgical-grade stainless steel, providing up to 285° up & down deflection for full accessibility into difficult lower poles.

              </p>

            </div>



            {/* Feature 5 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">

                <Sparkles className="h-6 w-6" />

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">Bullet-Tip Design</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                Low-resistance bullet-shaped distal tip simplifies engagement and dilation into narrow ureteral orifices, while reducing the ratio of accidental laser damage.

              </p>

            </div>



            {/* Feature 6 */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">

                <Feather className="h-6 w-6" />

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">Ergonomic Fatigue Relief</h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">

                Lightweight (&lt;300g) balanced handle with ergonomic finger rest and natural grip contour effectively relieves wrist and forearm strain during long operations.

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 5: Scope Comparison (HU30 9.3Fr vs HU30S 7.5Fr from SS2) */}

      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-12">

            <div className="lg:col-span-6">

              <span className="text-xs font-bold uppercase tracking-wider text-primary">

                MODEL DIFFERENTIATION

              </span>

              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">

                HU30 (9.3Fr) vs HU30S (7.5Fr)

              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">

                Choose the exact instrument diameter tailored to clinical stone burden and patient ureteral anatomy. Both models share the identical robust 3.6Fr working channel.

              </p>



              <div className="mt-6 space-y-4">

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50">

                  <div className="flex items-center justify-between">

                    <h4 className="text-sm font-bold text-slate-900">HU30 9.3Fr</h4>

                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-700">

                      Standard

                    </span>

                  </div>

                  <p className="mt-1 text-xs text-slate-500">

                    Substantial for normal cases and standard renal stone loads.

                  </p>

                </div>



                <div className="rounded-2xl border border-primary/30 p-4 bg-primary/5">

                  <div className="flex items-center justify-between">

                    <h4 className="text-sm font-bold text-primary">HU30S 7.5Fr (Lime-Green Accents)</h4>

                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">

                      Ultra-Slim

                    </span>

                  </div>

                  <p className="mt-1 text-xs text-slate-600">

                    Superior ultra-slim profile for Mini-RIRS, pediatric ureteroscopy, tight strictures, and 39% superior irrigation outflow.

                  </p>

                </div>

              </div>

            </div>



            <div className="lg:col-span-6">

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-md">

                <img

                  src={dualScopesImg}

                  alt="HU30 9.3Fr and HU30S 7.5Fr Flexible Video Ureterorenoscopes"

                  className="w-full h-auto object-contain rounded-2xl"

                />

                <div className="p-4 text-center">

                  <p className="text-xs font-bold text-slate-700">

                    HU30 (9.3Fr, Top) and HU30S (7.5Fr, Bottom) with 285° Bidirectional Deflection

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 6: Digital Imaging Processor HUV-01 (from Screenshot 1) */}

      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              IMAGE PROCESSING UNIT

            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">

              HU Series Imaging Part:{" "}

              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                HUV-01

              </span>

            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600">

              Digital format with multiple output ports designed to connect HugeMed flexible endoscopes and surgical monitors.

            </p>

          </div>



          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-center">

            <div className="lg:col-span-5">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

                <img

                  src={processorImg}

                  alt="HugeMed HUV-01 Digital Endoscopy Image Processor"

                  className="w-full h-auto object-contain rounded-2xl"

                />

                <div className="mt-3 text-center">

                  <h4 className="text-sm font-bold text-slate-900">HUV-01 Image Processor</h4>

                  <p className="text-xs text-slate-500">1024 × 768 Resolution • 16GB Storage • Compact Footprint</p>

                </div>

              </div>

            </div>



            <div className="lg:col-span-7">

              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 border-b border-slate-100">

                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">

                    HUV-01 Technical Specifications

                  </h4>

                </div>

                <div className="divide-y divide-slate-100 text-xs">

                  <div className="grid grid-cols-2 px-6 py-3">

                    <span className="font-semibold text-slate-600">Model</span>

                    <span className="font-bold text-slate-900">HUV-01</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3 bg-slate-50/50">

                    <span className="font-semibold text-slate-600">Image Output</span>

                    <span className="text-slate-800">1024 × 768 pixels</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3">

                    <span className="font-semibold text-slate-600">Screen Ratio</span>

                    <span className="text-slate-800">4:3</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3 bg-slate-50/50">

                    <span className="font-semibold text-slate-600">Light Source Control</span>

                    <span className="text-slate-800">0–7 grades brightness control</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3">

                    <span className="font-semibold text-slate-600">Storage Capacity</span>

                    <span className="text-slate-800">Maximum 16GB for dynamic or static imaging</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3 bg-slate-50/50">

                    <span className="font-semibold text-slate-600">Language Support</span>

                    <span className="text-slate-800">Chinese, English, Spanish, Portuguese, French</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3">

                    <span className="font-semibold text-slate-600">Power Supply</span>

                    <span className="text-slate-800">100–240V ~ 50/60Hz</span>

                  </div>

                  <div className="grid grid-cols-2 px-6 py-3 bg-slate-50/50">

                    <span className="font-semibold text-slate-600">Border Type</span>

                    <span className="text-slate-800">3 kinds</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 7: Technical Specifications & Ordering Codes Tables */}

      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-xs font-bold uppercase tracking-wider text-primary">

              SPECIFICATIONS & ORDERING

            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">

              Technical Details & Catalog Numbers

            </h2>

          </div>



          {/* Scope Specs Table */}

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="bg-primary/10 px-6 py-3 border-b border-primary/20">

              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">

                Flexible Video Ureterorenoscope Specifications (SS2)

              </h3>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs">

                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">

                  <tr>

                    <th className="px-6 py-3.5">Model</th>

                    <th className="px-6 py-3.5">Insertion Tube Diameter</th>

                    <th className="px-6 py-3.5">Working Channel Diameter</th>

                    <th className="px-6 py-3.5">Working Length</th>

                    <th className="px-6 py-3.5">Field of View</th>

                    <th className="px-6 py-3.5">Deflection Angle</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  <tr>

                    <td className="px-6 py-4 font-bold text-slate-900">HU30</td>

                    <td className="px-6 py-4 text-slate-700">9.3 FR</td>

                    <td className="px-6 py-4 text-slate-700 font-semibold text-primary">3.6 FR</td>

                    <td className="px-6 py-4 text-slate-700">650 mm</td>

                    <td className="px-6 py-4 text-slate-700">120°</td>

                    <td className="px-6 py-4 text-slate-700">Up 285° / Down 285°</td>

                  </tr>

                  <tr className="bg-primary/5">

                    <td className="px-6 py-4 font-bold text-primary">HU30S</td>

                    <td className="px-6 py-4 font-bold text-emerald-600">7.5 FR (Ultra-Slim)</td>

                    <td className="px-6 py-4 text-slate-700 font-semibold text-primary">3.6 FR</td>

                    <td className="px-6 py-4 text-slate-700">650 mm</td>

                    <td className="px-6 py-4 text-slate-700">120°</td>

                    <td className="px-6 py-4 text-slate-700">Up 285° / Down 285°</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>



          {/* Ordering Information Table from Screenshot 1 */}

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="bg-[#102A43] px-6 py-3 text-white">

              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">

                Ordering Information (HU Series Catalog Numbers)

              </h3>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs">

                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">

                  <tr>

                    <th className="px-6 py-3.5">Product Description</th>

                    <th className="px-6 py-3.5">Item Code</th>

                    <th className="px-6 py-3.5">Deflection Logic</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  <tr className="bg-slate-50/50">

                    <td colSpan={3} className="px-6 py-2 font-bold text-slate-700 uppercase tracking-wider text-[10px]">

                      Flexible Video Ureterorenoscope — HU30 (9.3Fr)

                    </td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800">EU Standard Deflection</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-primary">0000B-PA005</td>

                    <td className="px-6 py-3.5 text-slate-600">Anti-logic Deflection</td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800">US Standard Deflection</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-primary">0000B-PA006</td>

                    <td className="px-6 py-3.5 text-slate-600">Logic Deflection</td>

                  </tr>



                  <tr className="bg-emerald-50/50">

                    <td colSpan={3} className="px-6 py-2 font-bold text-emerald-800 uppercase tracking-wider text-[10px]">

                      Flexible Video Ureterorenoscope — HU30S (7.5Fr Ultra-Slim)

                    </td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800">EU Standard Deflection (L)</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-emerald-700">0000B-PA011</td>

                    <td className="px-6 py-3.5 text-slate-600">Anti-logic Deflection (Left)</td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800">US Standard Deflection (L)</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-emerald-700">0000B-PA013</td>

                    <td className="px-6 py-3.5 text-slate-600">Logic Deflection (Left)</td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800">EU Standard Deflection (R)</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-emerald-700">0000B-PA012</td>

                    <td className="px-6 py-3.5 text-slate-600">Anti-logic Deflection (Right)</td>

                  </tr>



                  <tr className="bg-blue-50/50">

                    <td colSpan={3} className="px-6 py-2 font-bold text-primary uppercase tracking-wider text-[10px]">

                      Imaging Processor

                    </td>

                  </tr>

                  <tr>

                    <td className="px-6 py-3.5 text-slate-800 font-semibold">HUV-01 Digital Image Processor</td>

                    <td className="px-6 py-3.5 font-mono font-bold text-primary">0002B-PA006</td>

                    <td className="px-6 py-3.5 text-slate-600">1024×768 Resolution • 16GB Memory</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 8: Sterile Packaging & Readiness */}

      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-12">

            <div className="lg:col-span-6">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-md">

                <img

                  src={packagingImg}

                  alt="Surgeon opening sterile packaging of single-use ureterorenoscope"

                  className="w-full h-auto object-cover rounded-2xl"

                />

              </div>

            </div>



            <div className="lg:col-span-6 space-y-5">

              <span className="text-xs font-bold uppercase tracking-wider text-primary">

                STERILE PACKAGING & QUALITY ASSURANCE

              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">

                Pristine Condition for Every Procedure

              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">

                Each Disposable HU30M 7.5 Fr ureterorenoscope is packaged individually in a sterile, tamper-evident blister pouch. Ethylene Oxide (EO) sterilization ensures absolute clinical safety, removing the turnaround time, reprocessing liabilities, and mechanical wear associated with reusable scopes.

              </p>



              <div className="grid grid-cols-2 gap-4 pt-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-4">

                  <PackageCheck className="h-6 w-6 text-primary" />

                  <h4 className="mt-2 text-sm font-bold text-slate-900">100% Sterile</h4>

                  <p className="mt-1 text-xs text-slate-500">EO sterilized ready-to-open blister pouch</p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">

                  <ShieldCheck className="h-6 w-6 text-emerald-600" />

                  <h4 className="mt-2 text-sm font-bold text-slate-900">Zero Degradation</h4>

                  <p className="mt-1 text-xs text-slate-500">Brand-new optics and deflection every single time</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* SECTION 9: Product Inquire CTA */}

      <ProductInquireCTA

        title="Interested in the Disposable HU30M 7.5 Fr Scope?"

        subtitle="Available for flexible hospital evaluation, demonstration, and procurement with certified technical and clinical support."

        productName="HugeMed Disposable HU30M 7.5 Fr (HU30S) Single-Use Ureterorenoscope"

        productImage={fullScopeImg}

      />

    </div>

  );

};



export default DisposableHU30M75Fr;
