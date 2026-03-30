"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = [
    {
        name: "Next.js",
        icon: (
            <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 fill-white">
                <mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#mask0_408_134)">
                    <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)" />
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        color: "rgba(255,255,255,0.08)",
        border: "rgba(255,255,255,0.15)",
    },
    {
        name: "React",
        icon: (
            <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#61DAFB]">
                <circle cx="0" cy="0" r="2" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="10" ry="4.5" />
                    <ellipse rx="10" ry="4.5" transform="rotate(60)" />
                    <ellipse rx="10" ry="4.5" transform="rotate(120)" />
                </g>
            </svg>
        ),
        color: "rgba(97,218,251,0.08)",
        border: "rgba(97,218,251,0.2)",
    },
    {
        name: "TypeScript",
        icon: (
            <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <g clipPath="url(#clip0_408_138)">
                    <rect width="128" height="128" rx="10" fill="#3178C6" />
                    <path d="M72.3307 98.6641L61.0363 92.1406C62.353 89.8828 63.2921 88.0964 63.8561 86.7812C64.4201 85.4661 64.7021 84.1029 64.7021 82.6914C64.7021 81.0924 64.3261 79.7773 63.5741 78.7461C62.8221 77.7148 61.647 77.1992 60.049 77.1992C58.4509 77.1992 57.1821 77.7148 56.2421 78.7461C55.3021 79.7773 54.8321 81.3275 54.8321 83.3965V98.6641H42.9907V61.1641H54.8321V66.8027C56.2421 64.5449 57.793 62.946 59.485 62.0059C61.177 61.0658 63.151 60.5957 65.407 60.5957C69.3543 60.5957 72.3614 61.7708 74.4283 64.1211C76.4953 66.4714 77.5287 69.9492 77.5287 74.5547V98.6641H72.3307ZM107.428 98.6641H95.5863V93.4082C94.1763 95.6641 92.6253 97.263 90.9333 98.2031C89.2413 99.1432 87.2673 99.6133 85.0113 99.6133C81.064 99.6133 78.0569 98.4382 75.99 96.0879C73.923 93.7376 72.8896 90.2598 72.8896 85.6543V61.1641H84.7293V83.1133C84.7293 84.9935 85.1053 86.4036 85.8573 87.3438C86.6093 88.2839 87.7843 88.7539 89.3823 88.7539C90.9803 88.7539 92.2491 88.2383 93.1891 87.207C94.1291 86.1758 94.5991 84.625 94.5991 82.5566V61.1641H107.428V98.6641ZM27.0594 98.6641H15.2178V48.1953H27.0594V98.6641ZM27.0594 39.7363H15.2178V29.3984H27.0594V39.7363Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_408_138">
                        <rect width="128" height="128" rx="10" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        color: "rgba(49,120,198,0.1)",
        border: "rgba(49,120,198,0.25)",
    },
    {
        name: "Tailwind CSS",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#38B2AC]">
                <path d="M12.0002 6C12.0002 6 13.5 2.99999 16.5 3C19.5 3.00001 21 6 21 6C21 6 19.5 9 16.5 9C13.5 9 12.0002 6 12.0002 6ZM12.0002 6C12.0002 6 10.5 9 7.50016 9C4.50016 9 3.00016 6 3.00016 6C3.00016 6 4.50016 3 7.50016 3C10.5 3 12.0002 6 12.0002 6ZM12.0002 15C12.0002 15 13.5 12 16.5 12C19.5 12 21 15 21 15C21 15 19.5 18 16.5 18C13.5 18 12.0002 15 12.0002 15ZM12.0002 15C12.0002 15 10.5 18 7.50016 18C4.50016 18 3.00016 15 3.00016 15C3.00016 15 4.50016 12 7.50016 12C10.5 12 12.0002 15 12.0002 15Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "rgba(56,178,172,0.08)",
        border: "rgba(56,178,172,0.2)",
    },
    {
        name: "Node.js",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#339933]">
                <path d="M16 2L2.5 9.5V22.5L16 30L29.5 22.5V9.5L16 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 12V20M12 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "rgba(51,153,51,0.08)",
        border: "rgba(51,153,51,0.2)",
    },
    {
        name: "Python",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.032v-2.868s-.109-3.404 3.35-3.404h5.766s3.24.052 3.24-3.13V3.19S18.312 0 11.914 0zM8.708 1.843a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z" fill="#4B84C4" />
                <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.032v2.868s.109 3.404-3.35 3.404H9.449s-3.24-.052-3.24 3.13V20.81S5.688 24 12.086 24zm3.206-1.843a1.047 1.047 0 1 1 0-2.094 1.047 1.047 0 0 1 0 2.094z" fill="#FFD845" />
            </svg>
        ),
        color: "rgba(75,132,196,0.08)",
        border: "rgba(75,132,196,0.2)",
    },
    {
        name: "Vercel",
        icon: (
            <svg viewBox="0 0 1155 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white">
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
            </svg>
        ),
        color: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
    },
    {
        name: "GitHub",
        icon: (
            <svg viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217C0 71.75 14.609 90.852 34.935 97.635C37.367 98.063 38.261 96.572 38.261 95.282C38.261 94.116 38.217 90.234 38.196 86.115C24.017 89.217 21.021 79.245 21.021 79.245C18.806 73.58 15.619 72.072 15.619 72.072C10.99 68.901 15.971 68.965 15.971 68.965C21.096 69.328 23.793 74.257 23.793 74.257C28.341 82.096 35.732 79.833 38.641 78.522C39.103 75.208 40.428 72.95 41.892 71.669C30.574 70.375 18.672 65.989 18.672 46.418C18.672 40.842 20.653 36.299 23.901 32.733C23.372 31.442 21.618 26.248 24.406 19.167C24.406 19.167 28.673 17.794 38.39 24.407C42.449 23.273 46.804 22.708 51.144 22.73C55.48 22.708 59.835 23.273 63.902 24.407C73.611 17.794 77.87 19.167 77.87 19.167C80.666 26.248 78.913 31.442 78.385 32.733C81.64 36.299 83.613 40.842 83.613 46.418C83.613 66.012 71.693 70.365 60.339 71.635C62.155 73.211 63.774 76.315 63.774 81.069C63.774 87.877 63.711 93.385 63.711 95.282C63.711 96.582 64.593 98.083 67.067 97.632C87.408 90.842 102 71.745 102 49.217C102 22 80.161 0 48.854 0Z" fill="currentColor" />
            </svg>
        ),
        color: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
    },
    {
        name: "Figma",
        icon: (
            <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <path d="M19 28.5C19 25.9837 20.0107 23.5705 21.8096 21.7914C23.6086 20.0122 26.0483 19.0128 28.5926 19.0128C31.1369 19.0128 33.5766 20.0122 35.3756 21.7914C37.1745 23.5705 38.1852 25.9837 38.1852 28.5C38.1852 31.0163 37.1745 33.4295 35.3756 35.2086C33.5766 36.9878 31.1369 37.9872 28.5926 37.9872H19V28.5Z" fill="#1ABCFE" />
                <path d="M9.59259 56.9744C12.1369 56.9744 14.5766 55.975 16.3756 54.1958C18.1745 52.4167 19.1852 50.0035 19.1852 47.4872V37.9872H9.59259C7.04829 37.9872 4.60858 36.9878 2.80963 35.2086C1.01068 33.4295 0 31.0163 0 28.5C0 25.9837 1.01068 23.5705 2.80963 21.7914C4.60858 20.0122 7.04829 19.0128 9.59259 19.0128H19.1852V9.51282C19.1852 6.99653 20.1959 4.58334 21.9948 2.80421C23.7938 1.02507 26.2335 0.025641 28.7778 0.025641C31.3221 0.025641 33.7618 1.02507 35.5607 2.80421C37.3597 4.58334 38.3704 6.99653 38.3704 9.51282C38.3704 12.0291 37.3597 14.4423 35.5607 16.2214C33.7618 18.0006 31.3221 19.0001 28.7778 19.0001H19.1852V28.5H9.59259C7.04829 28.5 4.60858 29.4994 2.80963 31.2786C1.01068 33.0577 0 35.4709 0 37.9872C0 40.5035 1.01068 42.9167 2.80963 44.6958C4.60858 46.475 7.04829 47.4744 9.59259 47.4744V56.9744Z" fill="#0ACF83" />
                <path d="M9.59259 0.025641C7.04829 0.025641 4.60858 1.02507 2.80963 2.80421C1.01068 4.58334 0 6.99653 0 9.51282C0 12.0291 1.01068 14.4423 2.80963 16.2214C4.60858 18.0006 7.04829 19.0001 9.59259 19.0001H19.1852V0.025641H9.59259Z" fill="#F24E1E" />
                <path d="M9.59259 19.0128C7.04829 19.0128 4.60858 20.0122 2.80963 21.7914C1.01068 23.5705 0 25.9837 0 28.5C0 31.0163 1.01068 33.4295 2.80963 35.2086C4.60858 36.9878 7.04829 37.9872 9.59259 37.9872H19.1852V19.0128H9.59259Z" fill="#A259FF" />
            </svg>
        ),
        color: "rgba(162,89,255,0.06)",
        border: "rgba(162,89,255,0.2)",
    },
    {
        name: "VS Code",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#007ACC]">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.245.09L.325 7.757a.999.999 0 0 0-.01 1.425l3.745 3.743-3.745 3.743a.999.999 0 0 0 .01 1.425l1.355 1.655a.999.999 0 0 0 1.245.09l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.144V3.856a1.5 1.5 0 0 0-.85-1.269zM8.75 12L4.5 7.75l4.25-4.25L12 12l-3.25 8.5L4.5 16.25 8.75 12z" fill="currentColor" />
            </svg>
        ),
        color: "rgba(0,122,204,0.08)",
        border: "rgba(0,122,204,0.2)",
    },
];

export function TechStack() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 flex flex-col gap-10">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center gap-4"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-st-red" />
                    <p className="text-st-red text-xs font-bold uppercase tracking-[0.2em]">Arsenal</p>
                    <div className="w-8 h-[1px] bg-st-red" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider">
                    Technology Stack
                </h2>
                <p className="text-sm text-gray-500 max-w-xs">The tools and technologies I use to build modern web experiences.</p>
            </motion.div>

            {/* Marquee */}
            <div className="relative flex overflow-hidden mask-gradient-to-r">
                <div className="flex gap-5 animate-marquee whitespace-nowrap py-4" style={{ width: "max-content" }}>
                    {[...techStack, ...techStack].map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center gap-3 min-w-[140px] h-[140px] rounded-2xl p-5 cursor-pointer relative overflow-hidden group"
                            style={{
                                background: tech.color,
                                border: `1px solid ${tech.border}`,
                                backdropFilter: "blur(16px)",
                            }}
                            whileHover={{ y: -6, scale: 1.06 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Hover inner glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${tech.border}, transparent 70%)` }}
                            />
                            <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                                {tech.icon}
                            </div>
                            <span className="text-xs font-bold tracking-wide text-gray-400 group-hover:text-white transition-colors uppercase relative z-10">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
