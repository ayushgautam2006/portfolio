"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TechStack } from "@/components/TechStack";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const featuredProjects = [
  {
    title: "MES",
    description: "Manufacturing Execution System built with TypeScript. A complex full-stack application.",
    tags: ["TypeScript", "Full Stack", "Web App"],
    github: "https://github.com/ayushgautam2006/MES",
    demo: "https://mes.nitrkl.ac.in/",
  },
  {
    title: "Hand Detection",
    description: "Computer vision project using Python for real-time hand detection and tracking.",
    tags: ["Python", "OpenCV", "AI/ML"],
    github: "https://github.com/ayushgautam2006/hand-detection",
    demo: "https://github.com/ayushgautam2006/hand-detection",
  },
  {
    title: "Squid Game Website",
    description: "Interactive website inspired by the popular series, featuring themed UI elements.",
    tags: ["JavaScript", "HTML/CSS", "Creative"],
    github: "https://github.com/ayushgautam2006/squidgame_website",
    demo: "https://squidgame-website.vercel.app/",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-12 gap-24 pt-32 md:pt-40">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left Column - Intro */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-st-red font-medium tracking-wide uppercase text-sm">Full Stack Developer</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-4 leading-tight">
              Building digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">experiences.</span>
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-xl leading-relaxed">
              I&apos;m Ayush Gautam. I build accessible, pixel-perfect, and performant web applications.
              Focused on creating intuitive user interfaces with modern technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link href="/contact">
              <Button size="lg" className="gap-2 rounded-full">
                Contact Me <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <Button variant="secondary" size="lg" className="gap-2 rounded-full">
                Resume <FileText className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-6 mt-8"
          >
            <SocialIcon href="https://github.com/ayushgautam2006" icon={<Github />} />
            <SocialIcon href="https://www.instagram.com/ayushhhpr/" icon={<Instagram />} />
            <SocialIcon href="https://www.linkedin.com/in/ayush-gautam-964050327" icon={<Linkedin />} />
            <SocialIcon href="mailto:ayushgau2006@gmail.com" icon={<Mail />} />
          </motion.div>
        </div>

        {/* Right Column - Profile Image */}
        <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden relative z-10">
              <Image
                src="/profile-new.jpg"
                alt="Ayush Gautam"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-st-red/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-st-red/5 rounded-2xl -z-10" />
          </motion.div>
        </div>

      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
      >
        <StatCard number="2+" label="Years Experience" />
        <StatCard number="20+" label="Projects Built" />
        <StatCard number="10+" label="Tech Stack" />
        <StatCard number="100%" label="Commitment" />
      </motion.div>

      {/* Tech Stack Section */}
      <TechStack />

      {/* Featured Projects Section */}
      <div className="w-full max-w-7xl flex flex-col gap-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400">Some of my recent work.</p>
          </div>
          <Link href="/projects">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between group hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-st-red transition-colors">{project.title}</h3>
                    <div className="flex gap-2">
                      <Link href={project.github} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </Link>
                      <Link href={project.demo} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/5 rounded-full text-[10px] font-medium text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-gray-400 hover:text-st-red transition-colors"
    >
      {icon}
    </Link>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
      <span className="text-3xl font-bold text-white">{number}</span>
      <span className="text-sm text-gray-400 mt-1">{label}</span>
    </div>
  );
}
