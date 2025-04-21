export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Leo Maiello en el escenario" 
          className="w-full h-full object-cover"
          data-aos="fade"
          data-aos-duration="1500"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 
          className="font-heading text-4xl md:text-6xl font-bold mb-10 leading-tight"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Leo Maiello
        </h1>
        <div 
          className="flex flex-wrap justify-center gap-4"
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          <a 
            href="#events" 
            className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105"
          >
            Próximos Eventos
          </a>
          <a 
            href="#contact" 
            className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
