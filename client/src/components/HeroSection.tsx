import { socialLinks } from "../data/links";

interface HeroSectionProps {
  onAboutClick: () => void;
}

const HeroSection = ({ onAboutClick }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Leo Maiello en escenario" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-montserrat font-bold text-white mb-4 leading-tight">
          Leo Maiello
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto">
          Psicólogo, Comunicador y Artista
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
            <i className="fab fa-tiktok text-2xl"></i>
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
            <i className="fab fa-youtube text-2xl"></i>
          </a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
            <i className="fab fa-spotify text-2xl"></i>
          </a>
        </div>
        <button 
          onClick={onAboutClick}
          className="inline-block px-8 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition shadow-lg"
        >
          Conocer más
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button onClick={onAboutClick} className="text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
