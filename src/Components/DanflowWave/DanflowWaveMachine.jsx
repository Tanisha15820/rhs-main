import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import DanflowWaveImg from "../../assets/images/wave.png";


/* =========================================================
   DESKTOP KEY POINT
   ========================================================= */

const KeyPoint = ({
    title,
    description,
    position,
    side = "left",
    lineWidth = 55,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0.96,
            }}
            transition={{
                duration: 0.25,
            }}
            className={`
                pointer-events-none
                absolute
                z-[100]
                hidden
                lg:flex

                ${side === "bottom" || side === "top"
                    ? "flex-col items-center"
                    : "items-center"
                }

                ${position}
            `}
        >

            {/* RIGHT CONNECTOR */}
            {side === "right" && (
                <div className="flex items-center">

                    <div
                        className="h-[1px] bg-[#1677FF]"
                        style={{
                            width: `${lineWidth}px`,
                        }}
                    />

                    <div
                        className="
                            h-[8px]
                            w-[8px]
                            rounded-full
                            bg-[#1677FF]
                        "
                    />

                </div>
            )}


            {/* TOP CONNECTOR */}
            {side === "top" && (
                <div className="flex flex-col items-center">

                    <div
                        className="
                            h-[8px]
                            w-[8px]
                            rounded-full
                            bg-[#1677FF]
                        "
                    />

                    <div
                        className="w-[1px] bg-[#1677FF]"
                        style={{
                            height: `${lineWidth}px`,
                        }}
                    />

                </div>
            )}


            {/* CARD */}
            <div
                className="
                    min-w-[150px]

                    rounded-[10px]

                    border
                    border-[#2F80ED]/60

                    bg-white

                    px-3
                    py-2.5

                    shadow-[0_8px_24px_rgba(15,23,42,0.08)]
                "
            >

                <div className="flex items-start gap-2">

                    {/* ICON */}
                    <div
                        className="
                            mt-[2px]

                            flex
                            h-[26px]
                            w-[26px]
                            shrink-0

                            items-center
                            justify-center

                            rounded-md

                            bg-[#1677FF]/10
                        "
                    >
                        <div
                            className="
                                h-[13px]
                                w-[3px]
                                rotate-45
                                rounded-full
                                bg-[#1677FF]
                            "
                        />
                    </div>


                    {/* TEXT */}
                    <div>

                        <h4
                            className="
                                text-[11px]
                                font-semibold
                                leading-tight
                                text-slate-900
                            "
                        >
                            {title}
                        </h4>

                        <p
                            className="
                                mt-[3px]
                                text-[8px]
                                leading-[1.4]
                                text-slate-400
                            "
                        >
                            {description}
                        </p>

                    </div>

                </div>

            </div>


            {/* LEFT CONNECTOR */}
            {side === "left" && (
                <div className="flex items-center">

                    <div
                        className="
                            h-[8px]
                            w-[8px]
                            rounded-full
                            bg-[#1677FF]
                        "
                    />

                    <div
                        className="h-[1px] bg-[#1677FF]"
                        style={{
                            width: `${lineWidth}px`,
                        }}
                    />

                </div>
            )}


            {/* BOTTOM CONNECTOR */}
            {side === "bottom" && (
                <div className="flex flex-col items-center">

                    <div
                        className="w-[1px] bg-[#1677FF]"
                        style={{
                            height: `${lineWidth}px`,
                        }}
                    />

                    <div
                        className="
                            h-[8px]
                            w-[8px]
                            rounded-full
                            bg-[#1677FF]
                        "
                    />

                </div>
            )}

        </motion.div>
    );
};


/* =========================================================
   MOBILE KEY POINT
   ========================================================= */

const MobileKeyPoint = ({
    title,
    description,
    index,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 12,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 8,
            }}
            transition={{
                duration: 0.3,
                delay: index * 0.04,
            }}
            className="
                flex
                min-h-[72px]
                items-start
                gap-3

                rounded-xl

                border
                border-[#2F80ED]/20

                bg-white

                p-3

                shadow-[0_5px_18px_rgba(15,23,42,0.05)]
            "
        >

            <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-lg

                    bg-[#1677FF]/10
                "
            >
                <div
                    className="
                        h-[14px]
                        w-[3px]
                        rotate-45
                        rounded-full
                        bg-[#1677FF]
                    "
                />
            </div>


            <div className="min-w-0">

                <h4
                    className="
                        text-[12px]
                        font-semibold
                        leading-[1.3]
                        text-slate-900
                    "
                >
                    {title}
                </h4>

                <p
                    className="
                        mt-1
                        text-[10px]
                        leading-[1.4]
                        text-slate-400
                    "
                >
                    {description}
                </p>

            </div>

        </motion.div>
    );
};


/* =========================================================
   DANFLOW WAVE KEYPOINT DATA
   ========================================================= */

const machinePoints = [
    {
        title: "Weight-Cell Transducer",
        description: "Precision Flow & Volume Sensor",
    },

    {
        title: "Waterproof Casing",
        description: "IP-Protected Danflow Shell",
    },

    {
        title: "USB Wireless Dongle",
        description: "866 / 915 MHz Receiver",
    },

    {
        title: "Contoured Platform",
        description: "Universal Beaker Support",
    },

    {
        title: "Optical Status LED",
        description: "Power, Link & Flow Light",
    },

    {
        title: "Battery & SD Module",
        description: "2-Year Life & Auto-Backup",
    },
];


const machineParts = [
    {
        id: "top-platform",

        clipPath: "polygon(0% 0%, 100% 0%, 100% 62%, 31% 68%, 21% 38%, 0% 38%)",

        x: -10,
        y: -24,
    },

    {
        id: "usb-dongle",

        clipPath: "polygon(0% 38%, 21% 38%, 31% 68%, 32% 96%, 0% 96%)",

        x: -28,
        y: 18,
    },

    {
        id: "base-sensor-module",

        clipPath: "polygon(31% 68%, 100% 62%, 100% 100%, 32% 96%)",

        x: 18,
        y: 24,
    },
];


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const DanflowWaveMachine = () => {

    const [
        isExpanded,
        setIsExpanded,
    ] = useState(false);


    const toggleMachine = () => {

        setIsExpanded(
            (prev) => !prev
        );

    };


    return (
        <section
            className="
                relative
                overflow-hidden
                bg-white

                py-12
                sm:py-16
                lg:py-[70px]
            "
        >

            {/* =====================================================
                MACHINE AREA
               ===================================================== */}

            <div
                className="
                    relative

                    left-1/2
                    -translate-x-1/2

                    w-screen
                    max-w-none

                    min-h-[520px]
                    sm:min-h-[560px]
                    lg:min-h-[600px]
                "
            >

                {/* =================================================
                    MACHINE WRAPPER
                   ================================================= */}

                <div
                    className="
                        absolute

                        left-1/2
                        top-1/2

                        -translate-x-1/2
                        -translate-y-1/2

                        cursor-pointer

                        outline-none

                        min-h-[500px]

                        w-[280px]
                        xs:w-[320px]
                        sm:w-[380px]
                        lg:w-[480px]

                        max-w-full
                    "

                    onClick={toggleMachine}

                    role="button"

                    tabIndex={0}

                    aria-label={
                        isExpanded
                            ? "Collapse DanFlow Wave machine details"
                            : "Expand DanFlow Wave machine details"
                    }

                    aria-expanded={isExpanded}

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" ||
                            e.key === " "
                        ) {

                            e.preventDefault();

                            toggleMachine();

                        }

                    }}
                >

                    {/* =================================================
                        DESKTOP KEY POINTS
                       ================================================= */}

                    <AnimatePresence>

                        {isExpanded && (

                            <>

                                {/* Weight-Cell Transducer */}
                                <KeyPoint
                                    title="Weight-Cell Transducer"
                                    description="Precision Flow & Volume Sensor"

                                    position="
                                        left-[145px]
                                        top-[10px]
                                    "

                                    side="bottom"

                                    lineWidth={60}
                                />


                                {/* Waterproof Casing */}
                                <KeyPoint
                                    title="Waterproof Casing"
                                    description="IP-Protected Danflow Shell"

                                    position="
                                        left-[-175px]
                                        top-[145px]
                                    "

                                    side="left"

                                    lineWidth={55}
                                />


                                {/* USB Wireless Dongle */}
                                <KeyPoint
                                    title="USB Wireless Dongle"
                                    description="866 / 915 MHz Receiver"

                                    position="
                                        left-[-195px]
                                        top-[315px]
                                    "

                                    side="left"

                                    lineWidth={55}
                                />


                                {/* Contoured Platform */}
                                <KeyPoint
                                    title="Contoured Platform"
                                    description="Universal Beaker Support"

                                    position="
                                        right-[-160px]
                                        top-[155px]
                                    "

                                    side="right"

                                    lineWidth={55}
                                />


                                {/* Optical Status LED */}
                                <KeyPoint
                                    title="Optical Status LED"
                                    description="Power, Link & Flow Light"

                                    position="
                                        right-[-175px]
                                        top-[320px]
                                    "

                                    side="right"

                                    lineWidth={50}
                                />


                                {/* Battery & SD Module */}
                                <KeyPoint
                                    title="Battery & SD Module"
                                    description="2-Year Life & Auto-Backup"

                                    position="
                                        left-[165px]
                                        top-[380px]
                                    "

                                    side="top"

                                    lineWidth={55}
                                />

                            </>

                        )}

                    </AnimatePresence>


                    {/* =================================================
                        MACHINE IMAGE
                       ================================================= */}

                    <div
                        className="
                            relative

                            z-10

                            h-[500px]

                            w-full
                        "
                    >

                        {/* Original assembled machine */}
                        <motion.img
                            src={DanflowWaveImg}

                            alt="MMT DanFlow Wave Wireless Uroflowmeter"

                            draggable={false}

                            animate={{
                                opacity:
                                    isExpanded ? 0 : 1,

                                scale:
                                    isExpanded
                                        ? 0.99
                                        : 1,
                            }}

                            transition={{
                                duration: 0.35,
                            }}

                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-contain
                                drop-shadow-[0_22px_28px_rgba(15,23,42,0.16)]
                            "
                        />


                        {/* Clipped exploded parts */}
                        {machineParts.map(
                            (part, index) => (

                                <motion.div
                                    key={part.id}
                                    initial={false}
                                    animate={{
                                        x:
                                            isExpanded
                                                ? part.x
                                                : 0,

                                        y:
                                            isExpanded
                                                ? part.y
                                                : 0,

                                        opacity:
                                            isExpanded
                                                ? 1
                                                : 0,
                                    }}
                                    transition={{
                                        duration: 0.5,

                                        delay:
                                            isExpanded
                                                ? index * 0.035
                                                : 0,

                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    style={{
                                        clipPath:
                                            part.clipPath,
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        h-full
                                        w-full
                                    "
                                >

                                    <img
                                        src={DanflowWaveImg}
                                        alt=""
                                        draggable={false}
                                        className="
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-contain
                                            drop-shadow-[0_18px_24px_rgba(15,23,42,0.14)]
                                        "
                                    />

                                </motion.div>

                            )
                        )}

                    </div>

                </div>

            </div>


            {/* =====================================================
                MOBILE FEATURES
               ===================================================== */}

            <div
                className="
                    mx-auto

                    mt-6

                    w-full

                    max-w-[520px]

                    px-4

                    lg:hidden
                "
            >

                {/* TAP BUTTON */}
                <motion.button

                    type="button"

                    onClick={toggleMachine}

                    whileTap={{
                        scale: 0.97,
                    }}

                    className="
                        mx-auto

                        flex

                        items-center

                        gap-2

                        rounded-full

                        border

                        border-[#1677FF]/15

                        bg-[#1677FF]/[0.04]

                        px-4

                        py-2

                        text-[11px]

                        font-medium

                        text-[#1677FF]
                    "
                >

                    <span
                        className={`
                            flex
                            h-5
                            w-5

                            items-center
                            justify-center

                            rounded-full

                            bg-[#1677FF]

                            text-[14px]

                            leading-none

                            text-white

                            transition-transform

                            duration-300

                            ${isExpanded
                                ? "rotate-45"
                                : ""
                            }
                        `}
                    >
                        +
                    </span>


                    {isExpanded
                        ? "Hide machine details"
                        : "Tap to explore machine"}

                </motion.button>


                {/* MOBILE DETAIL CARDS */}
                <AnimatePresence>

                    {isExpanded && (

                        <motion.div

                            initial={{
                                opacity: 0,
                                height: 0,
                            }}

                            animate={{
                                opacity: 1,
                                height: "auto",
                            }}

                            exit={{
                                opacity: 0,
                                height: 0,
                            }}

                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                            }}

                            className="overflow-hidden"
                        >

                            <div
                                className="
                                    mt-5

                                    grid

                                    grid-cols-1

                                    gap-2.5

                                    min-[430px]:grid-cols-2
                                "
                            >

                                {machinePoints.map(
                                    (
                                        point,
                                        index
                                    ) => (

                                        <MobileKeyPoint
                                            key={
                                                point.title
                                            }

                                            title={
                                                point.title
                                            }

                                            description={
                                                point.description
                                            }

                                            index={
                                                index
                                            }
                                        />

                                    )
                                )}

                            </div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

        </section>
    );
};


export default DanflowWaveMachine;
