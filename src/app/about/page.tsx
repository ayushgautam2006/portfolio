"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Briefcase, Code2, Cpu, Globe, Layers, Monitor, Palette, Terminal, Zap } from "lucide-react";

const timeline = [
    {
        year: "2021",
        title: "Started Coding",
        description: "Began my journey with HTML, CSS, and JavaScript. Built my first static websites and fell in love with making things for the web.",
        icon: <Code2 className="w-4 h-4" />,
        color: "from-blue-500 to-indigo-600",
    },
    {
        year: "2023",
        title: "Joined NIT Rourkela",
        description: "Entered one of India's premier technical institutes. Began exploring competitive programming and advanced data structures.",
        icon: <BookOpen className="w-4 h-4" />,
        color: "from-violet-500 to-purple-600",
    },
    {
        year: "2024",
        title: "Full Stack Development",
        description: "Deep-dived into React and Node.js. Started building complex web applications, REST APIs, and contributed to open source.",
        icon: <Layers className="w-4 h-4" />,
        color: "from-emerald-500 to-teal-600",
    },
    {
        year: "Present",
        title: "Professional Experience",
        description: "Working on real-world projects, mastering Next.js, TypeScript and exploring AI integration in modern web apps.",
        icon: <Briefcase className="w-4 h-4" />,
        color: "from-st-red to-red-700",
    },
];

const skills = [
    { category: "Frontend", icon: <Monitor className="w-4 h-4" />, items: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Framer Motion", level: 75 },
    ]},
    { category: "Backend", icon: <Terminal className="w-4 h-4" />, items: [
        { name: "Node.js / Express", level: 82 },
        { name: "PostgreSQL", level: 70 },
        { name: "Prisma / Supabase", level: 72 },
        { name: "REST APIs", level: 88 },
    ]},
    { category: "DevOps & Tools", icon: <Cpu className="w-4 h-4" />, items: [
        { name: "Git / GitHub", level: 90 },
        { name: "Vercel / Netlify", level: 82 },
        { name: "Docker", level: 55 },
        { name: "Figma", level: 68 },
    ]},
];

const interests = [
    { icon: <Globe className="w-5 h-5" />, label: "Web Development" },
    { icon: <Zap className="w-5 h-5" />, label: "AI / ML" },
    { icon: <Palette className="w-5 h-5" />, label: "UI / UX Design" },
    { icon: <Code2 className="w-5 h-5" />, label: "Open Source" },
];

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="space-y-1.5">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-xs font-mono text-st-red">{level}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-st-red to-red-400 relative"
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </motion.div>
            </div>
        </div>
    );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: index * 0.12, type: "spring", bounce: 0.2 }}
            className="relative flex gap-5"
        >
            {/* Line */}
            {index < timeline.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-gradient-to-b from-white/15 to-transparent" />
            )}

            {/* Icon */}
            <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
            </div>

            {/* Content */}
            <div className="pb-8">
                <span className="text-xs font-mono text-st-red tracking-wider">{item.year}</span>
                <h3 className="text-lg font-bold text-white mt-0.5 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">{item.description}</p>
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center gap-16 pt-32 md:pt-40 pb-24 px-4 md:px-8 relative">

            {/* Ambient glow */}
            <div className="pointer-events-none fixed top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-st-red/4 blur-[120px] animate-pulse-glow" />

            {/* Header */}
            <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-2xl relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-red mb-6">
                    <span className="text-st-red font-semibold tracking-[0.18em] uppercase text-[10px]">About Me</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    Crafting Code,{" "}
                    <span className="text-st-red text-glow">Shaping Ideas</span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    I&apos;m a passionate Full Stack Developer at{" "}
                    <span className="text-white font-semibold">NIT Rourkela</span>, who loves
                    building things. Here&apos;s a glimpse into my journey.
                </p>
            </motion.div>

            {/* Main grid */}
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Timeline — left col */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-5"
                >
                    <div className="glass rounded-3xl p-8 border border-white/6 h-full relative overflow-hidden">
                        {/* Top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-st-red/50 to-transparent" />

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-5 bg-st-red rounded-full" />
                            <h2 className="text-xl font-black uppercase tracking-wider">My Journey</h2>
                        </div>

                        <div className="space-y-0">
                            {timeline.map((item, i) => (
                                <TimelineItem key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right col */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Skills */}
                    {skills.map((skillGroup, gi) => (
                        <motion.div
                            key={gi}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + gi * 0.1 }}
                            className="glass rounded-3xl p-7 border border-white/6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <div className="flex items-center gap-2.5 mb-6">
                                <div className="w-8 h-8 rounded-xl glass-red border border-st-red/20 flex items-center justify-center text-st-red">
                                    {skillGroup.icon}
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300">{skillGroup.category}</h3>
                            </div>

                            <div className="space-y-4">
                                {skillGroup.items.map((skill, si) => (
                                    <SkillBar key={si} name={skill.name} level={skill.level} delay={gi * 0.1 + si * 0.08} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interests row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl w-full relative z-10"
            >
                <div className="section-divider mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {interests.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -4, scale: 1.03 }}
                            className="glass card-hover rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-st-red/10 border border-st-red/20 flex items-center justify-center text-st-red">
                                {item.icon}
                            </div>
                            <span className="text-sm font-semibold text-gray-300">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
