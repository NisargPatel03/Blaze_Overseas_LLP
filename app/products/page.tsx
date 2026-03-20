"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { SpiceParticles } from "@/components/ui/SpiceParticles";
import { ExportGlobe } from "@/components/ui/ExportGlobe";
import { ImageShatter } from "@/components/ui/ImageShatter";
import { TiltCard } from "@/components/ui/TiltCard";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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

    // GSAP Scroll Parallax for background text
    let ctx = gsap.context(() => {
       gsap.to(l1Ref.current, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
             trigger: heroRef.current,
             start: "top top",
             end: "bottom top",
             scrub: true
          }
       });
       gsap.to(l2Ref.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
             trigger: heroRef.current,
             start: "top top",
             end: "bottom top",
             scrub: true
          }
       });
    }, heroRef);

    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <main className="w-full relative bg-white text-gray-900 min-h-screen font-sans selection:bg-[#F5A623] selection:text-white">

      {/* C1. Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center p-6"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.08) 0%, transparent 70%)"
        }}>
          {/* 3D Spice/Grain Particles */}
          <SpiceParticles />
        </div>

        {/* Parallax Layers - Subtle dark text for light theme */}
        <div ref={l1Ref} className="absolute flex items-center justify-center pointer-events-none w-full h-full font-display font-medium select-none z-0" style={{
            fontSize: "clamp(80px, 15vw, 180px)",
            color: "rgba(0,0,0,0.02)",
            letterSpacing: "0.3em"
        }}>
            BLAZZE
        </div>
        <div ref={l2Ref} className="absolute flex items-center justify-center pointer-events-none w-full h-full font-display font-medium select-none z-0 mt-32" style={{
            fontSize: "clamp(40px, 8vw, 100px)",
            color: "rgba(0,0,0,0.015)",
            letterSpacing: "0.15em"
        }}>
            OVERSEAS
        </div>

        {/* Foreground */}
        <div ref={l3Ref} className="relative z-10 flex flex-col items-center text-center max-w-4xl mt-12">
            <div className="animate-[fadeSlideUp_0.4s_ease-out_0.2s_both] border border-[#F5A623] text-[#F5A623] text-[11px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm bg-[#F5A623]/5">
                Premium Export Quality
            </div>
            <SplitReveal text="Our Products" tag="h1" className="text-5xl md:text-7xl font-display font-medium mb-6 text-gray-900" delay={0.4} />
            <SplitReveal text="Sourced from the finest farms. Delivered to 30+ countries." tag="p" className="text-lg md:text-xl text-gray-600" delay={0.8} />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="w-[1px] h-16 bg-gray-100 relative overflow-hidden">
                <div className="w-full h-full bg-[#F5A623] absolute top-[-100%] animate-[scrollDown_2s_cubic-bezier(.19,1,.22,1)_infinite]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5A623]">Scroll</span>
        </div>
      </section>

      {/* C3. Stats Strip with 3D Export Globe */}
      <section className="w-full bg-gray-50 border-y border-gray-100 py-24 md:py-32 relative z-20 overflow-hidden">
        {/* Globe Background Container */}
        <div className="absolute inset-0 z-0">
            <ExportGlobe />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 pointer-events-none" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center relative z-10 pointers-events-none mt-[300px]">
            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AnimatedCounter target={24} duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]">Products In Catalogue</span>
            </div>
            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AnimatedCounter target={4} duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]">Main Categories</span>
            </div>
            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AnimatedCounter target={30} suffix="+" duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]">Export Destinations</span>
            </div>
            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AnimatedCounter target={100} suffix="%" duration={2000} />
                <span className="text-sm uppercase tracking-widest text-[#F5A623]">Pure & Certified</span>
            </div>
        </div>
      </section>

      {/* C2. 4 Category Cards Grid */}
      <section className="py-32 px-6 md:px-12 relative z-20 bg-white">
        <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-16 overflow-hidden">
                <SplitReveal text="Explore Categories" tag="h2" className="text-4xl md:text-5xl font-display font-medium text-gray-900" />
            </div>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" staggerDelay={0.1}>
                {categories.map((cat, i) => {
                    const prodCount = products.filter(p => p.categorySlug === cat.slug).length;

                    return (
                        <Link href={`/products/${cat.slug}`} key={cat.slug} className="block group">
                            <TiltCard className="h-[220px] md:h-[320px] rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:border-[#F5A623]/30 bg-gray-50 shadow-sm">
                                {/* BG Image Shatter */}
                                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-auto">
                                    <ImageShatter src={cat.img.startsWith('/') || cat.img.startsWith('http') ? cat.img : `https://images.unsplash.com/${cat.img}?auto=format&fit=crop&q=75&w=600`} className="opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5A623] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-20" />

                                <div className="relative z-10 p-8 flex flex-col justify-between h-full pointer-events-none">
                                    <div>
                                        <div className="text-[11px] tracking-[0.15em] text-[#F5A623] mb-2 font-medium">
                                            {cat.num}
                                        </div>
                                        <h3 className="text-3xl font-display font-semibold text-white mb-1.5 drop-shadow-md">
                                            {cat.name}
                                        </h3>
                                        <p className="text-[14px] text-white/90 drop-shadow-sm max-w-[80%]">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="border border-white/30 text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                                            {prodCount} Products
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transform transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white/20">
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
