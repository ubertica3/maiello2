import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-heading font-bold text-primary flex items-center">
          <span>Leo Maiello</span>
        </a>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-dark p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#about" className="hover:text-primary transition-colors">Sobre Mí</a>
          <a href="#events" className="hover:text-primary transition-colors">Eventos</a>
          <a href="#ebook" className="hover:text-primary transition-colors">E-Book</a>
          <a href="#videos" className="hover:text-primary transition-colors">Videos</a>
          <a href="#social" className="hover:text-primary transition-colors">Redes Sociales</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contacto</a>
        </nav>
        
        {/* Social icons (desktop) */}
        <div className="hidden md:flex space-x-3">
          <a href="https://www.instagram.com/soyleopsicologo/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.facebook.com/lic.leomaiello" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-spotify"></i>
          </a>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-white p-4 shadow-md`}>
        <nav className="flex flex-col space-y-3 text-sm font-medium">
          <a href="#about" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>Sobre Mí</a>
          <a href="#events" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>Eventos</a>
          <a href="#ebook" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>E-Book</a>
          <a href="#videos" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>Videos</a>
          <a href="#social" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>Redes Sociales</a>
          <a href="#contact" className="py-2 hover:text-primary transition-colors" onClick={closeMobileMenu}>Contacto</a>
        </nav>
        
        {/* Social icons (mobile) */}
        <div className="flex space-x-5 mt-4 pt-4 border-t border-gray-200">
          <a href="https://www.instagram.com/soyleopsicologo/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.facebook.com/lic.leomaiello" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
            <i className="fab fa-spotify"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
