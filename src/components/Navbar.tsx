"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";

const menuItems: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about me", link: "/about" },
  { label: "Projects", ariaLabel: "View my projects", link: "/projects" },
  { label: "Community", ariaLabel: "View my community", link: "/community" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  { label: "Resume", ariaLabel: "View my resume", link: "/resume.pdf" }
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "GitHub", link: "https://github.com/ayushgautam2006" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/ayush-gautam-964050327" },
  { label: "Instagram", link: "https://www.instagram.com/ayushhhpr/" },
  { label: "Email", link: "mailto:ayushgau2006@gmail.com" }
];

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #C2410C, #FF5A00)",
            boxShadow: "0 0 12px rgba(255,90,0,0.6)",
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#e9e9ef"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#C2410C", "#FF5A00"]}
        accentColor="#FF5A00"
        isFixed={true}
        closeOnClickAway={true}
      />
    </>
  );
}
