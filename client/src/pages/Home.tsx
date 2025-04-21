import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Ebook from "@/components/Ebook";
import Videos from "@/components/Videos";
import Social from "@/components/Social";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "Leo Maiello | Psicólogo";
  }, []);

  return (
    <div className="bg-light text-dark">
      <Header />
      <Hero />
      <About />
      <Events />
      <Ebook />
      <Videos />
      <Social />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}
