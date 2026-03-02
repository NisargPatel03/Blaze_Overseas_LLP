import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Strength from "@/components/Strength";
import Mission from "@/components/Mission";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Strength />
      <Mission />
      <Certifications />
      <Contact />
      <CtaBanner />
      <Footer />
    </main>
  );
}
