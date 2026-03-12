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
  Twitter,
  Dribbble,
  Globe,
  ArrowRight
} from "lucide-react";

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
      viewBox="0 0 300 100"
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
        className="fill-transparent stroke-neutral-200 font-display text-[2.5rem] md:text-5xl font-black dark:stroke-white/10"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-cyan font-display text-[2.5rem] md:text-5xl font-black 
        dark:stroke-cyan/60"
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
        className="fill-transparent font-display text-[2.5rem] md:text-5xl font-black"
      >
        {text}
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
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Process", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        {
          label: "Book Strategy Call",
          href: "#contact",
          pulse: true,
        },
      ],
    },
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
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-cyber/40 relative h-fit rounded-t-[3rem] overflow-hidden mt-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto p-12 lg:p-16 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
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
              <h4 className="text-white font-display text-lg font-bold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-steel hover:text-cyan transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 -right-2 w-2 h-2 rounded-full bg-magenta animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white font-display text-lg font-bold mb-6">
              Contact Us
            </h4>
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

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[22rem] -mt-32 -mb-20 pointer-events-auto items-center justify-center overflow-hidden">
        <TextHoverEffect text="UNCODEDHUB" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
