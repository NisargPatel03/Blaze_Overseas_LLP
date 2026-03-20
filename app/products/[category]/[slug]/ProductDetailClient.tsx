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
    gsap.registerPlugin(ScrollTrigger);
    
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
    <main className="w-full bg-[#1B1714] min-h-screen text-[#E8E1D9] font-sans selection:bg-[#F5A623] selection:text-[#1B1714]">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] relative">
        
        {/* E2. Left Column — Product Photo Hero */}
        <section className="relative w-full h-[60vh] lg:h-screen lg:sticky top-0 bg-[#1F1A17] flex flex-col items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#F5A623]/10">
          
          <div className="absolute inset-0 z-0 opacity-80 hover:opacity-100 transition-all duration-1000 animate-[fadeIn_1s_ease-out_both] scale-100 group">
             <VolumetricPhoto src={product.unsplashId.startsWith('/') || product.unsplashId.startsWith('http') ? product.unsplashId : `https://images.unsplash.com/${product.unsplashId}?auto=format&fit=crop&q=80&w=1200`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1714] via-[#1B1714]/40 to-transparent pointer-events-none z-[1]" />

          {/* SPLASH CANVAS ENGINE OVERLAY */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            <ProductSplash productSlug={product.slug} replay={replay} />
          </div>
          <div className="absolute inset-0 z-[3] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(27,23,20,0.0) 0%, rgba(27,23,20,0.3) 40%, rgba(27,23,20,0.75) 70%, rgba(27,23,20,0.95) 100%)' }} />

          <div className="absolute top-24 left-6 md:left-12 md:top-28 z-[4] text-[11px] text-[#E8E1D9]/70 uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-[#E8E1D9]/15 hidden sm:block">
            <Link href="/products" className="hover:text-[#F5A623] transition-colors">Products</Link> / 
            <Link href={`/products/${product.categorySlug}`} className="hover:text-[#F5A623] transition-colors mx-2">{product.categoryName}</Link> / 
            <span className="text-[#F5A623] ml-2">{product.name}</span>
          </div>

          <div className="absolute bottom-10 inset-x-6 md:inset-x-12 z-[4] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-wrap shadow-xl items-center justify-center lg:justify-start gap-2 animate-[fadeSlideUp_0.5s_ease-out_0.5s_both] bg-black/60 backdrop-blur-xl p-2 rounded-xl border border-[#E8E1D9]/15">
              {product.packagingSizes.map((size) => (
                <button suppressHydrationWarning
                  key={size.label}
                  onClick={() => setActiveSize(size.label)}
                  className={`px-5 py-2 text-[12px] font-medium rounded-lg transition-all duration-300 shadow-sm ${
                    activeSize === size.label 
                      ? "bg-[#F5A623] text-black shadow-[#F5A623]/20" 
                      : "bg-transparent border border-transparent text-[#E8E1D9]/70 hover:text-[#E8E1D9] hover:bg-[#E8E1D9]/10 hover:border-[#E8E1D9]/15"
                  }`}
                >
                  {size.label}
                </button>
              ))}

              {/* Replay Effects Button */}
              <button suppressHydrationWarning
                onClick={handleReplay} 
                className={`ml-2 w-9 h-9 flex items-center justify-center rounded-lg bg-[#E8E1D9]/5 border border-[#E8E1D9]/15 text-[#E8E1D9]/60 hover:bg-[#E8E1D9]/10 hover:text-[#E8E1D9] transition-all ${isSpinning ? 'animate-[spin_0.4s_ease-out]' : ''}`}
                title="Replay Animation"
              >
                <RefreshCcw size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* E3. Right Column — Product Info Panel */}
        <section className="px-6 py-12 lg:p-12 xl:p-16 lg:pt-32 relative bg-[#1B1714]">
          <div className="max-w-[600px] mx-auto lg:mx-0 flex flex-col items-start gap-6">
            
            <div className="inline-block bg-[#F5A623] text-black text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full animate-[slideInRight_0.4s_both]">
              {product.categoryName}
            </div>

            <SplitReveal text={product.name} tag="h1" className="text-4xl md:text-5xl font-display font-semibold text-[#F5A623] leading-tight" />

            <div className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-out_0.5s_both]">
              <div className="border border-[#E8E1D9]/25 text-[#E8E1D9]/90 text-[12px] px-3 py-1 rounded-full">
                {product.origin}
              </div>
              <div className="border border-[#F5A623]/70 text-[#F5A623] text-[12px] px-3 py-1 rounded-full">
                {product.grade}
              </div>
            </div>

            <div className="w-full h-[0.5px] bg-[#F5A623]/20 my-2" />

            <div className="text-[15px] leading-[1.8] text-[#E8E1D9]/75 animate-[fadeSlideUp_0.5s_ease-out_0.6s_both]">
              {product.description}
            </div>

            {/* Packaging & Delivery Grid */}
            <div className="w-full mt-4">
              <h4 className="text-[11px] tracking-[0.1em] text-[#F5A623]/50 uppercase mb-3">Packaging & Logistics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#26201B] border border-[#F5A623]/15 rounded-lg p-4">
                  <div className="text-[#F5A623] font-medium text-[10px] uppercase tracking-wider mb-1">Retail Sizes</div>
                  <div className="text-[#E8E1D9] text-[13px]">{retailSizes}</div>
                </div>
                <div className="bg-[#26201B] border border-[#F5A623]/15 rounded-lg p-4">
                  <div className="text-[#F5A623] font-medium text-[10px] uppercase tracking-wider mb-1">Export Bulk</div>
                  <div className="text-[#E8E1D9] text-[13px]">{bulkSizes}</div>
                </div>
                <div className="bg-[#26201B] border border-[#F5A623]/15 rounded-lg p-4">
                  <div className="text-[#F5A623] font-medium text-[10px] uppercase tracking-wider mb-1">Origin</div>
                  <div className="text-[#E8E1D9] text-[13px] line-clamp-1">{product.origin}</div>
                </div>
                <div className="bg-[#26201B] border border-[#F5A623]/15 rounded-lg p-4">
                  <div className="text-[#F5A623] font-medium text-[10px] uppercase tracking-wider mb-1">Min. Order</div>
                  <div className="text-[#E8E1D9] text-[13px]">{product.moq}</div>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["ISO 9001:2015", "FSSAI Certified", "Export Inspected"].map(cert => (
                <div key={cert} className="bg-[#F5A623]/5 border border-[#F5A623]/20 text-[#F5A623]/80 text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={12} /> {cert}
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="w-full flex flex-col gap-3 mt-8">
              <a href={`https://wa.me/${waNumber.replace('+', '')}?text=Hi Blazze, I am interested in ${encodeURIComponent(product.name)}. Please share price and availability for ${encodeURIComponent(activeSize)}.`} target="_blank" rel="noreferrer" className="w-full h-[52px] bg-[#25D366] hover:bg-[#20b958] active:scale-[0.98] transform transition-all text-[#E8E1D9] font-medium rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.2)]">
                <MessageCircle size={20} /> Inquire on WhatsApp
              </a>
              <button suppressHydrationWarning onClick={handleScrollToForm} className="w-full h-[48px] bg-transparent border-[0.5px] border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/5 text-[14px] font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                Send Detailed Inquiry <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* E4a. Product Specifications Table */}
      <section className="w-full bg-[#201B17] border-y border-[#F5A623]/10 py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <SplitReveal text="Product Specifications" tag="h2" className="text-3xl font-display font-medium text-[#E8E1D9] mb-10 text-center" />
          
          <div className="w-full overflow-x-auto rounded-xl border border-[#F5A623]/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5A623]/10">
                  <th className="px-6 py-4 text-[#F5A623] font-medium text-[13px] uppercase tracking-widest border-b border-[#F5A623]/20">Parameter</th>
                  <th className="px-6 py-4 text-[#F5A623] font-medium text-[13px] uppercase tracking-widest border-b border-[#F5A623]/20">Specification</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#E8E1D9]/90">
                {product.detailedSpecs ? (
                  product.detailedSpecs.map((spec, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-[#1B1714]' : 'bg-[#201B17]'} ${idx === product.detailedSpecs!.length - 1 ? '' : 'border-b border-[#F5A623]/10'}`}>
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">{spec.label}</td>
                      <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: spec.value }} />
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Shelf Life</td>
                      <td className="px-6 py-4">{product.shelfLife}</td>
                    </tr>
                    <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Moisture Content</td>
                      <td className="px-6 py-4">{product.moisture}</td>
                    </tr>
                    <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Purity (Min)</td>
                      <td className="px-6 py-4">{product.purity}</td>
                    </tr>
                    <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Color Designation</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <span className="w-3 h-3 block rounded-full" style={{ backgroundColor: product.color }} /> 
                        {product.color}
                      </td>
                    </tr>
                    <tr className="bg-[#1B1714]">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">HS Code</td>
                      <td className="px-6 py-4 font-mono text-[#F5A623]">{product.hsCode}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          
          {(product.ingredients || product.processingDetails) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {product.ingredients && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🌿 Ingredients
                  </h3>
                  <div className="text-[#E8E1D9]/80 text-[14px] whitespace-pre-line leading-relaxed">
                    {product.ingredients}
                  </div>
                </div>
              )}
              {product.processingDetails && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🧼 Processing Details
                  </h3>
                  <ul className="text-[#E8E1D9]/80 text-[14px] leading-relaxed space-y-2 list-disc list-inside pl-4">
                    {product.processingDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* E4b. Inquiry Form Section */}
      <section id="inquiry-form" className="w-full bg-[#1F1A17] py-24 px-6 relative">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <SplitReveal text="Send Us an Inquiry" tag="h2" className="text-4xl font-display font-medium text-[#E8E1D9] mb-3" />
            <p className="text-[#E8E1D9]/60 text-[15px]">Our export team responds within 24 hours.</p>
          </div>

          <form ref={formRef} className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="text" placeholder="Full Name" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
              <input suppressHydrationWarning type="text" placeholder="Company Name" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="email" placeholder="Email Address" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
              <input suppressHydrationWarning type="tel" placeholder="Phone / WhatsApp Number" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
            </div>
            
            <input suppressHydrationWarning type="text" defaultValue={product.name} placeholder="Product Interest" className="form-animated-element w-full bg-[#26201B] border border-[#F5A623]/40 text-[#F5A623] font-medium rounded-lg px-4 py-3.5 focus:outline-none focus:border-[#F5A623]/80 transition-colors text-sm" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 form-animated-element">
              <input suppressHydrationWarning type="text" placeholder="Quantity Required (e.g., 20 MT)" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
              <input suppressHydrationWarning type="text" placeholder="Packaging Preference" className="w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40" />
            </div>

            <textarea suppressHydrationWarning rows={4} placeholder="Additional Message / Port of Destination" className="form-animated-element w-full bg-[#26201B] border border-[#F5A623]/20 rounded-lg px-4 py-3.5 text-[#E8E1D9] focus:outline-none focus:border-[#F5A623]/60 transition-colors text-sm placeholder:text-[#E8E1D9]/40 resize-y" />

            <div className="form-animated-element mt-2 block w-full">
              <MagneticButton className="w-full">
                <button suppressHydrationWarning type="button" className="w-full h-[54px] bg-[#F5A623] hover:bg-[#e09500] text-black font-medium text-[15px] rounded-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2">
                  Send Inquiry <ArrowRight size={18} />
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </section>

      {/* E4c. Related Products */}
      <section className="w-full py-20 px-6 bg-[#1B1714]">
        <div className="max-w-[1240px] mx-auto">
          <h3 className="text-xl font-display font-medium text-[#E8E1D9] mb-8 border-b border-[#F5A623]/20 pb-4 inline-block">You may also be interested in</h3>
          
          <div className="flex overflow-x-auto pb-8 gap-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {relatedProducts.map(rel => (
              <Link key={rel.id} href={`/products/${rel.categorySlug}/${rel.slug}`} className="snap-start shrink-0">
                <TiltCard className="w-[200px] h-[140px] border border-[#F5A623]/10 rounded-xl overflow-hidden group bg-[#201B17]">
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <img src={rel.unsplashId.startsWith('/') || rel.unsplashId.startsWith('http') ? rel.unsplashId : `https://images.unsplash.com/${rel.unsplashId}?auto=format&fit=crop&q=75&w=600`} alt={rel.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h4 className="text-[13px] font-medium text-[#E8E1D9] line-clamp-1">{rel.name}</h4>
                    <span className="text-[10px] text-[#F5A623] uppercase tracking-wider">{rel.categoryName}</span>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
          
          {(product.ingredients || product.processingDetails) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {product.ingredients && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🌿 Ingredients
                  </h3>
                  <div className="text-[#E8E1D9]/80 text-[14px] whitespace-pre-line leading-relaxed">
                    {product.ingredients}
                  </div>
                </div>
              )}
              {product.processingDetails && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🧼 Processing Details
                  </h3>
                  <ul className="text-[#E8E1D9]/80 text-[14px] leading-relaxed space-y-2 list-disc list-inside pl-4">
                    {product.processingDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
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
