import { useState, useEffect } from "react";
import { socialLinks } from "../data/links";

interface NavigationProps {
  onNavigate: {
    about: () => void;
    events: () => void;
    ebook: () => void;
    media: () => void;
    contact: () => void;
  };
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (handler: () => void) => {
    handler();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-montserrat font-bold text-lg sm:text-xl">
            <a href="#" className="text-white hover:text-secondary transition">Leo Maiello</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button 
                onClick={() => onNavigate.about()} 
                className="text-white hover:text-secondary px-3 py-2 rounded-md font-medium transition"
              >
                Sobre Mí
              </button>
              <button 
                onClick={() => onNavigate.events()} 
                className="text-white hover:text-secondary px-3 py-2 rounded-md font-medium transition"
              >
                Eventos
              </button>
              <button 
                onClick={() => onNavigate.ebook()} 
                className="text-white hover:text-secondary px-3 py-2 rounded-md font-medium transition"
              >
                eBook
              </button>
              <button 
                onClick={() => onNavigate.media()} 
                className="text-white hover:text-secondary px-3 py-2 rounded-md font-medium transition"
              >
                Media
              </button>
              <button 
                onClick={() => onNavigate.contact()} 
                className="text-white hover:text-secondary px-3 py-2 rounded-md font-medium transition"
              >
                Contacto
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white p-2 rounded-md hover:bg-accent/20 transition"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden bg-primary/95 backdrop-blur-sm ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => handleNavigation(onNavigate.about)} 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md font-medium transition w-full text-left"
          >
            Sobre Mí
          </button>
          <button 
            onClick={() => handleNavigation(onNavigate.events)} 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md font-medium transition w-full text-left"
          >
            Eventos
          </button>
          <button 
            onClick={() => handleNavigation(onNavigate.ebook)} 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md font-medium transition w-full text-left"
          >
            eBook
          </button>
          <button 
            onClick={() => handleNavigation(onNavigate.media)} 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md font-medium transition w-full text-left"
          >
            Media
          </button>
          <button 
            onClick={() => handleNavigation(onNavigate.contact)} 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md font-medium transition w-full text-left"
          >
            Contacto
          </button>
          <div className="flex space-x-4 px-3 py-2">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition">
              <i className="fab fa-spotify text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
