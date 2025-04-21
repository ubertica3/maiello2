import { socialLinks, contactInfo } from "../data/links";

interface FooterProps {
  onNavigate: {
    about: () => void;
    events: () => void;
    ebook: () => void;
    media: () => void;
    contact: () => void;
  };
}

const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-[#1A1A1A] text-white/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Leo Maiello</h3>
            <p className="mb-4">Psicólogo, Comunicador y Artista</p>
            <div className="flex space-x-4">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition">
                <i className="fab fa-spotify text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onNavigate.about} 
                  className="text-white/80 hover:text-secondary transition"
                >
                  Sobre Mí
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigate.events} 
                  className="text-white/80 hover:text-secondary transition"
                >
                  Eventos
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigate.ebook} 
                  className="text-white/80 hover:text-secondary transition"
                >
                  eBook
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigate.media} 
                  className="text-white/80 hover:text-secondary transition"
                >
                  Media
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigate.contact} 
                  className="text-white/80 hover:text-secondary transition"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-white/80 hover:text-secondary transition flex items-center"
                >
                  <i className="fas fa-envelope mr-2"></i> {contactInfo.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} 
                  className="text-white/80 hover:text-secondary transition flex items-center"
                >
                  <i className="fas fa-phone mr-2"></i> {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Leo Maiello. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
