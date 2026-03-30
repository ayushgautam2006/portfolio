"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const contactInfo = [
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "ayushgau2006@gmail.com",
        href: "mailto:ayushgau2006@gmail.com",
        color: "from-red-500 to-rose-600",
        glow: "rgba(239,68,68,0.2)",
    },
    {
        icon: <Phone className="w-5 h-5" />,
        label: "Phone",
        value: "+91 9234268898",
        href: "tel:+919234268898",
        color: "from-emerald-500 to-teal-600",
        glow: "rgba(16,185,129,0.2)",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: "Location",
        value: "S.D. Hall, NIT Rourkela",
        href: "#",
        color: "from-violet-500 to-purple-600",
        glow: "rgba(139,92,246,0.2)",
    },
];

const socials = [
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/ayushgautam2006", handle: "@ayushgautam2006" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-gautam-964050327", handle: "in/ayush-gautam" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "https://www.instagram.com/ayushhhpr/", handle: "@ayushhhpr" },
];

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        await new Promise((resolve) => setTimeout(resolve, 800));

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:ayushgau2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        (e.target as HTMLFormElement).reset();
    }

    const inputClass = (name: string) =>
        `w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm font-medium outline-none transition-all duration-300 ${
            focused === name
                ? "border border-st-red/50 bg-st-red/5 shadow-[0_0_20px_rgba(255,51,51,0.1),inset_0_0_20px_rgba(255,51,51,0.03)]"
                : "border border-white/8 bg-white/3 hover:border-white/15"
        }`;

    return (
        <div className="min-h-screen w-full flex flex-col items-center gap-16 pt-32 md:pt-40 pb-24 px-4 md:px-8 relative">

            {/* Ambient glows */}
            <div className="pointer-events-none fixed top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-st-red/5 blur-[120px] animate-pulse-glow" />
            <div className="pointer-events-none fixed bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-red-900/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

            {/* Header */}
            <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-2xl relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-red mb-6">
                    <span className="text-st-red font-semibold tracking-[0.18em] uppercase text-[10px]">Let&apos;s Talk</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
                    Get in{" "}
                    <span className="text-st-red text-glow">Touch</span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Have a project in mind or just want to say hi?{" "}
                    <span className="text-gray-300">I&apos;d love to hear from you.</span>
                </p>
            </motion.div>

            {/* Main layout */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">

                {/* Left — info */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 flex flex-col gap-5"
                >
                    {/* Contact items */}
                    <div className="glass rounded-3xl p-7 border border-white/6 flex flex-col gap-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-st-red/50 to-transparent" />

                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-5 bg-st-red rounded-full" />
                            <h2 className="text-sm font-black uppercase tracking-[0.15em] text-gray-300">Contact Info</h2>
                        </div>

                        {contactInfo.map((info, i) => (
                            <motion.a
                                key={i}
                                href={info.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 group cursor-pointer"
                            >
                                <div
                                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white flex-shrink-0 group-hover:shadow-lg transition-all`}
                                    style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 20px ${info.glow}`)}
                                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`)}
                                >
                                    {info.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">{info.label}</p>
                                    <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{info.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="glass rounded-3xl p-7 border border-white/6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1 h-5 bg-st-red rounded-full" />
                            <h2 className="text-sm font-black uppercase tracking-[0.15em] text-gray-300">Find me on</h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            {socials.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.08 }}
                                >
                                    <Link
                                        href={s.href}
                                        target="_blank"
                                        className="flex items-center gap-3 p-3 rounded-xl glass border border-white/5 hover:border-st-red/25 hover:bg-st-red/5 transition-all group"
                                    >
                                        <div className="text-gray-500 group-hover:text-st-red transition-colors">
                                            {s.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{s.label}</p>
                                            <p className="text-[10px] text-gray-600">{s.handle}</p>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-st-red ml-auto transition-all group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right — form */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="md:col-span-3"
                >
                    <div className="glass rounded-3xl p-8 border border-white/6 h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-st-red/50 to-transparent" />

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-5 bg-st-red rounded-full" />
                            <h2 className="text-sm font-black uppercase tracking-[0.15em] text-gray-300">Send a Message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        onFocus={() => setFocused("name")}
                                        onBlur={() => setFocused(null)}
                                        className={inputClass("name")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        onFocus={() => setFocused("email")}
                                        onBlur={() => setFocused(null)}
                                        className={inputClass("email")}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">Subject</label>
                                <input
                                    name="subject"
                                    type="text"
                                    placeholder="Project collaboration..."
                                    onFocus={() => setFocused("subject")}
                                    onBlur={() => setFocused(null)}
                                    className={inputClass("subject")}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project or just say hello..."
                                    onFocus={() => setFocused("message")}
                                    onBlur={() => setFocused(null)}
                                    className={inputClass("message") + " resize-none"}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || isSuccess}
                                whileHover={!isLoading && !isSuccess ? { scale: 1.02 } : {}}
                                whileTap={{ scale: 0.98 }}
                                className="w-full relative py-4 rounded-xl font-bold text-sm text-white overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                style={{
                                    background: isSuccess
                                        ? "linear-gradient(135deg, #059669, #10b981)"
                                        : "linear-gradient(135deg, #ff3333, #cc1111)",
                                    boxShadow: isSuccess
                                        ? "0 0 25px rgba(16,185,129,0.4)"
                                        : "0 0 25px rgba(255,51,51,0.4), 0 0 50px rgba(255,51,51,0.15)",
                                }}
                            >
                                {/* Shimmer */}
                                {!isSuccess && !isLoading && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
                                )}

                                <span className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                    ) : isSuccess ? (
                                        <><CheckCircle className="w-4 h-4" /> Message Prepared!</>
                                    ) : (
                                        <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /></>
                                    )}
                                </span>
                            </motion.button>

                            {isSuccess && (
                                <motion.p
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-emerald-400 text-center font-medium flex items-center justify-center gap-2"
                                >
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    Opening your email client...
                                </motion.p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
