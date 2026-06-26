"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// ─── Data ───────────────────────────────────────────────

const communities = [
  {
    name: "Cyborg: Robotics & Automation",
    role: "Robotics Team Member",
    description:
      "Working on robotics projects, automation systems, and participating in technical competitions at NIT Rourkela.",
    image:
      "https://res.cloudinary.com/webwiznitr/image/upload/f_auto,q_70/v1679160025/Group_14_zfj3sc.png",
    number: "01",
  },
  {
    name: "Webwiz",
    role: "Developer",
    description:
      "Building and maintaining official websites for the institute and organizing web development workshops.",
    image: "https://webwiznitr.netlify.app/static/media/logo.cd0dd8f3.ico",
    number: "02",
  },
  {
    name: "MES",
    role: "Technical Team Member",
    description:
      "Contributing to the technical team by developing websites and managing digital assets for the society.",
    image:
      "https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg",
    number: "03",
  },
];

// ─── Animation Variants ─────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

// ─── Community Card ─────────────────────────────────────

function CommunityCard({
  community,
}: {
  community: (typeof communities)[0];
}) {
  return (
    <TiltCard intensity={6}>
      <motion.div
        whileHover={{
          scale: 1.01,
          boxShadow:
            "0 0 40px rgba(255,90,0,0.1), 0 30px 60px rgba(0,0,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-accent/[0.2] transition-all duration-300 p-6 md:p-8 relative overflow-hidden"
      >
        {/* Top gradient line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          {/* Logo */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/[0.06] border border-accent/[0.12] flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-accent/[0.25] transition-colors duration-300">
            {community.image ? (
              <Image
                src={community.image}
                alt={community.name}
                fill
                className="object-cover p-2"
              />
            ) : (
              <Users className="w-8 h-8 text-accent" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-accent/30 font-mono text-[10px]">
                {community.number}
              </span>
              <h2 className="font-display text-2xl md:text-3xl tracking-wide text-white group-hover:text-accent transition-colors duration-300">
                {community.name}
              </h2>
            </div>
            <p className="text-[11px] font-semibold text-accent uppercase tracking-[0.2em] mb-3">
              {community.role}
            </p>
            <p className="text-[#555] text-sm leading-relaxed">
              {community.description}
            </p>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div className="grid-bg" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* ═══════════════ HEADER ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 pt-40 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Community" number="01" />
            <h1 className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-[0.85] text-white tracking-wide">
              BUILT WITH
              <br />
              <span className="text-accent text-glow">COMMUNITY</span>
            </h1>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="text-[#999] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Being part of communities helps me grow and give back to the
            ecosystem. Here are the groups I&apos;m proud to be a part of.
          </motion.p>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ COMMUNITIES ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-6"
        >
          {communities.map((community, index) => (
            <motion.div key={index} variants={staggerItem}>
              <CommunityCard community={community} />
            </motion.div>
          ))}
        </motion.div>
      </ParallaxSection>

      <div className="h-16" />
    </div>
  );
}
