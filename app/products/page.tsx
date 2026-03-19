"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";
import { TiltCard } from "@/components/ui/TiltCard";
import { StaggerGrid } from "@/components/ui/StaggerGrid";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MoveRight } from "lucide-react";
import { products } from "@/lib/products";

const categories = [
  {
    num: "01",
    name: "Whole Spices",
    slug: "whole-spices",
    desc: "Hand-selected whole spices. Bold aroma, pure form.",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=75&w=800",
  },
  {
    num: "02",
    name: "Blended Masala",
    slug: "blended-masala",
    desc: "Expert-blended powders. Consistent taste, every batch.",
    img: "https://images.unsplash.com/photo-1615486511484-92e172fc34ea?auto=format&fit=crop&q=75&w=800",
  },
  {
    num: "03",
    name: "Grains",
    slug: "grains",
    desc: "Premium Basmati & wheat. Farm-direct. Export certified.",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=75&w=800",
  },
  {
    num: "04",
    name: "Pulses",
    slug: "pulses",
    desc: "Protein-rich dals & legumes. Sorted, cleaned, export-ready.",
    img: "https://images.unsplash.com/photo-1619984590612-818d12e7df76?auto=format&fit=crop&q=75&w=800",
  }
];

export default function ProductsLandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const l3Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Parallax Logic
  useEffect(() => {
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let rafId: number;
    let isMobile = window.innerWidth < 768;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      targetY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (l1Ref.current) l1Ref.current.style.transform = `translate(${currentX * 40}px, ${currentY * 20}px)`;
      if (l2Ref.current) l2Ref.current.style.transform = `translate(${currentX * 25}px, ${currentY * 12}px)`;
      if (l3Ref.current) l3Ref.current.style.transform = `translate(${currentX * 10}px, ${currentY * 5}px)`;

      rafId = requestAnimationFrame(animate);
    };

    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="w-full relative bg-[#050505] text-white min-h-screen font-sans selection:bg-[#F5A623] selection:text-black">

      {/* C1. Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center p-6"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.06) 0%, transparent 65%)"
        }}>
          {/* Subtle Grain generated inline effectively via svg if needed, skipping raw svg injection for brevity since it's an opacity 0.02 filter request */}
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay" />
        </div>

        {/* Parallax Layers */}
        <div ref={l1Ref} className="absolute flex items-center justify-center pointer-events-none w-full h-full font-display font-medium select-none z-0" style={{
            fontSize: "clamp(80px, 15vw, 180px)",
            color: "rgba(245,166,35,0.04)",
            letterSpacing: "0.3em"
        }}>
            BLAZZE
        </div>
        <div ref={l2Ref} className="absolute flex items-center justify-center pointer-events-none w-full h-full font-display font-medium select-none z-0 mt-32" style={{
            fontSize: "clamp(40px, 8vw, 100px)",
            color: "rgba(245,166,35,0.035)",
            letterSpacing: "0.15em"
        }}>
            OVERSEAS
        </div>

        {/* Foreground */}
        <div ref={l3Ref} className="relative z-10 flex flex-col items-center text-center max-w-4xl mt-12">
            <div className="animate-[fadeSlideUp_0.4s_ease-out_0.2s_both] border border-[#F5A623] text-[#F5A623] text-[11px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm bg-[#F5A623]/5">
                Premium Export Quality
            </div>
            <RevealText text="Our Products" tag="h1" className="text-5xl md:text-7xl font-display font-medium mb-6" delay={0.4} />
            <RevealText text="Sourced from the finest farms. Delivered to 30+ countries." tag="p" className="text-lg md:text-xl text-white/50" delay={0.8} />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                <div className="w-full h-full bg-[#F5A623] absolute top-[-100%] animate-[scrollDown_2s_cubic-bezier(.19,1,.22,1)_infinite]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5A623]">Scroll</span>
        </div>
      </section>

      {/* C3. Stats Strip */}
      <section className="w-full bg-[#080400] border-y border-[#F5A623]/10 py-16 md:py-24 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div className="flex flex-col gap-2">
                <AnimatedCounter target={24} duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]/60">Products In Catalogue</span>
            </div>
            <div className="flex flex-col gap-2">
                <AnimatedCounter target={4} duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]/60">Main Categories</span>
            </div>
            <div className="flex flex-col gap-2">
                <AnimatedCounter target={30} suffix="+" duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]/60">Export Destinations</span>
            </div>
            <div className="flex flex-col gap-2">
                <AnimatedCounter target={100} suffix="%" duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]/60">Pure & Certified</span>
            </div>
        </div>
      </section>

      {/* C2. 4 Category Cards Grid */}
      <section className="py-32 px-6 md:px-12 relative z-20">
        <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-16">
                <RevealText text="Explore Categories" tag="h2" className="text-4xl md:text-5xl font-display font-medium" />
            </div>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" staggerDelay={0.1}>
                {categories.map((cat, i) => {
                    const prodCount = products.filter(p => p.categorySlug === cat.slug).length;

                    return (
                        <Link href={`/products/${cat.slug}`} key={cat.slug} className="block group">
                            <TiltCard className="h-[220px] md:h-[320px] rounded-2xl overflow-hidden border-[0.5px] border-[#F5A623]/15 transition-all duration-300 group-hover:border-[#F5A623]/45 bg-gradient-to-br from-[#0e0800] to-[#0a0600]">
                                {/* BG Image */}
                                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                                    <img src={cat.img.startsWith('/') || cat.img.startsWith('http') ? cat.img : `https://images.unsplash.com/${cat.img}?auto=format&fit=crop&q=75&w=600`} alt={cat.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" loading={i < 2 ? "eager" : "lazy"} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0600] via-[#0a0600]/60 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5A623] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-20" />

                                <div className="relative z-10 p-8 flex flex-col justify-between h-full pointer-events-none">
                                    <div>
                                        <div className="text-[11px] tracking-[0.15em] text-[#F5A623]/40 mb-2">
                                            {cat.num}
                                        </div>
                                        <h3 className="text-3xl font-display font-semibold text-[#F5A623] mb-1.5">
                                            {cat.name}
                                        </h3>
                                        <p className="text-[14px] text-white/45">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="border-[0.5px] border-[#F5A623]/25 text-[#F5A623]/70 text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                                            {prodCount} Products
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#F5A623] transform transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[#F5A623]/10">
                                            <MoveRight size={18} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </Link>
                    )
                })}
            </StaggerGrid>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes scrollDown {
            0% { top: -100%; }
            50% { top: 100%; }
            100% { top: 100%; }
        }
        @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
