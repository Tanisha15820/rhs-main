import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Eye,
  Award,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import SEO from "../Components/SEO";
import bannerBg from "../assets/images/smartxide_banner.png";
import cystoscopeImg from "../assets/images/RZ-Mediz.png";
import rzMedi1 from "../assets/images/RZMedi1.png";
import rzMedi2 from "../assets/images/RZMedi2.png";
import rzMedi3 from "../assets/images/RZMedi3.png";
import rzMedi4 from "../assets/images/RZMedi4.png";
import CystoscopyAbout from "../Components/Cystoscopy/CystoscopyAbout";
import CystoscopyTelescopes from "../Components/Cystoscopy/CystoscopyTelescopes";
import CystoscopySheaths from "../Components/Cystoscopy/CystoscopySheaths";
import CystoscopyBridges from "../Components/Cystoscopy/CystoscopyBridges";
import CystoscopySetCatalog from "../Components/Cystoscopy/CystoscopySetCatalog";
import CystoscopyMachine from "../Components/Cystoscopy/CystoscopyMachine";

/* Desktop Floating Feature Card */

const FeatureCard = ({ number, type, title, description, image, position }) => {

  return (

    <div

      className={`absolute hidden xl:block w-[290px] h-[125px] rounded-[22px] border border-white bg-white/95 shadow-[0_12px_35px_rgba(70,130,190,0.16)] backdrop-blur-md ${position}`}

    >

      <div className="absolute left-0 top-0 z-20 flex h-[40px] w-[54px] items-center justify-center rounded-br-[20px] rounded-tl-[22px] bg-primary">

        <span className="text-lg font-bold text-white">{number}</span>

      </div>



      <div className="absolute left-0 top-[40px] h-[55px] w-[1px] bg-primary"></div>



      <div className="flex h-full items-center gap-3 px-3 py-2 pl-4">

        <div className="relative ml-8 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-sky-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-sm overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full rounded-full object-contain"

          />

        </div>



        <div className="min-w-0 flex-1 pr-2">

          <div className="mb-0.5 flex items-center gap-1.5">

            <span className="text-[9px] font-bold uppercase tracking-wider text-primary">

              {type}

            </span>

          </div>

          <h3 className="text-[13px] font-bold leading-tight text-slate-900">

            {title}

          </h3>

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

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-300 bg-blue-50 overflow-hidden">

          <img

            src={image}

            alt={title}

            className="h-full w-full rounded-full object-contain"

          />

        </div>



        <div className="min-w-0 flex-1">

          <span className="text-[9px] font-bold uppercase text-primary">

            {type}

          </span>

          <h3 className="mt-0.5 text-xs font-bold text-slate-900">{title}</h3>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500 line-clamp-2">

            {description}

          </p>

        </div>

      </div>

    </div>

  );

};



const Cystoscopy = () => {

  const cystoscopySchema = {

    "@context": "https\://schema.org",

    "@type": "Product",

    name: "RZ Medizintechnik High Definition Cystoscopy & Urethroscope System",

    description:

      "German medical-grade cystoscopy telescope sets, color-coded direction of view (0°, 12°, 30°, 45°, 70°), atraumatic sheaths and Albarran deflecting bridges for urology procedures.",

    brand: {

      "@type": "Brand",

      name: "RZ Medizintechnik GmbH",

    },

    offers: {

      "@type": "AggregateOffer",

      priceCurrency: "INR",

      availability: "https\://schema.org/InStock",

      description:

        "Available for hospital rental and surgical center purchase.",

    },

  };



  return (

    <div className="bg-white">

      <SEO

        title="High Definition Cystoscopy System - RZ Medizintechnik | Reinforce Healthcare Services"

        description="Explore RZ Medizintechnik HD Cystoscope telescopes, atraumatic cysto-urethroscope sheaths, Albarran deflectors, and adult cystoscopy sets. Available for rental."

        keywords="Cystoscopy, RZ Medizintechnik cystoscope, urology cystoscopy set, 30 degree cystoscope, Albarran deflector, cystourethroscope sheath rental"

        canonical="/cystoscopy"

        jsonLd={cystoscopySchema}

      />



      {/* Hero Product Banner */}

      <section className="relative min-h-[500px] overflow-hidden bg-background sm:min-h-[600px] lg:min-h-[680px]">

        <div className="absolute inset-0 z-0">

          <img

            src={bannerBg}

            alt="Cystoscopy background banner"

            className="h-full w-full object-cover"

          />

        </div>



        <div className="absolute inset-0 z-[1] bg-white/5"></div>



        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="pt-6 text-center sm:pt-8 lg:pt-12">

            <div className="mb-3 flex items-center justify-center gap-4">

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary sm:text-sm">

                UROLOGY ENDOSCOPY SOLUTIONS

              </span>

              <span className="hidden h-[1px] w-9 bg-primary sm:block"></span>

            </div>



            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-5xl">

              RZ Medizintechnik{" "}

              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">

                Cystoscopy

              </span>

            </h1>



            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6 lg:text-base">

              Precision German Engineering by RZ Medizintechnik GmbH.

              <br className="hidden sm:block" />

              CAD Rod-Lens Optics, Color-Coded Angles, and Complete Surgical

              Sets.

            </p>

          </div>



          {/* Product Showcase Area */}

          <div className="relative mx-auto mt-4 max-w-[1100px] sm:mt-6">

            {/* Desktop Feature Cards */}
            <FeatureCard
              number="01"
              type="UNIVERSAL ADAPTERS"
              title="Color-Coded Lock Adapters"
              description="3-step stainless-steel lock and light adapters compatible with Storz, Wolf, and Olympus systems."
              image={rzMedi1}
              position="left-2 top-16"
            />
            <FeatureCard
              number="02"
              type="ATRAUMATIC SHEATHS"
              title="Sheath Shafts & Couplers"
              description="Laser-welded German stainless-steel sheaths (17–25 Charr.) for smooth atraumatic insertion."
              image={rzMedi2}
              position="bottom-14 left-2"
            />
            <FeatureCard
              number="03"
              type="WORKING CHANNELS"
              title="Cystoscope Bridges & Ports"
              description="Low-angle working channel bridges for smooth passage of biopsy forceps and laser fibers."
              image={rzMedi3}
              position="right-2 top-16"
            />
            <FeatureCard
              number="04"
              type="MODULAR ARCHITECTURE"
              title="CAD Modular Assembly"
              description="Interchangeable German CAD system combining HD rod-lens telescopes, Albarran deflectors, and sheaths."
              image={rzMedi4}
              position="bottom-14 right-2"
            />

            {/* Desktop Arrows */}

            <div className="absolute left-[300px] top-[105px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[105px] left-[300px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute right-[300px] top-[105px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            <div className="absolute bottom-[105px] right-[300px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>


            {/*             <div className="absolute left-[300px] top-[105px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[105px] left-[300px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute right-[300px] top-[105px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            <div className="absolute bottom-[105px] right-[300px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>



            <div className="absolute left-[300px] top-[105px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[105px] left-[300px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute right-[300px] top-[105px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            <div className="absolute bottom-[105px] right-[300px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>



            <div className="absolute left-[300px] top-[105px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[105px] left-[300px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute right-[300px] top-[105px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            <div className="absolute bottom-[105px] right-[300px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            {/* Desktop Arrows */}

            <div className="absolute left-[300px] top-[105px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[105px] left-[300px] hidden items-center xl:flex">
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>

            <div className="absolute right-[300px] top-[105px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            <div className="absolute bottom-[105px] right-[300px] hidden items-center xl:flex">
              <ArrowLeft className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <div className="h-[1px] w-[40px] bg-primary"></div>
              <div className="h-2 w-2 rounded-full border border-primary bg-white"></div>
            </div>

            {/*Central Endoscope Image - Desktop */}

            <div className="relative mx-auto hidden h-[320px] w-full max-w-[450px] items-end justify-center sm:h-[350px] lg:flex lg:h-[400px]">
              <div className="absolute bottom-10 left-1/2 h-32 w-60 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>

              <motion.img
                src={cystoscopeImg}
                alt="RZ Medizintechnik High Definition Cystoscopy Set"
                className="relative z-10 h-[170px] w-auto -translate-y-16 object-contain drop-shadow-[0_25px_30px_rgba(39,96,150,0.20)] lg:h-[290px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>



            {/* Central Endoscope Image - Mobile */}

            <div className="relative mx-auto flex h-auto w-full max-w-[300px] items-end justify-center pb-4 lg:hidden sm:max-w-[350px]">
              <div className="absolute bottom-8 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl"></div>
              <motion.img
                src={cystoscopeImg}
                alt="RZ Medizintechnik High Definition Cystoscopy Set"
                className="relative z-10 h-[240px] w-auto object-contain drop-shadow-[0_15px_15px_rgba(39,96,150,0.18)] sm:h-[280px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}

              />

            </div>



            {/* Mobile Feature Cards */}
            <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-3 px-2 sm:px-4 lg:hidden">
              <MobileFeatureCard
                number="01"
                type="UNIVERSAL ADAPTERS"
                title="Color-Coded Lock Adapters"
                description="3-step stainless-steel lock and light adapters compatible with Storz, Wolf, and Olympus systems."
                image={rzMedi1}
              />
              <MobileFeatureCard
                number="02"
                type="ATRAUMATIC SHEATHS"
                title="Sheath Shafts & Couplers"
                description="Laser-welded German stainless-steel sheaths (17–25 Charr.) for smooth atraumatic insertion."
                image={rzMedi2}
              />
              <MobileFeatureCard
                number="03"
                type="WORKING CHANNELS"
                title="Cystoscope Bridges & Ports"
                description="Low-angle working channel bridges for smooth passage of biopsy forceps and laser fibers."
                image={rzMedi3}
              />
              <MobileFeatureCard
                number="04"
                type="MODULAR ARCHITECTURE"
                title="CAD Modular Assembly"
                description="Interchangeable German CAD system combining HD rod-lens telescopes, Albarran deflectors, and sheaths."
                image={rzMedi4}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modular Product Feature Sections */}

      <CystoscopyAbout />
      <CystoscopyTelescopes />
      <CystoscopyMachine />
      <CystoscopySheaths />
      <CystoscopyBridges />
      <CystoscopySetCatalog />

    </div>

  );

};



export default Cystoscopy;
