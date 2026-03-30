"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Scroll progress bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-st-red via-red-400 to-st-red"
                    style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(255,51,51,0.8), 0 0 20px rgba(255,51,51,0.4)" }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
                    scrolled
                        ? "bg-black/70 backdrop-blur-3xl border-b border-white/5"
                        : "bg-transparent"
                )}
            >
                {/* Subtle bottom glow on scroll */}
                {scrolled && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-st-red/30 to-transparent pointer-events-none" />
                )}

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative group flex items-center gap-1"
                    >
                        <motion.span
                            whileHover={{ scale: 1.02 }}
                            className="text-xl font-black tracking-tight text-white transition-all duration-200 group-hover:drop-shadow-[0_0_12px_rgba(255,51,51,0.8)]"
                        >
                            AYUSH
                            <span className="text-st-red text-glow-sm">.</span>
                        </motion.span>
                        <span className="ml-1.5 hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase text-st-red/70 border border-st-red/20 rounded bg-st-red/5">
                            DEV
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full",
                                    pathname === item.href
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-200"
                                )}
                            >
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 rounded-full bg-white/8 border border-st-red/25"
                                        style={{ boxShadow: "0 0 12px rgba(255,51,51,0.2), inset 0 0 8px rgba(255,51,51,0.05)" }}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.55 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => window.open("/resume.pdf", "_blank")}
                            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-st-red text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,51,51,0.5),0_0_40px_rgba(255,51,51,0.2)] hover:bg-red-500 border border-red-400/20"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Resume
                        </motion.button>
                    </div>

                    {/* Mobile toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden text-gray-400 hover:text-white transition-colors p-2 glass rounded-xl"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/90 pt-24 px-8 md:hidden flex flex-col gap-2"
                    >
                        {/* Ambient glow in mobile menu */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-st-red/8 blur-3xl pointer-events-none" />

                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ delay: i * 0.06, type: "spring", bounce: 0.2 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 text-4xl font-black tracking-tight py-3 border-b border-white/5 transition-all group",
                                        pathname === item.href
                                            ? "text-st-red"
                                            : "text-gray-500 hover:text-white"
                                    )}
                                >
                                    <span className="text-base text-st-red/40 font-mono w-6">0{i + 1}</span>
                                    <span className="group-hover:translate-x-2 transition-transform duration-200">{item.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                        <div className="mt-8">
                            <button
                                onClick={() => { window.open("/resume.pdf", "_blank"); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 rounded-2xl bg-st-red text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(255,51,51,0.5)] transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download Resume
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
