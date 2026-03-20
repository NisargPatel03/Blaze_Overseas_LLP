"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Product } from "@/lib/products";
import { MessageCircle, CheckCircle2, ChevronRight, ArrowRight, RefreshCcw } from "lucide-react";
import { VolumetricPhoto } from "@/components/ui/VolumetricPhoto";
import { MagneticButton } from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingParticles from "@/components/FloatingParticles";

const getEmojis = (category: string, slug: string) => {
  if (slug.includes("garlic")) return ["🧄", "✨", "⭐", "🤍"];
  if (slug.includes("onion")) return ["🧅", "✨", "⭐", "🤍"];
  if (slug.includes("ginger")) return ["🫚", "✨", "⭐", "💛"];
  if (slug.includes("turmeric")) return ["🟡", "✨", "🌿", "💛", "⭐"];
  if (slug.includes("chilli") && slug.includes("kashmiri")) return ["🌶️", "❄️", "✨", "🌸", "⭐"];
  if (slug.includes("chilli")) return ["🌶️", "🔥", "✨", "🌿", "⭐"];
  if (slug.includes("cumin") || slug.includes("coriander")) return ["🌿", "🍂", "✨", "⭐", "🤎"];
  if (slug.includes("garam-masala")) return ["🫙", "🍛", "✨", "⭐", "🌿"];
  
  if (slug.includes("basmati-rice") || slug === "rice") return ["🌾", "🍚", "✨", "⭐", "🌿"];
  if (slug.includes("non-basmati")) return ["🌾", "🍚", "✨", "⭐", "🌱"];
  if (slug.includes("wheat")) return ["🌾", "🌽", "✨", "⭐", "🍞"];
  
  if (category === "pulses") {
    if (slug.includes("rajma")) return ["🫘", "❤️", "✨", "⭐"];
    if (slug.includes("mung")) return ["🫘", "🟢", "✨", "⭐"];
    if (slug.includes("chana")) return ["🫘", "🟡", "✨", "⭐"];
    if (slug.includes("kabuli")) return ["🫘", "🤍", "✨", "⭐"];
    if (slug.includes("masoor")) return ["🫘", "🟠", "✨", "⭐"];
    return ["🫘", "🌱", "✨", "⭐", "🌿", "💚"];
  }

  if (category === "whole-spices") return ["🌿", "✨", "⭐", "🍂", "🪵"];
  if (category === "blended-masala") return ["🫙", "🌶️", "🌿", "✨", "🍛", "⭐"];
  return ["✨", "⭐"];
};

const ProductSplash = dynamic(() => import('@/components/effects/ProductSplash'), { ssr: false });

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [activeSize, setActiveSize] = useState(product.packagingSizes[0]?.label || "1kg");
  const [replay, setReplay] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const waNumber = "+917777984018";

  // Quick extract functions for the 2x2 grid
  const retailSizes = product.packagingSizes.filter(p => p.type === 'retail').map(p => p.label).join(", ") || "N/A";
  const bulkSizes = product.packagingSizes.filter(p => p.type === 'bulk').map(p => p.label).join(", ") || "N/A";

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReplay = () => {
    setReplay(prev => prev + 1);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 400);
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  
  useGSAP(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Draw input borders and slide them up sequentially
    gsap.from(".form-animated-element", {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: formRef });

  return (
    <main className="w-full bg-white min-h-screen text-gray-900 font-sans selection:bg-[#A34E0D] selection:text-white">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] relative">
        
        {/* E2. Left Column — Product Photo Hero */}
        <section className="relative w-full h-[60vh] lg:h-screen lg:sticky top-0 bg-gray-50 flex flex-col items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100">
          
          <div className="absolute inset-0 z-0 opacity-95 transition-all duration-1000 animate-[fadeIn_1s_ease-out_both] scale-100 group">
             <div className="relative overflow-hidden rounded-xl w-full h-full">
               <VolumetricPhoto src={product.unsplashId.startsWith('/') || product.unsplashId.startsWith('http') ? product.unsplashId : `https://images.unsplash.com/${product.unsplashId}?auto=format&fit=crop&q=80&w=1200`} />
               <FloatingParticles emojis={getEmojis(product.categorySlug, product.slug)} count={18} />
             </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none z-[1]" />

          {/* SPLASH CANVAS ENGINE OVERLAY */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            <ProductSplash productSlug={product.slug} replay={replay} />
          </div>
          <div className="absolute inset-0 z-[3] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.6) 100%)' }} />

          <div className="absolute top-24 left-6 md:left-12 md:top-28 z-[4] text-[11px] text-gray-600 uppercase tracking-widest bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 hidden sm:block shadow-sm">
            <Link href="/products" className="hover:text-[#A34E0D] transition-colors">Products</Link> / 
            <Link href={`/products/${product.categorySlug}`} className="hover:text-[#A34E0D] transition-colors mx-2">{product.categoryName}</Link> / 
            <span className="text-[#A34E0D] ml-2 font-medium">{product.name}</span>
          </div>

          <div className="absolute bottom-10 inset-x-6 md:inset-x-12 z-[4] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-wrap shadow-xl items-center justify-center lg:justify-start gap-2 animate-[fadeSlideUp_0.5s_ease-out_0.5s_both] bg-white/80 backdrop-blur-xl p-2 rounded-xl border border-gray-100">
              {product.packagingSizes.map((size) => (
                <button suppressHydrationWarning
                  key={size.label}
                  onClick={() => setActiveSize(size.label)}
                  className={`px-5 py-2 text-[12px] font-medium rounded-lg transition-all duration-300 shadow-sm ${
                    activeSize === size.label 
                      ? "bg-[#A34E0D] text-white shadow-[#A34E0D]/20" 
                      : "bg-transparent border border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {size.label}
                </button>
              ))}

              {/* Replay Effects Button */}
              <button suppressHydrationWarning
                onClick={handleReplay} 
                className={`ml-2 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm ${isSpinning ? 'animate-[spin_0.4s_ease-out]' : ''}`}
                title="Replay Animation"
              >
                <RefreshCcw size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* E3. Right Column — Product Info Panel */}
        <section className="px-6 py-12 lg:p-12 xl:p-16 lg:pt-32 relative bg-white">
          <div className="max-w-[600px] mx-auto lg:mx-0 flex flex-col items-start gap-6">
            
            <div className="inline-block bg-[#A34E0D] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full animate-[slideInRight_0.4s_both]">
              {product.categoryName}
            </div>

            <SplitReveal text={product.name} tag="h1" className="text-4xl md:text-5xl font-display font-semibold text-gray-900 leading-tight" />

            <div className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-out_0.5s_both]">
              <div className="border border-gray-200 text-gray-600 text-[12px] px-3 py-1 rounded-full">
                {product.origin}
              </div>
              <div className="border border-[#A34E0D]/30 text-[#A34E0D] text-[12px] px-3 py-1 rounded-full font-bold">
                {product.grade}
              </div>
            </div>

            <div className="w-full h-[0.5px] bg-gray-100 my-2" />

            <div className="text-[15px] leading-[1.8] text-gray-600 animate-[fadeSlideUp_0.5s_ease-out_0.6s_both]">
              {product.description}
            </div>

            {/* Packaging & Delivery Grid */}
            <div className="w-full mt-4">
              <h4 className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-3 font-medium">Packaging & Logistics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="text-[#A34E0D] font-bold text-[10px] uppercase tracking-wider mb-1">Retail Sizes</div>
                  <div className="text-gray-900 text-[13px] font-medium">{retailSizes}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="text-[#A34E0D] font-bold text-[10px] uppercase tracking-wider mb-1">Export Bulk</div>
                  <div className="text-gray-900 text-[13px] font-medium">{bulkSizes}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="text-[#A34E0D] font-bold text-[10px] uppercase tracking-wider mb-1">Origin</div>
                  <div className="text-gray-900 text-[13px] font-medium line-clamp-1">{product.origin}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="text-[#A34E0D] font-bold text-[10px] uppercase tracking-wider mb-1">Min. Order</div>
                  <div className="text-gray-900 text-[13px] font-medium">{product.moq}</div>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["ISO 9001:2015", "FSSAI Certified", "Export Inspected"].map(cert => (
                <div key={cert} className="bg-gray-50 border border-gray-100 text-gray-600 text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 size={12} className="text-[#A34E0D]" /> {cert}
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="w-full flex flex-col gap-3 mt-8">
              <a href={`https://wa.me/${waNumber.replace('+', '')}?text=Hi Blazze, I am interested in ${encodeURIComponent(product.name)}. Please share price and availability for ${encodeURIComponent(activeSize)}.`} target="_blank" rel="noreferrer" className="w-full h-[52px] bg-[#25D366] hover:bg-[#20b958] active:scale-[0.98] transform transition-all text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.15)]">
                <MessageCircle size={20} /> Inquire on WhatsApp
              </a>
              <button suppressHydrationWarning onClick={handleScrollToForm} className="w-full h-[48px] bg-transparent border border-gray-200 text-gray-500 hover:bg-gray-50 text-[14px] font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                Send Detailed Inquiry <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* E4a. Product Specifications Table */}
      <section className="w-full bg-gray-50 border-y border-gray-100 py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <SplitReveal text="Product Specifications" tag="h2" className="text-3xl font-display font-medium text-gray-900 mb-10 text-center" />
          
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-gray-900 font-semibold text-[13px] uppercase tracking-widest border-b border-gray-200">Parameter</th>
                  <th className="px-6 py-4 text-gray-900 font-semibold text-[13px] uppercase tracking-widest border-b border-gray-200">Specification</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-600">
                {product.detailedSpecs ? (
                  product.detailedSpecs.map((spec, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} ${idx === product.detailedSpecs!.length - 1 ? '' : 'border-b border-gray-100'}`}>
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">{spec.label}</td>
                      <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: spec.value }} />
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">Shelf Life</td>
                      <td className="px-6 py-4">{product.shelfLife}</td>
                    </tr>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">Moisture Content</td>
                      <td className="px-6 py-4">{product.moisture}</td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">Purity (Min)</td>
                      <td className="px-6 py-4">{product.purity}</td>
                    </tr>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">Color Designation</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <span className="w-3 h-3 block rounded-full shadow-sm" style={{ backgroundColor: product.color }} /> 
                        {product.color}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 border-r border-gray-100 font-medium text-gray-900">HS Code</td>
                      <td className="px-6 py-4 font-mono text-[#A34E0D] font-bold">{product.hsCode}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          
          {(product.ingredients || product.processingDetails) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {product.ingredients && (
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-gray-900 font-semibold text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-[#A34E0D]">🌿</span> Ingredients
                  </h3>
                  <div className="text-gray-600 text-[14px] whitespace-pre-line leading-relaxed">
                    {product.ingredients}
                  </div>
                </div>
              )}
              {product.processingDetails && (
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-gray-900 font-semibold text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-[#A34E0D]">🧼</span> Processing Details
                  </h3>
                  <ul className="text-gray-600 text-[14px] leading-relaxed space-y-2 list-disc list-inside pl-4">
                    {product.processingDetails.map((detail, idx) => (
                      <li key={idx} className="marker:text-[#A34E0D]">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* E4b. Inquiry Form Section */}
      <section id="inquiry-form" className="w-full bg-white py-24 px-6 relative">
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <SplitReveal text="Send Us an Inquiry" tag="h2" className="text-4xl font-display font-medium text-gray-900 mb-3" />
            <p className="text-gray-500 text-[15px]">Our export team responds within 24 hours.</p>
          </div>

          <form ref={formRef} className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
              <input suppressHydrationWarning type="text" placeholder="Company Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
              <input suppressHydrationWarning type="tel" placeholder="Phone / WhatsApp Number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
            </div>
            
            <input suppressHydrationWarning type="text" defaultValue={product.name} placeholder="Product Interest" className="form-animated-element w-full bg-gray-50 border border-[#A34E0D]/30 text-[#A34E0D] font-bold rounded-lg px-4 py-3.5 focus:outline-none focus:border-[#A34E0D]/60 transition-colors text-sm" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="text" placeholder="Quantity Required (e.g., 20 MT)" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
              <input suppressHydrationWarning type="text" placeholder="Packaging Preference" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400" />
            </div>

            <textarea suppressHydrationWarning rows={4} placeholder="Additional Message / Port of Destination" className="form-animated-element w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#A34E0D]/40 transition-colors text-sm placeholder:text-gray-400 resize-y" />

            <div className="form-animated-element mt-2 block w-full">
              <MagneticButton className="w-full">
                <button suppressHydrationWarning type="button" className="w-full h-[54px] bg-[#A34E0D] hover:bg-[#8B4513] text-white font-bold text-[15px] rounded-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#A34E0D]/20">
                  Send Inquiry <ArrowRight size={18} />
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </section>

      {/* E4c. Related Products */}
      <section className="w-full py-20 px-6 bg-gray-50/50">
        <div className="max-w-[1240px] mx-auto">
          <h3 className="text-xl font-display font-medium text-gray-900 mb-8 border-b border-gray-200 pb-4 inline-block">You may also be interested in</h3>
          
          <div className="flex overflow-x-auto pb-8 gap-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {relatedProducts.map(rel => (
              <Link key={rel.id} href={`/products/${rel.categorySlug}/${rel.slug}`} className="snap-start shrink-0">
                <TiltCard className="w-[200px] h-[140px] border border-gray-100 rounded-xl overflow-hidden group bg-white shadow-sm">
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <img src={rel.unsplashId.startsWith('/') || rel.unsplashId.startsWith('http') ? rel.unsplashId : `https://images.unsplash.com/${rel.unsplashId}?auto=format&fit=crop&q=75&w=600`} alt={rel.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h4 className="text-[13px] font-medium text-white line-clamp-1">{rel.name}</h4>
                    <span className="text-[10px] text-[#A34E0D] uppercase tracking-wider font-bold">{rel.categoryName}</span>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html:`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
