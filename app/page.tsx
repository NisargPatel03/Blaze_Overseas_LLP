import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Collections from "@/components/Collections";
import Showroom from "@/components/Showroom";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Collections />
      <Showroom />
      <Projects />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </main>
  );
}
