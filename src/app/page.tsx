"use client";


import { Button } from "@/components/ui/Button";
import { TechStack } from "@/components/TechStack";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, FileText, Github, Instagram, Linkedin, Mail, Sparkles, Code2, Zap, Layers, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const featuredProjects = [
  {
    title: "MES",
    description: "Manufacturing Execution System built with TypeScript. A complex full-stack application managing production workflows and real-time data.",
    tags: ["TypeScript", "Full Stack", "Web App"],
    github: "https://github.com/ayushgautam2006/MES",
    demo: "https://mes.nitrkl.ac.in/",
    gradient: "from-blue-500 to-indigo-600",
    accentColor: "rgba(99,102,241,0.15)",
    borderColor: "rgba(99,102,241,0.3)",
    icon: <Layers className="w-5 h-5" />,
    number: "01",
  },
  {
    title: "Hand Detection",
    description: "Computer vision project using Python for real-time hand detection and tracking via OpenCV and ML pipelines.",
    tags: ["Python", "OpenCV", "AI/ML"],
    github: "https://github.com/ayushgautam2006/hand-detection",
    demo: "https://github.com/ayushgautam2006/hand-detection",
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "rgba(16,185,129,0.12)",
    borderColor: "rgba(16,185,129,0.3)",
    icon: <Zap className="w-5 h-5" />,
    number: "02",
  },
  {
    title: "Squid Game Website",
    description: "Interactive website inspired by the popular series, featuring immersive themed UI elements and creative animations.",
    tags: ["JavaScript", "HTML/CSS", "Creative"],
    github: "https://github.com/ayushgautam2006/squidgame_website",
    demo: "https://squidgame-website.vercel.app/",
    gradient: "from-pink-500 to-rose-600",
    accentColor: "rgba(244,63,94,0.12)",
    borderColor: "rgba(244,63,94,0.3)",
    icon: <Code2 className="w-5 h-5" />,
    number: "03",
  },
];

const stats = [
  { number: 2, suffix: "+", label: "Years Coding", icon: "⚡" },
  { number: 20, suffix: "+", label: "Projects Built", icon: "🚀" },
  { number: 10, suffix: "+", label: "Technologies", icon: "🛠️" },
  { number: 100, suffix: "%", label: "Commitment", icon: "🎯" },
];

const words = ["Experiences.", "Interfaces.", "Solutions.", "Ideas."];

// Typewriter hook
function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = words[wordIdx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIdx, words, speed, pause]);

  return displayed;
}

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// Particle stars background
function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/20"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// 3D Tilt Profile Card
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

// Animated code terminal line
function CodeLine({ delay, indent = 0, plain, comment, keyword, name, op, prop, value, bool, array, color }: {
  delay: number; indent?: number; plain?: string; comment?: string;
  keyword?: string; name?: string; op?: string; prop?: string;
  value?: string; bool?: boolean; array?: boolean; color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex"
      style={{ paddingLeft: indent * 20 }}
    >
      {plain && <span className="text-gray-400">{plain}</span>}
      {comment && <span className="text-gray-600 italic">{comment}</span>}
      {keyword && <span className={color ?? "text-violet-400"}>{keyword}</span>}
      {name && <span className="text-blue-300">{name}</span>}
      {op && <span className="text-gray-400">{op} {"{"}</span>}
      {prop && (
        <span>
          <span className="text-sky-300">{prop}</span>
          <span className="text-gray-500">: </span>
          <span className={bool ? "text-orange-400" : array ? "text-yellow-300" : "text-green-300"}>{value}</span>
          <span className="text-gray-600">,</span>
        </span>
      )}
    </motion.div>
  );
}

export default function Home() {
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, { stiffness: 90, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 90, damping: 22 });
  const typedText = useTypewriter(words);

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-32 pt-28 md:pt-36 pb-24 relative">
      <StarField />

      {/* Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed z-0 rounded-full"
        style={{
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(255,51,51,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed top-[-150px] left-[5%] w-[600px] h-[600px] rounded-full bg-st-red/5 blur-[140px] animate-pulse-glow" />
      <div className="pointer-events-none fixed bottom-[5%] right-[3%] w-[500px] h-[500px] rounded-full bg-red-900/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none fixed top-[40%] left-[-5%] w-[300px] h-[300px] rounded-full bg-red-800/6 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* === HERO === */}
      <section className="max-w-7xl w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-red mb-8 group cursor-default">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-st-red" />
              </motion.div>
              <span className="text-st-red font-semibold tracking-[0.18em] uppercase text-[10px]">Full Stack Developer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.04]">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Building Digital
              </motion.span>
              <motion.span
                className="block mt-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="gradient-text-hero">
                  {typedText}
                </span>
                <span className="animate-blink text-st-red text-glow">|</span>
              </motion.span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-gray-400 mt-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              I&apos;m{" "}
              <span className="text-white font-bold relative">
                Ayush Gautam
                <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-gradient-to-r from-st-red to-transparent" />
              </span>{" "}
              — a developer at{" "}
              <span className="text-st-red font-semibold">NIT Rourkela</span> who crafts
              fast, accessible, and pixel-perfect web applications. Engineering precision
              meets creative design.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 px-7 py-3 rounded-full bg-st-red text-white font-bold text-sm overflow-hidden group"
                style={{ boxShadow: "0 0 25px rgba(255,51,51,0.4), 0 0 60px rgba(255,51,51,0.15)" }}
              >
                {/* Button shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
                Contact Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3 rounded-full glass border border-white/10 hover:border-white/20 text-white font-bold text-sm transition-all duration-300"
              >
                Resume <FileText className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex gap-4"
          >
            <SocialIcon href="https://github.com/ayushgautam2006" icon={<Github />} label="GitHub" />
            <SocialIcon href="https://www.instagram.com/ayushhhpr/" icon={<Instagram />} label="Instagram" />
            <SocialIcon href="https://www.linkedin.com/in/ayush-gautam-964050327" icon={<Linkedin />} label="LinkedIn" />
            <SocialIcon href="mailto:ayushgau2006@gmail.com" icon={<Mail />} label="Email" />
          </motion.div>
        </div>

        {/* Right — Animated Code Card */}
        <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative animate-float w-full max-w-sm"
          >
            {/* Rotating ring decorations */}
            <div className="absolute -inset-8 rounded-full border border-st-red/10 animate-rotate-slow" style={{ borderStyle: "dashed" }} />
            <div className="absolute -inset-16 rounded-full border border-white/5 animate-rotate-slow-reverse" style={{ borderStyle: "dashed" }} />

            {/* Glow halo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-st-red/20 via-red-900/8 to-transparent blur-3xl scale-125 animate-glow-ring" />

            {/* Code terminal card */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/8 glass-strong">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/4 border-b border-white/6">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-600 font-mono ml-3">ayush.tsx</span>
              </div>

              {/* Code lines */}
              <div className="p-5 font-mono text-sm leading-7 relative">
                <div className="scan-line" />
                <CodeLine delay={0.3} indent={0} color="text-violet-400" keyword="const" name=" developer" op=" =" />
                <CodeLine delay={0.4} indent={0} plain="{" />
                <CodeLine delay={0.5} indent={1} comment="// identity" />
                <CodeLine delay={0.6} indent={1} prop="name" value='"Ayush Gautam"' />
                <CodeLine delay={0.7} indent={1} prop="role" value='"Full Stack Dev"' />
                <CodeLine delay={0.8} indent={1} prop="uni" value='"NIT Rourkela"' />
                <CodeLine delay={0.9} indent={1} comment="// skills" />
                <CodeLine delay={1.0} indent={1} prop="stack" value='["Next.js", "TS", "Node"]' array />
                <CodeLine delay={1.1} indent={1} prop="available" value="true" bool />
                <CodeLine delay={1.2} indent={0} plain="}" />
              </div>
            </div>

            {/* Floating badge — Open to work */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, type: "spring" }}
              className="absolute -bottom-5 -left-6 glass-red-strong rounded-2xl px-4 py-3 z-20 shadow-2xl border border-st-red/20"
            >
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Currently</p>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                Open to Work
                <span className="w-2 h-2 bg-green-400 rounded-full animate-dot-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </p>
            </motion.div>

            {/* Floating badge — NIT */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute -top-4 -right-4 glass-strong rounded-xl px-3 py-2 z-20 border border-white/8 flex items-center gap-1.5"
            >
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">NIT Rourkela</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === STATS === */}
      <section className="max-w-7xl w-full px-4 md:px-8 relative z-10">
        <div className="section-divider mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
        <div className="section-divider mt-12" />
      </section>

      {/* === TECH STACK === */}
      <section className="w-full relative z-10">
        <TechStack />
      </section>

      {/* === FEATURED PROJECTS === */}
      <section className="max-w-7xl w-full px-4 md:px-8 flex flex-col gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-st-red" />
              <p className="text-st-red text-xs font-bold uppercase tracking-[0.2em]">Portfolio</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">Featured Projects</h2>
            <p className="text-gray-500 mt-2 text-sm">A selection of my recent builds.</p>
          </div>
          <Link href="/projects">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-gray-500 hover:text-white text-sm font-medium transition-colors group"
            >
              View All
              <ArrowUpRight className="w-4 h-4 group-hover:text-st-red transition-colors" />
            </motion.div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="max-w-7xl w-full px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,51,51,0.06) 0%, rgba(255,51,51,0.02) 50%, rgba(80,0,0,0.06) 100%)",
            border: "1px solid rgba(255,51,51,0.15)",
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-st-red/5 via-transparent to-st-red/5 pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-st-red/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" />

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-st-red/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-st-red/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-st-red/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-st-red/30 rounded-br-lg" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-st-red text-xs font-bold uppercase tracking-[0.2em] mb-4">Let&apos;s Collaborate</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Let&apos;s Build Something{" "}
              <span className="text-st-red text-glow">Extraordinary</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-10 text-sm md:text-base">
              Have a project in mind? I&apos;m always open to discussing new opportunities
              and creative collaborations.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-st-red text-white font-bold text-sm overflow-hidden group"
                style={{ boxShadow: "0 0 30px rgba(255,51,51,0.5), 0 0 60px rgba(255,51,51,0.2)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
                Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCounter(stat.number);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass card-hover rounded-2xl p-6 flex flex-col items-center text-center border border-white/5 relative overflow-hidden"
    >
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/2 to-transparent pointer-events-none" />
      <span className="text-2xl mb-3">{stat.icon}</span>
      <span className="text-4xl font-black text-white counter-value">
        {count}{stat.suffix}
      </span>
      <span className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.12em]">{stat.label}</span>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: "spring", bounce: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full glass rounded-2xl flex flex-col gap-4 border border-white/6 relative overflow-hidden group"
        style={{
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          ...(hovered ? {
            borderColor: project.borderColor,
            boxShadow: `0 0 40px ${project.accentColor}, 0 25px 60px rgba(0,0,0,0.5)`,
          } : {}),
        }}
      >
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.accentColor}, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg`}>
              {project.icon}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-600">{project.number}</span>
              <Link
                href={project.github}
                target="_blank"
                className="text-gray-600 hover:text-white transition-colors p-1.5 glass rounded-lg"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={project.demo}
                target="_blank"
                className="text-gray-600 hover:text-white transition-colors p-1.5 glass rounded-lg"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-st-red transition-colors duration-300">{project.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-500 hover:text-st-red border border-white/5 hover:border-st-red/30 transition-all duration-300 hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] hover:-translate-y-1 group"
    >
      <span className="w-4 h-4 group-hover:scale-110 transition-transform">{icon}</span>
    </Link>
  );
}
