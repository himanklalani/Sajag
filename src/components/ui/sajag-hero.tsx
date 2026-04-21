"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Award, Clock, MapPin, CheckCircle2 } from "lucide-react";
import BlurText from "./BlurText";

const StatCard = ({
  value, label, sub,
}: { value: string; label: string; sub?: string }) => (
  <div className="flex flex-col items-center text-center">
    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
    <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-semibold mt-0.5">{label}</span>
    {sub && <span className="text-[10px] text-zinc-600 mt-0.5">{sub}</span>}
  </div>
);

export default function SajagHero() {
  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-zinc-950 text-white">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

        .sajag-hero { font-family: 'DM Sans', sans-serif; }
        .sajag-display { font-family: 'Cormorant Garamond', serif; }
        .sajag-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }

        @keyframes marqueeRoll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .marquee-track { animation: marqueeRoll 38s linear infinite; }
      `}</style>

      {/* ── Full-bleed interior photo ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/interior_hero.png"
          alt="Luxury interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/20" />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
      </div>

      {/* ── Content ── */}
      <div className="sajag-hero relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-10 pb-0">

        {/* HEADER */}
        <header className="flex items-center justify-between w-full max-w-7xl mx-auto pt-4 sm:pt-6">
          <div className="flex">
            <BlurText
              text="sajag"
              delay={60}
              direction="top"
              className="sajag-display text-5xl sm:text-6xl font-bold tracking-tight text-white/90"
            />
            <BlurText
              text="."
              delay={60}
              direction="top"
              className="sajag-display text-5xl sm:text-6xl font-bold tracking-tight text-[#fbbf24]"
            />
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex flex-col justify-center items-center text-center w-full max-w-5xl mx-auto flex-1 py-4 sm:py-8 px-2 min-h-0">

          <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">

            {/* Eyebrow */}
            <BlurText
              text="— Mumbai · Thane —"
              delay={80}
              direction="top"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#fbbf24] font-bold justify-center flex mt-auto shrink-0"
            />

            {/* Headline */}
            <div className="sajag-display text-[3.2rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.2rem] font-bold leading-[0.9] tracking-[-0.02em] text-white shrink-0 flex flex-col items-center">
              <BlurText
                text="Buy your"
                delay={60}
                direction="top"
                stepDuration={0.4}
                className="flex justify-center"
              />
              <BlurText
                text="dream home"
                delay={60}
                direction="top"
                stepDuration={0.4}
                className="italic text-zinc-300 -mt-2 sm:-mt-4 flex justify-center"
              />
              <BlurText
                text="with clarity."
                delay={60}
                direction="top"
                stepDuration={0.4}
                className="-mt-1 sm:-mt-2 flex justify-center"
              />
            </div>

            {/* Body */}
            <BlurText
              text="Sajag Infrastructure is your personal real estate advocate in the Mumbai and Thane markets. We provide comprehensive guidance through property inspections, structural audits, legal agreement reviews, and meticulous due diligence, ensuring your biggest life investment is secure, transparent and completely hassle-free."
              delay={20}
              direction="top"
              stepDuration={0.25}
              className="max-w-2xl text-[14px] sm:text-[16px] xl:text-[17px] text-zinc-300 leading-relaxed font-light px-4 mt-2 shrink-0 flex flex-wrap justify-center"
            />

          </div>
        </main>

      </div>
    </div>
  );
}
