import { forwardRef } from "react";

const AboutSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-primary">Sobre Mí</h2>
            <div className="space-y-4">
              <p className="text-lg text-accent">
                Licenciado en Psicología y comunicador, me dedico a explorar los dilemas emocionales y relacionales en un mundo cada vez más digital.
              </p>
              <p className="text-accent">
                A través de mis charlas, contenido en redes sociales y presentaciones, abordo cómo la fantasía y la realidad se cruzan en nuestras vidas, y cómo la idealización ocupa un lugar trascendental en nuestras relaciones.
              </p>
              <p className="text-accent">
                Mi objetivo es ayudarte a cuestionar lo efímero del amor moderno, entender lo positivo y negativo de las nuevas formas de vincularnos, y encontrar conexiones genuinas en un mundo que parece moverse cada vez más rápido.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-montserrat font-semibold mb-4 text-primary">'Te Quiero Hasta Ahí'</h3>
              <p className="text-accent">
                Una charla dinámica que aborda los dilemas emocionales y relacionales en un mundo cada vez más digital, donde la fantasía y la realidad se cruzan, la idealización ocupa un lugar trascendental, y los encuentros genuinos parecen cada vez más lejanos.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521493959102-d7675408b9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Leo Maiello" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-secondary rounded-lg -z-10"></div>
              <div className="absolute -top-5 -right-5 w-32 h-32 bg-accent rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
