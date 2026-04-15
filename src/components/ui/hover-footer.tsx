"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  AtSign,
  Globe,
  Info,
  MessageCircle,
  Home,
  Laptop,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#B026FF" />
              <stop offset="100%" stopColor="#00F0FF" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-display font-black dark:stroke-white/10"
        style={{ opacity: hovered ? 0.7 : 0, fontSize: "140px" }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-cyan font-display font-black dark:stroke-cyan/60"
        style={{ fontSize: "140px" }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-display font-black"
        style={{ fontSize: "140px" }}
      >
        {text}
      </text>
    </svg>
  );
};

export const InteractiveFooterText = () => {
  const [mousePos, setMousePos] = useState({ cx: 50, cy: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ cx: x, cy: y });
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 160"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none cursor-pointer w-full"
      style={{ display: "block" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <radialGradient 
          id="dynamicGlow" 
          cx={`${mousePos.cx}%`} 
          cy={`${mousePos.cy}%`} 
          r="20%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#B026FF" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Base Default Single Color Layer - Always Visible (Theme Primary Blueish/Cyan) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="none"
        stroke="rgba(0, 240, 255, 0.5)"
        strokeWidth="1"
        style={{ fontSize: "150px", fontWeight: 900, letterSpacing: "-4px", fontFamily: "Space Grotesk, Syne, sans-serif" }}
      >
        UNCODEDHUB
      </text>

      {/* Dynamic Cursor Gradient Layer - Smaller Range, Overlays Base */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="none"
        stroke="url(#dynamicGlow)"
        strokeWidth="1.5"
        style={{ 
          fontSize: "150px", 
          fontWeight: 900, 
          letterSpacing: "-4px", 
          fontFamily: "Space Grotesk, Syne, sans-serif", 
          transition: "opacity 0.3s ease-in-out",
          opacity: isHovered ? 1 : 0
        }}
      >
        UNCODEDHUB
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(17, 20, 42, 0.4) 50%, rgba(0, 240, 255, 0.1) 100%)",
      }}
    />
  );
};

export default function HoverFooter() {
  // Footer link data
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/", icon: <Home size={16} className="mr-2 inline" /> },
        { label: "Services", href: "/services", icon: <Laptop size={16} className="mr-2 inline" /> },
        { label: "Portfolio", href: "/portfolio", icon: <Briefcase size={16} className="mr-2 inline" /> },
        { label: "About", href: "/about", icon: <Info size={16} className="mr-2 inline" /> },
        { label: "Contact", href: "/contact", icon: <MessageCircle size={16} className="mr-2 inline" /> },
      ],
    }
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-cyan" />,
      text: "hello@uncodedhub.com",
      href: "mailto:hello@uncodedhub.com",
    },
    {
      icon: <Phone size={18} className="text-cyan" />,
      text: "+91 8660819023",
      href: "tel:+918660819023",
    },
    {
      icon: <MapPin size={18} className="text-cyan" />,
      text: "Global Operations",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/uncodedhub/" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/uncodedhub/" },
    { icon: <Youtube size={20} />, label: "Youtube", href: "https://www.youtube.com/@uncodedhub" },
    { icon: <AtSign size={20} />, label: "Threads", href: "https://www.threads.com/@uncodedhub" },
    { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/people/Uncoded-Hub/61580702457181/" },
  ];

  return (
    <div
      className="relative mt-8"
      style={{
        background: "linear-gradient(to bottom, rgba(17,20,42,0.6) 0%, rgba(11,14,35,1) 100%)"
      }}
    >
    <footer className="relative h-fit rounded-t-[3rem] border-t border-white/5">
      <div className="max-w-7xl mx-auto p-12 lg:p-16 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <svg width="32" height="32" viewBox="0 0 100 100" className="overflow-visible">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#B026FF" />
                  </linearGradient>
                </defs>
                <g stroke="url(#footerLogoGrad)" strokeWidth="4" fill="none">
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="20" />
                  <line x1="50" y1="10" x2="50" y2="90" />
                  <line x1="10" y1="50" x2="90" y2="50" />
                  <ellipse cx="50" cy="50" rx="40" ry="15" />
                  <ellipse cx="50" cy="50" rx="15" ry="40" />
                </g>
                <circle cx="50" cy="50" r="8" fill="#00F0FF" />
              </svg>
              <span className="text-white text-2xl font-display font-bold tracking-widest uppercase">Uncoded Hub</span>
            </div>
            <p className="text-steel text-sm leading-relaxed mt-4 max-w-sm">
              Your business deserves to be online. We make it happen in 5 days with high-converting, no-code architecture.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-display text-lg font-bold mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      to={link.href}
                      className="text-steel hover:text-cyan transition-colors flex items-center w-fit"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h3 className="text-white font-display text-lg font-bold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-5">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-4 text-steel">
                  <div className="p-2 rounded-full bg-white/5 border border-white/5 shrink-0">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-cyan transition-colors break-all"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-cyan transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-steel">
          {/* Social icons */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-magenta transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left font-mono">
            &copy; {new Date().getFullYear()} Uncoded Hub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Remove internal gradient - it's on the outer wrapper now */}
    </footer>

      {/* Dynamic Text hover effect - perfectly synced to mouse cursor, Desktop Only */}
      <div
        className="hidden lg:flex w-full items-center justify-center pointer-events-auto"
        style={{ height: "10rem", overflow: "hidden" }}
      >
        <InteractiveFooterText />
      </div>
    </div>
  );
}
