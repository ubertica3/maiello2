import { forwardRef } from "react";

const EbookSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="ebook" className="py-16 md:py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative max-w-sm mx-auto lg:ml-auto">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="eBook Te Quiero Hasta Ahí" 
                className="w-full h-auto rounded-lg shadow-2xl rotate-3"
              />
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-bold">NUEVO</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">Mi Nuevo eBook</h2>
            <h3 className="text-2xl font-playfair italic text-secondary mb-6">"Te Quiero Hasta Ahí"</h3>
            <div className="space-y-4 mb-8">
              <p className="text-white/90">
                Un recorrido profundo por los dilemas emocionales y relacionales en un mundo cada vez más digital, donde la fantasía y la realidad se cruzan, la idealización ocupa un lugar trascendental, y los encuentros genuinos parecen cada vez más lejanos.
              </p>
              <p className="text-white/90">
                ¿Es posible amar en un mundo que parece moverse al compás de un algoritmo? Este eBook explora respuestas a esta y muchas otras preguntas sobre nuestras relaciones modernas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="inline-block px-8 py-3 bg-secondary text-white font-medium rounded hover:bg-secondary/90 transition text-center">
                Comprar eBook
              </a>
              <a href="#" className="inline-block px-8 py-3 border border-white text-white font-medium rounded hover:bg-white/10 transition text-center">
                Leer Extracto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

EbookSection.displayName = "EbookSection";

export default EbookSection;
