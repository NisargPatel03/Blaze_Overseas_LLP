import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({
    category: p.categorySlug,
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams.slug && p.categorySlug === resolvedParams.category);
  if (!product) return {};
  return {
    title: `${product.name} | Blazze Overseas LLP`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Premium Export Quality`,
      description: product.description,
      images: [product.unsplashId],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams.slug && p.categorySlug === resolvedParams.category);
  if (!product) return notFound();

  // Find 4 related products (same category first, excluding this one)
  let related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id);
  if (related.length < 4) {
    const others = products.filter(p => p.categorySlug !== product.categorySlug);
    related = [...related, ...others].slice(0, 4);
  } else {
    related = related.slice(0, 4);
  }

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
