"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Construct mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:ayushgau2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setIsLoading(false);
        setIsSuccess(true);

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
        (e.target as HTMLFormElement).reset();
    }

    return (
        <div className="min-h-screen w-full p-4 md:p-12 flex flex-col items-center gap-12 pt-32 md:pt-40">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                <p className="text-lg text-gray-400">
                    Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                </p>
            </motion.div>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="h-full flex flex-col justify-center gap-8 bg-transparent border-0 shadow-none p-0">
                        <div className="space-y-8 p-8">
                            <ContactItem icon={<Mail />} label="Email" value="ayushgau2006@gmail.com" />
                            <ContactItem icon={<Phone />} label="Phone" value="+91 9234268898" />
                            <ContactItem icon={<MapPin />} label="Location" value="S.D. Hall of Residence,NIT Rourkela" />
                        </div>
                    </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-400">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-st-red focus:ring-1 focus:ring-st-red transition-all text-white placeholder-gray-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-st-red focus:ring-1 focus:ring-st-red transition-all text-white placeholder-gray-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-400">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-st-red focus:ring-1 focus:ring-st-red transition-all text-white placeholder-gray-600"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : isSuccess ? (
                                    <>Message Prepared! <CheckCircle className="w-4 h-4 text-green-500" /></>
                                ) : (
                                    <>Send Message <Send className="w-4 h-4" /></>
                                )}
                            </Button>
                            {isSuccess && (
                                <p className="text-sm text-green-400 text-center animate-pulse">
                                    Opening your email client to send...
                                </p>
                            )}
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-st-red group-hover:bg-st-red/10 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-lg font-medium text-white">{value}</p>
            </div>
        </div>
    );
}
