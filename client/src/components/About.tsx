export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=900&q=80" 
              alt="Leo Maiello psicólogo" 
              className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform hover:scale-105 duration-500"
            />
          </div>
          <div className="md:w-1/2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <h6 className="text-primary font-medium mb-2">Psicólogo y Comunicador</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Sobre Leo Maiello</h2>
            <p className="mb-6 text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Leo Maiello es un reconocido psicólogo y comunicador especializado en relaciones interpersonales en la era digital. A través de su trabajo, aborda los dilemas emocionales contemporáneos con un enfoque dinámico y accesible.
            </p>
            <p className="mb-8 text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              En su charla 'TE QUIERO HASTA AHÍ', explora cómo la tecnología está transformando nuestras formas de vincularnos, cuestionando lo efímero del amor moderno y planteando reflexiones sobre las posibilidades de conexiones genuinas en un mundo cada vez más virtual.
            </p>
            <div className="flex space-x-4" data-aos="fade-up" data-aos-delay="500">
              <a 
                href="https://www.instagram.com/soyleopsicologo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-hover bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://www.tiktok.com/@soyleopsicologo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-hover bg-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a 
                href="https://www.youtube.com/@soyleopsicologo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-hover bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-hover bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <i className="fab fa-spotify"></i>
              </a>
              <a 
                href="https://www.facebook.com/lic.leomaiello" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-hover bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
