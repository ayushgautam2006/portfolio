"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
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
    {
        title: "Basic Notes App",
        description: "Simple and efficient note-taking application built with EJS and Node.js.",
        tags: ["EJS", "Node.js", "Express"],
        github: "https://github.com/ayushgautam2006/basic-notes-app",
        demo: "https://github.com/ayushgautam2006/basic-notes-app",
    },
    {
        title: "Nitrutsav",
        description: "Official website for NIT Rourkela's annual cultural festival, featuring event schedules, registrations, and live updates for one of India's largest college cultural fests.",
        tags: ["TypeScript", "Web App"],
        github: "https://github.com/ayushgautam2006/project-zucchini",
        demo: "https://nitrutsav.in/",
    },
    {
        title: "Smart Weather App",
        description: "Real-time weather application that integrates with weather APIs to fetch and display current weather conditions, forecasts, and meteorological data for any location worldwide.",
        tags: ["TypeScript", "Web App"],
        github: "https://github.com/ayushgautam2006/smart-weather",
        demo: "https://github.com/ayushgautam2006/smart-weather",
    },
    
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen w-full p-4 md:p-12 flex flex-col items-center gap-12 pt-32 md:pt-40">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Selected Projects</h1>
                <p className="text-lg text-gray-400">
                    A collection of projects I&apos;ve built to solve problems and explore new technologies.
                </p>
            </motion.div>

            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold group-hover:text-st-red transition-colors">{project.title}</h2>
                                    <div className="flex gap-2">
                                        <Link href={project.github} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                        </Link>
                                        <Link href={project.demo} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
