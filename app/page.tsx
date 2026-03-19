import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Strength from "@/components/Strength";
import Mission from "@/components/Mission";
import Certifications from "@/components/Certifications";
import Packaging from "@/components/Packaging";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <main className="w-full relative">
      <Hero />
      <About />
      <Products />
      <Strength />
      <Mission />
      <Certifications />
      <Packaging />
      <Contact />
      <CtaBanner />
    </main>
  );
}
