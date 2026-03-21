import { notFound } from "next/navigation";
import Link from "next/link";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StaggerGrid } from "@/components/ui/StaggerGrid";
import { TiltCard } from "@/components/ui/TiltCard";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { MessageCircle, ArrowRight } from "lucide-react";

const categoryMeta: Record<string, { num: string; name: string; desc: string; cover: string }> = {
  "whole-spices": { num: "01", name: "Whole Spices", desc: "Hand-selected whole spices. Bold aroma, pure form.", cover: "/Photos/Final WHOLE SPICES IMAGE.png" },
  "blended-masala": { num: "02", name: "Blended Masala", desc: "Expert-blended powders. Consistent taste, every batch.", cover: "/Photos/Final BLENDED MASALA IMAGE.png" },
  "grains": { num: "03", name: "Grains", desc: "Premium Basmati & wheat. Farm-direct. Export certified.", cover: "/Photos/Final GRAINS IMAGE.png" },
  "pulses": { num: "04", name: "Pulses", desc: "Protein-rich dals & legumes. Sorted, cleaned, export-ready.", cover: "/Photos/Final PULSES IMAGE.png" },
};

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((c) => ({ category: c }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const meta = categoryMeta[resolvedParams.category];
  if (!meta) return notFound();

  const categoryProducts = products.filter((p) => p.categorySlug === resolvedParams.category);
  const waNumber = "+917777984018"; // Hardcoded for generation as requested

  // Simple hardcoded letters for Blended Masala
  const hasLetters = resolvedParams.category === "blended-masala";

  return (
    <main className="w-full bg-white min-h-screen text-gray-900 font-sans selection:bg-[#F5A623] selection:text-white">
      {/* D1. Category Hero */}
      <section className="relative w-full min-h-[480px] md:min-h-[400px] h-auto md:h-[55vh] flex items-center px-6 md:px-16 pt-16 pb-20 md:pt-12 md:pb-0 overflow-hidden">
        
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={meta.cover} alt={meta.name} className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[20s]" />
          {/* Change 3 & 10: Subtle light overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(245,166,35,0.05) 0%, transparent 70%)" }} />
        
        <div className="max-w-[1240px] mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-10">
          
          <div className="w-full md:w-[60%] flex flex-col items-start gap-4">
            <div className="text-[11px] text-gray-400 uppercase tracking-widest animate-[fadeIn_0.3s_both]">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link> / 
              <Link href="/products" className="hover:text-gray-900 transition-colors mx-1">Products</Link> / 
              <span className="text-amber-600 ml-1">{meta.name}</span>
            </div>

            {/* Change 3 & 10: Black heading for specific categories */}
            <SplitReveal 
              text={meta.name} 
              tag="h1" 
              className={cn(
                "text-5xl md:text-[64px] font-display font-semibold leading-tight",
                (resolvedParams.category === 'whole-spices' || resolvedParams.category === 'grains') 
                  ? "text-gray-900" 
                  : "text-gray-900"
              )} 
            />
            <SplitReveal text={meta.desc} tag="p" delay={0.5} className="text-lg text-gray-600 max-w-lg leading-relaxed" />
            
            <div className="animate-[slideInLeft_0.4s_ease-out_0.8s_both] mt-2 border border-amber-600/30 text-amber-700 bg-amber-50 px-4 py-1.5 rounded-full text-[12px] font-medium tracking-wide">
              {categoryProducts.length} Premium Products available
            </div>

            <div className="flex flex-wrap gap-4 mt-6 animate-[fadeIn_0.5s_ease-out_1s_both]">
              <MagneticButton>
                <a href="#product-grid" className="h-12 px-8 bg-amber-700 hover:bg-amber-800 text-white flex items-center justify-center rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(180,83,9,0.5)]">
                  Explore Collection
                </a>
              </MagneticButton>
              <MagneticButton intensity={0.15}>
                <a href={`https://wa.me/${waNumber.replace('+', '')}?text=Hi Blazze, I am interested in ${meta.name} products`} target="_blank" rel="noreferrer" className="h-12 px-6 border border-amber-700 text-amber-700 hover:bg-amber-50 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors gap-2">
                  <MessageCircle size={18} /> WhatsApp Inquiry
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Change 3 & 10: Amber watermark */}
          <div className="hidden md:flex w-[40%] justify-end items-center relative h-full">
            <div className="text-[80px] lg:text-[120px] xl:text-[150px] font-display font-bold leading-none select-none animate-[slideInRight_0.6s_ease-out_0.3s_both] opacity-20 text-right text-amber-500 drop-shadow-sm" style={{ WebkitTextStroke: '1px rgba(245,158,11,0.3)' }}>
              {meta.name.split(' ')[0]}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[4px] bg-amber-600 animate-[growHeight_0.5s_ease-out_0.5s_both]" style={{ height: "120px" }} />
          </div>

        </div>
      </section>

      <div className="w-full h-[0.5px] bg-gray-100" />

      {/* D2. Filter / Sort Bar */}
      <div className="w-full sticky top-[70px] md:top-[80px] z-40 bg-white/92 backdrop-blur-xl border-b border-gray-100 h-[52px] flex items-center px-6 md:px-16">
        <div className="max-w-[1240px] mx-auto w-full flex items-center justify-between">
          <span className="text-[12px] text-[#F5A623] font-medium uppercase tracking-widest">{meta.name}</span>
          
          <div className="flex items-center gap-6">
            {hasLetters && (
              <div className="hidden md:flex gap-1.5">
                {['A', 'C', 'G', 'K', 'O', 'T'].map(letter => (
                  <button key={letter} className="w-6 h-6 rounded-sm text-[10px] font-medium border border-gray-200 text-gray-500 hover:bg-[#F5A623]/10 hover:border-[#F5A623]/30 hover:text-[#F5A623] transition-colors flex items-center justify-center">
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* D3. Product Grid */}
      <section id="product-grid" className="py-20 px-6 md:px-16 w-full">
        <StaggerGrid className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" staggerDelay={0.05}>
          {categoryProducts.map((prod) => (
            <Link key={prod.slug} href={`/products/${prod.categorySlug}/${prod.slug}`} className="block group">
              <TiltCard intensity={8} className="h-[280px] rounded-xl overflow-hidden border border-gray-100 group-hover:border-[#F5A623]/30 transition-colors bg-gray-50 shadow-sm">
                {/* Image & Gradient */}
                <img src={prod.unsplashId.startsWith('/') || prod.unsplashId.startsWith('http') ? prod.unsplashId : `https://images.unsplash.com/${prod.unsplashId}?auto=format&fit=crop&q=75&w=600`} alt={prod.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-0" />
                
                {/* Base Content (Always Visible) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:-translate-y-4 transition-transform duration-500">{prod.name}</h3>
                  <div className="text-[11px] text-[#F5A623] mb-2 group-hover:-translate-y-4 transition-transform duration-500 font-medium">{prod.origin}</div>
                  <div className="text-[11px] text-white/80 flex items-center gap-1 group-hover:opacity-0 transition-opacity duration-300">
                    View Details <ArrowRight size={12} />
                  </div>
                </div>

                {/* Hover Reveal Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-gradient-to-t from-gray-900/95 to-transparent transform translate-y-[100%] transition-transform duration-500 cubic-bezier(0.22,1,0.36,1) group-hover:translate-y-0 z-20 flex flex-col justify-end p-5">
                  <p className="text-[12px] text-white/80 line-clamp-2 leading-relaxed mb-3">
                    {prod.description}
                  </p>
                  <p className="text-[11px] text-[#F5A623] mb-4 font-medium uppercase tracking-wider">
                    {prod.packagingSizes.map(p => p.label).join(' · ')}
                  </p>
                  
                  {/* Stop Propagation on WhatsApp button so it doesn't trigger Link navigation if clicked */}
                  <object>
                    <a href={`https://wa.me/${waNumber.replace('+', '')}?text=${encodeURIComponent(prod.whatsappText)}`} target="_blank" rel="noreferrer" className="w-full h-10 bg-[#25D366] hover:bg-[#20b958] text-white rounded-md flex items-center justify-center text-[12px] font-medium transition-colors shadow-lg">
                      Quick Inquiry <ArrowRight size={14} className="ml-2" />
                    </a>
                  </object>
                </div>
              </TiltCard>
            </Link>
          ))}
        </StaggerGrid>
      </section>

      {/* D4. Category Bottom Banner */}
      <section className="w-full bg-gray-50 border-y border-gray-100 py-12 px-6 md:px-16 relative">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-display font-medium text-[#F5A623] mb-2">Need a custom quantity or bulk order?</h3>
            <p className="text-sm text-gray-600">Contact our export team for pricing, logistics, and supply availability.</p>
          </div>
          <MagneticButton>
            <Link href="/contact" className="h-[52px] px-8 bg-[#F5A623] hover:bg-[#e09500] text-white font-medium transition-transform duration-300 hover:scale-105 rounded-sm flex items-center justify-center whitespace-nowrap">
              Get a Quote <ArrowRight size={18} className="ml-2" />
            </Link>
          </MagneticButton>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes growHeight {
          from { height: 0px; }
          to { height: 80px; }
        }
      `}} />
    </main>
  );
}
