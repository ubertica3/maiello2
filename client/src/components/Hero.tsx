export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Leo Maiello en el escenario" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight">Leo Maiello</h1>
        <p className="font-accent italic text-xl md:text-2xl mb-8">"Te quiero hasta ahí"</p>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Una charla dinámica que aborda los dilemas emocionales y relacionales en un mundo cada vez más digital
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#events" 
            className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Próximos Eventos
          </a>
          <a 
            href="#contact" 
            className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition-colors"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
