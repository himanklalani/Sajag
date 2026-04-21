'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue, useMotionValueEvent } from 'motion/react';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PhoneCall, Mail, CheckCircle2, ShieldCheck, Quote, Target, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SajagHero from './sajag-hero';
import ScrollReveal from './ScrollReveal';
import BlurText from './BlurText';

gsap.registerPlugin(ScrollTrigger);

// Font class helpers — backed by CSS vars from next/font in layout.tsx
const FONT_CLASSES = `
  .card-bebas { font-family: var(--font-bebas), sans-serif; letter-spacing: 0.06em; }
  .card-cormorant { font-family: var(--font-cormorant), serif; }
  .card-dm { font-family: var(--font-dm-sans), sans-serif; }
`;

// ── Syncs Lenis smooth scroll with GSAP ScrollTrigger ──────────────────────────
function LenisGsapSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const cards = [
  { id: 'hero', bg: 'bg-zinc-950', text: 'text-white' },
  {
    id: 'offer',
    bg: 'bg-[#f4f1ec]',
    text: 'text-zinc-900',
    label: 'Our Services',
    title: 'WHAT WE OFFER',
    paragraphs: [
      'In depth clarity about market dynamics, useable carpet area, architectural plans, government permissions and persistent on ground assistance.',
      'We will guide our customers through the property inspection process to help them identify potential concerns, structural issues and hidden costs.',
      'We also comprehensively review Agreement For Sale (AFS), conducting rigorous legal due diligence & verifying title clearance for peace of mind.',
      'We provide persistent assistance in AFS registration process, coordinating all regulatory filings & documentation for a seamless transition.',
      
    ],
  },
  {
    id: 'choose',
    bg: 'bg-zinc-900',
    text: 'text-white',
    label: 'Why Sajag',
    title: 'WHY CHOOSE US?',
    body: 'Our community plans are designed to guide you through every step of the journey. We make your property purchase hassle-free and trustworthy, from initial doubt clearing to the final closing of your deal. We act as your advocate in a complex market.',
  },
  {
    id: 'story',
    bg: 'bg-[#faf9f7]',
    text: 'text-zinc-900',
    label: 'Founder',
    title: 'OUR STORY',
    body: 'We noticed a significant shift in the way people sell and buy properties in Mumbai and Thane. Hence emerged our initiative towards a stable, transparent and better buyer experience. We bridge the gap between promises and reality.',
  },
  {
    id: 'vision',
    bg: 'bg-zinc-950',
    text: 'text-zinc-200',
    sections: [
      {
        label: 'Our Vision',
        text: 'To be the most trusted partner and consultant for individuals and families looking to achieve their dream of home or commercial space on ownership basis. We aspire to guide our clients through the complex process of buying real estate with our deep expertise and a commitment to their best interests.',
      },
      {
        label: 'Our Mission',
        text: 'We believe in providing our customers with valuable support, technical expertise and legal resources. Our mission is making the property-buying process more efficient and less stressful while helping you secure the best possible deal with complete transparency.',
      },
    ],
  },
];

const TOTAL = cards.length;

interface CardProps {
  i: number;
  data: (typeof cards)[number];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StackCard = ({ i, data, targetScale, progress, range }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Trigger animations when the card arrives at the top
  const { scrollYProgress: cardActivationProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  });

  const entryPoint = i / TOTAL;
  const [isActive, setIsActive] = useState(i === 0);

  useMotionValueEvent(cardActivationProgress, 'change', (v) => {
    // Activate animations slightly before the card natively sticks
    if (!isActive && v > 0) {
      setIsActive(true);
    }
  });

  // Scale down over the global section scroll progress
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={cardRef} className="h-screen sticky top-0 flex items-center justify-center w-full">
        <motion.div
          style={{
            scale,
            top: `calc(-2vh + ${i * 20}px)`,
          }}
          className={`relative w-[96%] sm:w-[94%] h-[92vh] sm:h-[90vh] rounded-[1.75rem] sm:rounded-[2.25rem] overflow-y-auto overflow-x-hidden scrollbar-hide border border-[#fbbf24]/40 origin-top will-change-transform [transform:translateZ(0)] ${data.bg} ${data.text}`}
        >
        <div className="relative w-full h-full flex flex-col">
          {/* Grid texture on dark cards */}
          {(data.id === 'choose' || data.id === 'vision') && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f18_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f18_1px,transparent_1px)] bg-[size:54px_54px] pointer-events-none" />
          )}

          {/* ── 1. HERO ── */}
          {data.id === 'hero' && (
            <div className="w-full h-full">
              <SajagHero />
            </div>
          )}

          {/* ── 2. OUR SERVICES ── */}
          {data.id === 'offer' && 'paragraphs' in data && data.paragraphs && (
            <div className="flex-1 flex items-center justify-center p-8 md:p-14 md:pt-24 lg:pt-32 relative overflow-hidden">
              <div className="absolute top-10 right-10 text-[#fbbf24] opacity-[0.05] pointer-events-none">
                <CheckCircle2 className="w-64 h-64" strokeWidth={0.5} />
              </div>

              <div className="w-full max-w-xl mx-auto text-left relative z-20">
                {/* Label */}
                <BlurText
                  text={data.label ?? ''}
                  delay={50}
                  direction="top"
                  className="text-[11px] uppercase tracking-[0.22em] text-[#d97706] font-semibold mb-2 flex"
                />
                {/* Title — Bebas Neue via BlurText */}
                <BlurText
                  text={data.title ?? ''}
                  delay={70}
                  direction="top"
                  stepDuration={0.4}
                  className="card-bebas text-6xl sm:text-7xl text-zinc-900 mb-6 leading-none flex flex-wrap"
                />

                <div className="space-y-6 mt-2">
                  {data.paragraphs.map((para, j) => (
                    <div key={j} className="block group">
                      <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-zinc-200 shadow-sm hover:shadow-md">
                        <div className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#fbbf24]/20 text-[#d97706] group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        {/* Body ScrollReveal */}
                        <ScrollReveal
                          baseOpacity={0}
                          enableBlur={true}
                          baseRotation={2}
                          blurStrength={3}
                          textClassName="text-[14px] sm:text-[15px] leading-relaxed text-zinc-600 font-medium"
                        >
                          {para}
                        </ScrollReveal>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 3. WHY SAJAG ── */}
          {data.id === 'choose' && 'body' in data && (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-14 md:pt-24 lg:pt-28 relative overflow-hidden">
              <motion.div
                animate={isActive ? { opacity: 0.04, scale: 1, rotate: 12 } : { opacity: 0, scale: 0.8, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute right-[-25%] md:right-[-10%] top-1/2 -translate-y-1/2 pointer-events-none text-[#fbbf24]"
              >
                <ShieldCheck className="w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] md:w-[32rem] md:h-[32rem]" strokeWidth={0.5} />
              </motion.div>

              <div className="w-full max-w-xl mx-auto text-center relative z-20 backdrop-blur-sm bg-zinc-900/40 p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#fbbf24]" />
                  <BlurText
                    text={data.label ?? ''}
                    delay={50}
                    direction="top"
                    className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#fbbf24] font-semibold flex"
                  />
                </div>

                {/* Title — Bebas Neue via BlurText */}
                <BlurText
                  text={data.title ?? ''}
                  delay={70}
                  direction="top"
                  stepDuration={0.45}
                  className="card-bebas text-6xl sm:text-7xl lg:text-8xl text-white mb-2 leading-none justify-center flex flex-wrap"
                />

                <div className="w-12 sm:w-16 h-1 bg-[#fbbf24]/80 rounded-full mx-auto my-6 sm:my-8" />

                {/* Body with ScrollReveal */}
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={6}
                  textClassName="text-[14px] sm:text-[17px] leading-relaxed font-light text-zinc-300 max-w-lg mx-auto"
                >
                  {data.body ?? ''}
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* ── 4. FOUNDER ── */}
          {data.id === 'story' && 'body' in data && (
            <div className="flex-1 flex items-center justify-center p-8 md:p-14 md:pt-24 lg:pt-28 relative overflow-hidden">
              <div className="absolute left-10 top-16 text-zinc-300/40 pointer-events-none">
                <Quote className="w-32 sm:w-48 h-32 sm:h-48 rotate-180" strokeWidth={0.5} />
              </div>

              <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-10 md:gap-16 relative z-20">
                <div className="w-48 h-[20rem] md:w-72 md:h-[30rem] rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 relative">
                  <Image
                    src="/sajagbest.avif"
                    alt="Sanjay Chopra, Advisor"
                    fill
                    sizes="(max-width: 768px) 192px, 288px"
                    className="object-cover object-top transition-all duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
                </div>

                <div className="flex flex-col justify-center max-w-lg">
                  <BlurText
                    text={data.label ?? ''}
                    delay={50}
                    direction="top"
                    className="text-[11px] uppercase tracking-[0.22em] text-[#d97706] font-semibold mb-2 flex"
                  />
                  {/* Title — Cormorant Garamond (elegant serif for Founder card) */}
                  <BlurText
                    text={data.title ?? ''}
                    delay={70}
                    direction="top"
                    stepDuration={0.45}
                    className="card-cormorant text-5xl sm:text-6xl font-bold italic text-zinc-900 mb-6 leading-tight flex flex-wrap"
                  />
                  <div className="border-l-4 border-[#fbbf24] pl-6 italic">
                    {/* Body */}
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={3}
                      textClassName="text-[15px] sm:text-[16px] leading-relaxed text-zinc-600"
                    >
                      {data.body ? `"${data.body}"` : ''}
                    </ScrollReveal>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                    <div className="w-8 h-px bg-zinc-400" />
                    <span className="font-semibold text-zinc-900 uppercase tracking-[0.2em] text-[10px]">Sanjay Chopra</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 5. VISION & MISSION ── */}
          {data.id === 'vision' && 'sections' in data && (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-14 relative overflow-hidden">
              <div className="w-full max-w-5xl mx-auto text-left relative z-20 flex flex-col justify-center h-full pt-4 md:pt-20 lg:pt-28">
                <div className="text-center mb-6 sm:mb-12 md:mb-16">
                  {/* "PURPOSE DRIVEN" — Bebas Neue via BlurText */}
                  <BlurText
                    text="PURPOSE DRIVEN"
                    delay={70}
                    direction="top"
                    stepDuration={0.4}
                    className="card-bebas text-6xl sm:text-7xl md:text-8xl text-white mb-2 sm:mb-4 justify-center flex flex-wrap"
                  />
                  <p className="text-[#fbbf24] uppercase tracking-[0.22em] text-[9px] sm:text-[11px] font-semibold mt-2">
                    The foundation of our commitment
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-8 md:gap-12">
                  {data.sections?.map(({ label, text }, idx) => (
                    <div key={label} className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] hover:bg-zinc-800 transition-colors duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-1/4 -translate-y-1/4 pointer-events-none group-hover:scale-110 transition-transform duration-700 hidden sm:block">
                        {idx === 0 ? <Compass className="w-48 h-48 text-[#fbbf24]" strokeWidth={0.5} /> : <Target className="w-48 h-48 text-[#fbbf24]" strokeWidth={0.5} />}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-6 relative z-10 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] shadow-lg shadow-[#fbbf24]/5 group-hover:scale-110 group-hover:bg-[#fbbf24]/20 transition-all duration-500 shrink-0">
                          {idx === 0 ? <Compass className="w-5 h-5 sm:w-7 sm:h-7" /> : <Target className="w-5 h-5 sm:w-7 sm:h-7" />}
                        </div>
                        <h3 className="text-base sm:text-lg uppercase tracking-[0.15em] text-zinc-100 font-bold">{label}</h3>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-[#fbbf24]/40 to-transparent my-4 sm:my-6 relative z-10" />

                      {/* Section body with ScrollReveal */}
                      <ScrollReveal
                        baseOpacity={0}
                        enableBlur={true}
                        baseRotation={1}
                        blurStrength={4}
                        textClassName="text-[13px] sm:text-[15px] leading-relaxed sm:leading-loose text-zinc-400 transition-colors duration-500 relative z-10"
                      >
                        {text}
                      </ScrollReveal>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the entire main section for continuous progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <ReactLenis root>
      <style>{FONT_CLASSES}</style>
      {/* Syncs Lenis scroll position with GSAP ScrollTrigger */}
      <LenisGsapSync />

      {/* Sticky yellow logo */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center py-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
        <Image
          src="/logo.png"
          alt="Sajag Infrastructure"
          width={112}
          height={112}
          priority
          className="h-16 md:h-20 w-auto object-contain"
          style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(41%) saturate(1025%) hue-rotate(338deg) brightness(100%) contrast(97%)' }}
        />
      </div>

      {/* Fixed contact icons */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919867133221" target="_blank" rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform">
          <WhatsappIcon className="w-5 h-5" />
        </a>
        <a href="tel:+919867133221"
          className="bg-white text-zinc-950 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.4)] hover:scale-110 transition-transform">
          <PhoneCall className="w-4 h-4" />
        </a>
        <a href="mailto:scmails1@gmail.com"
          className="bg-zinc-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(0,0,0,0.6)] hover:scale-110 transition-transform">
          <Mail className="w-4 h-4" />
        </a>
      </div>

      <main className="bg-zinc-950" ref={containerRef}>
        <section className="w-full bg-zinc-950">
          {cards.map((data, i) => {
            const targetScale = 1 - (cards.length - i) * 0.05;
            // Spread the progress evenly over the stack
            const startProgress = i * (1 / (cards.length - 1));
            
            return (
              <StackCard
                key={data.id}
                i={i}
                data={data}
                targetScale={targetScale}
                progress={scrollYProgress}
                range={[startProgress, 1]}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
