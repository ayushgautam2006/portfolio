"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

// ─── Types ──────────────────────────────────────────────

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


// ─── Animation Variants ─────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.8]
  );

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, scale, opacity }}>{children}</motion.div>
    </section>
  );
}

// ─── Project Card ───────────────────────────────────────

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
        className="group rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.2] transition-all duration-300 p-6 md:p-8 relative overflow-hidden h-full flex flex-col justify-between"
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
        </div>

        <div className="flex flex-wrap gap-2 mt-4 relative z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) =>
        setProjects(
          data.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }))
        )
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div className="grid-bg" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* ═══════════════ HEADER ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 pt-40 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Projects" number="01" />
            <h1 className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-[0.85] text-white tracking-wide">
              SELECTED
              <br />
              <span className="text-accent text-glow">WORK</span>
            </h1>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="text-[#999] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            A collection of projects I&apos;ve built to solve real problems and
            explore new technologies.
          </motion.p>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ PROJECTS GRID ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {loading ? (
            // Skeleton cards while loading
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] animate-pulse"
              />
            ))
          ) : projects.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-[#333]">
              <p className="text-sm">No projects found.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div key={project.id || index} variants={staggerItem} className="h-full">
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))
          )}
        </motion.div>
      </ParallaxSection>

      <div className="h-16" />
    </div>
  );
}
