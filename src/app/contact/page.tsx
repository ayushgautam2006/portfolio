"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "ayushgau2006@gmail.com",
    href: "mailto:ayushgau2006@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 9234268898",
    href: "tel:+919234268898",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "S.D. Hall, NIT Rourkela",
    href: "#",
  },
];

const socials = [
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/ayushgautam2006",
    handle: "@ayushgautam2006",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayush-gautam-964050327",
    handle: "in/ayush-gautam",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    label: "Instagram",
    href: "https://www.instagram.com/ayushhhpr/",
    handle: "@ayushhhpr",
  },
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

// ─── Main Page ──────────────────────────────────────────

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
    `w-full px-4 py-3.5 rounded-xl text-white placeholder-[#333] text-sm font-medium outline-none transition-all duration-300 ${
      focused === name
        ? "border border-accent/40 bg-accent/[0.04] shadow-[0_0_20px_rgba(255,90,0,0.08),inset_0_0_20px_rgba(255,90,0,0.02)]"
        : "border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
    }`;

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div className="grid-bg" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* ═══════════════ HEADER ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 pt-40 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={depthEntrance}>
            <SectionLabel label="Contact" number="01" />
            <h1 className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-[0.85] text-white tracking-wide">
              LET&apos;S BUILD
              <br />
              SOMETHING{" "}
              <span className="text-accent text-glow">TOGETHER</span>
            </h1>
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="text-[#999] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Have a project in mind or just want to say hi?{" "}
            <span className="text-white">I&apos;d love to hear from you.</span>
          </motion.p>
        </motion.div>
      </ParallaxSection>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══════════════ CONTACT FORM + INFO ═══════════════ */}
      <ParallaxSection className="w-full max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {/* Contact items */}
            <TiltCard intensity={4}>
              <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-7 relative overflow-hidden flex flex-col gap-5">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <SectionLabel label="Contact Info" number="—" />
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={i}
                    href={info.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/[0.12] transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium text-[#999] group-hover:text-white transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </TiltCard>

            {/* Socials */}
            <TiltCard intensity={4}>
              <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <SectionLabel label="Find Me On" number="—" />
                <div className="flex flex-col gap-3">
                  {socials.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <Link
                        href={s.href}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/[0.2] hover:bg-accent/[0.04] transition-all duration-300 group"
                      >
                        <div className="text-[#555] group-hover:text-accent transition-colors duration-300">
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#999] group-hover:text-white transition-colors duration-300">
                            {s.label}
                          </p>
                          <p className="text-[10px] text-[#333]">{s.handle}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#333] group-hover:text-accent ml-auto transition-all duration-300 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="md:col-span-3"
          >
            <TiltCard intensity={4} className="h-full">
              <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <SectionLabel label="Send a Message" number="—" />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold mb-2 text-[#333] uppercase tracking-[0.2em]">
                        Name
                      </label>
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
                      <label className="block text-[10px] font-semibold mb-2 text-[#333] uppercase tracking-[0.2em]">
                        Email
                      </label>
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
                    <label className="block text-[10px] font-semibold mb-2 text-[#333] uppercase tracking-[0.2em]">
                      Subject
                    </label>
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
                    <label className="block text-[10px] font-semibold mb-2 text-[#333] uppercase tracking-[0.2em]">
                      Message
                    </label>
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
                    whileHover={
                      !isLoading && !isSuccess
                        ? {
                            scale: 1.02,
                            boxShadow: "0 0 40px rgba(255,90,0,0.3)",
                          }
                        : {}
                    }
                    whileTap={{ scale: 0.97 }}
                    className="w-full relative py-4 rounded-xl font-semibold text-sm text-white overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                    style={{
                      background: isSuccess
                        ? "linear-gradient(135deg, #059669, #10b981)"
                        : "linear-gradient(135deg, #FF5A00, #C2410C)",
                      boxShadow: isSuccess
                        ? "0 0 25px rgba(16,185,129,0.4)"
                        : "0 0 25px rgba(255,90,0,0.3), 0 0 50px rgba(255,90,0,0.1)",
                    }}
                  >
                    {/* Shimmer */}
                    {!isSuccess && !isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
                    )}

                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Message Prepared!
                        </>
                      ) : (
                        <>
                          Send Message{" "}
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {isSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-green-400 text-center font-medium flex items-center justify-center gap-2"
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Opening your email client...
                    </motion.p>
                  )}
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </ParallaxSection>

      <div className="h-16" />
    </div>
  );
}
