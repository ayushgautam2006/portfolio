import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
];

export function Footer() {
    return (
        <footer className="w-full py-12 border-t border-white/5 flex flex-col items-center justify-center gap-8 mt-auto bg-background">
            <div className="flex gap-6">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-gray-400 hover:text-st-red transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-6">
                <SocialLink href="https://github.com/ayushgautam2006" icon={<Github className="w-5 h-5" />} />
                <SocialLink href="https://www.instagram.com/ayushhhpr/" icon={<Instagram className="w-5 h-5" />} />
                <SocialLink href="https://www.linkedin.com/in/ayush-gautam-964050327" icon={<Linkedin className="w-5 h-5" />} />
                <SocialLink href="mailto:ayushgau2006@gmail.com" icon={<Mail className="w-5 h-5" />} />
            </div>
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Ayush Gautam. Built in Upside Down.
            </p>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="text-gray-400 hover:text-st-red transition-colors duration-300"
        >
            {icon}
        </Link>
    );
}
