"use client";

import { TechStack } from "@/components/TechStack";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";



// ─── Types ───────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  number?: string;
}

// ─── Data ───────────────────────────────────────────────

const stats = [
  { number: 2, suffix: "+", label: "Years Coding" },
  { number: 10, suffix: "+", label: "Projects Built" },
  { number: 10, suffix: "+", label: "Technologies" },
  { number: 100, suffix: "%", label: "Commitment" },
];

const experience = [
  {
    title: "B.Tech in Mining",
    org: "NIT Rourkela",
    period: "2024 — Present",
    description:
      "Pursuing Mining Engineering .",
    type: "education" as const,
  },
  {
    title: "Full Stack Developer",
    org: "WebWiz — NIT Rourkela",
    period: "2024 — Present",
    description:
      "Building and maintaining web applications for college festivals and organizational platforms. Led development of MES and Nitrutsav.",
    type: "work" as const,
  },
];

const words = [
  "Intelligent Systems.",
  "Web Applications.",
  "Data Solutions.",
  "ML Models.",
];

// ─── Hooks ──────────────────────────────────────────────

function useTypewriter(wordList: string[], speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = wordList[wordIdx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          speed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          speed / 2
        );
        return () => clearTimeout(t);
      } else {
        setWordIdx((i) => (i + 1) % wordList.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIdx, wordList, speed, pause]);

  return displayed;
}

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ─── Animation Variants ─────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const depthEntrance = {
  hidden: { opacity: 0, y: 80, scale: 0.95, rotateX: -5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// ─── Section Label ──────────────────────────────────────

function SectionLabel({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-accent/30 font-mono text-xs">{number}</span>
      <div className="w-8 h-px bg-accent/30" />
      <span className="text-accent text-[11px] font-semibold uppercase tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

// ─── 3D Tilt Card ───────────────────────────────────────

function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Parallax Section ───────────────────────────────────

function ParallaxSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.96, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8]);

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, scale, opacity }}>{children}</motion.div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function Home() {
  const typedText = useTypewriter(words);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, -80]);
  const heroOrbitalY = useTransform(heroScrollProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  // Fetch featured projects from API
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects?featured=true")
      .then((r) => r.json())
      .then((data: Project[]) =>
        setProjects(
          data.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }))
        )
      )
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      {/* Grid background */}
      <div className="grid-bg" />

      {/* ═══════════════ HERO — SPLIT SCREEN ═══════════════ */}
      <section
        ref={heroRef}
        className="min-h-screen w-full flex items-center relative overflow-hidden"
      >
        {/* Ambient orange glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col items-center justify-center text-center gap-8"
        >
          {/* LEFT — Giant Typography */}
          <motion.div
            style={{ y: heroTextY }}
            className="flex flex-col items-center justify-center text-center gap-6 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/[0.15] bg-accent/[0.04] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-pulse" />
                <span className="text-[#999] font-medium tracking-wide text-[10px] uppercase">
                  Available for work
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display font-bold text-[clamp(4rem,12vw,10rem)] leading-[0.85] text-white tracking-wide">
                AYUSH
                <br />
                <span className="text-accent">GAUTAM</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base md:text-lg text-[#555] tracking-tight"
            >
              Engineering{" "}
              <span className="gradient-text-hero">{typedText}</span>
              <span className="animate-blink text-accent">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[#999] text-sm md:text-base max-w-md leading-relaxed"
            >
              Developer at{" "}
              <span className="text-white font-medium">NIT Rourkela</span>{" "}
              crafting fast, accessible, and pixel-perfect web applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-accent/[0.15] flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-accent/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <ParallaxSection
        id="about"
        className="w-full max-w-5xl mx-auto px-6 py-32"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-10"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="About" number="01" />
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-white">
              A DEVELOPER WHO
              <br />
              CARES ABOUT{" "}
              <span className="text-accent text-glow">CRAFT</span>
            </h2>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-[#999] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            When I&apos;m not coding, I&apos;m exploring new technologies,
            contributing to open-source projects, and working on data-driven
            solutions that solve real problems.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ SKILLS ═══════════════ */}
      <ParallaxSection
        id="skills"
        className="w-full max-w-5xl mx-auto px-6 py-32"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Skills" number="02" />
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-white">
              TECHNOLOGY
              <br />
              <span className="text-accent">ARSENAL</span>
            </h2>
            <p className="text-[#555] mt-4 text-sm max-w-md">
              The tools and frameworks I use to build modern web experiences.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <TechStack />
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <ParallaxSection
        id="projects"
        className="w-full max-w-5xl mx-auto px-6 py-32"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Projects" number="03" />
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-white">
              SELECTED
              <br />
              <span className="text-accent">WORK</span>
            </h2>
            <p className="text-[#555] mt-4 text-sm">
              A few things I&apos;ve built recently.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                custom={index}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ EXPERIENCE ═══════════════ */}
      <ParallaxSection
        id="experience"
        className="w-full max-w-5xl mx-auto px-6 py-32"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Experience" number="04" />
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-white">
              WHERE I&apos;VE
              <br />
              <span className="text-accent">BEEN</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-6">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />

            {experience.map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                custom={index}
              >
                <ExperienceCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ CONTACT ═══════════════ */}
      <ParallaxSection
        id="contact"
        className="w-full max-w-5xl mx-auto px-6 py-32"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center gap-8 relative"
        >
          {/* Floating orbit rings (CSS) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="orbit-ring w-[300px] h-[300px]"
              style={{ animation: "ring-pulse 4s ease-in-out infinite" }}
            />
            <div
              className="orbit-ring w-[500px] h-[500px]"
              style={{
                borderColor: "rgba(255,90,0,0.05)",
                animation: "ring-pulse 6s ease-in-out infinite 1s",
              }}
            />
            <div
              className="orbit-ring w-[700px] h-[700px]"
              style={{
                borderColor: "rgba(255,90,0,0.03)",
                animation: "ring-pulse 8s ease-in-out infinite 2s",
              }}
            />
          </div>

          {/* Orange glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <motion.div variants={staggerItem}>
            <SectionLabel label="Contact" number="05" />
          </motion.div>

          <motion.h2
            variants={depthEntrance}
            className="font-display text-5xl md:text-8xl tracking-wide text-white relative z-10"
          >
            LET&apos;S BUILD
            <br />
            SOMETHING{" "}
            <span className="text-accent text-glow">TOGETHER</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-[#999] max-w-md text-base relative z-10"
          >
            Have a project in mind or just want to chat? I&apos;m always open
            to discussing new opportunities and ideas.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-4 justify-center relative z-10"
          >
            <Link href="mailto:ayushgau2006@gmail.com">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(255,90,0,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm cursor-pointer"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <div className="h-16" />
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const { count, ref } = useCounter(stat.number);

  return (
    <TiltCard intensity={8}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, rotateX: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        whileHover={{
          boxShadow: "0 0 25px rgba(255,90,0,0.1), 0 15px 30px rgba(0,0,0,0.4)",
        }}
        className="flex flex-col items-center text-center py-6 px-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.15] transition-colors duration-300"
      >
        <span className="font-display text-4xl md:text-5xl text-white counter-value">
          {count}
          {stat.suffix}
        </span>
        <span className="text-[10px] text-[#555] mt-2 uppercase tracking-[0.15em]">
          {stat.label}
        </span>
      </motion.div>
    </TiltCard>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <TiltCard intensity={10}>
      <motion.div
        whileHover={{
          scale: 1.01,
          boxShadow:
            "0 0 40px rgba(255,90,0,0.12), 0 30px 60px rgba(0,0,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.2] transition-all duration-300 p-6 md:p-8 relative overflow-hidden"
      >
        {/* Top gradient line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col gap-4 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-accent/20 font-mono text-xs">
                {project.number}
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={project.github}
                target="_blank"
                className="text-[#555] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.04]"
                aria-label={`${project.title} GitHub`}
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href={project.demo}
                target="_blank"
                className="text-[#555] hover:text-accent transition-colors p-2 rounded-lg hover:bg-accent/[0.06]"
                aria-label={`${project.title} Live Demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <p className="text-[#999] text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function ExperienceCard({ item }: { item: (typeof experience)[0] }) {
  return (
    <TiltCard intensity={6} className="pl-10">
      <motion.div
        whileHover={{
          boxShadow: "0 0 20px rgba(255,90,0,0.08), 0 15px 30px rgba(0,0,0,0.3)",
        }}
        className="group rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.15] transition-all duration-300 p-6 md:p-8 relative"
      >
        {/* Timeline dot */}
        <div className="absolute -left-[33px] top-8 w-3 h-3 rounded-full bg-accent/30 border-2 border-accent/60" />

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center">
                {item.type === "education" ? (
                  <GraduationCap className="w-4 h-4 text-accent" />
                ) : (
                  <Briefcase className="w-4 h-4 text-accent" />
                )}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-[#555] text-sm">{item.org}</p>
              </div>
            </div>
            <span className="text-[#555] text-xs font-mono whitespace-nowrap mt-1">
              {item.period}
            </span>
          </div>
          <p className="text-[#999] text-sm leading-relaxed pl-12">
            {item.description}
          </p>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="text-[#555] hover:text-accent transition-colors duration-300"
    >
      {icon}
    </Link>
  );
}
