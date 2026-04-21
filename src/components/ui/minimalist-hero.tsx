import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-[11px] uppercase font-bold tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/50 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" strokeWidth={1.5} />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[#faf9f6] p-8 font-sans md:p-12 text-black rounded-b-[40px]',
        className
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between pt-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-black tracking-tight"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-12 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-[2px] w-6 bg-black"></span>
          <span className="block h-[2px] w-6 bg-black"></span>
          <span className="block h-[2px] w-5 bg-black"></span>
        </motion.button>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 py-10">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left mt-8 md:mt-0"
        >
          <p className="mx-auto max-w-[200px] text-sm leading-loose text-neutral-500 font-medium md:mx-0 uppercase tracking-widest">{mainText}</p>
          <a href={readMoreLink} className="mt-8 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-[50vh] md:h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[280px] w-[280px] rounded-full bg-[#e6e2da] md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px]"
            ></motion.div>
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-full max-w-[220px] md:max-w-[280px] lg:max-w-[320px] h-auto object-cover"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/400x600/e6e2da/000000?text=Image+Not+Found`;
                }}
            />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start lg:-ml-12 pointer-events-none mt-8 md:mt-0"
        >
          <h1 className="text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-black text-black leading-[0.85] tracking-tighter">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-6"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
