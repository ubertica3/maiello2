import { useEffect, useRef } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventsSection from "./components/EventsSection";
import EbookSection from "./components/EbookSection";
import MediaSection from "./components/MediaSection";
import SocialMediaSection from "./components/SocialMediaSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
  const aboutRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const ebookRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Handle navigation from URLs with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      switch (hash) {
        case "#about":
          if (aboutRef.current) scrollToSection(aboutRef);
          break;
        case "#events":
          if (eventsRef.current) scrollToSection(eventsRef);
          break;
        case "#ebook":
          if (ebookRef.current) scrollToSection(ebookRef);
          break;
        case "#media":
          if (mediaRef.current) scrollToSection(mediaRef);
          break;
        case "#contact":
          if (contactRef.current) scrollToSection(contactRef);
          break;
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen">
          <Navigation 
            onNavigate={{ 
              about: () => scrollToSection(aboutRef),
              events: () => scrollToSection(eventsRef),
              ebook: () => scrollToSection(ebookRef),
              media: () => scrollToSection(mediaRef),
              contact: () => scrollToSection(contactRef)
            }} 
          />
          <HeroSection onAboutClick={() => scrollToSection(aboutRef)} />
          <AboutSection ref={aboutRef} />
          <EventsSection ref={eventsRef} />
          <EbookSection ref={ebookRef} />
          <MediaSection ref={mediaRef} />
          <SocialMediaSection />
          <NewsletterSection ref={contactRef} />
          <Footer 
            onNavigate={{ 
              about: () => scrollToSection(aboutRef),
              events: () => scrollToSection(eventsRef),
              ebook: () => scrollToSection(ebookRef),
              media: () => scrollToSection(mediaRef),
              contact: () => scrollToSection(contactRef)
            }} 
          />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
