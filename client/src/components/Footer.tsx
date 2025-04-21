export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-white text-2xl font-heading font-bold mb-4">Leo Maiello</h2>
            <p className="mb-6 max-w-md">
              Psicólogo y comunicador especializado en relaciones interpersonales en la era digital. A través de charlas, eventos y contenido, busco ayudar a las personas a construir vínculos más genuinos.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/soyleopsicologo/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@soyleopsicologo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="https://www.facebook.com/lic.leomaiello" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-spotify text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">Sobre Mí</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#ebook" className="hover:text-white transition-colors">E-Book</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">Videos</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">Redes Sociales</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4">
            <h3 className="text-white font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <a href="mailto:info@leomaiello.com" className="hover:text-white transition-colors">info@leomaiello.com</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3"></i>
                <a href="tel:+5491136113290" className="hover:text-white transition-colors">+54 9 11 3611-3290</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>Ciudad Autónoma de Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Leo Maiello. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mx-2 transition-colors">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
