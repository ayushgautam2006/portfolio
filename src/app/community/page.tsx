"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";

const communities = [
    {
        name: "Cyborg:Robotics & Automation",
        role: "Robotics Team Member",
        description: "Working on robotics projects, automation systems, and participating in technical competitions.",
        image: "https://res.cloudinary.com/webwiznitr/image/upload/f_auto,q_70/v1679160025/Group_14_zfj3sc.png",
    },
    {
        name: "Webwiz",
        role: "Developer",
        description: "Building and maintaining official websites for the institute and organizing web development workshops.",
        image: "https://webwiznitr.netlify.app/static/media/logo.cd0dd8f3.ico",
    },
    {
        name: "MES",
        role: "Technical Team Member",
        description: "Contributing to the technical team by developing websites and managing digital assets for the society.",
        image: "https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg",
    },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen w-full p-4 md:p-12 flex flex-col items-center gap-12 pt-32 md:pt-40">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Community</h1>
                <p className="text-lg text-gray-400">
                    Being part of communities helps me grow and give back to the ecosystem.
                </p>
            </motion.div>

            <div className="max-w-4xl w-full grid grid-cols-1 gap-6">
                {communities.map((community, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-white/5 transition-colors h-full group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-st-red/10 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative border border-st-red/20 group-hover:border-st-red/50 transition-colors">
                                {community.image ? (
                                    <Image
                                        src={community.image}
                                        alt={community.name}
                                        fill
                                        className="object-cover p-2"
                                    />
                                ) : (
                                    <Users className="w-8 h-8 text-st-red" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-xl font-bold text-white group-hover:text-st-red transition-colors">{community.name}</h2>
                                </div>
                                <p className="text-st-red font-medium text-sm mb-2">{community.role}</p>
                                <p className="text-gray-400 leading-relaxed">{community.description}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
