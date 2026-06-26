"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Brain,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Monitor,
  Palette,
  Terminal,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────

const timeline = [
  {
    year: "2021",
    title: "Started Coding",
    description:
      "Began my journey with HTML, CSS, and JavaScript. Built my first static websites and fell in love with making things for the web.",
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    year: "2023",
    title: "Joined NIT Rourkela",
    description:
      "Entered one of India's premier technical institutes. Began exploring competitive programming and advanced data structures.",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    year: "2024",
    title: "Full Stack Development",
    description:
      "Deep-dived into React and Node.js. Started building complex web applications, REST APIs, and contributed to open source.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    year: "Present",
    title: "ML Engineer & Full Stack",
    description:
      "Working as an ML Engineer and Full Stack Developer. Mastering Next.js, TypeScript, and building data-driven ML solutions.",
    icon: <Briefcase className="w-4 h-4" />,
  },
];

const skills = [
  {
    category: "Frontend",
    icon: <Monitor className="w-4 h-4" />,
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: <Terminal className="w-4 h-4" />,
    items: ["Node.js / Express", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    icon: <Database className="w-4 h-4" />,
    items: ["PostgreSQL", "MongoDB", "Prisma / Supabase"],
  },
  {
    category: "DevOps & Tools",
    icon: <Cpu className="w-4 h-4" />,
    items: ["Git / GitHub", "Vercel / Netlify", "Docker", "Figma"],
  },
  {
    category: "Machine Learning",
    icon: <Brain className="w-4 h-4" />,
    items: ["Pandas & NumPy", "Scikit-Learn", "Matplotlib & Seaborn", "Python"],
  },
];

const interests = [
  { icon: <Globe className="w-5 h-5" />, label: "Web Development" },
  { icon: <Brain className="w-5 h-5" />, label: "AI / ML" },
  { icon: <Palette className="w-5 h-5" />, label: "UI / UX Design" },
  { icon: <Code2 className="w-5 h-5" />, label: "Open Source" },
];

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

// (SkillBar removed)

// ─── Main Page ──────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div className="grid-bg" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* ═══════════════ HEADER ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 pt-40 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="About Me" number="01" />
            <h1 className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-[0.85] text-white tracking-wide">
              CRAFTING CODE,
              <br />
              <span className="text-accent text-glow">SHAPING IDEAS</span>
            </h1>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="text-[#999] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            I&apos;m a passionate Full Stack Developer at{" "}
            <span className="text-white font-semibold">NIT Rourkela</span>, who
            loves building things. Here&apos;s a glimpse into my journey.
          </motion.p>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ TIMELINE + SKILLS ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Timeline — left col */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <TiltCard intensity={4}>
              <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <SectionLabel label="My Journey" number="—" />

                <div className="relative flex flex-col gap-0">
                  <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.6 }}
                      className="relative flex gap-5 pl-10 pb-8 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-accent/30 border-2 border-accent/60 z-10" />
                      <div>
                        <span className="text-xs font-mono text-accent tracking-wider">
                          {item.year}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-0.5 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#555] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Skills — right col */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {skills.map((skillGroup, gi) => (
              <TiltCard key={gi} intensity={4}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.1 + gi * 0.08, duration: 0.6 }}
                  whileHover={{
                    boxShadow:
                      "0 0 25px rgba(255,90,0,0.08), 0 15px 30px rgba(0,0,0,0.4)",
                  }}
                  className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.15] transition-all duration-300 p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center text-accent">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#999]">
                      {skillGroup.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, si) => (
                      <span key={si} className="tech-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ INTERESTS ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-8"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Interests" number="02" />
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-white">
              WHAT I
              <br />
              <span className="text-accent">LOVE</span>
            </h2>
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {interests.map((item, i) => (
              <TiltCard key={i} intensity={6}>
                <motion.div
                  whileHover={{
                    boxShadow:
                      "0 0 25px rgba(255,90,0,0.1), 0 15px 30px rgba(0,0,0,0.4)",
                  }}
                  className="group rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.15] transition-all duration-300 p-6 flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center text-accent group-hover:bg-accent/[0.12] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-[#999] group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <div className="h-16" />
    </div>
  );
}
