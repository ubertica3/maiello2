export default function Ebook() {
  return (
    <section id="ebook" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5 order-2 md:order-1" data-aos="fade-right" data-aos-duration="1000">
            <h6 className="text-red-200 font-medium mb-2">Nuevo Lanzamiento</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Descarga mi E-Book</h2>
            <p className="mb-6 leading-relaxed">
              "Vínculos Digitales: Encontrar conexiones auténticas en la era de las relaciones virtuales" es mi nuevo E-Book donde comparto reflexiones y estrategias para cultivar relaciones significativas en un mundo hiperconectado.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="100">
                <i className="fas fa-check-circle mt-1 mr-3 text-yellow-300"></i>
                <span>Estrategias para reconocer relaciones saludables</span>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                <i className="fas fa-check-circle mt-1 mr-3 text-yellow-300"></i>
                <span>Cómo superar la idealización en las relaciones digitales</span>
              </li>
              <li className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                <i className="fas fa-check-circle mt-1 mr-3 text-yellow-300"></i>
                <span>Herramientas para comunicarte efectivamente en línea</span>
              </li>
            </ul>
            <a 
              href="#" 
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105 hover:shadow-lg"
              data-aos="zoom-in" 
              data-aos-delay="400"
            >
              Comprar Ahora
            </a>
          </div>
          <div 
            className="md:w-3/5 order-1 md:order-2 flex justify-center"
            data-aos="fade-left" 
            data-aos-duration="1000"
          >
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000&q=80" 
              alt="E-Book Leo Maiello" 
              className="max-w-full h-auto rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
