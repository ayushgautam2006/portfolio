"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-st-red/20 shadow-lg shadow-st-red/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-st-red transition-colors drop-shadow-[0_0_8px_rgba(255,51,51,0.5)]">
                        Ayush.
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                                    pathname === item.href ? "text-white" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-spotlight"
                                        className="absolute inset-0 bg-gradient-to-r from-st-red/40 to-st-dark-red/40 rounded-full -z-10 blur-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-st-red/10 rounded-full -z-10 border border-st-red/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => window.open("/resume.pdf", "_blank")} className="rounded-full border-white/20 hover:border-st-red hover:text-st-red h-9 px-6">
                            Resume
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-2xl font-bold tracking-tight",
                                pathname === item.href ? "text-st-red" : "text-gray-400"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.open("/resume.pdf", "_blank")}
                        className="mt-4 w-full rounded-full"
                    >
                        Resume
                    </Button>
                </motion.div>
            )}
        </>
    );
}
