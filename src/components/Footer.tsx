import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-10 border-t border-white/[0.04] flex flex-col items-center justify-center gap-6 mt-auto">
      <div className="flex items-center gap-6">
        <Link
          href="https://github.com/ayushgautam2006"
          target="_blank"
          className="text-[#555] hover:text-accent transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ayush-gautam-964050327"
          target="_blank"
          className="text-[#555] hover:text-accent transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Link>
        <Link
          href="mailto:ayushgau2006@gmail.com"
          className="text-[#555] hover:text-accent transition-colors duration-300"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </Link>
      </div>
      <p className="text-[#555] text-xs tracking-wide font-display text-sm">
        © {new Date().getFullYear()} AYUSH GAUTAM
      </p>
    </footer>
  );
}
