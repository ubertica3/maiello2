export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-white text-2xl font-heading font-bold mb-4">Leo Maiello</h2>
            <p className="mb-6 max-w-md">
              Psicólogo y comunicador especializado en relaciones interpersonales en la era digital. A través de charlas, eventos y contenido, busco ayudar a las personas a construir vínculos más genuinos.
            </p>
            <a 
              href="#social" 
              className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all hover:scale-105 transform"
            >
              <i className="fas fa-share-alt mr-2"></i>Conecta en redes
            </a>
          </div>
          
          <div className="w-full md:w-1/4 mb-8 md:mb-0" data-aos="fade-up" data-aos-duration="1000">
            <h3 className="text-white font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: "#about", text: "Sobre Mí" },
                { href: "#events", text: "Eventos" },
                { href: "#ebook", text: "E-Book" },
                { href: "#videos", text: "Videos" },
                { href: "#social", text: "Redes Sociales" },
                { href: "#contact", text: "Contacto" }
              ].map((link, index) => (
                <li key={index} data-aos="fade-left" data-aos-delay={index * 50}>
                  <a 
                    href={link.href} 
                    className="hover:text-white transition-colors hover:pl-2 duration-300 flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-1/4" data-aos="fade-left" data-aos-duration="1000">
            <h3 className="text-white font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="100">
                <i className="fas fa-envelope mt-1 mr-3 text-primary"></i>
                <a href="mailto:info@leomaiello.com" className="hover:text-white transition-colors">info@leomaiello.com</a>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                <i className="fas fa-phone mt-1 mr-3 text-primary"></i>
                <a href="tel:+5491140900877" className="hover:text-white transition-colors">+54 9 11 4090-0877</a>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="250">
                <i className="fab fa-whatsapp mt-1 mr-3 text-primary"></i>
                <a 
                  href="https://wa.me/5491140900877/?text=Hola%20Leo!%20Me%20gustaria%20contactarme%20con%20vos." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center"
                >
                  Chat por WhatsApp
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Nuevo
                  </span>
                </a>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span>Ciudad Autónoma de Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div 
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
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
