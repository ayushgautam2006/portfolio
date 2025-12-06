"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase"] },
    { category: "DevOps", items: ["Docker", "AWS", "Vercel", "GitHub Actions"] },
    { category: "Tools", items: ["Git", "VS Code", "Figma", "Postman"] },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full p-4 md:p-12 flex flex-col items-center gap-12 pt-32 md:pt-40">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
                <p className="text-lg text-gray-400">
                    I&apos;m a passionate developer who loves building things for the web.
                    Here&apos;s a glimpse into my journey and the technologies I work with.
                </p>
            </motion.div>

            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Journey Section */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="h-full">
                        <h2 className="text-2xl font-bold mb-8">My Journey</h2>
                        <div className="space-y-8 border-l border-white/10 ml-3 pl-8 relative">
                            <TimelineItem
                                year="2021"
                                title="Started Coding"
                                description="Began my journey with HTML, CSS, and JavaScript. Built my first static websites."
                            />
                            <TimelineItem
                                year="2024"
                                title="Full Stack Development"
                                description="Dove deep into React and Node.js. Started building complex web applications and REST APIs."
                            />
                            <TimelineItem
                                year="Present"
                                title="Professional Experience"
                                description="Working on real-world projects, contributing to open source, and mastering modern frameworks like Next.js."
                            />
                        </div>
                    </Card>
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="h-full">
                        <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>
                        <div className="grid grid-cols-1 gap-8">
                            {techStack.map((stack, index) => (
                                <div key={index}>
                                    <h3 className="font-medium text-gray-400 mb-3 text-sm uppercase tracking-wider">
                                        {stack.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {stack.items.map((item) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
    return (
        <div className="relative">
            <div className="absolute -left-[39px] top-1 w-3 h-3 bg-st-red rounded-full ring-4 ring-background" />
            <span className="text-sm text-st-red font-mono mb-1 block">{year}</span>
            <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
